<template>
    <div class="height-88 user_amendPwd">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="修改登录密码" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
            <img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="amend">
            <div class="amend_inp">
                <label>
                    <span class="amend_text">输入手机号</span><input class="amend_input" type="text">
                </label>
            </div>
            <div class="amend_inp">
                <label>
                    <span class="amend_text">输入密码</span><input class="amend_input" type="text">
                </label>
            </div>
            <div class="amend_inp">
                <label>
                    <span class="amend_text">再次输入密码</span><input class="amend_input" type="text">
                </label>
            </div>
            <div class="amend_inp">
                <label>
                    <span class="amend_text">输入验证码</span><input class="amend_input" type="text">
                    <span class="amend_code">获取验证码</span>
                </label>
            </div>
            <div class="amend_btn">
                确认
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'user_amendPwd'
    }
</script>

<style lang="scss" scoped>
.user_amendPwd{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    color: #ffd5a4;
    background: #ffda9e;
}
.amend{
    margin: 20px auto;
    width: 702px;
    height: 714px;
    background: #ffe4b8;
    border: 4px solid #c17b2a;
    border-radius: 10px;
}
.amend_inp{
    margin: 40px auto;
    width: 650px;
    height: 80px;
    line-height: 80px;
    background: #b38a5b;
    border-left: 4px solid#9b774e;
    border-top: 4px solid#9b774e;
}
.amend_text{
    display: block;
    float: left;
    text-align: left;
    text-indent: 30px;
    margin-right: 20px;
    width: 35%;
}
.amend_input{
    display: block;
    float: left;
    width: 60%;
}
.amend_inp:nth-last-of-type(2) .amend_input{
    width: 20%;
}
.amend_code{
    padding: 10px 15px;
    line-height: 44px;
    color: #4a1901;
    background: #ffda9e;
    border: 1px solid #fff;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.amend_btn{
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