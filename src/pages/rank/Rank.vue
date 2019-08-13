<template>
  <div class="height-88">
    <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader custom-title="排位" :custom-fixed="true"></TopHeader>
    <div class="rank_list">
      <ul class="rank_title">
        <li>排名</li>
        <li>时间</li>
        <li>备注</li>
      </ul>
      <ul class="rank_item">
        <li>5</li>
        <li>2017-07-14 14:30:25</li>
        <li>前面还有04位</li>
      </ul>
      <ul class="rank_item">
        <li>5</li>
        <li>2017-07-14 14:30:25</li>
        <li>前面还有04位</li>
      </ul>
      <ul class="rank_item">
        <li>5</li>
        <li>2017-07-14 14:30:25</li>
        <li>前面还有04位</li>
      </ul>
    </div>
    <div class="notice">
      <span>现已出局ID至:145人</span>
      <span>出局ID总数:145人</span>
    </div>
    <Navigate></Navigate>
  </div>
</template>

<script>
  export default {
    name:'Rank',
    data(){
      return{

      }
    }
  }
</script>

<style lang="scss" scoped>
.rank_title li{
  margin-bottom: 20px;
  background: #f5f5f5;
}
.rank_title li,.rank_item li{
  float: left;
  width: 30%;
  line-height: 100px;
}
.rank_title li:nth-of-type(2),.rank_item li:nth-of-type(2){
  width: 40%;
}
.notice{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 140px;
  margin: auto;
  width: 712px;
  height: 100px;
  line-height: 100px;
  text-align: left;
  text-indent: 30px;
  border-radius: 100px;
  background: orange;
}
.notice span:nth-of-type(2){
  float: right;
  margin-right: 30px;
}
</style>