<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="我的订单" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
            <!-- 右侧按钮 -->
			<!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
		</TopHeader>
        <div class="order_item">
            <h3 class="order_title">订单号201907025487445</h3>
            <div class="order_content">
                <div class="order_imgWrap">
                    <img class="order_img" src="" alt="">
                </div>
                <div class="order_info">
                    <p class="order_text">铲子</p>
                    <p class="order_text">￥888</p>
                    <div class="order_btns">
                        <span class="order_btn">删除</span>
                        <span class="order_btn">详情</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="order_item">
            <h3 class="order_title">订单号201907025487445</h3>
            <div class="order_content">
                <div class="order_imgWrap">
                    <img class="order_img" src="" alt="">
                </div>
                <div class="order_info">
                    <p class="order_text">铲子</p>
                    <p class="order_text">￥888</p>
                    <div class="order_btns">
                        <span class="order_btn">删除</span>
                        <span class="order_btn">详情</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="order_item">
            <h3 class="order_title">订单号201907025487445</h3>
            <div class="order_content">
                <div class="order_imgWrap">
                    <img class="order_img" src="" alt="">
                </div>
                <div class="order_info">
                    <p class="order_text">铲子</p>
                    <p class="order_text">￥888</p>
                    <div class="order_btns">
                        <span class="order_btn">删除</span>
                        <span class="order_btn">详情</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'my_order'
    }
</script>

<style lang="scss" scoped>
.order_item{
    margin-top: 20px;
    width: 100%;
    height: 300px;
    text-align: left;
    background: #fff;
    border-bottom: 1px solid #ccc;
}
.order_title{
    margin-left: 24px;
    line-height: 80px;
    font-weight: normal;
}
.order_content{
    margin-left: 24px;
}
.order_imgWrap{
    float: left;
    margin-right: 20px;
    width: 200px;
    height: 200px;
    background: skyblue;
}
.order_img{
    width: 100%;
    height: 100%;
}
.order_info{
    float: left;
}
.order_text{
    line-height: 50px;
}
.order_btns{
    margin: 40px 0 0 180px;
    height: 60px;
}
.order_btn{
    display: block;
    float: left;
    margin: 0 10px;
    height: 60px;
    line-height: 60px;
    padding: 0 40px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background: #e5e5e5;
    border-radius: 10px;
}
</style>