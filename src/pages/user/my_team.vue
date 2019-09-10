<template>
    <div class="height-88 my_team">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="团队列表" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/head_back.png">
		</TopHeader>
        <div class="team_tab">
            <ul>
                <li v-for="(item,index) in tab" :key="index" @click="team_tab(index)" :class="active==index?'active':''">{{item.text}}</li>
            </ul>
        </div>
        <div class="team_wrap">
            <div class="team_content" v-if="active==0">
                <div class="team_item" v-for="(item,index) in team" :key="index">
                    <div class="team_name">
                        {{item.nick_name}}
                    </div>
                    <div class="team_mobile">
                        <img class="team_img" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/team_mobile.png">
                        <span>{{item.phone}}</span>
                    </div>
                    <!-- <div class="team_id">
                        ID:{{item.id}}
                    </div> -->
                    <div class="team_btn" @click="mask_show(item.id)">
                        查看
                    </div>
                </div>
                <Null style="margin-top:-120px;" text="团队" v-if="flag"></Null>
            </div>
            <div class="team_content" v-if="active!=0">
                <div class="team_item" v-for="(item,index) in team" :key="index">
                    <div class="team_name">
                        {{item.nick_name}}
                    </div>
                    <div class="team_mobile">
                        <img class="team_img" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/team_mobile.png">
                        <span>{{item.phone}}</span>
                    </div>
                    <!-- <div class="team_id">
                        ID:{{item.id}}
                    </div> -->
                    <div class="team_btn" @click="mask_show(item.id)">
                        查看
                    </div>
                </div>
                <Null style="margin-top:-120px;" text="团队" v-if="flag"></Null>
            </div>
            <div class="team_mask" v-show="show">
                <div class="mask_content">
                    <div class="mask_title">
                        查看订单
                        <div class="mask_imgWrap" @click="mask_show">
                            <img class="mask_img" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/team_back.png">
                        </div>
                    </div>
                    <div class="item_wrap" @scroll="page">
                        <div class="mask_item" v-for="(item,index) in team_order" :key="index">
                            <span>下单时间:<br />{{item.add_time}}</span>
                            <span>订单号:{{item.id}}</span>
                            <span>金额:{{item.money}}</span>
                        </div>
                    </div>
                    <Null style="margin-top:-120px;" text="订单" v-if="flag1"></Null>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'my_team',
        data(){
            return{
                tab:[
                    {text:'直推会员'},
                    {text:'其他会员'}
                ],
                active:'0',
                show:false,
                team:'',
                team_order:[],
                flag:false,
                flag1:false,
                pages:1,
                user_id:''
            }
        },
        mounted(){
            this.initalize(0);
        },
        methods:{
            initalize(is_direct){
                let _this = this;
                this.$axios.post('team/team_list',{
                    token:localStorage.getItem('token'),
                    is_direct:is_direct,
                    page:_this.pages
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        _this.team = res.data.data.data;
                        if(is_direct==0){
                            _this.tab[is_direct].text = '直推会员('+res.data.data.count+')' 
                        }else{
                            _this.tab[is_direct].text = '其他会员('+res.data.data.count+')' 
                        }
                        if(res.data.data.data==''&&_this.pages==1){
                            _this.flag = true;
                        }
                    }else{
                        Toast(res.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            team_tab(index){
                this.active = index;
                this.flag = false;
                this.pages = 1;
                this.team = '';
                this.initalize(index);
            },
            mask_show(user_id,page){
                if(!page){
                    this.show = !this.show;
                    this.pages = 1;
                    this.team_order = [];
                }
                this.user_id = user_id;
                if(!this.show){
                    return false;
                }
                let _this = this;
                this.$axios.post('team/team_rank_list',{
                    token:localStorage.getItem('token'),
                    user_id:user_id,
                    page:_this.pages
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        for(let i=0;i<res.data.data.length;i++){
                            _this.team_order.push(res.data.data[i]);
                        }
                        if(res.data.data==''&&_this.pages==1){
                            _this.flag1 = true;
                        }
                    }else{
                        Toast(res.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            page(e){
                if(e.target.scrollTop+e.target.offsetHeight>=e.target.scrollHeight-5){
                    this.pages++;
                    this.mask_show(this.user_id,true);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.my_team{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #4a1901;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; 
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/my_team_bg.png') no-repeat;
    background-size: cover;
}
.active{
    opacity: 1 !important;
    color: #7d4e2a;
}
.team_tab{
    margin-top: 90px;
    padding: 0 22px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.team_tab li{
    float: left;
    opacity: 0.5;
    width: 200px;
    height: 60px;
    line-height: 60px;
    margin-right: 10px;
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/withdraw_bill.png')no-repeat;
    background-size: contain;
}
.team_wrap{
    margin: 0 auto;
    width: 702px;
    height: 1040px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; 
    padding: 10px;
    border: 4px solid #c17b2a;
    border-radius: 5px;
    background: #ffc787;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.team_item{
    position: relative;
    margin: 10px 0;
    width: 100%;
    height: 126px;
    color: #fff;
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/team_item.png')no-repeat;
    background-size: contain;
}
.team_name{
    float: left;
    margin-top: 4px;
    width: 170px;
    height: 54px;
    line-height: 54px;
    color: #8d4928;
}
.team_mobile{
    padding-top: 70px;
    text-align: left;
    text-indent: 20px;
}
.team_img{
    width: 40px;
    height: 40px;
    vertical-align: middle;
}
.team_id{
    float: left;
    width: 50%;
    line-height: 60px;
    text-align: left;
    text-indent: 30px;
}
.team_btn{
    position: absolute;
    right: 34px;
    bottom: 15px;
    width: 140px;
    height: 50px;
    line-height: 50px;
    background: #856138;
    border-radius: 100px;
}
.team_mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 30;
}
.mask_content{
    position: absolute;
    top: 128px;
    left: 25px;
    width: 702px;
    height: 1180px;
    border: 4px solid #f8c790;
    border-radius: 10px;
    background: #ffe8c5;
}
.mask_title{
    position: relative;
    width: 100%;
    height: 80px;
    line-height: 80px;
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/my_team.png')no-repeat;
    background-size: cover;
}
.mask_imgWrap{
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100%;
}
.mask_img{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
}
.item_wrap{
    width:100%;
    height:90%;
    overflow-y:scroll;
}
.mask_item{
    line-height: 110px;
    height: 110px;
    background: #ffeccf;
}
.mask_item:nth-of-type(2n){
    background: #ffdab5;
}
.mask_item span{
    float:left;
    width:32%;
    height: 100%;
}
.mask_item span:nth-of-type(1){
    line-height: 55px;
}
</style>