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
                <span>542</span>元
            </div>
            <p class="bonus_text">开奖时间 2019-07-26</p>
            <p class="start_time">
                <span>12</span>:
                <span>00</span>:
                <span>00</span>
            </p>
        </div>
        <div class="bonus_rank">
            <div class="rank_title">
                排行榜
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
                    <li>2</li>
                    <li>20190725 14:25:32</li>
                    <li>二小姐</li>
                    <li>45</li>
                    <li>766</li>
                </ul>
                <ul class="list_item">
                    <li>3</li>
                    <li>20190725 14:25:32</li>
                    <li>二小姐</li>
                    <li>45</li>
                    <li>766</li>
                </ul>
                <ul class="list_item">
                    <li>4</li>
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
.bonus{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    color: #4a1901;
    background: url("../../../static/images/bonus.png");
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

.bonus_rank{
    margin-top: 20px;
}
.rank_title{
    position: relative;
    line-height: 120px;
    font-size: 36px;
}
.rank_title::before{
    content:'';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 280px;
    margin: auto;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #8e8e8e;
}
.rank_title::after{
    content:'';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 280px;
    margin: auto;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #8e8e8e;
}
.rank_list{
    padding: 0 24px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.list_title li,.list_item li{
    float: left;
    width: 15%;
    line-height: 80px;
}
.list_item li{
    line-height: 120px;
    border-bottom: 1px solid #bb862d;
    
}
.list_title li:nth-of-type(2),.list_item li:nth-of-type(2){
    width: 40%;
}
.list_item:nth-of-type(2) :nth-child(1){
    background: url('../../../static/images/one.png')no-repeat;
}
.list_item:nth-of-type(3) :nth-child(1){
    background: url('../../../static/images/tow.png')no-repeat;
}
.list_item:nth-of-type(4) :nth-child(1){
    background: url('../../../static/images/three.png')no-repeat;
}
.list_item:nth-of-type(2) :nth-child(1),.list_item:nth-of-type(3) :nth-child(1),.list_item:nth-of-type(4) :nth-child(1){
    color: #fff;
    background-size: 40px;
    background-position-x: 25px;
    background-position-y: 40px;
}

</style>