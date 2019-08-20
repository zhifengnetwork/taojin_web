<template>
    <div class="height-88 my_team">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="团队列表" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="team_tab">
            <ul>
                <li v-for="(item,index) in tab" :key="index" @click="team_tab(index)" :class="active==index?'active':''">{{item.text}}</li>
            </ul>
        </div>
        <div class="team_wrap">
            <div class="team_content" v-if="active==0">
                <div class="team_item">
                    <div class="team_name">
                        二小姐
                    </div>
                    <div class="team_mobile">
                        <img class="team_img" src="static/images/team_mobile.png">
                        <span>13344445555</span>
                    </div>
                    <div class="team_id">
                        ID:12138
                    </div>
                    <div class="team_btn" @click="mask_show">
                        查看
                    </div>
                </div>
                <div class="team_item">
                    <div class="team_name">
                        二小姐
                    </div>
                    <div class="team_mobile">
                        <img class="team_img" src="static/images/team_mobile.png">
                        <span>13344445555</span>
                    </div>
                    <div class="team_id">
                        ID:12138
                    </div>
                    <div class="team_btn" @click="mask_show">
                        查看
                    </div>
                </div>
                <div class="team_item">
                    <div class="team_name">
                        二小姐
                    </div>
                    <div class="team_mobile">
                        <img class="team_img" src="static/images/team_mobile.png">
                        <span>13344445555</span>
                    </div>
                    <div class="team_id">
                        ID:12138
                    </div>
                    <div class="team_btn" @click="mask_show">
                        查看
                    </div>
                </div>
            </div>
            <div class="team_content" v-if="active!=0">
                <div class="team_item">
                    <div class="team_name">
                        二小姐
                    </div>
                    <div class="team_mobile">
                        <img class="team_img" src="static/images/team_mobile.png">
                        <span>13344445555</span>
                    </div>
                    <div class="team_id">
                        ID:12138
                    </div>
                    <div class="team_btn" @click="mask_show">
                        查看
                    </div>
                </div>
            </div>
            <div class="team_mask" v-show="show">
                <div class="mask_content">
                    <div class="mask_title">
                        查看订单
                        <div class="mask_imgWrap" @click="mask_show">
                            <img class="mask_img" src="static/images/team_back.png">
                        </div>
                    </div>
                    <div class="mask_item">
                        下单时间:20190405 订单号:14567895464 金额:500
                    </div>
                    <div class="mask_item">
                        下单时间:20190405 订单号:14567895464 金额:500
                    </div>
                    <div class="mask_item">
                        下单时间:20190405 订单号:14567895464 金额:500
                    </div>
                    <div class="mask_item">
                        下单时间:20190405 订单号:14567895464 金额:500
                    </div>
                    <div class="mask_item">
                        下单时间:20190405 订单号:14567895464 金额:500
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'my_team',
        data(){
            return{
                tab:[
                    {text:'直推会员(50)'},
                    {text:'其他会员(111)'}
                ],
                active:'0',
                show:false
            }
        },
        methods:{
            team_tab(index){
                this.active = index;
            },
            mask_show(){
                this.show = !this.show;
            }
        }
    }
</script>

<style lang="scss" scoped>
.my_team{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    color: #4a1901;
    background: url('../../../static/images/my_team_bg.png');
    background-size: contain;
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
    background: url('../../../static/images/withdraw_bill.png')no-repeat;
    background-size: contain;
}
.team_wrap{
    margin: 0 auto;
    width: 702px;
    height: 1040px;
    overflow-y: scroll;
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
    background: url('../../../static/images/team_item.png')no-repeat;
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
    float: right;
    margin-top: 18px;
    margin-right: 34px;
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
    width: 100vw;
    height: 100vh;
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
    background: url('../../../static/images/my_team.png')no-repeat;
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
.mask_item{
    line-height: 85px;
    background: #ffeccf;
}
.mask_item:nth-of-type(2n){
    background: #ffdab5;
}
</style>