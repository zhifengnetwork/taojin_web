<template>
    <div class="height-88 public_bg">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="赠送" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="withdraw_container">
            <div class="withdraw_num">
                <img class="withdraw_img" src="static/images/withdraw_money.png">
                <span>{{money}}</span>
            </div>
            <div class="give_inp">
                <label>
                    <span>赠送账号</span><input v-model="phone" placeholder="请输入手机号" class="give_input" type="text">
                </label>
            </div>
            <div class="give_inp">
                <label>
                    <span>余<i class="give_i"></i>额</span><input v-model="integral" class="give_input" type="text">
                </label>
            </div>
            <div class="give_inp">
                <label>
                    <span>支付密码</span><input v-model="paypwd" class="give_input" type="password">
                </label>
            </div>
            <div class="give_btn" @click="give_send">
                确认赠送
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'withdraw_give',
        data(){
            return {
                money:'',
                phone:'',
                mobile:'',
                integral:'',
                paypwd:''
            }
        },
        mounted(){
            this.user_info = JSON.parse(localStorage.getItem('user_info'));
            this.money = this.user_info.balance;
        },
        methods:{
            give_send(){
                if(!this.phone){
                    Toast('请输入赠送账号')
                    return false;
                }
                if(!this.integral){
                    Toast('请输入赠送数量')
                    return false;
                }
                if(!this.paypwd){
                    Toast('请输入支付密码')
                    return false;
                }
                let _this = this;
                this.$axios.post('users/give_balance',{
                    token:localStorage.getItem('token'),
                    phone:_this.phone,
                    money:_this.integral,
                    paypwd:_this.paypwd
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        Toast.success('赠送成功');
                        _this.$router.push('User');
                    }else{
                        Toast(res.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
input::-webkit-input-placeholder{
    color: #e5e5e5;
}
.withdraw_container{
    margin: 20px auto;
    width: 702px;
    height: 710px;
    background: #ffc787;
    border: 4px solid #c17b2a;
    border-radius: 20px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.withdraw_num{
    margin: 40px 0;
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    text-indent: 24px;
    line-height: 100px;
    text-shadow: -1px 0 5px #622804,
            0 1px 5px #622804,
            1px 0 5px #622804,
            0 -1px 5px #622804;
}
.withdraw_img{
    margin-right: 15px;
    width: 80px;
    height: 80px;
}
.give_inp{
    margin: 40px auto;
    width: 650px;
    height: 80px;
    line-height: 80px;
    background: #b38a5b;
    border-left: 4px solid#9b774e;
    border-top: 4px solid#9b774e;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.give_inp span{
    display: block;
    float: left;
    width: 25%;
}
.give_input{
    width: 70%;
    height: 80%;
    border-radius: 20px;
}
.give_i{
    display: inline-block;
    width: 50px;
}
.give_btn{
    margin: 40px auto 0;
    width: 140px;
    height: 65px;
    line-height: 65px;
    color: #fff;
    font-size: 28px;
    background: url('../../../static/images/sugar_btn.png') no-repeat;
    background-size: contain;
}
</style>