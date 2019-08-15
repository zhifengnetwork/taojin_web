<template>
    <div class="height-88 sugar_give">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="赠送" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="sugar_container">
            <div class="sugar_num">
                <img class="sugar_img" src="static/images/sugar.png">
                <span>50</span>
            </div>
            <div class="give_inp">
                <label>
                    <span>收款&nbsp;&nbsp;ID</span><input class="give_input" type="text">
                </label>
            </div>
            <div class="give_inp">
                <label>
                    <span>手机号码</span><input class="give_input" type="text">
                </label>
            </div>
            <div class="give_inp">
                <label>
                    <span>糖<i class="give_i"></i>果</span><input class="give_input" type="text">
                </label>
            </div>
            <div class="give_btn">
                确认赠送
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'sugar_give'
    }
</script>

<style lang="scss" scoped>
.sugar_give{
    width: 100vw;
    height: 100vh;
    color: #4a1901;
    background: -moz-linear-gradient(top, #fdd287 0%, #eaa050 100%);  
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fdd287), color-stop(100%,#eaa050));  
    background: -webkit-linear-gradient(top, #fdd287 0%,#eaa050 100%);  
    background: -o-linear-gradient(top, #fdd287 0%,#eaa050 100%);  
    background: -ms-linear-gradient(top, #fdd287 0%,#eaa050 100%);  
    background: linear-gradient(to bottom, #fdd287 0%,#eaa050 100%);
}
.sugar_container{
    margin: 20px auto;
    width: 702px;
    height: 710px;
    background: #ffc787;
    border: 4px solid #c17b2a;
    border-radius: 20px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.sugar_num{
    margin: 40px 0;
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    text-indent: 24px;
    line-height: 100px;
}
.sugar_img{
    margin-right: 15px;
    width: 110px;
    height: 70px;
}
.give_inp{
    margin: 40px auto;
    width: 650px;
    height: 80px;
    line-height: 80px;
    text-align: left;
    text-indent: 24px;
    background: #b38a5b;
    border-left: 1px solid#9b774e;
    border-top: 1px solid#9b774e;
}
.give_inp span{
    display: block;
    float: left;
    width: 25%;
}
.give_input{
    text-indent: 20px;
    width: 65%;
    height: 80%;
    border-radius: 20px;
}
.give_i{
    display: inline-block;
    width: 50px;
}
.give_btn{
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