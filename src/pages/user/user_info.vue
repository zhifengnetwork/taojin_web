<template>
    <div class="height-88 user_info">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="个人资料" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
            
		</TopHeader>
        <div class="info_wrap">
            <div class="info_option">
                <div class="option_item" v-for="(item,index) in option_item" :key="index">
                    <router-link :to="item.pages">
                        {{item.text}}
                        <div class="info_name" v-if="index==1">
                            七七七
                        </div>
                        <div class="info_phone" v-if="index==2">
                            133 4444 5555
                        </div>
                        <div class="info_picture" v-if="index==0">
                            <img class="info_img" src="static/images/user_icon.png">
                        </div>
                        <div class="option_icon" v-else>
                            <van-icon color="#fff" name="arrow"/>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="quit">
                退出登录
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'user_info',
        data(){
            return{
                option_item:[
                    {text:'头像',pages:'#'},
                    {text:'用户名',pages:'user_setname'},
                    {text:'手机号绑定',pages:'#'},
                    {text:'修改密码',pages:'user_amendPwd'},
                    {text:'支付密码',pages:'user_paymentPwd'}
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
.user_info{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: #4a1901;
  background: url('../../../static/images/user_info_bg.png');
  background-size: contain;
}
.info_wrap{
    margin: 20px auto;
    width: 702px;
    height: 824px;
    background: #ffc787;
    border: 4px solid #c17b2a;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.info_option{
  width: 100%;
  padding: 5px 0;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.option_item:nth-of-type(1){
    margin-top: 0;
}
.option_item{
  position: relative;
  margin: 40px auto;
  width: 100%;
  height: 80px;
  line-height: 76px;
  text-align: left;
  text-indent: 30px;
  background: #b38a5b;
  border-left: 4px solid#9b774e;
  border-top: 4px solid#9b774e;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.option_item a{
    color: #4a1901;
}
.info_name,.info_phone{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 100px;
    margin: auto;
    width: 200px;
    height: 100%;
    color: #fff;
    text-indent: 0;
    text-align: right;
}
.info_picture{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    width: 50px;
    height: 50px;
    text-indent: 0;
}
.info_picture img{
    width: 100%;
    height: 100%;
}
.option_icon{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 40px;
  margin: auto;
}
.quit{
  display: inline-block;
  width: 140px;
  height: 66px;
  line-height: 66px;
  color: #fff;
  background: url('../../../static/images/sugar_btn.png')no-repeat;
  background-size: contain;
}

</style>