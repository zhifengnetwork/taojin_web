<template>
    <div class="height-88 withdraw_bank">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="添加银行卡" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/head_back.png">
            
		</TopHeader>
        <div class="bank_wrap">
            <div class="bank_inp">
                <label>
                    <span class="bank_text">姓名:</span><input class="bank_input" v-model="name" @focus="getFocus" placeholder="请输入姓名" type="text">
                </label>
            </div>
            <div class="bank_inp">
                <label>
                    <span class="bank_text">卡号:</span><input class="bank_input" v-model="number" @focus="getFocus" placeholder="请输入卡号" type="text">
                </label>
            </div>
            <div class="bank_inp">
                <label>
                    <span class="bank_text">银行:</span><input class="bank_input" v-model="bank" @focus="getFocus" placeholder="请输入银行" type="text">
                </label>
            </div>
            <div class="bank_btn" @click="send">
                确认
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'withdraw_bank',
        data(){
            return {
                name:'',
                bank:'',
                number:''
            }
        },
        methods:{
            send(){
                if(!this.name){
                    Toast('请输入真实姓名')
                    return false;
                }
                if(!this.bank){
                    Toast('请输入银行')
                    return false;
                }
                if(!this.number){
                    Toast('请输入银行卡号')
                    return false;
                }
                let _this = this;
                this.$axios.post('user/bind_card',{
                    token:localStorage.getItem('token'),
                    name:_this.name,
                    bank:_this.bank,
                    number:_this.number
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        Toast.success('提交成功,等待审核');
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
.withdraw_bank{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #4a1901;
  background: #ffda9e;
}
.bank_wrap{
  margin: 40px auto;
  width: 702px;
  height: 580px;
  line-height: 72px;
  text-align: left;
  background: #ffe4b8;
  border-radius: 10px;
  border: 4px solid #a65421;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.bank_inp{
    margin: 40px auto;
    width: 650px;
    height: 80px;
    line-height: 80px;
    background: #b38a5b;
    border-left: 4px solid#9b774e;
    border-top: 4px solid#9b774e;
}
.bank_text{
    float: left;
    display: block;
    margin: 0 10px;
    width: 20%;
    text-align: center;
}
.bank_input{
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
.bank_btn{
    text-align: center;
    margin: 40px auto 0;
    width: 140px;
    height: 65px;
    line-height: 65px;
    text-indent: 0;
    color: #fff;
    font-size: 28px;
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/sugar_btn.png') no-repeat;
    background-size: contain;
}
</style>