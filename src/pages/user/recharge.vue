<template>
    <div class="height-88 recharge">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="充值" :custom-fixed="true" custom-rgb="#fdd287" custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/head_back.png">
		</TopHeader>
        <div class="code">
            <img :src="recharge.qr_code">
        </div>
        <div class="recharge_text">
            支付宝充值二维码
        </div>
        <div class="recharge_item">
            客服1号:&nbsp;&nbsp;{{recharge.customer_service_three}}
        </div>
        <div class="recharge_item">
            客服2号:&nbsp;&nbsp;{{recharge.customer_service_two}}
        </div>
        <div class="recharge_item">
            客服3号:&nbsp;&nbsp;{{recharge.customer_service_one}}
        </div>
        <div class="code">
            <img :src="recharge.money_qr_code">
        </div>
        <div class="recharge_text">
            USDT充值地址
        </div>
        <div class="recharge_tips">
            <p>提示：链类型请检查选择ERC20</p>
        </div>
        <div class="recharge_item">
            {{recharge.recharge_link}}
        </div>
        <div class="recharge_btn" @click="copyUrl">
            复制
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'recharge',
        data(){
            return{
                recharge:''
            }
        },
        mounted(){
            this.initalize();
        },
        methods:{
            initalize(){
                let _this = this;
                this.$axios.post('farm/receivables',{
                    token:localStorage.getItem('token')
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        _this.recharge = res.data.data;
                    }else{
                        Toast(res.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            copyUrl(){
                const input = document.createElement('input')
                document.body.appendChild(input)
                input.setAttribute('value',this.recharge.recharge_link)
                input.select()
                if(document.execCommand('copy')) {
                    document.execCommand('copy')
                }
                document.body.removeChild(input)
                Toast('复制成功')
            },
        }
    }
</script>

<style lang="scss" scoped>
.recharge{
    height: 100vh;
    padding-bottom: 200px;
    overflow-y: scroll;
}
.code{
    margin: 0 auto;
    width: 702px;
    height: 380px;
    border: 4px solid #c17b2a;
    border-radius: 10px;
    background: #ffe4b8;
    color: #c3ae8b;
    img{
        height: 100%;
        pointer-events: auto;
    }
}
.recharge_item{
    margin: 0 auto 30px;
    width: 702px;
    height: 80px;
    line-height: 80px;
    text-align: left;
    text-indent: 35px;
    border-left: 4px solid #916f49;
    border-top: 4px solid #916f49;
    background: #b38a5b;
}
.recharge_tips{
    margin-left: 24px;
    margin-bottom: 20px;
    text-align: left;
    color: #333;
}
.recharge_text{
    line-height: 110px;
}
.recharge_btn{
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