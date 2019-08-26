<template>
  <div class="height-88 deal">
    <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader custom-title="挂卖" :custom-fixed="true"></TopHeader>
    <div class="deal_wrap" @scroll="page">
      <div class="deal_list" v-for="(item,index) in deal_info" :key="index">
        <p class="list_text">ID:{{item.id}}<span>￥{{item.all_money}}</span></p>
        <p class="list_text">抢单人:平台</p>
        <p class="list_text">挂单数量:{{item.currency_num}}</p>
        <p class="list_text">挂单时间:{{item.add_time}}</p>
      </div>
    </div>
    <Navigate></Navigate>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name:'Deal',
    data(){
      return{
        deal_info:[],
        pages:1
      }
    },
    mounted(){
        this.initalize();      
    },
    methods:{
      initalize(){
        let _this = this;
        this.$axios.post('ranking/user_auction',{
            page:_this.pages
        })
        .then(function(res){
            console.log(res);
            console.log(res);
            if(res.data.status == 1){
              for(let i=0;i<res.data.data.length;i++){
                _this.deal_info.push(res.data.data[i]);
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
.deal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: #4a1901;
  background: url('../../../static/images/public_bg.png') no-repeat;
  background-size: cover;
}
.deal_wrap{
  height: 85vh;
  width: 100%;
  overflow-y: scroll;
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
.deal_list:nth-last-of-type(1){
  margin-bottom: 88px;
}
</style>