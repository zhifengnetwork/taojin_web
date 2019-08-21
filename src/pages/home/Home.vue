<template>
  <div class="home">
    <van-notice-bar class="notice"
      color="#642903"
      background="#a8dbff"
      left-icon="static/images/notice.png"
    >
      通知内容6666666666666666666666666666666666666
    </van-notice-bar>

    <div class="mine_info">
      <p>220<span>元</span></p>
    </div>

    <div class="mine_btns">
        <span class="mine_btn" @click="buyMask">
          <router-link to="#">
            购买道具
          </router-link>
        </span>
        <span class="mine_btn">
          <router-link to="bonus">
            矿池
          </router-link>
        </span>
    </div>
    
    <div class="left_icon">
      <img src="static/images/home_iconL.png">
      <p>渔场</p>
    </div>
    <div class="right_icon">
      <img src="static/images/home_iconR.png">
      <p>养殖场</p>
    </div>

    <!-- 动图 -->
    <div class="cart">
      <img src="static/images/cart.png">
    </div>
    <div class="eagle_left">
      <img src="static/images/eagle_left.png">
    </div>
    <div class="eagle_right">
      <img src="static/images/eagle_right.png">
    </div>
    <div class="buyitem_mask" v-show="buyitem">
      <div class="buyitem">
        <img class="buyitem_img" src="static/images/buyitem_img.png">
        <div class="buyitem_price">￥20</div>
        <div class="buyitem_num">
          <span @click="minus">-</span>
          <input v-model="buyitem_num" type="text">
          <span @click="add">+</span>
        </div>
        <div class="buyitem_btn" @click="buyItem">购买</div>
        <div class="buyitem_back" @click="buyMask">
          <img class="buyitem_backimg" src="static/images/buyitem_backimg.png">
        </div>
      </div>
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
  import { Toast } from 'vant';
  export default {
    name:'Home',
    data(){
      return{
        buyitem: false,
        buyitem_num: 1
      }
    },
    mounted(){
      let _this = this;
      this.$axios.post('index/index')
      .then(function(res){
          console.log(res);
      })
      .catch(function(error){
          console.log(error);
      })
    },
    methods:{
      buyMask(){
        this.buyitem = !this.buyitem;
      },
      minus(){
        if(this.buyitem_num==1){
          Toast('购买数量不能小于1');
          return false;
        }
        this.buyitem_num--;
      },
      add(){
        this.buyitem_num++;
      },
      buyItem(){
        let _this = this;
        this.$axios.post('ranking/buy_gold_shovel',{
            token:localStorage.getItem('token'),
            num:_this.buyitem_num
        })
        .then(function(res){
            console.log(res);
            if(res.data.status == 1){
              Toast.success('购买成功');
              _this.buyitem = false;
            }else{
              Toast(res.data.msg)
            }
        })
        .catch(function(error){
            console.log(error);
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
.home{
  position: fixed;
  left: 0;
  top: 0;
  color: #632904;
  width: 100vw;
  height: 100vh;
  background: url("../../../static/images/home_bg.png");
  background-size: cover;
}
.notice{
  position: relative;
  margin: 20px auto;
  width:660px;
  height:70px;
  box-sizing: border-box;
  border:1px solid #75a9eb;
}
.notice::before{
  content:'';
  display: block;
  position: absolute;
  left: -7px;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 14px;
  height: 14px;
  background: #a8dbff;
  border:1px solid #75a9eb;
  border-color:transparent transparent #75a9eb #75a9eb;
  transform: rotate(45deg);
}
.mine_info{
  margin-top: 100px;
  color: #fff;
  font-size: 60px;
  line-height: 50px;
  letter-spacing: 5px;
  font-weight: bold;
  text-shadow: -1px 0 5px #622804,
                0 1px 5px #622804,
                1px 0 5px #622804,
                0 -1px 5px #622804;
}
.mine_info span{
  margin-left: 10px;
  font-weight: normal;
  font-size: 40px;
}
.mine_btns{
  margin-top: 60px;
}
.mine_btn{
  margin: 60vh 50px 0;
  display: inline-block;
  width: 156px;
  height: 60px;
  line-height: 50px;
  font-size: 32px;
  font-weight: bold;
  background: url('../../../static/images/home_btn.png');
  background-size: contain;
}
.mine_btn a{
  color: #fff;  
}
.left_icon{
  position: absolute;
  top: 380px;
  left: 20px;
}
.right_icon{
  position: absolute;
  top: 380px;
  right: 20px;
}
.left_icon img,.right_icon img{
  width: 60px;
  height: 48px;
}
// 动图
.cart{
  position: absolute;
  left: 250px;
  bottom: 490px;
  width: 200px;
  height: 200px;
  animation: cart 4s infinite;
}
@keyframes cart{
  0%{left: 360px;bottom: 500px;transform:scale(0.6);}
  70%{left: 120px;bottom: 460px;transform:rotate(-5deg) scale(1.2);}
  80%{left: 120px;bottom: 460px;transform:rotate(-5deg) scale(1.2);}
  100%{left: 120px;bottom: 460px;transform:rotate(-5deg) scale(1.2);}
}
.eagle_left{
  position: absolute;
  width: 30px;
  height: 30px;
  left: 120px;
  animation: eagle_left 5s infinite;
}
@keyframes eagle_left{
  0%{top: 260px;}
  25%{top: 280px;}
  50%{top: 260px;}
  75%{top: 280px;}
  100%{top: 260px;}
}
.eagle_right{
  position: absolute;
  width: 60px;
  height: 60px;
  top: 320px;
  right: 120px;
  animation: eagle_right 5s infinite 0.5s;
}
@keyframes eagle_right{
  0%{transform: rotate(35deg)}
  25%{transform: rotate(15deg)}
  50%{transform: rotate(35deg)}
  75%{transform: rotate(15deg)}
  100%{transform: rotate(35deg)}
}
.cart img,.eagle_left img,.eagle_right img{
  width:100%;
  height:100%;
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
  width: 702px;
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
.buyitem_mask{
  position: absolute;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  background:rgba(0,0,0,.5);
  z-index: 20;
}
.buyitem{
  position:absolute;
  top:30vh;
  left:0;
  right:0;
  margin:auto;
  width:500px;
  height:600px;
  background: url('../../../static/images/buyitem.png');
  background-size: contain;
}
.buyitem_img{
  position:absolute;
  top:50px;
  left:220px;
  width:120px;
  height:150px;
}
.buyitem_price{
  margin-top: 210px;
}
.buyitem_num{
  width:200px;
  margin:80px auto;
}
.buyitem_num input{
  margin:0 10px;
  width:100px;
  height:36px;
  line-height: 36px;
  color:#fff;
  text-align: center;
  vertical-align: top;
  background:#b38a5b;
}
.buyitem_num span{
  display: inline-block;
  width: 32px;
  height: 36px;
  line-height: 36px;
  font-size: 36px;
  color: #a65421;
}
.buyitem_btn{
  margin: 0 auto;
  width: 140px;
  height: 65px;
  line-height: 65px;
  font-size: 28px;
  color: #fff;
  background: url('../../../static/images/sugar_btn.png')no-repeat;
  background-size: contain;
}
.buyitem_back{
  position:absolute;
  top:20px;
  right:20px;
  width:42px;
  height:42px;
}
.buyitem_backimg{
  width:100%;
  height:100%;
}
</style>