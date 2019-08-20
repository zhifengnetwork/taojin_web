<template>
    <div class="height-88 prize">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
        <TopHeader back-url="" custom-title="中奖记录" :custom-fixed="true" custom-rgb custom-col>
            <!-- 返回按钮 -->
            <img slot="backBtn" src="static/images/head_back.png">
            <!-- 右侧按钮 -->
            <!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
        </TopHeader>
        <div class="prize_wrap">
            <ul class="prize_title">
                <li>中奖ID</li>
                <li>手机号</li>
            </ul>
            <ul class="prize_item">
                <li>2019.07.27 18:05:23</li>
                <li>134×××××786</li>
            </ul>
            <ul class="prize_item">
                <li>2019.07.27 18:05:23</li>
                <li>134×××××786</li>
            </ul>
            <ul class="prize_item">
                <li>2019.07.27 18:05:23</li>
                <li>134×××××786</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:'prize'
    }
</script>

<style lang="scss" scoped>
.prize{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    color: #4a1901;
    background: #ffda9e;
}
.prize_wrap{
    margin: 20px auto;
    width: 702px;
    height: 1180px;
    background: #ffe4b8;
    border: 4px solid #c17b2a;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.prize_title li,.prize_item li{
    float: left;
    width: 50%;
}
.prize_title li{
    line-height: 80px;
}
.prize_item li{
    line-height: 120px;
}
</style>