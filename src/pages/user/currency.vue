<template>
    <div class="height-88 public_bg">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="币" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="currency">
            <img class="currency_img" src="static/images/currency.png">
            <span>50</span>
        </div>
        <div class="currency_btn">
            <div class="btn_item">
                <router-link to="currency_convert">
                    兑换
                </router-link>
            </div>
            <div class="btn_item">
                <router-link to="currency_give">
                    赠送
                </router-link>
            </div>
            <div class="btn_item">
                <router-link to="currency_sell">
                    挂卖
                </router-link>
            </div>
        </div>
        <div class="currency_option">
            <div class="option_item">
                <router-link to="#">
                    赠送记录<van-icon name="arrow"/>
                </router-link>
            </div>
            <div class="option_item">
                <router-link to="#">
                    兑换记录<van-icon name="arrow"/>
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
    margin: 20px auto;
    width: 702px;
    height: 220px;
    line-height: 220px;
    color: #fff;
    background: #ffc787;
    border:4px solid #c17b2a;
    border-radius: 20px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    text-shadow: -1px 0 5px #622804,
            0 1px 5px #622804,
            1px 0 5px #622804,
            0 -1px 5px #622804;
}
.currency_img{
    width: 80px;
    height: 66px;
}
.currency span{
    font-size: 48px;
    font-weight: bold;
}
.currency_btn{
    margin: 40px;
    height: 65px;
}
.btn_item{
    float: left;
    margin: 0 40px;
    width: 140px;
    height: 65px;
    line-height: 65px;
    font-size: 28px;
    background: url('../../../static/images/sugar_btn.png')no-repeat;
    background-size: contain;
}
.btn_item a{
    color: #fff;
}
.option_item{
  margin: 40px auto;
  width: 702px;
  height: 80px;
  line-height: 72px;
  text-align: left;
  text-indent: 30px;
  background: #be7d43;
  border-radius: 20px;
  border: 4px solid #a65421;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.option_item a{
    color: #fff;
}
.van-icon{
  text-indent: 0;
  vertical-align: text-top;
}
</style>