<template>
   <div class="height-88 withdraw_record">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="提现明细" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
            
		</TopHeader>
        <div class="record">
            <div class="record_title">
                <ul>
                    <li>申请日期</li>
                    <li>金额</li>
                    <li>手续费</li>
                    <li>审核状态</li>
                </ul>
            </div>
            <div class="record_info">
                <ul>
                    <li>20190521</li>
                    <li>22.3</li>
                    <li>1</li>
                    <li class="failure">审核失败</li>
                </ul>
                <ul>
                    <li>20190521</li>
                    <li>22.3</li>
                    <li>1</li>
                    <li class="succeed">审核成功</li>
                </ul>
                <ul>
                    <li>20190521</li>
                    <li>22.3</li>
                    <li>1</li>
                    <li class="failure">审核失败</li>
                </ul>
                <ul>
                    <li>20190521</li>
                    <li>22.3</li>
                    <li>1</li>
                    <li class="succeed">审核成功</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'withdraw_record'
    }
</script>

<style lang="scss" scoped>
.failure{
    color: #972700;
}
.succeed{
    color: #009720;
}
.withdraw_record{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: #4a1901;
  background: #ffda9e;
  background-size: contain;
}
.record{
    margin: 20px auto;
    width: 702px;
    height: 1180px;
    border: 4px solid #c17b2a;
    border-radius: 20px;
    background: #ffe4b8;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.record_title{
    width: 100%;
    height: 100px;
    line-height: 100px;
}
.record_title li{
    display: block;
    float: left;
    width: 25%;
}
.record_info{
    width: 100%;
    line-height: 100px;
}
.record_info li{
    display: block;
    float: left;
    width: 25%;
    background: #ffc787;
}
.record_info ul:nth-of-type(2n) li{
    background: #ffbb7e;
}
</style>