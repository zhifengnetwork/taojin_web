<template>
    <div class="height-88 withdraw_bill">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="账单明细" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="bill_tab">
            <ul>
                <li @click="bill_tab(1)" :class="active==1?'active':''">消费</li>
                <li @click="bill_tab(2)" :class="active==2?'active':''">赚取</li>
            </ul>
        </div>
        <div class="bill_wrap">
            <div class="bill_tabbar">
                <ul>
                    <li>申请日期</li>
                    <li>金额</li>
                    <li>类型</li>
                </ul>
            </div>
            <div class="content_wrap">
                <div class="bill_content" v-if="active==1">
                    <ul v-for="(item,index) in bil" :key="index">
                        <li>
                        {{item.createtime}}
                        </li>
                        <li>{{item.money}}</li>
                        <li class="succeed">{{item.type_text}}</li>
                    </ul>
                </div>
                <div class="bill_content" v-if="active==2">
                    <ul v-for="(item,index) in bil" :key="index">
                        <li>
                        {{item.createtime}}
                        </li>
                        <li>{{item.money}}</li>
                        <li class="succeed">{{item.type_text}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'withdraw_bill',
        data(){
            return{
                active:'1',
                bil:''
            }
        },
        mounted(){
            this.initalize(1);
        },
        methods:{
            bill_tab(tab){
                this.active = tab;
                this.initalize(tab);
            },
            initalize(is_direct){
                let _this = this;
                this.$axios.post('index/balance_list',{
                    token:localStorage.getItem('token'),
                    have:is_direct
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        _this.bil = res.data.data;
                    }else{
                        Toast(res.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
.failure{
    color: #972700;
}
.succeed{
    color: #009720;
}
.withdraw_bill{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: #4a1901;
  background: #ffda9e;
  background-size: contain;
}
.active{
    opacity: 1 !important;
    color: #7d4e2a;
}
.bill_tab{
    padding: 0 22px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.bill_tab li{
    float: left;
    opacity: 0.5;
    width: 200px;
    height: 60px;
    line-height: 60px;
    margin-right: 10px;
    background: url('../../../static/images/withdraw_bill.png')no-repeat;
    background-size: contain;
}
.bill_tabbar{
    width: 100%;
    height: 100px;
    line-height: 100px;
}
.bill_tabbar li{
    float: left;
    width: 30%;
    font-weight: bold;
}
.bill_tabbar li:nth-of-type(1){
    width: 40%;
}
.bill_wrap{
    margin: 0 auto;
    width: 702px;
    height: 1120px;
    overflow-y: scroll;
    border: 4px solid #c17b2a;
    border-radius: 5px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.content_wrap{
    width: 100%;
    height: 90%;
    overflow-y: scroll;
}
.bill_content{
    width: 100%;
    height: 100px;
    line-height: 100px;
}
.bill_content li{
    float: left;
    width: 30%;
    background: #ffc787;
}
.bill_content li:nth-of-type(1){
    width: 40%;
}
.bill_content ul:nth-of-type(2n) li{
    background: #ffbb7e;
}
</style>