<template>
    <div class="height-88 reset">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title=" " :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
            
		</TopHeader>
        <label class="reset_inp">
            <span class="reset_title"><img class="reset_img" src="static/images/login_ph.png"></span><input class="reset_input" placeholder="请输入手机号" v-model="mobile" @focus="getFocus" type="number">
            <div class="reset_errWrap" @click="err">
                <img class="reset_err" src="static/images/login_err.png">
            </div>
        </label>
        <label class="reset_inp">
            <span class="reset_title"><img class="reset_img" src="static/images/login_pwd.png"></span><input class="reset_input" placeholder="请输入密码" v-model="psd1" @focus="getFocus" type="password">
        </label>
        <label class="reset_inp">
            <span class="reset_title"><img class="reset_img" src="static/images/login_pwd.png"></span><input class="reset_input" placeholder="请再次输入密码" v-model="psd2" @focus="getFocus" type="password">
        </label>
        <label class="reset_inp">
            <span class="reset_title"><img class="reset_img" src="static/images/login_code.png"></span><input class="reset_input" placeholder="请输入验证码" v-model="code" @focus="getFocus" type="text">
            <span :class="flag?'code':'codeActive'" @click="getCode">{{codeText}}</span>
        </label>
        <div class="reset_btn" @click="reset">
            找回
        </div>
    </div>
</template>

<script>    
    import { Toast } from 'vant';
    export default {
        name:'Reset',
        data(){
            return{
                mobile:'',
                psd1:'',
                psd2:'',
                code:'',
                codeText:'获取验证码',
                flag:true
            }
        },
        methods:{
            err(){
                this.mobile = '';
            },
            reset(){
                if(!this.mobile){
                    Toast.fail('请填写手机号!');
                    return false;
                }else if(!this.psd1){
                    Toast.fail('请填写密码!');
                    return false;
                }else if(!this.psd2){
                    Toast.fail('请填写密码!');
                    return false;
                }else if(!this.code){
                    Toast.fail('请填写验证码!');
                    return false;
                }

                if(this.psd1!=this.psd2){
                    Toast.fail('输入密码不一致!');
                    return false;
                }

                if(!(/^1[3456789]\d{9}$/.test(this.mobile))){ 
                    Toast.fail("手机号码有误，请重填");
                    return false; 
                }

                let _this = this;
                this.$axios.post('login/zhaohuipwd',{
                    phone:_this.mobile,
                    pwd:_this.psd1,
                    pwd2:_this.psd2,
                    code:_this.code
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        Toast.success('修改成功');
                        _this.$router.push('/Login')
                    }else{
                        Toast.fail(res.data.msg);
                    }
                    console.log(_this.data)
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
                   document.body.scrollTop = document.body.scrollHeight;
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
.height-88{
    padding: 0 86px;
}
.reset{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #4a1901;
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/login_bg.png') no-repeat;
    background-size: cover;
}
.reset_inp{
    position: relative;
    display: block;
    margin: 20px auto;
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: left;
    border-bottom: 1px solid #a65421;
}
.reset_inp:nth-of-type(1){
    margin-top: 400px;
}
.reset_errWrap{
    float: right;
    width: 50px;
    height: 100%;
}
.reset_err{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 30px;
}
.reset_title{
    position: relative;
    display: inline-block;
    width: 10%;
    height: 100%;
    text-align: center;
    vertical-align: middle;
}
.reset_img{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 46px;
}
.reset_img:nth-of-type(2),.reset_img:nth-of-type(3){
    width: 36px;
    height: 36px;
}
.reset_input{
    // display: inline-block;
    width: 70%;
}
.reset_inp:nth-last-of-type(1) .reset_input{
    width: 40%;
}
.reset_errWrap{
    float: right;
    width: 50px;
    height: 100%;
}
.reset_err{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 30px;
}
.code{
    margin-top: 10px;
    float: right;
    display: block;
    width: 30%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color:#51210c;
    background: #ffbb7e;
    border-radius: 20px;
}
.codeActive{
    margin-top: 10px;
    float: right;
    display: block;
    width: 35%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color:#ccc;
    background: #eee;
    border-radius: 20px;
}
.serve{
    color:#af683b;
}
.reset_btn{
    margin-top: 50px;
    width: 100%;
    height: 100px;
    letter-spacing: 50px;
    text-indent: 50px;
    line-height: 100px;
    text-align: center;
    font-size: 36px;
    color: #fff;
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/login_btn.png') no-repeat;
    background-size: contain;
}
</style>