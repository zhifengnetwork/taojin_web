<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
        <TopHeader back-url="" style="border:0;" custom-title=" " :custom-fixed="true" custom-rgb="transparent" custom-col>
            <!-- 返回按钮 -->
            <i slot="backBtn" class="iconfont iconfanhui"></i>
        </TopHeader>
        <div class="promotion_code">
            <div class="promotion_imgWrap">
                <img class="promotion_img" src="">
            </div>
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
.promotion_code{
    position: relative;
    margin: 40px auto 20px;
    padding-top: 140px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 712px;
    height: 850px;
    background: #00ffff;
}
.promotion_imgWrap{
    position: absolute;
    top: -100px;
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
}
.promotion_text:nth-of-type(1) span{
    color: #ff0000;
}
.promotion_text span{
    margin: 0 20px;
}
.code{
    margin: 0 auto 20px;
    width: 500px;
    height: 500px;
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