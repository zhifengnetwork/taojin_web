<template>
    <div class="height-88 promotion">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
        <TopHeader back-url="" custom-title=" " :custom-fixed="true" custom-col>
            <!-- 返回按钮 -->
            <img slot="backBtn" src="static/images/head_back.png">
        </TopHeader>
        <div class="promotion_imgWrap">
            <img class="promotion_img" src="">
        </div>
        <div class="promotion_code">
            <p class="promotion_text">我是<span>123</span></p>
            <p class="promotion_text">ID<span>231546</span></p>
            <div class="code">
                <img class="code_img" src="">
            </div>
            <p>长按二维码保存</p>
        </div>
        <div class="promotion_link">
            <p>http://hdhfkgjdkjoejdgjdjgdjgkjkd.com</p>
            <div class="link_btn">
                复制地址
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'promotion',
    }
</script>

<style lang="scss" scoped>
.promotion{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: #4a1901;
  background: url('../../../static/images/promotion_bg.png');
  background-size: contain;
}
.promotion_code{
    position: relative;
    margin: 120px auto 20px;
    padding-top: 140px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 702px;
    height: 700px;
}
.promotion_imgWrap{
    position: absolute;
    top: 128px;
    left: 0;
    right: 0;
    margin: auto;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    background: skyblue;
}
.promotion_img{
    width: 100%;
    height: 100%;
}
.promotion_text{
    font-size: 30px;
    line-height: 60px;
    color: #ff8441;
}
.promotion_text span{
    margin: 0 20px;
}
.code{
    margin: 100px auto 20px;
    width: 248px;
    height: 248px;
    background: red;
}
.promotion_link{
    margin-top: 80px;
}
.link_btn{
    margin: 60px auto 0;
    width: 400px;
    height: 80px;
    line-height: 80px;
    border-radius: 100px;
    background: red;
}
</style>