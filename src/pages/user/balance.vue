<template>
    <div class="height-88 balance">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="账户金额" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="balance_content">
            <div class="balance_info">
                <div class="balance_info_item balance_recharge">
                    <p><span>{{user_info.recharge_balance}}</span></p>
                    <p>充值余额</p>
                </div>
            </div>
            <div class="balance_info">
                <div class="balance_info_item">
                    <p><span>{{user_info.balance}}</span></p>
                    <p>可提现金沙</p>
                </div>
                <div class="balance_info_item">
                    <p><span>{{user_info.lock_balance}}</span></p>
                    <p>出局金沙</p>
                </div>
            </div>
            <div class="balance_btn">
                <router-link to="withdraw">
                    提现
                </router-link>
            </div>
            <div class="balance_btn">
                <router-link to="withdraw_give">
                    赠送
                </router-link>
            </div>
        </div>
        <div class="balance_option">
            <div class="option_item" v-for="(item,index) in option_item" :key="index">
                <router-link :to="item.pages">
                    {{item.text}}
                    <van-icon name="arrow"/>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'balance',
        data(){
            return{
                option_item:[
                    {text:'提现明细',pages:'withdraw_record'},
                    {text:'账单明细',pages:'withdraw_bill'},
                    {text:'出局明细',pages:'balance_lock'},
                    {text:'提现明细',pages:'balance_detailed'},
                ],
                user_info:''
            }
        },
        mounted(){
            this.user_info = JSON.parse(localStorage.getItem('user_info'));
        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
.balance{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #4a1901;
  overflow-y: scroll;
  background: url('../../../static/images/balance_bg.png') no-repeat;
  background-size: cover;
}
.balance_content{
    margin: 20px auto;
    width: 702px;
    height: 520px;
    background: #eeb057;
    border: 4px solid #a65421;
    border-radius: 20px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.balance_info_item{
    float: left;
    margin: 10px auto;
    width: 50%;
    line-height: 50px;
}
.balance_recharge{
    padding-top: 20px;
    width: 100%;
}
.balance_info_item p:nth-of-type(1) span{
    display: block;
    margin: 20px auto;
    width: 320px;
    height: 72px;
    font-size: 40px;
    line-height: 72px;
    background: url('../../../static/images/balance_money.png')no-repeat;
    background-size: contain;
}
.balance_btn{
    margin: 20px 40px;
    display: inline-block;
    width: 140px;
    height: 66px;
    line-height: 66px;
    background: url('../../../static/images/sugar_btn.png')no-repeat;
    background-size: contain;
}
.balance_btn a{
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