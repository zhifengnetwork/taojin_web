<template>
  <div class="user">
    <div class="userInfo">
      <!-- 用户信息 -->
      <div class="userInfo_content">
        <div class="userInfo_picture">
          <img class="userInfo_img" src="" alt="">
        </div>
        <div class="userInfo_text">
          <p class="userInfo_name">杰*不要啊</p>
          <p>ID:77591746</p>
          <p>注册时间:2019.08.08</p>
        </div>
        <div class="userInfo_tag">
          矿工
        </div>
      </div>
      <!-- 订单 -->
      <div class="user_orderWrap">
        <div class="user_order">
          <ul class="user_order_list">
            <li class="user_order_item">
              <p>666</p>
              <p>余额<van-icon name="arrow"/></p>
            </li>
            <li class="user_order_item">
              <p>686</p>
              <p>糖果<van-icon name="arrow"/></p>
            </li>
            <li class="user_order_item">
              <p>866</p>
              <p>币<van-icon name="arrow"/></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 列表项 -->
    <dir class="user_option">
      <div class="option_item">
        我的订单
        <div class="option_icon">
          <van-icon name="arrow"/>
        </div>
      </div>
      <div class="option_item">
        我的团队
        <div class="option_icon">
          <van-icon name="arrow"/>
        </div>
      </div>
      <div class="option_item">
        邀请链接
        <div class="option_icon">
          <van-icon name="arrow"/>
        </div>
      </div>
      <div class="option_item">
        我的推广
        <div class="option_icon">
          <van-icon name="arrow"/>
        </div>
      </div>
    </dir>
    <!-- 底部导航 -->
    <Navigate></Navigate>
  </div>
</template>

<script>
  export default {
    name:'User',
    data(){
      return{

      }
    }
  }
</script>

<style lang="scss" scoped>
.userInfo{
  width: 100%;
  height: 480px;
  background: red;
}
.userInfo_content{
  position: relative;
  width: 100%;
  height: 300px;
}
.userInfo_picture{
  float: left;
  margin: 40px 60px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  background: skyblue;
}
.userInfo_img{
  width: 100%;
  height: 100%;
}
.userInfo_text{
  float: left;
  margin-top: 80px;
  text-align: left;
  line-height: 50px;
}
.userInfo_name{
  font-size: 36px;
  line-height: 80px;
}
.userInfo_tag{
  position: absolute;
  top: 80px;
  right: 0;
  width: 160px;
  height: 80px;
  line-height: 80px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background: #00ffff;
}

// 订单
.user_orderWrap{
  padding: 0 24px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.user_order{
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: #fff;
}
.user_order_list{
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}
.user_order_item{
  position: relative;
  padding-top: 50px;
  width: 33%;
  height: 100%;
  line-height: 50px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.user_order_item::after{
  content: '';
  display: block;
  position: absolute;
  right: -2px;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 2px;
  height: 60px;
  background: #ccc;
}
// 选项列表
.user_option{
  width: 100%;
  padding: 5px 0;
  margin: 40px 0 100px;
  background: #f5f5f5;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.option_item{
  position: relative;
  margin: 10px 0;
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: left;
  text-indent: 60px;
  background: #fff;
}
.option_icon{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 20px;
  margin: auto;
}
.van-icon{
  vertical-align: text-top;
}
</style>