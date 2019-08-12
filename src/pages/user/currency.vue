<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="币" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
            <!-- 右侧按钮 -->
			<!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
		</TopHeader>
        <div class="currency">
            <router-link to="currency_convert">
                <span>50</span>
                个<van-icon name="arrow"/>
            </router-link>
        </div>
        <div class="currency_option">
            <div class="option_item">
                <router-link to="#">
                    赠送记录
                    <div class="option_icon">
                        <van-icon name="arrow"/>
                    </div>
                </router-link>
            </div>
            <div class="option_item">
                <router-link to="#">
                    兑换记录
                    <div class="option_icon">
                        <van-icon name="arrow"/>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'currency'
    }
</script>

<style lang="scss" scoped>
.currency{
    width: 100%;
    height: 300px;
    line-height: 300px;
    background: red;
}
.currency span{
    font-size: 60px;
}
.currency_option{
  width: 100%;
  padding: 5px 0;
  margin: 40px 0 100px;
  background: #f5f5f5;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.option_item{
  position: relative;
  border-top: 1px solid #ccc;
  width: 100%;
  height: 150px;
  line-height: 150px;
  text-align: left;
  text-indent: 60px;
  background: #fff;
}
.option_item:nth-last-of-type(1){
  border-bottom: 1px solid #ccc;
}
.option_icon{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 20px;
  margin: auto;
}
.van-icon{
  vertical-align: middle;
}
</style>