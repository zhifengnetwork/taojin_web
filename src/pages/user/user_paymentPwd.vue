<template>
    <div class="height-88 paymentPwd">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="设置支付密码" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
            <img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="payment">
            <div class="payment_inp">
                <label>
                    <span class="payment_text">输入手机号</span><input class="payment_input" type="text">
                </label>
            </div>
            <div class="payment_inp">
                <label>
                    <span class="payment_text">输入密码</span><input class="payment_input" type="text">
                </label>
            </div>
            <div class="payment_inp">
                <label>
                    <span class="payment_text">再次输入密码</span><input class="payment_input" type="text">
                </label>
            </div>
            <div class="payment_inp">
                <label>
                    <span class="payment_text">输入验证码</span><input class="payment_input" type="text">
                    <span class="payment_code">获取验证码</span>
                </label>
            </div>
            <div class="payment_btn">
                确认
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'user_paymentPwd'
    }
</script>

<style lang="scss" scoped>
.paymentPwd{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    color: #ffd5a4;
    background: #ffda9e;
}
.payment{
    margin: 20px auto;
    width: 702px;
    height: 714px;
    background: #ffe4b8;
    border: 4px solid #c17b2a;
    border-radius: 10px;
}
.payment_inp{
    margin: 40px auto;
    width: 650px;
    height: 80px;
    line-height: 80px;
    background: #b38a5b;
    border-left: 4px solid#9b774e;
    border-top: 4px solid#9b774e;
}
.payment_text{
    display: block;
    float: left;
    text-align: left;
    text-indent: 30px;
    margin-right: 20px;
    width: 35%;
}
.payment_input{
    display: block;
    float: left;
    width: 60%;
}
.payment_inp:nth-last-of-type(2) .payment_input{
    width: 20%;
}
.payment_code{
    padding: 10px 15px;
    line-height: 44px;
    color: #4a1901;
    background: #ffda9e;
    border: 1px solid #fff;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.payment_btn{
    text-align: center;
    margin: 80px auto 0;
    width: 140px;
    height: 65px;
    line-height: 65px;
    text-indent: 0;
    color: #fff;
    font-size: 28px;
    background: url('../../../static/images/sugar_btn.png') no-repeat;
    background-size: contain;
}
</style>