<template>
  <div class="user">
    <div class="userInfo">
      <!-- 用户信息 -->
      <div class="userInfo_content">
        <div class="userInfo_picture">
          <router-link :to="{path:'user_info',query:{'user_info':JSON.stringify(user_info)}}">
            <img class="userInfo_img" :src="user_info.avatar">
          </router-link>
        </div>
        <div class="userInfo_text">
          <p class="userInfo_name">{{user_info.nick_name}}<span class="userInfo_id">ID:{{user_info.id}}</span></p>
          <p>注册时间: {{user_info.add_time}}</p>
        </div>
        <div class="userInfo_tag">
          矿工
        </div>
      </div>
    </div>
    <!-- 列表项 -->
    <div class="user_option">
      <div class="option_item" v-for="(item,index) in option_item" :key="index">
        <router-link :to="{path:item.pages,query:{'user_info':JSON.stringify(user_info)}}">
          <img class="option_img" :src="item.img">
          <p>{{item.text}}</p>
        </router-link>
      </div>
    </div>
    <!-- 底部导航 -->
    <Navigate></Navigate>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name:'User',
    data(){
      return{
        // 订单
        user_order:[
          
        ],
        option_item:[
          {text:'余额',img:'static/images/user/balance.png',pages:'balance'},
          {text:'糖果',img:'static/images/user/sugar.png',pages:'sugar'},
          {text:'币',img:'static/images/user/currency.png',pages:'currency'},
          {text:'我的订单',img:'static/images/user/my_order.png',pages:'my_order'},
          {text:'我的团队',img:'static/images/user/team.png',pages:'my_team'},
          {text:'开奖记录',img:'static/images/user/prize.png',pages:'prize'},
          {text:'我的推广',img:'static/images/user/promotion.png',pages:'promotion'}
        ],
        user_info:''
      }
    },
    mounted(){
      let _this = this;
      this.$axios.post('user/userinfo',{
          token:localStorage.getItem('token')
      })
      .then(function(res){
          console.log(res);
          if(res.data.status == 1){
            _this.user_info = res.data.data
          }else{
            Toast(res.data.msg)
          }
      })
      .catch(function(error){
          console.log(error);
      })
    },
    methods:{
      
    },
  }
</script>

<style lang="scss" scoped>
.user{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: #4a1901;
  background: url('../../../static/images/user_bg.png') no-repeat;
  background-size: cover;
}
.userInfo{
  position: relative;
  margin: 128px auto 40px;
  width: 702px;
  height: 170px;
  background: url('../../../static/images/user/userInfo_content.png') no-repeat;
  background-size: contain;
}
.userInfo_picture{
  position: relative;
  float: left;
  margin: 40px 30px;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
  border-bottom: 4px solid #97571e;
  background: #fff;
  box-sizing: border-box;
}
.userInfo_img{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 90%;
  height: 90%;
  border-radius: 50%;
}
.userInfo_id{
  margin-left: 20px;
  color: #fff;
  font-size: 30px;
}
.userInfo_text{
  float: left;
  margin-top: 40px;
  text-align: left;
  line-height: 50px;
}
.userInfo_name{
  font-size: 32px;
  line-height: 50px;
}
.userInfo_tag{
  position: absolute;
  top: 40px;
  right: 0;
  width: 120px;
  height: 54px;
  color: #fff;
  line-height: 54px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background: url('../../../static/images/user/userInfo_tag.png') no-repeat;
  background-size: contain;
}

// 选项列表
.user_option{
  margin: 0 auto;
  width: 702px;
}
.option_item{
  float: left;
  width: 33.3%;
  height: 210px;
  font-size: 30px;
  font-weight: bold;
  border-bottom: 1px solid #c17b2a;
  text-shadow: -1px 0 5px #622804,
              0 1px 5px #622804,
              1px 0 5px #622804,
              0 -1px 5px #622804;
}
.option_item:nth-last-of-type(1){
  border:0;
}
.option_item a{
  color: #fff;
  font-size: 30px;
}
.option_img{
  margin: 40px auto 20px;
  width: 80px;
  height: 80px;
}
.option_item:nth-of-type(2) .option_img{
  margin-top: 80px;
  width: 124px;
  height: 40px;
}
.option_item:nth-of-type(5) .option_img{
  width: 90px;
  height: 80px;
}
</style>