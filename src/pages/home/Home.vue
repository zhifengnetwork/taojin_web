<template>
  <div class="home">
    <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="info-o"
    >
      通知内容6666666666666666666666666666666666666
    </van-notice-bar>

    <div class="mine">
        <img class="mine_img" src="">
    </div> 
    <div class="mine_info">
      <p>220元</p>
      <p>数字波动</p>
    </div>

    <div class="mine_btns">
        <span class="mine_btn">
          <router-link to="buy_item">
            购买道具
          </router-link>
        </span>
        <span class="mine_btn">
          <router-link to="bonus">
            奖金池
          </router-link>
        </span>
    </div>

    <div class="mask">
      <div class="mask_content">
        <h3 class="content_title">中奖名单</h3>
        <div class="list_title">
            <span>ID</span>
            <span>手机号码</span>
        </div>
        <div class="list_content">
          <div class="list_info">
              <span>2019.07.27 18:05:23</span>
              <span>134×××××786</span>
          </div>
        </div>
      </div>
      <div class="mask_off">
        X
      </div>
    </div>
    <Navigate></Navigate>
  </div>
</template>

<script>
  export default {
    name:'Home',
    data(){
      return{

      }
    }
  }
</script>

<style lang="scss" scoped>
.mine{
  margin: 100px auto 20px;
  width: 712px;
  height: 712px;
  overflow: hidden;
  background: red;
  border-radius: 50%;
}
.mine_img{
  width: 100%;
  height: 100%;
}
.mine_info{
  line-height: 50px;
}
.mine_info :nth-child(2){
  color:#999;
}
.mine_btns{
  margin-top: 60px;
}
.mine_btn{
  margin: 0 50px;
  display: inline-block;
  width: 250px;
  height: 100px;
  line-height: 100px;
  border: 1px solid #ccc;
  background: #fff;
}
.mask{
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.8);
  z-index: 20;
}
.mask_content{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 712px;
  height: 700px;
  overflow: hidden;
  border-radius: 50px;
  background: #fff;
}
.content_title{
  line-height: 100px;
  border-bottom: 1px solid #ccc;
}
.list_content{
  height: 500px;
  overflow-y: scroll;
}
.list_title span,.list_info span{
  display: inline-block;
  width: 48%;
  line-height: 100px;
}
.mask_off{
  position: absolute;
  top: 80vh;
  left: 0;
  right: 0;
  margin: auto;
  width: 120px;
  height: 120px;
  line-height: 120px;
  color: #fff;
  font-size: 80px;
  border:1px solid #fff;
  border-radius: 50%;
}
</style>