<template>
    <div class="height-88 public_bg">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="糖果" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
            <img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="sugar_info">
            <img class="sugar_img" src="static/images/sugar.png">
            <span>{{user_info.integral}}</span>
        </div>
        <div class="sugar_option">
            <div class="option_item">
                <router-link to="sugar_give">
                    赠送
                </router-link>
            </div>
            <div class="option_item">
                <router-link to="sugar_record">
                    赠送纪录
                </router-link>
            </div>
            <div class="option_item">
                <router-link to="sugar_newrecord">
                    糖果明细
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'sugar',
        data(){
            return {
                user_info:''
            }
        },
        mounted(){
            this.user_info = JSON.parse(localStorage.getItem('user_info'));
        },
    }
</script>

<style lang="scss" scoped>
.sugar_info{
    margin: 20px auto 40px;
    width: 702px;
    height: 220px;
    line-height: 220px;
    color: #fefefe;
    background: #ffc787;
    border: 4px solid #c17b2a;
    border-radius: 20px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    text-shadow: -1px 0 5px #622804,
            0 1px 5px #622804,
            1px 0 5px #622804,
            0 -1px 5px #622804;
}
.sugar_img{
    margin-right: 15px;
    width: 110px;
    height: 70px;
}
.sugar_info span{
    font-size: 50px;
    font-weight: bold;
}
.sugar_option{
  margin: 0 24px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.option_item{
  display: inline-block;
  margin-left: 50px;
  width: 140px;
  height: 66px;
  line-height: 66px;
  background: url('../../../static/images/sugar_btn.png')no-repeat;
  background-size: contain;
}
.option_item:nth-of-type(1){
    margin-left: -20px;
}
.option_item a{
    color: #fff;
    font-size: 28px;
}
</style>