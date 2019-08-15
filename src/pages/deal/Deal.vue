<template>
  <div class="height-88 deal">
    <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader custom-title="挂卖" :custom-fixed="true"></TopHeader>
    <div class="deal_list">
      <p class="list_text">ID:451545<span>￥648</span></p>
      <p class="list_text">抢单人:平台</p>
      <p class="list_text">挂单数量:10</p>
      <p class="list_text">挂单时间:2019-07-12  15:23:45</p>
    </div>
    <div class="deal_list">
      <p class="list_text">ID:451545<span>￥648</span></p>
      <p class="list_text">抢单人:平台</p>
      <p class="list_text">挂单数量:10</p>
      <p class="list_text">挂单时间:2019-07-12  15:23:45</p>
    </div>
    <div class="deal_list">
      <p class="list_text">ID:451545<span>￥648</span></p>
      <p class="list_text">抢单人:平台</p>
      <p class="list_text">挂单数量:10</p>
      <p class="list_text">挂单时间:2019-07-12  15:23:45</p>
    </div>
    <div class="deal_list">
      <p class="list_text">ID:451545<span>￥648</span></p>
      <p class="list_text">抢单人:平台</p>
      <p class="list_text">挂单数量:10</p>
      <p class="list_text">挂单时间:2019-07-12  15:23:45</p>
    </div>
    <Navigate></Navigate>
  </div>
</template>

<script>
  export default {
    name:'Deal',
    data(){
      return{

      }
    }
  }
</script>

<style lang="scss" scoped>
.deal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: #4a1901;
  background: url('../../../static/images/public_bg.png');
  background-size: contain;
}
.deal_list{
  margin: 20px auto;
  width: 702px;
  height: 258px;
  text-align: left;
  letter-spacing: 2px;
  line-height: 50px;
  padding: 24px;
  background: #ffc550;
  border-radius: 20px;
  border: 4px solid #c17b2a;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.list_text span{
  float: right;
  color: #ff0000;
}
.deal_list:nth-last-of-type(2){
  margin-bottom: 88px;
}
</style>