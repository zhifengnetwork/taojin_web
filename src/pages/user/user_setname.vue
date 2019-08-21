<template>
    <div class="height-88 user_setname">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="修改用户名" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
            <img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="setname">
            <div class="setname_inp">
                <label>
                    <span class="setname_text">输入用户名:</span><input v-model="username" class="setname_input" type="text">
                </label>
            </div>
            <div class="setname_btn" @click="send">
                确认修改
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'user_setname',
        data(){
            return {
                username:''
            }
        },
        mounted(){
            this.sugar = this.$route.query.sugar
        },
        methods:{
            send(){
                if(!this.username){
                    Toast('请输入用户名')
                    return false;
                }
                let _this = this;
                this.$axios.post('user/update_username',{
                    token:localStorage.getItem('token'),
                    username:_this.username
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
        }
    }
</script>

<style lang="scss" scoped>
.user_setname{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    color: #ffd5a4;
    background: #ffda9e;
}
.setname{
    margin: 20px auto;
    width: 702px;
    height: 350px;
    background: #ffe4b8;
    border: 4px solid #c17b2a;
    border-radius: 10px;
}
.setname_inp{
    margin: 40px auto;
    width: 650px;
    height: 80px;
    line-height: 80px;
    background: #b38a5b;
    border-left: 4px solid#9b774e;
    border-top: 4px solid#9b774e;
}
.setname_text{
    display: block;
    float: left;
    text-align: right;
    margin-right: 20px;
    width: 28%;
}
.setname_input{
    display: block;
    float: left;
    width: 65%;
}
.setname_btn{
    text-align: center;
    margin: 100px auto 0;
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