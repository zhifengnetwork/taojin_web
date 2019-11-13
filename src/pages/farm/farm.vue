<template>
    <div class="height-88 farm">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title=" " style="top:10px;" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/head_back.png">
		</TopHeader>
        <!-- 用户信息 -->
        <div class="user">
            <div class="user_img">
                <img :src="user_info.avatar">
            </div>
            <div class="user_info">
                <p class="user_name">{{user_info.nick_name}}</p>
                <span>
                    <img class="user_icon" src="/static/images/farm/chook.png">{{user_info.chicken_num}}
                </span>
                <span>
                    <img class="user_icon" src="/static/images/farm/egg.png">{{user_info.egg}}
                </span>
            </div>
        </div>
        <div class="notice" @click="notice_off">
            <h3>公告</h3>
            <van-notice-bar
                :text="user_info.notice"
            />
            <!-- <span>{{user_info.notice}}</span> -->
        </div>
        <div class="tips" @click="notice_off(2)">
            游戏
            <br>
            说明
        </div>
        <!-- 滑动部分 -->
        <div class="chook" @scroll="page">
            <div class="chook_item" v-for="(item,index) in list" :key="index" @click="chook(index+1,item.coop_id)">
                <img v-if="item.num==0" src="/static/images/farm/type-0.png">
                <img v-if="item.num!=0" src="/static/images/farm/type-1.png">
                <img class="feed" v-if="feed&&item.num!=0" src="/static/images/farm/feed.gif">
                <div class="chook_num" v-if="item.num!=0">{{item.num}}</div>
                <div class="chook_name">鸡窝{{index+1}}号</div>
            </div>
        </div>
        <!-- 底部菜单 -->
        <div class="menu">
            <div class="menu_item" @click="rob">
                <img src="/static/images/farm/menu-1.png" v-if="user_info.is_feed==0">                
                <img class="active" src="/static/images/farm/menu-1-active.gif" v-if="user_info.is_feed==1">
                <p>抢饲料</p>
            </div>
            <div class="menu_item" @click="feedStart">
                <img src="/static/images/farm/menu-2.png" v-if="user_info.is_feed_chicken==0">                
                <img class="active" src="/static/images/farm/menu-2-active.gif" v-if="user_info.is_feed_chicken==1">
                <p>喂养</p>
            </div>
            <div class="menu_item" @click="harvest">
                <img src="/static/images/farm/menu-3.png" v-if="user_info.is_chicken==0">                
                <img class="active" src="/static/images/farm/menu-3-active.gif" v-if="user_info.is_chicken==1">
                <p>拾蛋</p>
            </div>
            <div class="menu_item" @click="show">
                <img src="/static/images/farm/menu-4.png">
                <p>商店</p>
            </div>
            <div class="menu_item" @click="wallet_off">
                <img src="/static/images/farm/menu-5.png">
                <p>钱包</p>
            </div>
            <div class="menu_item">
                <router-link to="autonym">
                    <img src="/static/images/farm/menu-6.png">
                    <p>认证</p>
                </router-link>
            </div>
        </div>
        <div class="mask" v-if="flag">
            <!-- 购买弹窗 -->
            <div class="buy_content" v-if="!pay">
                <div class="buy_off" @click="show"></div>
                <img class="buy_bg" v-if="active == 1" src="/static/images/farm/pop-up.png">
                <img class="buy_bg" v-if="active == 2" src="/static/images/farm/pop-up2.png">
                <div class="buy_title title_left" @click="buy_tab(1)">工具</div>
                <div class="buy_title title_right" @click="buy_tab(2)">购买记录</div>
                <div v-if="active == 1">
                    <div class="buy_item">
                        鸡窝
                        <div class="itrm_btn">
                            <p @click="payShow(1,1)">金沙购买</p>
                            <p @click="payShow(2,1)">余额购买</p>
                        </div>
                    </div>
                    <div class="buy_item2">
                        金鸡
                        <div class="itrm_btn">
                            <p @click="payShow(1,2)">金沙购买</p>
                            <p @click="payShow(2,2)">余额购买</p>
                        </div>
                    </div>
                </div>
                <div v-if="active == 2">
                    <!-- <div class="buy_right"> -->
                    <div class="buy_right" @scroll="tabpage">
                        <div class="right_item" v-for="(item,index) in tab" :key="index">
                            <ul>
                                <li>{{item.pay_text}}</li>
                                <li>{{item.type_text}}({{item.num}})</li>
                                <li>{{item.add_time}}</li>
                                <li>{{item.money}}个</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pay_content" v-if="pay">
                <div class="pay_off" @click="payShow"></div>
                <img class="pay_bg" v-if="paytype == 1" src="/static/images/farm/gold.png">
                <img class="pay_bg" v-if="paytype == 2" src="/static/images/farm/balance.png">
                <div class="pay_item">
                    <h3 v-if="itemtype == 1" class="item_title">鸡窝</h3>
                    <h3 v-if="itemtype == 2" class="item_title">金鸡</h3>
                    <img v-if="itemtype == 1" class="item_img item_top" src="/static/images/farm/itemtype-1.png">
                    <img v-if="itemtype == 2" class="item_img" src="/static/images/farm/itemtype-2.png">
                </div>
                <div class="pay_num">
                    <div class="num_btn" @click="pay_subtract"></div>
                    <input class="num_inp" type="text" v-model.number="num">
                    <div class="num_btn" @click="pay_plus"></div>
                </div>
                <div class="pay_info">
                    <h3 class="info_title" v-if="paytype == 1">金沙总数:{{user_info.chicken_balance}}</h3>
                    <h3 class="info_title" v-if="paytype == 2">余额总数:{{user_info.recharge_balance}}</h3>
                    <div class="info_price" v-if="paytype == 1 && itemtype == 1">{{num*50}}</div>
                    <div class="info_price" v-if="paytype == 2 && itemtype == 1">{{num*100}}</div>
                    <div class="info_price" v-if="paytype == 1 && itemtype == 2">{{num*120}}</div>
                    <div class="info_price" v-if="paytype == 2 && itemtype == 2">{{num*200}}</div>
                    <div class="info_btn" @click="purchase">立即购买</div>
                </div>
            </div>
            <!-- chook弹窗 -->
            <div v-if="chookMask" class="chookMask">
                <div class="chook_off" @click="chook"></div>
                <img class="chook_bg" src="/static/images/farm/chookMask.png">
                <h2 class="chook_title">鸡窝{{chookIndex}}号</h2>
                <div class="chook_item" v-for="(item,index) in chicken" :key="index">
                    <div class="item_index">{{index+1}}</div>
                    <p>购买时间: {{item.add_time}}</p>
                    <p>产蛋数量: {{item.num}}个</p>
                </div>
                <div class="chook_no" v-if="chicken==''">
                    <img class="item_img" src="/static/images/farm/itemtype-2.png">
                    <p>暂时没有鸡 赶紧去买鸡</p>
                </div>
            </div>
        </div>
        <!-- 公告 -->
        <div class="notice_mask" v-if="notice">
            <div class="notice_info">
                <div class="notice_off" @click="notice_off"></div>
                <img class="notice_bg" v-if="notice!=2" src="/static/images/farm/notice.png">
                <img class="notice_bg" v-if="notice==2" src="/static/images/farm/explain.png">
                <div class="notice_content" v-if="notice!=2">
                    {{user_info.notice}}
                </div>
                <div class="notice_content" v-if="notice==2">
                    <div class="content_text">
                        <p>5GCEC 全民养殖玩法</p>
                        <p>120金沙或200余额 购买1只金鸡</p>
                        <p>每只金鸡每日生2个金蛋🥚</p>
                        <p>金鸡总产量：120个金蛋🥚</p>
                        <p>金蛋🥚价格：2元1个</p>
                        <br>
                        <p>金鸡喂养时间：</p>
                        <p>上午12点️ - 13点</p>
                        <p>晚上18点️ - 19点</p>
                        <br>
                        <p style="text-align:left;">每生产一个金蛋🥚赠送一个糖果🍬，可兑换5GCEC，价格不可估量。推荐朋友养金鸡可还加速释放产蛋🥚量。</p>
                        <br>
                        <p style="text-align:left;">矿工级别会员推荐朋友养金鸡，每只鸡收益48元，10只就是480，100只就是4800，矿场主级别会员推荐朋友养金鸡，每只收益96元，10只就是960，100只就是9600。具体收益制度详情咨询领导人。</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 饲料 -->
        <div class="fodder_wrap" v-if="fodder">
            <div class="fodder">
                <div class="fodder_off" @click="this.fodder = !this.fodder"></div>
                <img class="fodder_bg" v-if="robStatus==1" src="/static/images/farm/fodder.gif">
                <img class="fodder_bg" v-if="robStatus==0" src="/static/images/farm/fodder-err.gif">
            </div>
        </div>
        <!-- 钱包 -->
        <div class="wallet_wrap" v-if="wallet">
            <div class="wallet">
                <div class="wallet_item">
                    <div class="wallet_off" @click="wallet_off"></div>
                    <p class="item_val"><img src="/static/images/farm/wallet-icon.png">{{user_info.recharge_balance}}元</p>
                    <div class="item_title">
                       余额
                    </div>
                    <div class="item_btns">
                        <div class="btn btn1" @click="accounts(1)">
                            转账
                        </div>
                        <div class="btn btn2" @click="detail(1)">
                            明细
                        </div>
                    </div>
                </div>
                <div class="wallet_item">
                    <div class="wallet_off" @click="wallet_off"></div>
                    <p class="item_val"><img src="/static/images/farm/wallet-icon.png">{{user_info.chicken_recharge_balance}}元</p>
                    <div class="item_title">
                       冻结余额
                    </div>
                    <div class="item_btns">
                        <div class="btn btn2" @click="detail(5)">
                            明细
                        </div>
                    </div>
                </div>
                <div class="wallet_item">
                    <p class="item_val"><img src="/static/images/farm/wallet-1.png">{{user_info.chicken_balance}}个</p>
                    <div class="item_title">
                       金沙
                    </div>
                    <div class="item_btns">
                        <div class="btn btn1" @click="accounts(2)">
                            转账
                        </div>
                        <div class="btn btn2" @click="detail(2)">
                            明细
                        </div>
                    </div>
                </div>
                <div class="wallet_item">
                    <p class="item_val"><img src="/static/images/farm/wallet-icon.png">{{user_info.egg_num}}元</p>
                    <div class="item_title">
                       收益
                    </div>
                    <div class="item_btns">
                        <div class="btn btn1" @click="accounts(3)">
                            转账
                        </div>
                        <div class="btn btn3" @click="withdrawShow">
                            提现
                        </div>
                        <div class="btn btn2" @click="detail(3)">
                            明细
                        </div>
                    </div>
                </div>
                <div class="wallet_item">
                    <p class="item_val"><img src="/static/images/farm/wallet-2.png">{{user_info.chicken_integral}}个</p>
                    <div class="item_title">
                       糖果
                    </div>
                    <div class="item_btns">
                        <div class="btn btn1" @click="accounts(4)">
                            转账
                        </div>
                        <div class="btn btn2" @click="detail(4)">
                            明细
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 转账 -->
        <div class="wallet_mask" v-if="wallet_mask">
            <div class="accounts" v-if="accounts_type">
                <div class="accounts_off" @click="accounts_off"></div>
                <div class="accounts_title" v-if="accounts_type==1">
                    余额转账
                </div>
                <div class="accounts_title" v-if="accounts_type==2">
                    金沙转账
                </div>
                <div class="accounts_title" v-if="accounts_type==3">
                    收益转账
                </div>
                <div class="accounts_title" v-if="accounts_type==4">
                    糖果转账
                </div>
                <div class="accounts_value" v-if="accounts_type==1">
                    <img class="png" src="/static/images/farm/wallet-icon.png"> {{user_info.recharge_balance}}
                </div>
                <div class="accounts_value" v-if="accounts_type==2">
                    <img class="png" src="/static/images/farm/wallet-1.png"> {{user_info.chicken_balance}}
                </div>
                <div class="accounts_value" v-if="accounts_type==3">
                    <img class="png" src="/static/images/farm/wallet-icon.png"> {{user_info.egg_num}}
                </div>
                <div class="accounts_value" v-if="accounts_type==4">
                    <img src="/static/images/farm/wallet-2.png"> {{user_info.chicken_integral}}
                </div>
                <label class="accounts_label">
                    <span>转账账号:</span><input type="text" v-model.number="phone" placeholder="请输入手机号码">
                </label>
                <label class="accounts_label">
                    <span>余&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额:</span><input type="text" v-model.number="money" placeholder="请输入余额">
                </label>
                <label class="accounts_label">
                    <span>支付密码:</span><input type="password" v-model.number="psd" placeholder="请输入支付密码">
                </label>
                <div class="give_radio">
                    <van-radio-group v-if="accounts_type==4" v-model="radio">
                            <van-radio name="1" checked-color="#b38a5b">转到养殖场</van-radio>
                            <van-radio name="2" checked-color="#b38a5b">转到淘金</van-radio>
                    </van-radio-group>
                </div>
                <div class="accounts_btn" @click="transfer">
                    确定转账
                </div>
            </div>
            <!-- 明细 -->
            <div class="detail" v-if="detail_type">
                <div class="detail_off" @click="detail_off"></div>
                <div class="detail_title" v-if="detail_type==1">
                    余额明细
                </div>
                <div class="detail_title" v-if="detail_type==2">
                    金沙明细
                </div>
                <div class="detail_title" v-if="detail_type==3">
                    收益明细
                </div>
                <div class="detail_title" v-if="detail_type==4">
                    糖果明细
                </div>
                <div class="detail_title" v-if="detail_type==5">
                    冻结余额明细
                </div>
                <div class="detail_content" @scroll="detailpages">
                    <div class="detail_item" v-for="(item,index) in detailList" :key="index">
                        <div class="item_left">
                            <p>{{item.intro||item.add_time}}</p>
                            <p>{{item.createtime||item.desc}}</p>
                        </div>
                        <div class="item_right">
                            <p v-if="detail_type==4">{{item.money}}个</p>
                            <p v-if="detail_type!=4">{{item.money}}元</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 红包 -->
        <!-- <div class="package" v-if="redpack" @click="pack_wrap">
            <pack></pack>
        </div> -->
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import pack from "@/pages/common/pack/pack";
    export default {
        name:'farm',
        components:{
            pack
        },
        data(){
            return{
                chookMask:false,
                chookIndex:'',
                feed:false,
                flag:false,
                pay:false,
                pay_flag:true,
                paytype:'',
                itemtype:'',
                num:1,
                fodder:false,
                wallet:false,
                notice:false,
                user_info:'',
                list:[],
                chicken:'',
                robStatus:'',
                active:'1',
                pages:1,
                tab:[],
                tabpages:1,
                redpack:false,
                wallet_mask:false,
                accounts_type:false,
                phone:'',
                money:'',
                psd:'',
                detail_type:'',
                detailpage:1,
                detailList:[],
                transferFlag:true,
                radio:'1'
            }
        },
        mounted(){
            this.initalize();
            this.chookList();
            let myDate = new Date();
            if(myDate.getHours()==12&&myDate.getMinutes()==0){
                this.redpack = true;
                setTimeout(() => {
                    this.redpack = false;
                }, 10000);
            };
           
        },
        methods:{
            initalize(){
                let _this = this;
                this.$axios.post('farm/index')
                .then(function(res){
                    console.log(res.data);
                    _this.user_info = res.data.data;
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            chookList(){
                let _this = this;
                this.$axios.post('farm/chicken_coop_list',{
                    'page':_this.pages,
                    'limit':9
                })
                .then(function(res){
                    console.log(res.data);
                    for(let i=0;i<res.data.data.length;i++){
                        _this.list.push(res.data.data[i]);
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            buy_tab(index){
                this.active = index;
                if(index==1){
                    this.tab = [];
                    this.tabpages = 1;
                }
                if(index == 2){
                    let _this = this;
                    this.$axios.post('farm/purchase',{
                        'page':_this.tabpages
                    })
                    .then(function(res){
                        console.log(res.data.data);
                        if(_this.tabpages==1){
                            _this.tab = [];
                        }
                        // _this.tab = res.data.data;
                        for(let i=0;i<res.data.data.length;i++){
                            _this.tab.push(res.data.data[i]);
                        }
                    })
                    .catch(function(error){
                        console.log(error);
                    })
                }
            },
            show(type){
                this.flag = !this.flag;
                this.tab = [];
                this.tabpages = 1;
                this.active = 1;
            },
            pay_subtract(){
                if(this.num == 1){
                    return Toast('数量不能小于1');
                }
                this.num--;
            },
            pay_plus(){
                this.num++;
            },
            payShow(paytype,itemtype){
                this.pay = !this.pay;
                this.paytype = paytype;
                this.itemtype = itemtype;
            },
            purchase(){
                let _this = this;
                let money = 0;
                if(this.itemtype == 1){
                    if(this.paytype == 1){
                        money = _this.num * 50;
                    }else{
                        money = _this.num * 100;
                    }
                }else{
                    if(this.paytype == 1){
                        money = _this.num * 120;
                    }else{
                        money = _this.num * 200;
                    }
                }
                if(!this.pay_flag){
                    return false;
                }
                this.pay_flag = false;
                if(this.itemtype == 1){
                    this.$axios.post('egg/buy_chicken_coop',{
                        'type':_this.paytype,
                        'num':_this.num,
                        'money':money
                    })
                    .then(function(res){
                        if(res.data.status == 1){
                            Toast('购买成功!');
                            setTimeout(() => {
                                _this.list = [];
                                _this.pages = 1;
                                _this.chookList();
                                _this.pay = false;
                                _this.flag = false;
                                _this.$forceUpdate();
                            }, 1000);
                        }
                        _this.pay_flag = true;
                    })
                    .catch(function(error){
                        console.log(error);
                    })
                }else{
                    this.$axios.post('egg/buy_chicken',{
                        'type':_this.paytype,
                        'num':_this.num,
                        'money':money
                    })
                    .then(function(res){
                        if(res.data.status == 1){
                            Toast('购买成功!');
                            setTimeout(() => {
                                _this.list = [];
                                _this.pages = 1;
                                _this.chookList();
                                _this.pay = false;
                                _this.flag = false;
                                _this.$forceUpdate();
                            }, 1000);
                        }
                        _this.pay_flag = true;
                    })
                    .catch(function(error){
                        console.log(error);
                    })
                }
            },
            feedStart(){
                let _this = this;
                this.$axios.post('egg/feed_chicken')
                .then(function(res){
                    console.log(res.data);
                    if(res.data.status == 1){
                        _this.feed = true;
                        setTimeout(() => {
                            Toast('喂养成功!');
                            _this.feed = false;
                            _this.initalize();
                            _this.$forceUpdate();
                        }, 3000);
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            harvest(){
                let _this = this;
                this.$axios.post('egg/harvest_egg')
                .then(function(res){
                    console.log(res.data);
                    if(res.data.status == 1){
                        Toast('收取成功!');
                        setTimeout(() => {
                            _this.initalize();
                            _this.$forceUpdate();
                        }, 1000);
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            chook(index,id){
                let _that = this;
                this.flag = !this.flag;
                this.chookIndex = index;
                this.chookMask = !this.chookMask;
                if(index,id){
                    let _this = this;
                    this.$axios.post('farm/chicken_list',{
                        'coop_id':id
                    })
                    .then(function(res){
                        console.log(res.data);
                        if(res.data.status == 1){
                            _that.chicken = res.data.data;
                        }
                    })
                    .catch(function(error){
                        console.log(error);
                    })
                }
            },
            rob(){
                let _this = this;
                this.$axios.post('egg/rob_feed')
                .then(function(res){
                    console.log(res.data);
                    if(res.data.status == 1){
                        Toast('领取成功');
                        // _this.fodder = !this.fodder;
                        _this.robStatus = res.data.data;
                        setTimeout(() => {
                            _this.initalize();
                            _this.$forceUpdate();
                        }, 1000);
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            wallet_off(){
                this.wallet = !this.wallet;
            },
            notice_off(type){
                this.notice = !this.notice;
                if(type==2){
                    this.notice = 2;
                }
            },
            page(e){
                if(e.target.scrollTop+e.target.offsetHeight>=e.target.scrollHeight-5){
                    this.pages++;
                    this.chookList();
                }
            },
            tabpage(e){
                if(e.target.scrollTop+e.target.offsetHeight >=e.target.scrollHeight-5){
                    this.tabpages++;
                    this.buy_tab(2);
                }
            },
            pack_wrap(){
                let _this = this;
                this.$axios.post('farm/random_red')
                .then(function(res){
                    console.log(res.data);
                    if(res.data.status == 1){
                        if(res.data.data==0){
                            Toast(res.data.msg);
                        }else{
                            Toast(res.data.msg+res.data.data+'个糖果');
                        }
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            accounts(type){
                this.wallet = !this.wallet;
                this.wallet_mask = !this.wallet_mask;
                this.accounts_type = type;
            },
            accounts_off(){
                this.wallet_mask = !this.wallet_mask;
                this.accounts_type = false;
            },
            transfer(){
                let _this = this;
                let type = this.accounts_type;
                let url = '';
                if(type == 1){
                   url = 'egg/give_recharge_balance';
                }else if(type == 2){
                   url = 'egg/give_chicken_balance';
                }else if(type == 3){
                   url = 'egg/give_egg_num';
                }else if(type == 4){
                   url = 'egg/give_chicken_integral';
                }
                if(_this.phone==''){
                    return Toast('请输入转账账号');
                }
                if(_this.money==''){
                    return Toast('请输入转账金额');
                }
                if(_this.psd==''){
                    return Toast('请输入支付密码');
                }
                if(!_this.transferFlag){
                    return false;
                }
                _this.transferFlag = false;
                this.$axios.post(url,{
                    'money':_this.money,
                    'phone':_this.phone,
                    'paypwd':_this.psd,
                    'type':type == 4?_this.radio:''
                })
                .then(function(res){
                    console.log(res.data);
                    if(res.data.status == 1){
                        Toast('转账成功!');
                        _this.accounts_type = '';
                        _this.wallet_mask = false;
                        _this.money = '';
                        _this.phone = '';
                        _this.psd = '';
                        _this.initalize();
                        _this.$forceUpdate();
                    }
                    _this.transferFlag = true;
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            detail(type){
                this.wallet = true;
                this.wallet_mask = true;
                this.detail_type = type;
                let _this = this;
                let url = '';
                if(type == 1){
                   url = 'farm/recharge_balance_detailed';
                }else if(type == 2){
                   url = 'farm/chicken_balance_list';
                }else if(type == 3){
                   url = 'farm/egg_num_list';
                }else if(type == 4){
                   url = 'farm/chicken_integral_list';
                }else if(type == 5){
                   url = 'farm/release_balance_detailed';
                }
                this.$axios.post(url,{
                    page:_this.detailpage
                })
                .then(function(res){
                    console.log(res.data);
                    if(res.data.status == 1){
                        for(let i=0;i<res.data.data.length;i++){
                            _this.detailList.push(res.data.data[i]);
                        }
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            detailpages(e){
                if(e.target.scrollTop+e.target.offsetHeight>=e.target.scrollHeight-5){
                    this.detailpage++;
                    this.detail(this.detail_type);
                }
            },
            detail_off(){
                console.log(111)
                this.wallet_mask = !this.wallet_mask;
                this.detail_type = false;
                this.detailList = [];
                this.detailpage = 1;
            },
            withdrawShow(){
                this.$router.push({name:'withdraw',query:{egg:true}});
            },
        }
    }
</script>

<style lang="scss" scoped>
.farm{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #4a1901;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; 
  background: url('/static/images/farm/farm.png') no-repeat;
  background-size: 100% 100%;
}
.user{
    position: absolute;
    top: 70px;
    left: 132px;
    width: 486px;
    height: 112px;
    background: #d58d4e;
}
.user_img{
    position: relative;
    float: left;
    width: 118px;
    height: 100%;
    img{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 90px;
        height: 90px;
        border-radius: 50%;
    }
}
.user_info{
    float: left;
    color: #4a1901;
    span{
        display: inline-block;
        width: 172px;
        height: 40px;
        line-height: 40px;
        text-align: right;
        border-radius: 5px;
        background: #fedf69;
        box-sizing: border-box;
        border-left: 2px solid #a86a32;
        border-top: 2px solid #a86a32;
    }
    // span:nth-type-of(2){
    //     margin-left: 10px;
    // }
}
.user_name{
    margin: 10px 0;
    width: 353px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    text-indent: 20px;
    border-radius: 5px;
    border-left: 2px solid #a86a32;
    border-top: 2px solid #a86a32;
    background: #fedf69;
}
.user_icon{
    float: left;
    margin: 2px 10px;
    width: 30px;
    height: 30px;
}
.notice{
    width: 250px;
    overflow: hidden;
    position: absolute;
    top: 21vh;
    left: 0;
    right: 0;
    margin: auto;
    color: #eea146;
    padding: 5px 0;
    box-sizing: border-box;
    .van-notice-bar{
        height: auto;
        background:none;
        color: #eea146;
        font-size: 32px;
        padding: 0;
    }
    span{
        font-size: 20px;
    }
}
.tips{
    position: absolute;
    top: 22vh;
    right: 94px;
    color: #eea146;
    font-size: 20px;
}
.chook{
    position: absolute;
    top: 29vh;
    left: 70px;
    width: 620px;
    height: 632px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.chook_item{
    position: relative;
    float: left;
    display: flex;
    width: 180px;
    height: 215px;
    align-items: flex-end;
    .feed{
        position: absolute;
        left: 20px;
        top: -20px;
        width: 80px;
    }
    img{
        width: 100%;
    }
    .chook_num{
        position: absolute;
        top: 20px;
        right: -10px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        color: #df3b3b;
        border-radius: 50%;
        background: #fff;
        animation: egg 5s 1;
    }
    .chook_name{
        position: absolute;
        top: 174px;
        left: 20px;
        right: 0;
        margin: auto;
        color: #5c330c;
    }
}
.chook_item:nth-of-type(3n-1){
    margin: 0 30px;
}
.menu{
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    position: absolute;
    width: 100%;
    bottom: 20px;
    padding: 0 24px;
    box-sizing: border-box;
}
.menu_item{
    color: #fff;
    img{
        width: 50px;
        height: 56px;
    }
    p{
        color: #fff;
    }
    .active{
        width: 70px;
        height: 120px;
    }
}
.menu_item:nth-of-type(3) img{
    width: 60px;
}
.menu_item:nth-of-type(4) img{
    width: 66px;
}
.mask,.fodder_wrap,.wallet_wrap,.notice_mask,.package,.wallet_mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    overflow-y: scroll;
    z-index: 20;
}
.buy_content{
    position: absolute;
    top: 400px;
    width: 100%;
    .buy_off{
        position: absolute;
        top: 20px;
        right: 50px;
        width: 80px;
        height: 80px;
    }
    .buy_bg{
        width: 700px;
    }
    .buy_title{
        position: absolute;
        width: 230px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    .title_left{
        top: 105px;
        left: 135px;
    }
    .title_right{
        top: 105px;
        right: 130px;
    }
    .buy_item{
        position: absolute;
        top: 170px;
        left: 115px;
        width: 528px;
        height: 150px;
        line-height: 150px;
        text-indent: 170px;
        text-align: left;
        font-size: 24px;
        font-weight: bold;
        .itrm_btn{
            position: absolute;
            top: 15px;
            right: 10px;
            width: 160px;
            height: 124px;
            line-height: 50px;
            text-indent: 0;
            text-align: center;
            p{
                margin-bottom: 25px;
                color: #fff;
                font-size: 24px;
                font-weight: bold;
                text-shadow: -1px 0 5px #622804,
                            0 1px 5px #622804,
                            1px 0 5px #622804,
                            0 -1px 5px #622804;
            }
        }
    }
    .buy_item2{
        position: absolute;
        top: 340px;
        right: 110px;
        width: 528px;
        height: 150px;
        line-height: 150px;
        text-indent: 170px;
        text-align: left;
        font-size: 24px;
        font-weight: bold;
        .itrm_btn{
            position: absolute;
            top: 15px;
            right: 10px;
            width: 160px;
            height: 124px;
            line-height: 50px;
            text-indent: 0;
            text-align: center;
            p{
                margin-bottom: 25px;
                color: #fff;
                font-size: 24px;
                font-weight: bold;
                text-shadow: -1px 0 5px #622804,
                            0 1px 5px #622804,
                            1px 0 5px #622804,
                            0 -1px 5px #622804;
            }
        }
    }
    .buy_right{
        position: absolute;
        top: 170px;
        left: 105px; 
        width: 550px;
        height: 330px;
        overflow-y: scroll;
        .right_item{
            height: 80px;
            line-height: 80px;
            white-space: normal;
            border-bottom: 2px dashed#ff9c1b;
            li{
                float: left;
                width: 22%;
            }
            li:nth-of-type(2){
                white-space: nowrap;
            }
            li:nth-of-type(3){
                width: 34%;
                line-height: 40px;
            }
            li:nth-of-type(4){
                color: #834401;
            }
        }
    }
}
.pay_content{
    position: absolute;
    top: 400px;
    width: 100%;
    .pay_off{
        position: absolute;
        top: 20px;
        right: 50px;
        width: 80px;
        height: 80px;
    }
    .pay_bg{
        width: 700px;
    }
    .pay_item{
        position: absolute;
        left: 140px;
        top: 140px;
        width: 200px;
        height: 200px;
        .item_title{
            line-height: 50px;
        }
        .item_img{
            width: 130px;
        }
        .item_top{
            margin-top: 40px;
        }
    }
    .pay_num{
        position: absolute;
        left: 136px;
        top: 368px;
        width: 210px;
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: flex-start;
        .num_btn{
            width: 40px;
        }
        .num_inp{
            width: 125px;
            text-align: center;
        }
    }
    .pay_info{
        position: absolute;
        top: 140px;
        right: 110px;
        width: 260px;
        height: 330px;
        .info_title{
            margin-top: 10px;
            margin-left: 10px;
            text-align: left;
            font-size: 30px;
            white-space: nowrap;
        }
        .info_price{
            margin-top: 110px;
            margin-left: 130px;
            text-align: left;
            font-size: 26px;
        }
        .info_btn{
            margin: 50px auto 0;
            width: 150px;
            height: 50px;
            line-height: 50px;
            color: #fff;
            font-size: 24px;
            font-weight: bold;
            text-shadow: -1px 0 5px #622804,
                        0 1px 5px #622804,
                        1px 0 5px #622804,
                        0 -1px 5px #622804;
        }
    }
}
.notice_info{
    position: absolute;
    top: 260px;
    width: 100%;
    color: #fff;
    .content_text{
        width: 100%;
        height: 620px;
        box-sizing: border-box;
        padding-bottom: 50px;
        overflow-y: scroll;
    }
    .notice_off{
        position: absolute;
        top: 0;
        right: 20px;
        width: 80px;
        height: 80px;
    }
    .notice_bg{
        width: 700px;
    }
    .notice_content{
        position: absolute;
        left: 80px;
        top: 120px;
        width: 600px;
        height: 650px;
        color: #835536;
    }
}
.chookMask{
    position: absolute;
    top: 400px;
    width: 100%;
    color: #fff;
    .chook_off{
        position: absolute;
        top: 20px;
        right: 50px;
        width: 80px;
        height: 80px;
    }
    .chook_bg{
        width: 700px;
    }
    .chook_title{
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        margin: auto;
        width: 200px;
        text-shadow: -1px 0 5px #622804,
                        0 1px 5px #622804,
                        1px 0 5px #622804,
                        0 -1px 5px #622804;
    }
    .chook_item{
        display: block;
        position: absolute;
        top: 120px;
        left: 0;
        right: 0;
        margin: auto;
        width: 525px;
        height: 120px;
        text-align: left;
        padding-left: 200px;
        padding-top: 20px;
        box-sizing: border-box;
        background: url('/static/images/farm/chookitem.png') no-repeat;
        background-size: contain;
        .item_index{
            position: absolute;
            left: 92px;
            top: 22px;
            color: #4a1901;
        }
    }
    .chook_no{
        position: absolute;
        top: 150px;
        left: 0;
        right: 0;
        margin: auto;
        color: #ff976a;
        img{
            margin-bottom: 20px;
            width: 160px;
        }
    }
}
.chookMask .chook_item:nth-of-type(3){
    top: 250px;
}
.chookMask .chook_item:nth-of-type(4){
    top: 380px;
}
.fodder{
    position: absolute;
    top: 400px;
    width: 100%;
    color: #fff;
    .fodder_off{
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        width: 80px;
        height: 80px;
    }
    .fodder_bg{
        width: 700px;
    }
}
.wallet{
    margin: 5vh 24px 0;
    background: url('/static/images/farm/wallet2.png') no-repeat;
    background-size: contain;
    width: 702px;
    height: 1180px;
    padding-top: 40px;
    padding-bottom: 40px;
    box-sizing: border-box;
    overflow-y: scroll;
    .wallet_off{
        position: absolute;
        top: 50px;
        right: 15px;
        width: 80px;
        height: 80px;
    }
    .wallet_item{
        margin-left: 25px;
        margin-bottom: 10px;
        width: 640px;
        height: 260px;
        border: 4px solid #e3ac31; 
        border-radius: 10px;
        // background: url('/static/images/farm/walletitem.png') no-repeat;
        // background-size: contain;
        .item_title{
            margin-bottom: 20px;
            line-height: 40px;
            font-size: 26px;
            color: #a53c0c;
        }
        .item_val{
            margin: 20px auto;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 354px;
            height: 64px;
            line-height: 64px;
            font-size: 30px;
            color: #a23403;
            border: 4px solid #c17b2a;
            border-radius: 100px;
            box-shadow: 0 2px 5px #000; 
            img{
                margin: 0 10px;
                width: 55px;
            }
        }
        .item_btns{
            display: flex;
            justify-content: space-between;
            padding: 0 50px;
            .btn{
                width: 152px;
                height: 52px;
                border: 2px solid #a23403;
                border-radius: 100px;
                line-height: 52px;
                color: #a53c0c;
            }
            // .btn1{
            //     background: url('/static/images/farm/btn1.png') no-repeat;
            //     background-size: contain;
            // }
            // .btn2{
            //     background: url('/static/images/farm/btn2.png') no-repeat;
            //     background-size: contain;
            // }
            // .btn3{
            //     background: url('/static/images/farm/btn3.png') no-repeat;
            //     background-size: contain;
            // }
        }
    }
}
.accounts{
    position: relative;
    margin: 20vh 24px 0;
    background: url('/static/images/farm/accounts.png') no-repeat;
    background-size: contain;
    width: 702px;
    height: 1180px;
    padding-top: 24px;
    color: #a23403;
}
.accounts_off{
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    height: 60px;
}
.accounts_title{
    line-height: 80px;
}
.accounts_value{
    margin: 20px auto 20px;
    width: 400px;
    line-height: 75px;
    display: flex;
    align-items: center;
    font-size: 36px;
    img{
        margin: 10px 15px;
        width: 80px;
    }
    .png{
        margin: 10px 15px;
        width: 60px;
    }
}
.accounts_label{
    display: block;
    margin: 20px auto 0;
    width: 600px;
    height: 80px;
    line-height: 80px;
    text-align: left;
    text-indent: 30px;
    border-top: 2px solid #c4ad94;
    border-left: 2px solid #c4ad94;
    background: #f4e8bb;
    span{
        display: inline-block;
        width: 200px;
        text-align:justify;
    }
    input{
        color: #151515;
    }
}
.give_radio{
    float: left;
    margin: 0 0 0 50px;
    .van-radio{
        height: 60px;
    }
}
.accounts_btn{
    margin: 54px auto 0;
    width: 150px;
    height: 54px;
    color: #fff;
    line-height: 54px;
    text-shadow: -1px 0 5px #622804,
                0 1px 5px #622804,
                1px 0 5px #622804,
                0 -1px 5px #622804;
}
.detail{
    position: relative;
    margin: 5vh 24px 0;
    background: url('/static/images/farm/detail.png') no-repeat;
    background-size: contain;
    width: 702px;
    height: 1180px;
    padding-top: 24px;
}
.detail_off{
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    height: 60px;
}
.detail_title{
    line-height: 80px;
}
.detail_content{
    margin-left: 15px;
    width: 660px;
    height: 1020px;
    overflow-y: scroll;
    line-height: 120px;
}
.detail_item{
    width: 660px;
    height: 120px;
    color: #151515;
    background: #ffe79e;
}
.detail_item:nth-of-type(2n){
    background: #f3da8e;
}
.item_left{
    float: left;
    padding-top: 20px;
    width: 50%;
    text-align: left;
    text-indent: 20px;
    line-height: 40px;
}
.item_right{
    float: left;
    width: 50%;
    padding-right: 40px;
    box-sizing: border-box;
    text-align: right;
}
</style>