<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="添加银行卡" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
            <!-- 右侧按钮 -->
			<!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
		</TopHeader>
        <div class="bank_inp">
            <label>
                <span class="bank_text">姓名:</span><input class="bank_input" placeholder="请输入姓名" type="text">
            </label>
        </div>
        <div class="bank_inp">
            <label>
                <span class="bank_text">卡号:</span><input class="bank_input" placeholder="请输入卡号" type="text">
            </label>
        </div>
        <div class="bank_inp">
            <label>
                <span class="bank_text">银行:</span><input class="bank_input" placeholder="请输入银行" type="text">
            </label>
        </div>
        <div class="bank_btn" @click="send">
            确认
        </div>
    </div>
</template>

<script>
    export default {
        name:'withdraw_bank',
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
.bank_inp{
    text-align:left;
    text-indent: 24px;
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #ccc;
}
.bank_text{
    display: block;
    float: left;
    width: 25%;
}
.bank_input{
    display: block;
    float: left;
    width: 70%;
}
.bank_btn{
    margin: 200px auto 0;
    width: 712px;
    height: 100px;
    line-height: 100px;
    background: skyblue;
    border-radius: 100px;
}
</style>