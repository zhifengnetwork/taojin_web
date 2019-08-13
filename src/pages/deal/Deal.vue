<template>
  <div class="height-88">
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
.deal_list{
  padding: 24px;
  text-align: left;
  letter-spacing: 2px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
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