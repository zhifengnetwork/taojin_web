<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="个人资料" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
            
		</TopHeader>
        <div class="info_option">
            <div class="option_item" v-for="(item,index) in option_item" :key="index">
                <router-link to="#">
                {{item.text}}
                <div class="info_picture" v-if="index==0">
                    <img src="" alt="">
                </div>
                <div class="option_icon" v-else>
                    <van-icon name="arrow"/>
                </div>
                </router-link>
            </div>
        </div>
        <div class="quit">
            退出登录
        </div>
    </div>
</template>

<script>
    export default {
        name:'user_info',
        data(){
            return{
                option_item:[
                    {text:'头像'},
                    {text:'用户名'},
                    {text:'手机号绑定'},
                    {text:'修改密码'},
                    {text:'支付密码'}
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
.info_option{
  width: 100%;
  padding: 5px 0;
  background: #f5f5f5;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.option_item:nth-of-type(1){
    margin-top: 0;
}
.option_item{
  position: relative;
  margin: 10px 0;
  width: 100%;
  height: 120px;
  line-height: 120px;
  text-align: left;
  text-indent: 60px;
  background: #fff;
}
.info_picture{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 20px;
    margin: auto;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 50%;
    background: red;
}
.info_picture img{
    width: 100%;
    height: 100%;
}
.option_icon{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 20px;
  margin: auto;
}
.quit{
    margin: 200px auto 0;
    width: 702px;
    height: 100px;
    line-height: 100px;
    border-radius: 20px;
    background: red;
}
</style>