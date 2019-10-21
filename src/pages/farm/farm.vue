<template>
    <div class="height-88 farm">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="账户金额" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/head_back.png">
		</TopHeader>
    </div>
</template>

<script>
    export default {
        name:'farm',
    }
</script>

<style lang="scss" scoped>
.farm{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #4a1901;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; 
  background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/balance_bg.png') no-repeat;
  background-size: cover;
}
</style>