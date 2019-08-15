<template>
  <div
    class="TopHeader" :style="{'position':customFixed ? 'fixed' : 'relative','background':customRgb,'color':customCol}">
    <div class="backBtn" @click="backAction">
      <slot name="backBtn"></slot>
    </div>
    <div class="title">{{customTitle}}</div>
    <div class="rightBtn">
      <slot name="rightBtn"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  props: {
    // 返回路径,不传默认返回上一页
    backUrl: {
      type: String
    },
    // 标题内容
    customTitle: {
      type: String,
      default: "标题"
    },
    // 是否固定在顶部
    customFixed: {
      type: Boolean,
      default: false
    },
    // 标题背景
    customRgb: {
      type: String,
      default: "#transparent"
    },
    //字体颜色
    customCol:{
        type:String,
        default:'#4a1901'
    } 
  },
  data() {
    return {};
  },
  methods: {
    // 后退按钮
    backAction() {
      if (this.backUrl) {
        this.$router.push(this.backUrl);
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.TopHeader{
    position:relative;
    left:0;
    top:0;
    display:flex;
    justify-content:space-between;
    width:100%;
    height:88px;
    line-height:88px;
    align-items:center;
    color:#4a1901;
    font-size:30px;
    letter-spacing: 2px;
    z-index:9;
}
.backBtn{
  position: relative;
}
.backBtn img{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 90px;
  height: 56px;
}
.iconfont{
    font-size:36px;
}
.title{
    text-align:center;
    width:70%;
    margin:0 auto;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
.rightBtn{
    padding-right:30px;
    position:absolute;
    right:0;
    top:0;
}
.iconfont{
    font-size:46px;
}
</style>