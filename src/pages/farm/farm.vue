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
                    <img class="user_icon" src="/static/images/farm/egg.png">{{user_info.egg_num}}
                </span>
            </div>
        </div>
        <div class="notice" @click="notice_off">
            <h3>公告</h3>
            <span>{{user_info.notice}}</span>
        </div>
        <div class="tips">
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
                    <div class="info_price" v-if="paytype == 1 && itemtype == 1">50</div>
                    <div class="info_price" v-if="paytype == 2 && itemtype == 1">100</div>
                    <div class="info_price" v-if="paytype == 1 && itemtype == 2">120</div>
                    <div class="info_price" v-if="paytype == 2 && itemtype == 2">200</div>
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
                <img class="notice_bg" src="/static/images/farm/notice.png">
                <div class="notice_content">
                    {{user_info.notice}}
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
                    <div class="item_title">
                       <img src="/static/images/farm/wallet-icon.png">余额
                    </div>
                    <p class="item_val">{{user_info.recharge_balance}}</p>
                    <div class="item_btns">
                        <div class="btn btn1">
                            转账
                        </div>
                        <div class="btn btn2">
                            明细
                        </div>
                    </div>
                </div>
                <div class="wallet_item">
                    <div class="item_title">
                       <img src="/static/images/farm/wallet-1.png">金沙
                    </div>
                    <p class="item_val">{{user_info.chicken_balance}}</p>
                    <div class="item_btns">
                        <div class="btn btn1">
                            转账
                        </div>
                        <div class="btn btn2">
                            明细
                        </div>
                    </div>
                </div>
                <div class="wallet_item">
                    <div class="item_title">
                       <img src="/static/images/farm/wallet-icon.png">收益
                    </div>
                    <p class="item_val">{{user_info.egg_num}}</p>
                    <div class="item_btns">
                        <div class="btn btn1">
                            转账
                        </div>
                        <div class="btn btn3">
                            转账
                        </div>
                        <div class="btn btn2">
                            明细
                        </div>
                    </div>
                </div>
                <div class="wallet_item">
                    <div class="item_title">
                       <img src="/static/images/farm/wallet-2.png">糖果
                    </div>
                    <p class="item_val">{{user_info.chicken_integral}}</p>
                    <div class="item_btns">
                        <div class="btn btn1">
                            转账
                        </div>
                        <div class="btn btn2">
                            明细
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 红包 -->
        <div class="package">
            <div class="red-package-contain">
                <img src="/static/images/farm/hongbao.png" :class="getClass()" :style="getStyle()" v-for="item in count" :key="item" @webkitAnimationIteration='iterationEvent(item, $event)'>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'farm',
        props: {
            count: {
                type: Number,
                default: 30
            },
            minSize: {
                type: Number,
                default: 30
            },
            maxSize: {
                type: Number,
                default: 100
            }
        },
        data(){
            return{
                chookMask:false,
                chookIndex:'',
                feed:false,
                flag:false,
                pay:false,
                paytype:'',
                itemtype:'',
                num:1,
                fodder:false,
                wallet:false,
                notice:false,
                notice:false,
                user_info:'',
                list:[],
                chicken:'',
                robStatus:'',
                active:'1',
                pages:1,
                tab:[],
                tabpages:1,
            }
        },
        mounted(){
            this.initalize();
            this.chookList();
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
                if(index == 2){
                    let _this = this;
                    this.$axios.post('farm/purchase',{
                        'page':_this.tabpages,
                    })
                    .then(function(res){
                        console.log(res.data);
                        _this.tab = [];
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
                                _this.chookList();
                                _this.pay = !_this.pay;
                                _this.flag = !_this.flag;
                            }, 1000);
                        }
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
                                _this.chookList();
                                _this.pay = !_this.pay;
                                _this.flag = !_this.flag;
                            }, 3000);
                        }
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
                            _this.feed = false;
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
                        _this.fodder = !this.fodder;
                        _this.robStatus = res.data.data;
                        _this.$forceUpdate();
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            wallet_off(){
                this.wallet = !this.wallet;
            },
            notice_off(){
                this.notice = !this.notice;
            },
            page(e){
                if(e.target.scrollTop+e.target.offsetHeight>=e.target.scrollHeight-5){
                    this.pages++;
                    this.chookList();
                }
            },
            tabpage(e){
                if(e.target.scrollTop+e.target.offsetHeight>=e.target.scrollHeight-5){
                    this.tabpages++;
                    this.buy_tab(2);
                }
            },
            iterationEvent (item, $event) {
                $event.target.style.cssText = this.getStyle()
            },
            getClass () {
                return `hb-item hbsd-${Math.floor(Math.random() * 50 + 30)}`
            },
            getStyle () {
                return `width:${Math.random() * (this.maxSize - this.minSize) + this.minSize}px;left:${Math.random() * 74 + 10}%`
            }
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
        padding-right: 20px;
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
    position: absolute;
    top: 284px;
    left: 0;
    right: 0;
    margin: auto;
    color: #eea146;
    span{
        font-size: 20px;
    }
}
.tips{
    position: absolute;
    top: 290px;
    right: 94px;
    color: #eea146;
    font-size: 20px;
}
.chook{
    position: absolute;
    top: 384px;
    left: 70px;
    width: 620px;
    height: 632px;
    overflow-y: scroll;
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
.mask,.fodder_wrap,.wallet_wrap,.notice_mask,.package{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
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
            border-bottom: 2px dashed#ff9c1b;
            li{
                float: left;
                width: 20%;
            }
            li:nth-of-type(3){
                width: 40%;
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
    background: url('/static/images/farm/wallet.png') no-repeat;
    background-size: contain;
    width: 702px;
    height: 1180px;
    padding-top: 70px;
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
        border-radius: 10px;
        background: url('/static/images/farm/walletitem.png') no-repeat;
        background-size: contain;
        .item_title{
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 60px;
            font-size: 26px;
            color: #fff;
            img{
                margin-right: 10px;
                width: 55px;
            }
        }
        .item_val{
            line-height: 100px;
            color: #a23403;
            font-size: 30px;
        }
        .item_btns{
            display: flex;
            justify-content: space-between;
            padding: 0 50px;
            .btn{
                width: 152px;
                height: 52px;
                line-height: 52px;
                color: #fff;
                text-shadow: -1px 0 5px #622804,
                        0 1px 5px #622804,
                        1px 0 5px #622804,
                        0 -1px 5px #622804;
            }
            .btn1{
                background: url('/static/images/farm/btn1.png') no-repeat;
                background-size: contain;
            }
            .btn2{
                background: url('/static/images/farm/btn2.png') no-repeat;
                background-size: contain;
            }
            .btn3{
                background: url('/static/images/farm/btn3.png') no-repeat;
                background-size: contain;
            }
        }
    }
}
.hb-item{
  position: absolute;
  top: 0;
  z-index: 30000;
  cursor: pointer;
}
/////////////////////////////////
@keyframes startHB {
  0% {
    transform: translateY(-300px);
    -ms-transform:translateY(-300px);
    -webkit-transform:translateY(-300px);
  }
  100% {
    transform: translateY(100vh);
    -ms-transform:translateY(100vh);
    -webkit-transform:translateY(100vh);
  }
}
@keyframes chandou{
    0%{margin-left:-120px}
    50%{margin-left:0px}
    100%{margin-left:120px}
}

$total: 100;
@for $i from 1 through $total {
  .hbsd-#{$i}{
      animation: startHB #{$i/20}s linear infinite,chandou #{$i/20}s infinite linear alternate both;
      -ms-animation:startHB #{$i/20}s linear infinite,chandou #{$i/20}s infinite linear alternate both;
      -webkit-animation:startHB #{$i/20}s linear infinite,chandou #{$i/20}s infinite linear alternate both;
    }
}
/////////////////////////////////
</style>