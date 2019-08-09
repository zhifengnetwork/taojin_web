<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="账单明细" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
            <!-- 右侧按钮 -->
			<!-- <i slot="rightBtn" class="iconfont iconfanhui"></i> -->
		</TopHeader>
        <div class="bill_tab">
            <ul>
                <li v-for="(item,index) in tab" :key="index" @click="bill_tab(index)" :class="active==index?'active':''">{{item.text}}</li>
            </ul>
        </div>
        <div class="bill_tabbar">
            <ul>
                <li>订单</li>
                <li>日期</li>
                <li>金额</li>
            </ul>
        </div>
        <div class="bill_content" v-if="active==0">
            <ul>
                <li>
                    123456
                    <p>下单消费</p>
                </li>
                <li>120212</li>
                <li>- 65.2</li>
            </ul>
        </div>
        <div class="bill_content" v-if="active!=0">
            <ul>
                <li>
                    123456
                    <p>邀请会员</p>
                </li>
                <li>120212</li>
                <li>65.2</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:'withdraw_bill',
        data(){
            return{
                tab:[
                    {text:'消费'},
                    {text:'赚取'}
                ],
                active:'0'
            }
        },
        methods:{
            bill_tab(index){
                this.active = index;
            }
        }
    }
</script>

<style lang="scss" scoped>
.active{
    background: #ff0000;
}
.bill_tab{
    width: 100%;
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #ccc;
}
.bill_tab li{
    float: left;
    width: 49.8%;
}
.bill_tab li:nth-of-type(1){
    border-right: 1px solid #ccc;
}
.bill_tabbar{
    width: 100%;
    height: 100px;
    line-height: 100px;
}
.bill_tabbar li{
    float: left;
    width: 33%;
}
.bill_content{
    width: 100%;
    height: 100px;
    line-height: 100px;
}
.bill_content li{
    float: left;
    width: 33%;
}
.bill_content li:nth-of-type(1){
    line-height: 50px;
}
</style>