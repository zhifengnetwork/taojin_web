<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="找回密码" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
            
		</TopHeader>
        <label class="reset_inp">
            <span class="reset_title">账号:</span><input class="reset_input" placeholder="请输入手机号" v-model="mobile" type="number">
        </label>
        <label class="reset_inp">
            <span class="reset_title">密码:</span><input class="reset_input" placeholder="请输入密码" v-model="psd1" type="password">
        </label>
        <label class="reset_inp">
            <span class="reset_title">确认密码:</span><input class="reset_input" placeholder="请再次输入密码" v-model="psd2" type="password">
        </label>
        <label class="reset_inp">
            <span class="reset_title">验证码:</span><input class="reset_input" placeholder="请输入验证码" v-model="code" type="text">
            <span :class="flag?'codeActive':'code'" @click="getCode">{{codeText}}</span>
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
            }
        }
    }
</script>

<style lang="scss" scoped>
.height-88{
    padding-left: 24px;
    padding-right: 24px;
}
.reset_inp{
    display: block;
    margin: 40px auto;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: left;
    background: #eee;
    border-radius: 25px;
}
.reset_title{
    display: inline-block;
    width: 25%;
    letter-spacing: 5px;
    text-align: center;
}
.reset_input{
    display: inline-block;
    width: 70%;
}
.reset_inp:nth-last-of-type(1) .reset_input{
    width: 40%;
}
.codeActive{
    float: right;
    display: block;
    width: 30%;
    text-align: center;
    color:#fff;
    background: #66ccff;
    border-radius: 20px;
}
.code{
    float: right;
    display: block;
    width: 30%;
    text-align: center;
    color:#ccc;
    background: #eee;
    border-radius: 20px;
}
.serve{
    color:#FF0000;
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
    background: -webkit-gradient(linear, left top, right top, from(#f9a775), to(#fb946a));
    background: linear-gradient(to right, #f9a775, #fb946a);
    border-radius: 50px;
}
</style>