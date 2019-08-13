<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="奖金池" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
            <!-- 右侧按钮 -->
			<!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
		</TopHeader>
        <div class="bonus_time">
            <div class="bonus_price">
                <span>542</span>元
            </div>
            <p class="bonus_text">开奖时间</p>
            <p class="bonus_text">2019-07-26</p>
            <p class="bonus_text">
                <span>12</span>:
                <span>00</span>:
                <span>00</span>
            </p>
        </div>
        <div class="bonus_rank">
            <div class="rank_title">
                排行
            </div>
            <div class="rank_list">
                <ul class="list_title">
                    <li>排序</li>
                    <li>ID</li>
                    <li>用户名称</li>
                    <li>数量</li>
                    <li>金额</li>
                </ul>
                <ul class="list_item">
                    <li>1</li>
                    <li>20190725 14:25:32</li>
                    <li>二小姐</li>
                    <li>45</li>
                    <li>766</li>
                </ul>
                <ul class="list_item">
                    <li>1</li>
                    <li>20190725 14:25:32</li>
                    <li>二小姐</li>
                    <li>45</li>
                    <li>766</li>
                </ul>
                <ul class="list_item">
                    <li>1</li>
                    <li>20190725 14:25:32</li>
                    <li>二小姐</li>
                    <li>45</li>
                    <li>766</li>
                </ul>
                <ul class="list_item">
                    <li>1</li>
                    <li>20190725 14:25:32</li>
                    <li>二小姐</li>
                    <li>45</li>
                    <li>766</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'bonus'
    }
</script>

<style lang="scss" scoped>
.bonus_time{
    width: 100%;
    height: 400px;
    background: red;
}
.bonus_text{
    line-height: 40px;
}
.bonus_text span{
    margin: 0 20px;
}
.bonus_price{
    padding-top: 100px;
    margin-bottom: 20px;
}
.bonus_price span{
    font-size: 60px;
}
.rank_title{
    position: relative;
    line-height: 120px;
}
.rank_title::before{
    content:'';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 40px;
    margin: auto;
    width: 200px;
    height: 1px;
    background: #ccc;
}
.rank_title::after{
    content:'';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    width: 200px;
    height: 1px;
    background: #ccc;
}
.list_title li{
    background: #f5f5f5;
}
.list_title li,.list_item li{
    float: left;
    width: 15%;
    line-height: 80px;
}
.list_title li:nth-of-type(2),.list_item li:nth-of-type(2){
    width: 40%;
}
</style>