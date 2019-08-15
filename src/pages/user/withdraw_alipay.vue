<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="支付宝提现" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
            
		</TopHeader>
        <div class="alipay_inp">
            <label>
                <span class="alipay_text">支付宝账号:</span><input class="alipay_input" placeholder="请输入支付宝账号" type="text">
            </label>
        </div>
        <div class="alipay_inp">
            <label>
                <span class="alipay_text">真实姓名:</span><input class="alipay_input" placeholder="请输入真实姓名" type="text">
            </label>
        </div>
        <div class="alipay_btn" @click="send">
            确认
        </div>
    </div>
</template>

<script>
    export default {
        name:'withdraw_alipay',
        data(){
            return {
                
            }
        },
        methods:{
            send(){
                this.$router.push({name:'withdraw'})
            }
        }
    }
</script>

<style lang="scss" scoped>
.alipay_inp{
    text-align:left;
    text-indent: 24px;
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #ccc;
}
.alipay_text{
    display: block;
    float: left;
    width: 25%;
}
.alipay_input{
    display: block;
    float: left;
    width: 70%;
}
.alipay_btn{
    margin: 200px auto 0;
    width: 702px;
    height: 100px;
    line-height: 100px;
    background: skyblue;
    border-radius: 100px;
}
</style>