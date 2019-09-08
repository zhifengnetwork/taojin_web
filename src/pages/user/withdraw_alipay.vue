<template>
    <div class="height-88 withdraw_alipay">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="支付宝提现" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="alipay_wrap">
            <div class="alipay_inp">
                <label>
                    <span class="alipay_text">支付宝账号:</span><input class="alipay_input" v-model="alipay" @focus="getFocus" placeholder="请输入支付宝账号" type="text">
                </label>
            </div>
            <div class="alipay_inp">
                <label>
                    <span class="alipay_text">真实姓名:</span><input class="alipay_input" v-model="name" @focus="getFocus" placeholder="请输入真实姓名" type="text">
                </label>
            </div>
            <div class="alipay_btn" @click="send">
                确认
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'withdraw_alipay',
        data(){
            return {
                alipay:'',
                name:''
            }
        },
        methods:{
            send(){
                if(!this.alipay){
                    Toast('请输入支付宝账号')
                    return false;
                }
                if(!this.name){
                    Toast('请输入真实姓名')
                    return false;
                }
                let _this = this;
                this.$axios.post('user/bind_alipay',{
                    token:localStorage.getItem('token'),
                    name:_this.name,
                    number:_this.alipay
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        Toast.success('添加成功');
                        _this.$router.push({name:'withdraw'})
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
.withdraw_alipay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #4a1901;
  background: #ffda9e;
}
.alipay_wrap{
  margin: 40px auto;
  width: 702px;
  height: 462px;
  line-height: 72px;
  text-align: left;
  background: #ffe4b8;
  border-radius: 10px;
  border: 4px solid #a65421;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.alipay_inp{
    margin: 40px auto;
    width: 650px;
    height: 80px;
    line-height: 80px;
    background: #b38a5b;
    border-left: 4px solid#9b774e;
    border-top: 4px solid#9b774e;
}
.alipay_text{
    display: block;
    float: left;
    text-align: right;
    margin-right: 20px;
    width: 28%;
}
.alipay_input{
    display: block;
    float: left;
    width: 65%;
}
input::-webkit-input-placeholder { /* WebKit browsers */ 
    color: #e7c999; 
} 
input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
    color: #e7c999; 
} 
input::-moz-placeholder { /* Mozilla Firefox 19+ */ 
    color: #e7c999; 
} 
input:-ms-input-placeholder { /* Internet Explorer 10+ */ 
    color: #e7c999; 
} 
.alipay_btn{
    text-align: center;
    margin: 40px auto 0;
    width: 140px;
    height: 65px;
    line-height: 65px;
    text-indent: 0;
    color: #fff;
    font-size: 28px;
    background: url('../../../static/images/sugar_btn.png') no-repeat;
    background-size: contain;
}
</style>