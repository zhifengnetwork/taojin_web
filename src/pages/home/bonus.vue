<template>
    <div class="height-88 bonus">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title=" " :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="bonus_title">
            <img class="title_img" src="static/images/bonus_title.png">
        </div>
        <div class="bonus_time">
            <div class="bonus_price">
                <span>{{bonus.integral_num}}</span>元
            </div>
            <p class="bonus_text">开奖时间 {{bonus.data_time}}</p>
            <p class="start_time">
                <span>{{time[0]}}</span>:
                <span>{{time[1]}}</span>:
                <span>{{time[2]}}</span>
            </p>
        </div>
        <div class="time_slot">
            <div class="slot_title">
                购买时间段
            </div>
            <div class="slot_item" :class="active==index?'active':''" v-for="(item,index) in slot_item" :key="index" @click="slot_type(index)">
                {{item}}
            </div>
            <div class="slot_price">
                共计 <span v-if="active==0">{{item_price*60*1}}</span>
                <span v-if="active==1">{{item_price*60*2}}</span>
                <span v-if="active==2">{{item_price*60*4}}</span>
                <span v-if="active==3">{{item_price*60*6}}</span>
                <span v-if="active==4">{{item_price*60*24-item_price}}</span>
            </div>
            <div class="slot_btn" @click="send">
                确认购买
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'bonus',
        data(){
            return {
                bonus:'',
                time:'',
                item_price:'',
                active:0,
                slot_item:['1小时','2小时','4小时','6小时','24小时'],
                flag:true
            }
        },
        mounted(){
            this.bonus = JSON.parse(this.$route.query.bonus);
            this.item_price = this.$route.query.price;
            this.time = this.bonus.open_time.split(':');
            console.log(this.item_price)
        },
        methods:{
            slot_type(index){
                this.active = index;
            },
            send(){
                let type = null;
                if(!this.flag){
                    Toast('交易进行中,请稍等!')
                }
                this.flag = false;
                switch(this.active){
                    case 0:
                        type = 1;
                        break;
                    case 1:
                        type = 2;
                        break;
                    case 2:
                        type = 4;
                        break;
                    case 3:
                        type = 6;
                        break;
                    case 4:
                        type = 24;
                        break;
                }
                let _this = this;
                this.$axios.post('ranking/order_time_slot',{
                    token:localStorage.getItem('token'),
                    type:type
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        Toast.success('购买成功');
                        _this.flag = true;
                        _this.$router.push('Home');
                    }else{
                        Toast(res.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.bonus{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: #4a1901;
    background: url("../../../static/images/bonus.png") no-repeat;
    background-size: cover;
}
.bonus_title{
    margin: 0 auto;
    width: 190px;
    height: 90px;
}
.title_img{
    width: 100%;
    height: 100%;
}
.bonus_time{
    width: 100%;
    height: 400px;
}
.bonus_text{
    color: #023661;
    line-height: 40px;
}
.start_time{
    margin-top: 20px;
    font-size: 32px;
    color: #fff;
}
.start_time span{
    display: inline-block;
    margin: 0 20px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
    color: #023661;
    background: #fff;
}
.bonus_price{
    margin: 20px auto;
    color: #ffeb0b;
}
.bonus_price span{
    font-size: 60px;
}
.time_slot{
    position: relative;
    margin:100px auto 0;
    width:702px;
    height:610px;
    padding-top:20px;
    border:4px solid #c17b2a;
    background:#ffe4b8;
    border-radius:10px;
    box-sizing:border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.slot_title{
    position: absolute;
    left:0;
    right:0;
    top:-66px;
    margin:auto;
    width:200px;
    height:66px;
    line-height: 66px;
    color:#4a1901;
    border:4px solid #c17b2a;
    background:#ffe4b8;
    border-radius:10px;
    box-sizing:border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.slot_item{
    margin:10px auto;
    width:650px;
    height:70px;
    line-height: 70px;
    color:#151515;
    border-top: 2px solid #d7d6d5;
    border-left: 2px solid #d7d6d5;
    background: #ffffff;
}
.active{
    color: #4a1901;
    border-color: #d79a54;
    background: #ffb764;
}
.slot_price{
    color: #f20909;
    font-size: 36px;
}
.slot_btn{
    margin: 20px auto 0;
    width: 140px;
    height: 65px;
    line-height: 65px;
    color: #fff;
    font-size: 28px;
    background: url('../../../static/images/sugar_btn.png') no-repeat;
    background-size: contain;
}
</style>