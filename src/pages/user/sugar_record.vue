<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="赠送记录" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
            <!-- 右侧按钮 -->
			<!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
		</TopHeader>
        <div class="record_title">
            <ul>
                <li>赠送日期</li>
                <li>收款ID/手机号</li>
                <li>糖果</li>
            </ul>
        </div>
        <div class="record_content">
            <ul>
                <li>12151220</li>
                <li>45451687465631</li>
                <li>40</li>
            </ul>
            <ul>
                <li>12151220</li>
                <li>45451687465631</li>
                <li>40</li>
            </ul>
        </div>  
    </div>
</template>

<script>
    export default {
        name:'sugar_record'
    }
</script>

<style lang="scss" scoped>
.record_title{
    width: 100%;
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #ccc;
}
.record_title li,.record_content li{
    float: left;
    width: 20%;
}
.record_title li:nth-of-type(2),.record_content li:nth-of-type(2){
    width: 60%;
}
.record_content{
    width: 100%;
    height: 100px;
    line-height: 100px;
}

</style>