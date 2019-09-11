<template>
    <div class="height-88 prize">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
        <TopHeader back-url="" custom-title="开奖记录" :custom-fixed="true" custom-rgb custom-col>
            <!-- 返回按钮 -->
            <img slot="backBtn" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/head_back.png">
            <!-- 右侧按钮 -->
            <!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
        </TopHeader>
        <div class="prize_wrap">
            <ul class="prize_title">
                <li>中奖ID</li>
                <li>手机号</li>
            </ul>
            <div class="item_wrap" @scroll="page">
                <ul class="prize_item" v-for="(item,index) in prize" :key="index">
                    <li>{{item.rank_time}}</li>
                    <li>{{item.phone}}</li>
                </ul>
                <Null text="中奖" v-if="flag"></Null>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'prize',
        data(){
            return {
                prize:[],
                flag:false,
                pages:1
            }
        },
        mounted(){
            this.initalize();
        },
        methods:{
            initalize(){
                let _this = this;
                this.$axios.post('index/reward_list',{
                    token:localStorage.getItem('token'),
                    page:_this.pages
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        for(let i=0;i<res.data.data.length;i++){
                            _this.prize.push(res.data.data[i]);
                        }
                        if(res.data.data==''&&_this.pages==1){
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
            page(e){
                if(e.target.scrollTop+e.target.offsetHeight>=e.target.scrollHeight-5){
                    this.pages++;
                    this.initalize();
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
.prize{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #4a1901;
    background: #ffda9e;
}
.prize_wrap{
    margin: 20px auto;
    width: 702px;
    height: 1180px;
    background: #ffe4b8;
    border: 4px solid #c17b2a;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.prize_title li{
    float: left;
    width: 50%;
    font-size: 30px;
    line-height: 100px;
}
.item_wrap{
    width:100%;
    height:90%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; 
}
.prize_item li{
    float: left;
    width: 50%;
    line-height: 110px;
    background: #ffc787;
}
.prize_item:nth-of-type(2n) li{
    background: #ffbb7e;
}
</style>