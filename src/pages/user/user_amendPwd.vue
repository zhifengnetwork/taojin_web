<template>
    <div class="height-88 user_amendPwd">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="修改登录密码" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
            <img slot="backBtn" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/head_back.png">
		</TopHeader>
        <div class="amend">
            <div class="amend_inp">
                <label>
                    <span class="amend_text">输入手机号</span><input v-model="mobile" @focus="getFocus" class="amend_input" type="text">
                </label>
            </div>
            <div class="amend_inp">
                <label>
                    <span class="amend_text">输入密码</span><input v-model="pwd1" @focus="getFocus" class="amend_input" type="password">
                </label>
            </div>
            <div class="amend_inp">
                <label>
                    <span class="amend_text">再次输入密码</span><input v-model="pwd2" @focus="getFocus" class="amend_input" type="password">
                </label>
            </div>
            <div class="amend_inp">
                <label>
                    <span class="amend_text">输入验证码</span><input v-model="code" @focus="getFocus" class="amend_input" type="text">
                    <span class="amend_code" @click="getCode">{{codeText}}</span>
                </label>
            </div>
            <div class="amend_btn" @click="amend_send">
                确认
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'user_amendPwd',
        data(){
            return{
                mobile:'',
                pwd1:'',
                pwd2:'',
                code:'',
                codeText:'获取验证码',
                flag:true
            }
        },
        methods:{
            amend_send(){
                if(!this.mobile){
                    Toast('请输入手机号')
                    return false;
                }
                if(!this.pwd1){
                    Toast('请输入密码')
                    return false;
                }
                if(!this.pwd2){
                    Toast('请再次输入密码')
                    return false;
                }
                if(!this.code){
                    Toast('请输入验证码')
                    return false;
                }
                let _this = this;
                this.$axios.post('user/reset_pwd',{
                    token:localStorage.getItem('token'),
                    password1:_this.pwd1,
                    password2:_this.pwd1,
                    code:_this.code,
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        Toast.success('修改成功');
                        _this.$router.push('User');
                    }else{
                        Toast(res.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            getCode(){
                if(!this.flag){
                    return false;
                }
                if(!this.mobile){
                    Toast.fail('请填写手机号!');
                    return false;
                }
                if(!(/^1[3456789]\d{9}$/.test(this.mobile))){ 
                    Toast.fail("手机号码有误，请重填");
                    return false; 
                }
                let _this = this;
                this.$axios.post('captcha/get_code',{
                    phone:_this.mobile
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        Toast.success('发送成功');
                        _this.time();
                    }else{
                        Toast.fail(res.data.msg);
                    }
                })
                .catch(function(error){
                    console.log(error);
                }) 
            },
            time(){
                if(this.flag){
                    let s = 60;
                    let time = setInterval(() => {
                        s--;
                        this.flag = false;
                        this.codeText = s+'秒后重新获取';
                        if(s==0){
                            clearInterval(time);
                            this.flag = true;
                            this.codeText = '获取验证码';
                        }
                    }, 1000);
                }
            },
            getFocus() {
                window.addEventListener('focusout', function () {
                    window.scrollTo(0,0);
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
.user_amendPwd{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #ffd5a4;
    background: #ffda9e;
}
.amend{
    margin: 20px auto;
    width: 702px;
    height: 714px;
    background: #ffe4b8;
    border: 4px solid #c17b2a;
    border-radius: 10px;
}
.amend_inp{
    margin: 40px auto;
    width: 650px;
    height: 80px;
    line-height: 80px;
    background: #b38a5b;
    border-left: 4px solid#9b774e;
    border-top: 4px solid#9b774e;
}
.amend_text{
    display: block;
    float: left;
    text-align: left;
    text-indent: 30px;
    margin-right: 20px;
    width: 35%;
}
.amend_input{
    display: block;
    float: left;
    width: 60%;
}
.amend_inp:nth-last-of-type(2) .amend_input{
    width: 20%;
}
.amend_code{
    padding: 10px 15px;
    line-height: 44px;
    color: #4a1901;
    background: #ffda9e;
    border: 1px solid #fff;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.amend_btn{
    text-align: center;
    margin: 80px auto 0;
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