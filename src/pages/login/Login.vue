<template>
    <div class="height-88 login">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title=" " :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<!-- <img slot="backBtn" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/head_back.png"> -->
		</TopHeader>
        <label class="login_inp">
            <span class="login_title"><img class="login_img" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/login_ph.png"></span><input class="login_input" placeholder="请输入手机号" v-model="mobile" @focus="getFocus" type="number">
            <div class="login_errWrap" @click="err">
                <img class="login_err" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/login_err.png">
            </div>
        </label>
        <label class="login_inp">
            <span class="login_title"><img class="login_img" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/login_pwd.png"></span><input class="login_input" placeholder="请输入密码" v-model="psd" @focus="getFocus" type="password">
        </label>
        <div class="login_btn" @click="login">
            登录
        </div>
        <div class="login_link">
            <!-- <router-link class="link" to="/Register">注册</router-link> -->
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
        mounted(){
            // 如果支持 popstate 一般移动端都支持了
            if (window.history && window.history.pushState) {
                // 往历史记录里面添加一条新的当前页面的url
                history.pushState(null, null, document.URL);
                // 给 popstate 绑定一个方法 监听页面刷新
                window.addEventListener('popstate', this.goBack, false);//false阻止默认事件
            }
        },
        destroyed() {
			window.removeEventListener('popstate', this.goBack, false);//false阻止默认事件
			sessionStorage.setItem('isSign','1')
		},
        methods:{
            err(){
                this.mobile = '';
            },
            goBack() {
                console.log("监听到了");
                history.pushState(null, null, document.URL);
            },
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
            			window.localStorage.setItem("reg","reg");
                        _this.$router.replace('/Home');
                        _this.$store.state.prize = true;
                    }else{
                        Toast.fail(res.data.msg);
                    }
                    console.log(_this.data)
                })
                .catch(function(error){
                    console.log(error);
                })
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
.height-88{
    padding: 0 86px;
}
.login{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #4a1901;
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/login_bg.png') no-repeat;
    background-size: cover;
}
.login_inp{
    position: relative;
    display: block;
    margin: 36px auto;
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: left;
    border-bottom: 2px solid #a65421;
}
.login_inp:nth-of-type(1){
    margin-top: 400px;
}
.login_errWrap{
    float: right;
    width: 50px;
    height: 100%;
}
.login_err{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 30px;
}
.login_title{
    position: relative;
    display: inline-block;
    width: 10%;
    height: 100%;
    text-align: center;
    vertical-align: middle;
}
.login_img{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 46px;
}
.login_img:nth-of-type(2){
    width: 36px;
    height: 36px;
}
.login_input{
    display: inline-block;
    margin-left: 20px;
    width: 75%;
}
.serve{
    color:#FF0000;
}
.login_btn{
    margin-top: 36px;
    width: 100%;
    height: 90px;
    letter-spacing: 50px;
    text-indent: 50px;
    line-height: 90px;
    text-align: center;
    font-size: 30px;
    color: #fff;
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/login_btn.png')no-repeat;
    background-size: contain;
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
}
.link:nth-of-type(1){
    float: left;
    color: #af693c;
}
.link:nth-of-type(2){
    float: right;
}
</style>