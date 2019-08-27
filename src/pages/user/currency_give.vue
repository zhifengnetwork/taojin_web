<template>
    <div class="height-88 public_bg">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="赠送" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="give_info">
            <div class="info_num">
                <span>
                    <img src="static/images/currency.png">
                    {{user_info.currency}}
                </span>
            </div>
            <div class="info_inp">
                <label>
                    <span>收款ID</span><input v-model="ID" class="info_input" type="text">
                </label>
            </div>
            <div class="info_inp">
                <label>
                    <span>币</span><input v-model="currency" class="info_input" type="text">
                </label>
            </div>
            <div class="info_btn" @click="send">
                确定赠送
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'currency_give',
        data(){
            return {
                user_info:'',
                ID:'',
                currency:''
            }
        },
        mounted(){
            this.user_info = JSON.parse(localStorage.getItem('user_info'));
        },
        methods:{
            send(){
                if(!this.ID){
                    Toast('请输入赠送ID')
                    return false;
                }
                if(!this.currency){
                    Toast('请输入赠送数量')
                    return false;
                }
                let _this = this;
                this.$axios.post('users/give_currency',{
                    token:localStorage.getItem('token'),
                    u_id:_this.ID,
                    currency:_this.currency
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
            }
        }
    }
</script>

<style lang="scss" scoped>
.give_info{
    margin: 20px auto;
    width: 702px;
    height: 590px;
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
.info_btn{
    margin: 80px auto;
    width: 140px;
    height: 65px;
    line-height: 65px;
    font-size: 28px;
    color: #fff;
    background: url('../../../static/images/sugar_btn.png')no-repeat;
    background-size: contain;
}
</style>