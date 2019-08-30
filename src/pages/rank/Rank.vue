<template>
  <div class="height-88 rank">
    <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader custom-title="排位" :custom-fixed="true"></TopHeader>
    <div class="notice">
      <p><span>{{count}}</span></p>
      <p>出局ID总数</p>
    </div>
    <div class="rank_list">
      <ul class="rank_title clearfix">
        <li>排名</li>
        <li>时间</li>
        <li>备注</li>
      </ul>
      <div class="item_content" @scroll="page">
        <ul class="rank_item" v-for="(item,index) in rank_info" :key="index">
          <li>{{item.rank}}</li>
          <li>{{item.rank_time}}</li>
          <li>前面还有{{item.num}}位</li>
        </ul>
        <Null style="margin-top:-120px;" text="排位" v-if="flag"></Null>
      </div>
    </div>
    <Navigate></Navigate>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name:'Rank',
    data(){
      return{
        rank_info:[],
        count:'',
        pages:1,
        flag:false
      }
    },
    mounted(){
      this.initalize();
    },
    methods:{
      initalize(){
        let _this = this;
        this.$axios.post('ranking/my_ranking',{
            token:localStorage.getItem('token'),
            page:_this.pages
        })
        .then(function(res){
            console.log(res);
            if(res.data.status == 1){
              _this.count = res.data.data.count;
              for(let i=0;i<res.data.data.rank_list.length;i++){
                _this.rank_info.push(res.data.data.rank_list[i]);
              }
              if(res.data.data.rank_list==''){
                _this.flag = true;
              }
            }else{
              Toast(res.data.msg)
            }
        })
        .catch(function(error){
            console.log(error);
        })
      },
      page(e){
        if(e.target.scrollTop+e.target.offsetHeight==e.target.scrollHeight){
          this.pages++;
          this.initalize();
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
.rank{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #4a1901;
	overflow-y: scroll;
  background: url('../../../static/images/public_bg.png') no-repeat;
  background-size: cover;
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
.rank_title li,.rank_item li{
  float: left;
  width: 30%;
  line-height: 100px;
  border-bottom: 1px solid #c17b2a;
}
.rank_title li:nth-of-type(2),.rank_item li:nth-of-type(2){
  width: 40%;
}
.item_content{
  width:100%;
  height:86%;
  overflow-y: scroll;
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
  background: url('../../../static/images/rank_notice.png') no-repeat;
  background-size: contain;
}
.notice span{
  font-size: 36px;
  margin-right: 15px;
}
</style>