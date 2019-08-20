<template>
    <div class="height-88 withdraw_wrap">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="账户提现" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
            
		</TopHeader>
        <div class="money">
            <p class="money_num">
                <img class="money_img" src="static/images/withdraw_money.png">
                214.52
            </p>
        </div>
        <div class="withdraw_content">
            <div class="type">
                <div class="type_title">选择提现方式</div>
                <div class="type_btns">
                    <img class="type_img active" src="static/images/alipay.png">
                    <img class="type_img" src="static/images/bank.png">
                    <span class="type_btn">+添加银行卡</span>
                </div>
            </div>
            <div class="alipay">
                <router-link to="withdraw_alipay">
                    输入支付宝账号
                    <div class="alipay_icon">
                        <van-icon name="arrow"/>
                    </div>
                </router-link>
            </div>
            <div class="alipay">
                <router-link to="withdraw_bank">
                    输入银行卡号
                    <div class="alipay_icon">
                        <van-icon name="arrow"/>
                    </div>
                </router-link>
            </div>
            <div class="withdraw">
                <h3 class="withdraw_title">提现金额</h3>
                <div class="withdraw_inp">
                    <input class="withdraw_input" placeholder="请输入提现金额" type="text">
                    <div class="withdraw_all">全部提现</div>
                </div>
                <div class="withdraw_tax">
                    <span class="withdraw_tax_text">手续费</span>
                    <span class="withdraw_tax_num">0.12</span>
                </div>
                <div class="withdraw_tax">
                    <span class="withdraw_tax_text">实际到账</span>
                    <span class="withdraw_tax_num">1199.88</span>
                </div>
            </div>
            <div class="withdraw_btn" @click="send">
                申请提交
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'withdraw',
        data(){
            return{
                
            }
        },
        methods:{
            send(){
                this.$router.push({name:'balance'})
            }
        }
    }
</script>

<style lang="scss" scoped>
.withdraw_wrap{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: #4a1901;
  background: #ffda9e;
  background-size: contain;
}
.money{
    width: 100%;
    height: 280px;
    background: url('../../../static/images/withdraw_bg.png') no-repeat;
    background-size: contain;
}
.money_img{
    margin-right: 15px;
    width: 80px;
    height: 80px;
    vertical-align: middle;
}
.money_num{
    line-height: 280px;
    font-size: 30px;
}
.type{
    text-align: left;
}
.type_btns{
    margin-top: 20px;
}
.type_img{
    margin: 0 20px;
    width: 54px;
    height: 54px;
    vertical-align: middle;
}
.active{
    transform: scale(1.4);
}
.type_btn{
    height: 62px;
    line-height: 62px;
    padding: 20px 30px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: 2px solid #4a1901;
    border-radius: 10px;
    background: #fff;
}
.alipay{
  position: relative;
  margin: 10px 0;
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: left;
  text-indent: 24px;
  border-bottom: 1px solid #8c3800;
}
.alipay_icon{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 20px;
  margin: auto;
}
.withdraw_content{
    margin: 20px auto;
    width: 702px;
    height: 870px;
    background: #ffe4b8;
    border: 4px solid #c17b2a;
    padding: 24px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.withdraw{
    text-align: left;
    text-indent: 24px;
}
.withdraw_title{
    line-height: 100px;
    font-weight: normal;
}
.withdraw_inp{
    margin-bottom: 20px;
    width: 100%;
    height: 100px;
    line-height: 100px;
    padding-left: 24px; 
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-bottom: 1px solid #8c3800;   
}
.withdraw_input{
    float: left;
    width: 72%;
}
.withdraw_all{
    float: left;
    width: 25%;
}
.withdraw_tax{
    margin: 20px auto;
    position: relative;
    width: 100%;
    height: 66px;
    line-height: 66px;
    text-indent: 24px;
    background: #ffedcf;
}
.withdraw_tax_num{
    float: right;
    margin-right: 60px;
}
.withdraw_tax_text{
    display: block;
    float: left;
}
.withdraw_tax_text::after{
    content:'元';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 20px;
    margin: auto;
}
.withdraw_btn{
    margin: 40px auto 0;
    width: 140px;
    height: 65px;
    line-height: 65px;
    color: #fff;
    font-size: 28px;
    background: url('../../../static/images/sugar_btn.png') no-repeat;
    background-size: contain;
}
</style>