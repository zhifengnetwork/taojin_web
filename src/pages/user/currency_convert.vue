<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="兑换" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
            <!-- 右侧按钮 -->
			<!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
		</TopHeader>
    </div>
</template>

<script>
    export default {
        name:'currency_convert'
    }
</script>

<style lang="scss" scoped>

</style>