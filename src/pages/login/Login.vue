<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="登录" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<!-- <img slot="backBtn" src="static/images/head_back.png"> -->
            
		</TopHeader>
        <label class="login_inp">
            <span class="login_title">账号:</span><input class="login_input" placeholder="请输入手机号" v-model="mobile" type="number">
        </label>
        <label class="login_inp">
            <span class="login_title">密码:</span><input class="login_input" placeholder="请输入密码" v-model="psd" type="password">
        </label>
        <div class="login_btn" @click="login">
            登录
        </div>
        <div class="login_link">
            <router-link class="link" to="/Register">注册</router-link>
            <router-link class="link" to="/Reset">忘记密码</router-link>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'Login',
        data(){
            return{
                mobile:'',
                psd:''
            }
        },
        methods:{
            login(){
                if(!this.mobile){
                    Toast.fail('请填写手机号!');
                    return false;
                }else if(!this.psd){
                    Toast.fail('请填写密码!');
                    return false;
                }

                if(!(/^1[3456789]\d{9}$/.test(this.mobile))){ 
                    Toast.fail("手机号码有误，请重填");
                    return false; 
                }

                let _this = this;
                this.$axios.post('login/login',{
                    phone:_this.mobile,
                    password:_this.psd
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        Toast.success('登录成功');
                        // _this.$store.state.token = res.data.data.token;
                        window.localStorage.setItem("token",res.data.data.token);
                        _this.$router.push('/Home')
                    }else{
                        Toast.fail(res.data.msg);
                    }
                    console.log(_this.data)
                })
                .catch(function(error){
                    console.log(error);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.height-88{
    padding-left: 24px;
    padding-right: 24px;
}
.login_inp{
    display: block;
    margin: 36px auto;
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: left;
    background: #eee;
    border-radius: 10px;
}
.login_title{
    display: inline-block;
    width: 25%;
    letter-spacing: 20px;
    text-align: center;
}
.login_input{
    display: inline-block;
    width: 70%;
}
.serve{
    color:#FF0000;
}
.login_btn{
    margin-top: 36px;
    width: 100%;
    height: 80px;
    letter-spacing: 50px;
    text-indent: 50px;
    line-height: 80px;
    text-align: center;
    font-size: 30px;
    color: #fff;
    background: -webkit-gradient(linear, left top, right top, from(#f9a775), to(#fb946a));
    background: linear-gradient(to right, #f9a775, #fb946a);
    border-radius: 10px;
}
.login_link{
    width: 100%;
    padding: 10px 20px;
    line-height: 90px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.link{
    width: auto;
    color: #151515;
    text-decoration: underline;
}
.link:nth-of-type(1){
    float: left;
}
.link:nth-of-type(2){
    float: right;
}
</style>