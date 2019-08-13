<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
        <TopHeader back-url="" custom-title="中奖记录" :custom-fixed="true" custom-rgb custom-col>
            <!-- 返回按钮 -->
            <i slot="backBtn" class="iconfont iconfanhui"></i>
            <!-- 右侧按钮 -->
            <!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
        </TopHeader>
        <div class="prize">
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
.prize_title li,.prize_item li{
    float: left;
    width: 50%;
    border-bottom: 1px solid #ccc;
}
.prize_title li{
    line-height: 80px;
}
.prize_item li{
    line-height: 120px;
}
</style>