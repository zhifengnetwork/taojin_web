<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="道具详情" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
            <!-- 右侧按钮 -->
			<!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
		</TopHeader>
        <div class="item_imgWrap">
            <img class="item_img" src="">
        </div>
        <div class="item_price">
            ￥20
        </div>
        <div class="item_info">
            铲子道具详细说明铲子道具详细说明铲子道具详细说明铲子道具详细说明
        </div>
        <div class="btn">
            立即购买
        </div>
    </div>
</template>

<script>
    export default {
        name:'buy_item'
    }
</script>

<style lang="scss" scoped>
.item_imgWrap{
    width: 100%;
    height: 300px;
}
.item_img{
    width: 100%;
    height: 100%;
}
.item_price{
    text-align: left;
    text-indent: 24px;
    line-height: 100px;
}
.item_info{
    text-align: left;
    padding: 0 24px;
    letter-spacing: 2px;
    line-height: 60px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.btn{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px;
    line-height: 100px;
    background: red;
}
</style>