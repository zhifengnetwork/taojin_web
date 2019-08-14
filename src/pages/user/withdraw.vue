<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="账户提现" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
            <!-- 右侧按钮 -->
			<!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
		</TopHeader>
        <div class="money">
            <div class="money_title">金额</div>
            <p class="money_num">214.52</p>
        </div>
        <div class="type">
            <div class="type_title">选择提现方式</div>
            <div class="type_btns">
                <span class="type_btn">支付宝</span>
                <span class="type_btn">+添加银行卡</span>
            </div>
        </div>
        <div class="alipay">
            <router-link to="withdraw_alipay">
                输入支付宝账号
                <div class="alipay_icon">
                    <van-icon name="arrow"/>
                </div>
            </router-link>
        </div>
        <div class="alipay">
            <router-link to="withdraw_bank">
                输入银行卡号
                <div class="alipay_icon">
                    <van-icon name="arrow"/>
                </div>
            </router-link>
        </div>
        <div class="withdraw">
            <h3 class="withdraw_title">提现金额</h3>
            <div class="withdraw_inp">
                <input class="withdraw_input" placeholder="请输入提现金额" type="text">
                <div class="withdraw_all">全部提现</div>
            </div>
            <div class="withdraw_tax">
                <span class="withdraw_tax_text">手续费</span>0
            </div>
            <div class="withdraw_tax">
                <span class="withdraw_tax_text">实际到账</span>0
            </div>
        </div>
        <div class="withdraw_btn" @click="send">
            申请提交
        </div>
    </div>
</template>

<script>
    export default {
        name:'withdraw',
        data(){
            return{
                
            }
        },
        methods:{
            send(){
                this.$router.push({name:'balance'})
            }
        }
    }
</script>

<style lang="scss" scoped>
.money{
    width: 100%;
    height: 250px;
    background: red;
}
.money_title{
    padding-top: 40px;
    line-height: 50px;
    font-size: 40px;
}
.money_num{
    line-height: 100px;
    font-size: 60px;
}
.type{
    text-align: left;
    padding: 100px 24px 20px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.type_btns{
    margin-top: 20px;
}
.type_btn{
    height: 100px;
    line-height: 100px;
    padding: 20px 30px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background: skyblue;
}
.alipay{
  position: relative;
  margin: 10px 0;
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: left;
  text-indent: 24px;
  background: #fff;
  border-bottom: 1px solid #ccc;
}
.alipay_icon{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 20px;
  margin: auto;
}
.withdraw{
    text-align: left;
    text-indent: 24px;
}
.withdraw_title{
    line-height: 100px;
    font-weight: normal;
}
.withdraw_inp{
    width: 100%;
    height: 100px;
    line-height: 100px;
    padding-left: 24px; 
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-bottom: 1px solid #ccc;   
}
.withdraw_input{
    float: left;
    width: 72%;
}
.withdraw_all{
    float: left;
    width: 25%;
}
.withdraw_tax{
    position: relative;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-indent: 24px;
    border-bottom: 1px solid #ccc;   
}
.withdraw_tax_text{
    display: block;
    float: left;
    width: 30%;
}
.withdraw_tax_text::after{
    content:'元';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 20px;
    margin: auto;
}
.withdraw_btn{
    margin: 40px auto;
    width: 702px;
    height: 100px;
    line-height: 100px;
    background: #66ccff;
    border-radius: 20px;
}
</style>