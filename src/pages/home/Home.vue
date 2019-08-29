<template>
  <div class="home">
    <van-notice-bar class="notice"
      color="#642903"
      background="#a8dbff"
      left-icon="static/images/notice.png"
      :text="home.notice"
    >
    </van-notice-bar>

    <div class="mine_info">
      <p>{{home.integral_num}}<span>元</span></p>
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
    
    <div class="left_icon" @click="remov">
      <img src="static/images/home_iconL.png">
      <p>种植场</p>
    </div>
    <div class="right_icon" @click="remov">
      <img src="static/images/home_iconR.png">
      <p>养殖场</p>
    </div>
    
    <div class="give" v-if="home.is_give==1" @click="give_mask">
      <img class="give_img" src="static/images/sugar.png">
    </div>
    <div class="give_mask" v-if="give">
      <div class="give_content">
        <div class="give_text">恭喜你获得了 {{give_num.num}}<img src="static/images/sugar.png"></div>
        <div class="give_btn" @click="give_mask">确定</div>
      </div>
    </div>
    <!-- 动图 -->
    <!-- <div class="cart">
      <img src="static/images/cart.png">
    </div>
    <div class="eagle_left">
      <img src="static/images/eagle_left.png">
    </div>
    <div class="eagle_right">
      <img src="static/images/eagle_right.png">
    </div> -->
    <!-- 购买道具弹窗 -->
    <div class="buyitem_mask" v-show="buyitem">
      <div class="buyitem">
        <img class="buyitem_img" :src="home.logo">
        <div class="buyitem_price">￥{{home.money}}</div>
        <div class="buyitem_num">
          <span @click="minus">-</span>
          <input v-model="buyitem_num" @input="num" type="text">
          <span @click="add">+</span>
        </div>
        <div class="buyitem_btn" @click="buyItem">购买</div>
        <div class="buyitem_back" @click="buyMask">
          <img class="buyitem_backimg" src="static/images/buyitem_backimg.png">
        </div>
      </div>
    </div>
    <!-- 中奖弹窗 -->
    <div class="mask" v-if="this.$store.state.prize&&maskInfo!=''">
      <div class="mask_content">
        <div class="list_title">
            <span>中奖时间</span>
            <span>手机号码</span>
        </div>
        <div class="list_content">
          <div class="list_info" v-for="(item,index) in maskInfo" :key="index">
              <span>{{item.rank_time}}</span>
              <span>{{item.phone}}</span>
          </div>
        </div>
        <div class="mask_off" @click="mask_off"></div>
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
        buyitem_num: 1,
        home: '',
        maskInfo:'',
        give:false,
        give_num:''
      }
    },
    mounted(){
      let _this = this;
      this.initalize();
      this.$axios.post('index/reward_list')
      .then(function(res){
          console.log(res);
          _this.maskInfo = res.data.data;
      })
      .catch(function(error){
          console.log(error);
      })
    },
    methods:{
      initalize(){
        let _this = this;
        this.$axios.post('index/index')
        .then(function(res){
            console.log(res);
            _this.home = res.data.data;
        })
        .catch(function(error){
            console.log(error);
        })
      },
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
      remov(){
          Toast('暂未开通');
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
              _this.initalize();
              _this.buyitem = false;
            }else{
              Toast(res.data.msg)
            }
        })
        .catch(function(error){
            console.log(error);
        })
      },
      mask_off(){
        this.$store.state.prize = false;
      },
      num(e){
        this.buyitem_num = e.target.value.replace(/\D/gi,"")
        if(Number(e.target.value)<0){
            this.buyitem_num = 1;
        }
      },
      give_mask(){
        if(!this.give){
          let _this = this;
          this.$axios.post('index/receive_give',{
              token:localStorage.getItem('token')
          })
          .then(function(res){
              console.log(res);
              if(res.data.status == 1){
                _this.give_num = res.data.data;
              }else{
                Toast(res.data.msg)
              }
          })
          .catch(function(error){
              console.log(error);
          })
        }else{
          location.reload()
        }
        this.give = !this.give;
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
  width: 100%;
  height: 100%;
  background: url("../../../static/images/home_bg.gif") no-repeat;
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
  background: url('../../../static/images/home_btn.png') no-repeat;
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
.give{
  position: absolute;
  top: 520px;
  right: 24px;
  width: 80px;
  height: 60px;
  animation: give 1s infinite 0.5s;
}
@keyframes give{
  0%{transform: scale(1);}
  50%{transform: scale(1.2);}
  100%{transform: scale(1);}
}
.give_img{
  width: 100%;
  height: 100%;
}
.give_mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 20;
}
.give_content{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 500px;
  height: 300px;
  background: #fdcf79;
  border: 4px solid #8c3800;
  border-radius: 20px;
}
.give_text{
  line-height: 200px;
  font-size: 40px;
}
.give_text img{
  margin-left: 20px;
  width: 80px;
  height: 60px;
  vertical-align: middle;
}
.give_btn{
    margin: 0 auto 0;
    width: 140px;
    height: 65px;
    line-height: 65px;
    color: #fff;
    font-size: 28px;
    background: url('../../../static/images/sugar_btn.png') no-repeat;
    background-size: contain;
}
.mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  height: 900px;
  overflow: hidden;
  border-radius: 50px;
  background: url('../../../static/images/home_mask.png')no-repeat;
  background-size: contain;
}
.content_title{
  line-height: 100px;
  border-bottom: 1px solid #ccc;
}
.list_content{
  margin: 0 auto;
  width: 78%;
  height: 480px;
  overflow-y: scroll;
}
.list_title{
  margin: 260px auto 0;
  width: 78%;
}
.list_info{
  margin: 0 auto;
}
.list_title span,.list_info span{
  display: inline-block;
  width: 49%;
  line-height: 100px;
}
.mask_off{
  position: absolute;
  top: 170px;
  right: 80px;
  margin: auto;
  width: 40px;
  height: 40px;
  color: #fff;
  font-size: 80px;
  background: url('../../../static/images/mask_back.png')no-repeat;
  background-size: contain;
}
.buyitem_mask{
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
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
  background: url('../../../static/images/buyitem.png') no-repeat;
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