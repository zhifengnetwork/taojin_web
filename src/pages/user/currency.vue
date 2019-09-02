<template>
    <div class="height-88 public_bg">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="币" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="currency">
            <div class="currency_wrap">
                <img class="currency_img" src="static/images/currency.png">
                <span>{{user_info.currency}}</span>
                <p>币</p>
            </div>
            <div class="currency_wrap">
                <img class="currency_img" src="static/images/user/currency.png">
                <span>{{user_info.lock_currency}}</span>
                <p>冻结币</p>
            </div>
        </div>
        <div class="currency_btn">
            <div class="btn_item">
                <router-link to="currency_convert">
                    兑换
                </router-link>
            </div>
            <div class="btn_item">
                <router-link to="currency_give">
                    赠送
                </router-link>
            </div>
            <div class="btn_item">
                <router-link to="currency_sell">
                    挂卖
                </router-link>
            </div>
        </div>
        <div class="currency_option">
            <div class="option_item">
                <router-link to="currency_record">
                    交易明细<van-icon name="arrow"/>
                </router-link>
            </div>
        </div>
        <div class="currency_option">
            <div class="option_item">
                <span>昨日币值 {{user_info.yesterday_money}}</span>
            </div>
        </div>
         <div class="currency_option">
            <div class="option_item">
                <span>今日币值 {{user_info.currency_money}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'currency',
        data(){
            return {
                user_info:''
            }
        },
        mounted(){
            this.initalize();
        },
        methods:{
            initalize(){
                let _this = this;
                this.$axios.post('index/currency_detailed',{
                    token:localStorage.getItem('token')
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        _this.user_info = res.data.data;
                    }else{
                        Toast(res.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
.currency{
    margin: 20px auto;
    width: 702px;
    height: 220px;
    line-height: 60px;
    color: #fff;
    background: #ffc787;
    border:4px solid #c17b2a;
    border-radius: 20px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    text-shadow: -1px 0 5px #622804,
            0 1px 5px #622804,
            1px 0 5px #622804,
            0 -1px 5px #622804;
}
.currency_img{
    width: 80px;
    height: 66px;
}
.currency span{
    font-size: 48px;
    font-weight: bold;
}
.currency_btn{
    margin: 40px;
    height: 65px;
}
.currency_wrap{
    float: left;
    margin-top: 40px;
    width: 50%;
}
.btn_item{
    float: left;
    margin: 0 40px;
    width: 140px;
    height: 65px;
    line-height: 65px;
    font-size: 28px;
    background: url('../../../static/images/sugar_btn.png')no-repeat;
    background-size: contain;
}
.btn_item a{
    color: #fff;
}
.option_item{
  margin: 40px auto;
  width: 702px;
  height: 80px;
  line-height: 72px;
  text-align: left;
  padding: 0 30px;
  color: #fff;
  background: #be7d43;
  border-radius: 20px;
  border: 4px solid #a65421;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.option_item a{
    color: #fff;
}
.van-icon{
  text-indent: 0;
  vertical-align: text-top;
}
</style>