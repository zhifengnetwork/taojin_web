<template>
  <div class="height-88 rank">
    <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader custom-title="排位" :custom-fixed="true" custom-rgb="transparent" style="border:0;"></TopHeader>
    <div class="notice">
      <p><span>145</span>人</p>
      <p>出局ID总数</p>
    </div>
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
.rank{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: #4a1901;
  background: url('../../../static/images/public_bg.png');
  background-size: contain;
}
.rank_list{
  margin: 40px auto 88px;
  width: 702px;
  height: 800px;
  border-radius: 20px;
  border: 4px solid #c17b2a;
  background: #ffc550;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.rank_title li{
  margin-bottom: 20px;
}
.rank_title li,.rank_item li{
  float: left;
  width: 30%;
  line-height: 100px;
  border-bottom: 1px solid #c17b2a;
}
.rank_title li:nth-of-type(2),.rank_item li:nth-of-type(2){
  width: 40%;
}
.notice{
  margin: auto;
  width: 702px;
  height: 234px;
  line-height: 50px;
  padding-top: 60px;
  color: #4a1901;
  font-size: 30px;
  text-indent: 30px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background: url('../../../static/images/rank_notice.png');
  background-size: contain;
}
.notice span{
  font-size: 36px;
  margin-right: 15px;
}
</style>