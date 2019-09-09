<template>
    <div class="height-88 public_bg">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="兑换币" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/head_back.png">
		</TopHeader>
        <div class="convert_info">
            <div class="info_num">
                <span>
                    <img src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/currency.png">
                    {{user_info.currency}}
                </span>
                <span>
                    <img src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/sugar.png">
                    {{user_info.integral}}
                </span>
                <span>
                    <img src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/gold.png">
                    {{parseInt(user_info.balance)}}
                </span>
            </div>
            <div class="info_inp">
                <label>
                    <span>兑换币</span><input v-model="num" @focus="getFocus" class="info_input" type="text">
                </label>
            </div>
            <div class="info_inp">
                <label>
                    <span>支付密码</span><input v-model="paypwd" @focus="getFocus" class="info_input" type="password">
                </label>
            </div>
            <div class="info_text">
                注:10糖果+1金沙可兑换1个币
            </div>
            <div class="info_btn" @click="send">
                确定兑换
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'currency_convert',
        data(){
            return {
                user_info:'',
                num:'',
                paypwd:''
            }
        },
        mounted(){
            this.user_info = JSON.parse(localStorage.getItem('user_info'));
        },
        methods:{
            send(){
                if(!this.num){
                    Toast('请输入兑换数量')
                    return false;
                }
                if(!this.paypwd){
                    Toast('请输入支付密码')
                    return false;
                }
                let _this = this;
                this.$axios.post('users/exchange_currency',{
                    token:localStorage.getItem('token'),
                    currency:_this.num,
                    paypwd:_this.paypwd
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        Toast.success('兑换成功');
                        _this.$router.push('User');
                    }else{
                        Toast(res.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            getFocus() {
                 window.addEventListener('focusout', function () {
                   document.body.scrollTop = document.body.scrollHeight;
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
.convert_info{
    margin: 20px auto;
    width: 702px;
    height: 620px;
    background: #ffc787;
    border: 4px solid #c17b2a;
    border-radius: 20px;
    padding: 22px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.info_num{
    margin: 20px 0;
    color: #fff;
    font-weight: bold;
    font-size: 32px;
    text-shadow: -1px 0 5px #622804,
            0 1px 5px #622804,
            1px 0 5px #622804,
            0 -1px 5px #622804;
}
.info_num span{
    display: inline-block;
    width: 30%;
}
.info_num img{
    margin-right: 10px;
    width: 65px;
    height: 65px;
}
.info_num span:nth-of-type(2) img {
    width: 110px;
}
.info_inp{
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
.info_inp span{
    display: block;
    float: left;
    width: 25%;
}
.info_input{
    width: 70%;
    height: 80%;
    border-radius: 20px;
}
.info_text{
    margin-bottom: 80px;
    text-align: left;
    color: #f05306;
}
.info_btn{
    margin: 0 auto;
    width: 140px;
    height: 65px;
    line-height: 65px;
    font-size: 28px;
    color: #fff;
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/sugar_btn.png')no-repeat;
    background-size: contain;
}
</style>