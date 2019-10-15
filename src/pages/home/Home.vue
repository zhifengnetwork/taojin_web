<template>
  <div class="home">
    <van-notice-bar class="notice"
      color="#642903"
      background="#a8dbff"
      left-icon="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/notice.png"
      :text="home.notice"
    >
    </van-notice-bar>

    <div class="mine_info">
      <p>{{home.integral_num}}</p>
    </div>

    <div class="mine_btns">
        <span class="mine_btn" @click="buyMask">
          <router-link to="#">
            实时参与
          </router-link>
        </span>
        <span class="mine_btn">
          <router-link to="bonus">
            购买时间段
          </router-link>
        </span>
    </div>
    
    <div class="left_icon" @click="remov">
      <img src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/home_iconL.png">
      <p>种植场</p>
    </div>
    <div class="right_icon" @click="remov">
      <img src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/home_iconR.png">
      <p>养殖场</p>
    </div>
    <div class="left_icon btn_top" @click="remov">
      <img src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/home_iconL.png">
      <p>全球购物</p>
    </div>
    <div class="right_icon btn_top" @click="remov">
      <img src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/home_iconR.png">
      <p>全民直播</p>
    </div>
    <div class="left_icon btn2_top" @click="remov">
      <img src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/home_iconL.png">
      <p>数字游戏</p>
    </div>
    <div class="give" v-if="home.is_give==1" @click="give_mask">
      <img class="give_img" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/sugar.png">
    </div>
    <div class="give_mask" v-if="give">
      <div class="give_content">
        <div class="give_text">恭喜你获得了 {{give_num.num}}<img src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/sugar.png"></div>
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
          <input v-model="buyitem_num" @input="num" @focus="getFocus" type="text">
          <span @click="add">+</span>
        </div>
        <div class="buyitem_btn" @click="buyItem">购买</div>
        <div class="buyitem_back" @click="buyMask">
          <img class="buyitem_backimg" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/buyitem_backimg.png">
        </div>
      </div>
    </div>
    <!-- 中奖弹窗 -->
    <div class="mask" v-if="maskInfo!=''">
      <div class="mask_content">
        <div class="list_title">
            <span v-if="maskInfo!=1">中奖时间</span>
            <span v-if="maskInfo!=1">手机号码</span>
        </div>
        <div class="list_content" @scroll="page">
          <div v-if="maskInfo!=1">
            <div class="list_info" v-for="(item,index) in maskInfo" :key="index">
                <span>{{item.rank_time}}</span>
                <span>{{item.phone}}</span>
            </div>
          </div>
          <div class="no_text" v-else>
            <h3>{{noDate}}</h3>
            <h2>无人中奖--再接再厉</h2>
          </div>
        </div>
        <div class="mask_off" @click="mask_off"></div>
      </div>
    </div>
    <!-- 更新弹窗 -->
    <!-- <div class="buyitem_mask" v-if="home.update==1">
      <div class="buyitem" style="height:200px;line-height:60px;font-size:18px;background-size:100% 100%;">
        <h3>检测到有新版本!</h3>
        <h3>是否更新?</h3>
        <div class="buyitem_btn" @click="update(true)" style="display:inline-block;margin:0 10px;">去更新</div>
        <div class="buyitem_btn" @click="update(false)" style="display:inline-block;margin:0 10px;">暂不更新</div>
      </div>
    </div> -->
    <iframe v-if="maskInfo!=''" :src="music_url" allow="autoplay" hidden />
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
        maskInfo:[],
        give:false,
        give_num:'',
        flag:true,
        pages:1,
        noDate:'',
        music_url:''
      }
    },
    mounted(){
      let _this = this;
      this.initalize();
      this.reward_list();
      this.music();
      this.$axios.post('user/userinfo',{
          token:localStorage.getItem('token')
      })
      .then(function(res){
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
            let reg = new RegExp("(^|&)time=([^&]*)(&|$)", "i");
            let r = window.location.search.substr(1).match(reg);
            let time = r ? Number(r[2])+60:'';
            console.log(time >= Math.round(new Date().getTime()/1000))
            if(r && time >= Math.round(new Date().getTime()/1000)){
              return false;
            }
            if(res.data.data.version != 1.1 && res.data.data.version ? true : false){
              let Version = Math.round(new Date().getTime()/1000); //定义一个时间作为版本号
              window.location.href = '/index.html?time='+ Version
            }
        })
        .catch(function(error){
            console.log(error);
        })
      },
      reward_list(){
        let _this = this;
        this.$axios.post('index/reward_list',{
            token:localStorage.getItem('token'),
            page:_this.pages,
            is_reward:1
        })
        .then(function(res){
            console.log(res);
            if(res.data.status == 2){
              _this.maskInfo = '1'
              _this.noDate = res.data.data
            }else{
              for(let i=0;i<res.data.data.length;i++){
                  _this.maskInfo.push(res.data.data[i]);
              }
            }
            if(res.data.data==''&&_this.pages==1){
                _this.flag = true;
            }
        })
        .catch(function(error){
            console.log(error);
        })
      },
      music(){
        let _this = this;
        this.$axios.post('user/music',{
            token:localStorage.getItem('token')
        })
        .then(function(res){
            console.log(res);
            if(res.data.status == 1){
              _this.music_url = res.data.data.music_url;
            }
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
        if(!_this.flag){
          Toast('交易中,请稍等');
          return false;
        }
        _this.flag = false;
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
              _this.flag = true;
            }else{
              _this.flag = true;
              Toast(res.data.msg)
            }
        })
        .catch(function(error){
            console.log(error);
        })
      },
      mask_off(){
        this.maskInfo = [];
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
                _this.home.is_give = 0;
              }else{
                Toast(res.data.msg)
              }
          })
          .catch(function(error){
              console.log(error);
          })
        }
        this.give = !this.give;
      },
      page(e){
          if(e.target.scrollTop+e.target.offsetHeight>=e.target.scrollHeight-5){
              this.pages++;
              this.reward_list();
          }
      },
      getFocus() {
          window.addEventListener('focusout', function () {
              window.scrollTo(0,0);
          })
      },
      update(app){
        if(app){
          this.$router.push('Download');
        }else{
          this.home.update = 0;
        }
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
	overflow-y: scroll;
  -webkit-overflow-scrolling: touch; 
  background: url("https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/home_bg.gif") no-repeat;
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
  position: relative;
  margin: 100px auto 0;
  color: #fff;
  width: 500px;
  height: 100px;
  text-align: left;
  text-indent: 100px;
  line-height: 90px;
  font-size: 60px;
  letter-spacing: 5px;
  font-weight: bold;
  background: url("https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/home_m.png") no-repeat;
  background-size: contain;
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
  margin: 52vh 50px 0;
  display: inline-block;
  width: 180px;
  height: 100px;
  line-height: 60px;
  font-size: 32px;
  font-weight: bold;
  background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/home_btn.png') no-repeat;
  background-size: contain;
}
.mine_btn a{
  color: #fff;  
}
.left_icon{
  position: absolute;
  top: 350px;
  left: 20px;
  width: 120px;
}
.right_icon{
  position: absolute;
  top: 350px;
  right: 20px;
  width: 120px;
}
.btn_top{
  top: 500px;
}
.btn2_top{
  top: 650px;
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
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/sugar_btn.png') no-repeat;
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
  background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/home_mask.png')no-repeat;
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
  -webkit-overflow-scrolling: touch; 
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
.no_text{
  margin-top: 80px;
  line-height: 120px;
  h2{
    font-size: 36px;
    font-weight: normal;
  }
  h3{
    font-weight: normal;
  }
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
  background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/mask_back.png')no-repeat;
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
  background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/buyitem.png') no-repeat;
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
  background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/sugar_btn.png')no-repeat;
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