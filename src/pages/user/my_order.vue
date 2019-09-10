<template>
    <div class="height-88 order">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="我的订单" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/head_back.png">
            
		</TopHeader>
        <div class="item_wrap" @scroll="page">
            <div class="order_item" v-for="(item,index) in order" :key="index">
                <h3 class="order_title">订单号 {{item.order_no}}</h3>
                <div class="order_content">
                    <div class="order_imgWrap">
                        <img class="order_img" :src="goods.logo">
                    </div>
                    <div class="order_info">
                        <p class="order_text">{{goods.name}} <span>￥{{goods.money}}</span></p>
                    </div>
                    <div class="order_btns" @click="del(item.id)">
                        <div class="order_btn">删除</div>
                    </div>
                </div>
            </div>
            <Null text="订单" v-if="flag"></Null>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'my_order',
        data(){
            return {
                order:[],
                goods:'',
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
                this.$axios.post('ranking/order',{
                    token:localStorage.getItem('token'),
                    page:_this.pages
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        _this.goods = res.data.data.goods;
                        for(let i=0;i<res.data.data.ranking.length;i++){
                            _this.order.push(res.data.data.ranking[i]);
                        }
                        if(res.data.data.ranking==''&&_this.pages==1){
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
            del(id){
                let _this = this;
                this.$axios.post('ranking/order_del',{
                    token:localStorage.getItem('token'),
                    id:id
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        Toast.success('删除成功');
                        location.reload()
                    }else{
                        Toast(res.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            page(e){
                if(e.target.scrollTop+e.target.offsetHeight>=e.target.scrollHeight-5){
                    this.pages++;
                    this.initalize();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.order{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color:#4a1901;
    background: #ffda9e;
}
.item_wrap{
    width: 100%;
    height: 93vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; 
}
.order_item{
    position: relative;
    margin: 20px auto;
    width: 702px;
    height: 300px;
    text-align: left;
    background: #ffe4b8;
    border: 4px solid #c17b2a;
    border-radius: 10px;
}
.order_title{
    text-indent: 24px;
    line-height: 80px;
    font-weight: normal;
    border-bottom: 1px solid #8c3800;
}
.order_time{
    float:right;
    margin-right:40px;
}
.order_imgWrap{
    float: left;
    margin: 40px 20px;
    width: 110px;
    height: 150px;
}
.order_img{
    width: 100%;
    height: 100%;
}
.order_info{
    float: left;
}
.order_text{
    margin-top: 150px;
    line-height: 50px;
}
.order_text span{
    color: #fb4337;
}
.order_btns{
    position: absolute;
    right:30px;
    bottom:30px;
}
.order_btn{
    margin: 40px auto 0;
    width: 140px;
    height: 65px;
    line-height: 65px;
    text-align: center;
    color: #fff;
    font-size: 28px;
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/sugar_btn.png') no-repeat;
    background-size: contain;
}
</style>