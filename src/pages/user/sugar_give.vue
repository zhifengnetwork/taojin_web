<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="赠送" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
            <!-- 右侧按钮 -->
			<!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
		</TopHeader>
        <div class="sugar_num">
            我的糖果:50
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
</template>

<script>
    export default {
        name:'sugar_give'
    }
</script>

<style lang="scss" scoped>
.sugar_num{
    text-align: left;
    text-indent: 24px;
    line-height: 100px;
}
.give_inp{
    margin: 40px auto;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: left;
    text-indent: 24px;
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
    border: 2px solid #ccc; 
}
.give_i{
    display: inline-block;
    width: 50px;
}
.give_btn{
    margin: 200px auto 0;
    width: 702px;
    height: 100px;
    line-height: 100px;
    border-radius: 20px;
    background: skyblue;
}
</style>