<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="注册" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
            <!-- 右侧按钮 -->
			<!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
		</TopHeader>
        <label class="register_inp">
            <span class="register_title">账号:</span><input class="register_input" placeholder="请输入手机号" v-model="mobile" type="number">
        </label>
        <label class="register_inp">
            <span class="register_title">密码:</span><input class="register_input" placeholder="请输入密码" v-model="psd1" type="password">
        </label>
        <label class="register_inp">
            <span class="register_title">确认密码:</span><input class="register_input" placeholder="请再次输入密码" v-model="psd2" type="password">
        </label>
        <label class="register_inp">
            <span class="register_title">验证码:</span><input class="register_input" placeholder="请输入验证码" v-model="code" type="text">
            <span :class="flag?'codeActive':'code'" @click="getCode">{{codeText}}</span>
        </label>
        <van-checkbox v-model="checked" checked-color="#fb946a">我已阅读并同意
            <router-link class="serve" to="#">服务条款</router-link>
        </van-checkbox>
        <div class="register_btn" @click="register" :class="checked?'active':''">
            注册
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'Register',
        data(){
            return{
                mobile:'',
                psd1:'',
                psd2:'',
                code:'',
                codeText:'获取验证码',
                flag:true,
                checked:false
            }
        },
        methods:{
            register(){
                if(!this.checked){
                    return false;
                }

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
                this.$axios.post('login/register',{
                    phone:_this.mobile,
                    pwd:_this.psd1,
                    pwd2:_this.psd2,
                    code:_this.code
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        Toast.success('注册成功');
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
.register_inp{
    display: block;
    margin: 40px auto;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: left;
    background: #eee;
    border-radius: 25px;
}
.register_title{
    display: inline-block;
    width: 25%;
    letter-spacing: 5px;
    text-align: center;
}
.register_input{
    display: inline-block;
    width: 70%;
}
.register_inp:nth-last-of-type(1) .register_input{
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
.register_btn{
    margin-top: 50px;
    width: 100%;
    height: 100px;
    letter-spacing: 50px;
    text-indent: 50px;
    line-height: 100px;
    text-align: center;
    font-size: 36px;
    color: #ccc;
    background: #eee;
    border-radius: 50px;
}
.active{
    color: #fff;
    background: -webkit-gradient(linear, left top, right top, from(#f9a775), to(#fb946a));
    background: linear-gradient(to right, #f9a775, #fb946a);
}
</style>