<template>
    <div class="height-88 withdraw_wrap">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" :custom-title="egg?'收益提现':'账户提现'" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/head_back.png">
            
		</TopHeader>
        <div class="money">
            <p class="money_num">
                <img class="money_img" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/withdraw_money.png">
                {{withdraw.money}}
            </p>
        </div>
        <div class="withdraw_content">
            <div class="type">
                <div class="type_title">选择提现方式</div>
                <div class="type_btns">
                    <img class="type_img" :class="tp==1?'active':''" @click="type(1)" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/alipay.png">
                    <img class="type_img" v-if="withdraw.card!=''" :class="tp==2?'active':''" @click="type(2)" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/bank.png">
                    <span class="type_btn" @click="withdraw_bank">+添加银行卡</span>
                </div>
            </div>
            <div class="alipay" v-if="tp==1">
                <router-link to="withdraw_alipay">
                    {{withdraw.alipay.number||'输入支付宝账号'}}
                    <div class="alipay_icon">
                        <van-icon name="arrow"/>
                    </div>
                </router-link>
            </div>
            <div class="alipay" v-if="tp==2">
                <router-link to="withdraw_bank">
                    {{withdraw.card[0].number||'输入银行卡号'}}
                    <div class="alipay_icon">
                        <van-icon name="arrow"/>
                    </div>
                </router-link>
            </div>
            <div class="withdraw">
                <h3 class="withdraw_title">提现金额</h3>
                <div class="withdraw_inp">
                    <input class="withdraw_input" v-model="money" @focus="getFocus" @input="mone" placeholder="请输入提现金额" type="text">
                    <div class="withdraw_all" @click="all">全部提现</div>
                </div>
                <div class="withdraw_inp">
                    <input class="withdraw_input" v-model="paypwd" @focus="getFocus" placeholder="请输入支付密码" type="password">
                </div>
                <div class="withdraw_tax">
                    <span class="withdraw_tax_text">手续费</span>
                    <span class="withdraw_tax_num">{{rate_decimals}}</span>
                </div>
                <div class="withdraw_tax">
                    <span class="withdraw_tax_text">实际到账</span>
                    <span class="withdraw_tax_num">{{num}}</span>
                </div>
            </div>
            <div class="withdraw_btn" @click="send">
                申请提交
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'withdraw',
        data(){
            return {
                withdraw:'',
                tp:1,
                money:'',
                rate_decimals:'',
                num:'',
                paypwd:'',
                flag:true,
                egg:false
            }
        },
        mounted(){
            if(this.$route.query){
                this.egg = this.$route.query.egg;
            }
            this.initalize();
        },
        methods:{
            initalize(){
                let _this = this;
                this.$axios.post('user/withdrawal',{
                    token:localStorage.getItem('token')
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        _this.withdraw = res.data.data;
                        if(_this.egg){
                            _this.withdraw.money = res.data.data.egg_num;
                        }
                    }else{
                        Toast(res.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            withdraw_bank(){
                this.$router.push('withdraw_bank')
            },
            type(flag){
                this.tp = flag;
            },
            mone(e){
                this.money = e.target.value.replace(/\D/gi,"")
                if(Number(e.target.value)>Number(this.withdraw.money)){
                    this.money = parseInt(this.withdraw.money)
                }
                if(Number(e.target.value)<0){
                    this.money = 0
                }
                this.rate_decimals = Math.floor((this.money*this.withdraw.rate_decimals)*100)/100;
                this.num = this.money-this.rate_decimals;
            },
            all(){
                this.money = this.withdraw.money;
                this.rate_decimals = Math.floor((this.money*this.withdraw.rate_decimals)*100)/100;
                this.num =  Math.floor(this.money*100-this.rate_decimals*100)/100;
            },
            send(){
                if(!this.money){
                    Toast('请输入提现金额')
                    return false;
                }
                if(!this.paypwd){
                    Toast('请输入支付密码')
                    return false;
                }
                if(this.tp==2&&this.withdraw.card==''){
                    Toast('请绑定银行卡')
                    return false;
                }
                if(!this.flag){
                    return false;
                }
                this.flag = false;
                let _this = this;
                let card = null;
                if(this.tp==2){
                    card = _this.withdraw.card[0].id||'';
                }
                this.$axios.post('user/withdraw',{
                    token:localStorage.getItem('token'),
                    type:_this.tp,
                    money:_this.money,
                    card_id:card,
                    paypwd:_this.paypwd,
                    pay_type:_this.egg?'2':'1'
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        Toast.success('提交成功,等待审核');
                        _this.$router.push({name:'User'})
                    }else{
                        Toast(res.data.msg)
                    }
                    _this.flag = true;
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            getFocus() {
                window.addEventListener('focusout', function () {
                    window.scrollTo(0,0);
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
.withdraw_wrap{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #4a1901;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; 
  background: #ffda9e;
}
.money{
    width: 100%;
    height: 280px;
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/withdraw_bg.png') no-repeat;
    background-size: contain;
}
.money_img{
    margin-right: 15px;
    width: 80px;
    height: 80px;
    vertical-align: middle;
}
.money_num{
    line-height: 280px;
    font-size: 30px;
}
.type{
    text-align: left;
}
.type_btns{
    margin-top: 20px;
}
.type_img{
    pointer-events: auto;
    margin: 0 20px;
    width: 54px;
    height: 54px;
    vertical-align: middle;
}
.active{
    transform: scale(1.4);
}
.type_btn{
    height: 62px;
    line-height: 62px;
    padding: 20px 30px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: 2px solid #4a1901;
    border-radius: 10px;
    background: #fff;
}
.alipay{
  position: relative;
  margin: 10px 0;
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: left;
  text-indent: 24px;
  border-bottom: 1px solid #8c3800;
}
.alipay_icon{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 20px;
  margin: auto;
}
.withdraw_content{
    margin: 20px auto;
    width: 702px;
    height: 870px;
    background: #ffe4b8;
    border: 4px solid #c17b2a;
    padding: 24px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.withdraw{
    text-align: left;
    text-indent: 24px;
}
.withdraw_title{
    line-height: 100px;
    font-weight: normal;
}
.withdraw_inp{
    margin-bottom: 20px;
    width: 100%;
    height: 100px;
    line-height: 100px;
    padding-left: 24px; 
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-bottom: 1px solid #8c3800;   
}
.withdraw_input{
    float: left;
    width: 72%;
}
.withdraw_all{
    float: left;
    width: 25%;
}
.withdraw_tax{
    margin: 20px auto;
    position: relative;
    width: 100%;
    height: 66px;
    line-height: 66px;
    text-indent: 24px;
    background: #ffedcf;
}
.withdraw_tax_num{
    float: right;
    margin-right: 60px;
}
.withdraw_tax_text{
    display: block;
    float: left;
}
.withdraw_tax_text::after{
    content:'元';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 20px;
    margin: auto;
}
.withdraw_btn{
    margin: 40px auto 0;
    width: 140px;
    height: 65px;
    line-height: 65px;
    color: #fff;
    font-size: 28px;
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/sugar_btn.png') no-repeat;
    background-size: contain;
}
</style>