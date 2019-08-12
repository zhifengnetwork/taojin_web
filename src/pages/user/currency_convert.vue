<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" :custom-title="radio==1||radio==2?(radio==1?'兑换':'赠送'):('出售')" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
            <!-- 右侧按钮 -->
			<!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
		</TopHeader>
        <div class="convert_type">
            <van-radio-group v-model="radio">
                <van-radio name="1" checked-color="orange" >兑换</van-radio>
                <van-radio name="2" checked-color="orange" >赠送</van-radio>
                <van-radio name="3" checked-color="orange" >挂卖</van-radio>
            </van-radio-group>
        </div>
        <div class="currency_num">
            我的币:50
        </div>
        <div class="convert_inp" v-if="radio==1">
            <label class="convert_label clearfix">
                <span>糖果</span><input class="convert_input" type="number">
            </label>
        </div>
        <div class="convert_inp" v-if="radio==1">
            <label class="convert_label clearfix">
                <span>金沙</span><input class="convert_input" type="number">
            </label>
        </div>
        <div class="convert_inp" v-if="radio==2">
            <label class="convert_label clearfix">
                <span>收款id</span><input class="convert_input" type="number">
            </label>
        </div>
        <div class="convert_inp" v-if="radio==2">
            <label class="convert_label clearfix">
                <span>币</span><input class="convert_input" type="number">
            </label>
        </div>
        <div class="convert_inp" v-if="radio==3">
            <label class="convert_label clearfix">
                <span>出售</span><input class="convert_input" type="number">
            </label>
        </div>
        <div class="convert_btn">
            <span v-if="radio==1">确认兑换</span>
            <span v-if="radio==2">确认赠送</span>
            <span v-if="radio==3">确认出售</span>
        </div>
        <div class="tips" v-if="radio==1">
            注:10糖果+1金沙可兑换1个币
        </div>
    </div>
</template>

<script>
    export default {
        name:'currency_convert',
        data() {
            return {
                radio: '1'
            }
        }
    }
</script>

<style lang="scss" scoped>
.convert_type{
    width: 100%;
    height: 120px;
}
.convert_type>div>div{
    float: left;
    margin: 50px;
    margin-left: 70px;
}
.currency_num{
    text-align: left;
    text-indent: 60px;
    line-height: 100px;
}
.convert_inp{
    text-align: left;
    text-indent: 60px;
    height: 120px;
    line-height: 120px;
}
.convert_label span{
    float: left;
    display: block;
    width: 25%;
}
.convert_input{
    float: left;
    display: block;
    margin: 20px 0;
    width: 60%;
    height: 60%;
    text-indent: 20px;
    border: 2px solid #ccc;
    border-radius: 10px;
}
.convert_btn{
    margin: 200px auto 60px;
    width: 500px;
    letter-spacing: 2px;
    height: 100px;
    line-height: 100px;
    border-radius: 100px;
    background: #66ccff;
}
.tips{
    text-indent: 60px;
    text-align: left;
    color: #ff0000;
}
</style>