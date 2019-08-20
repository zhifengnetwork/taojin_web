<template>
    <div class="height-88 withdraw_bill">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="账单明细" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="bill_tab">
            <ul>
                <li v-for="(item,index) in tab" :key="index" @click="bill_tab(index)" :class="active==index?'active':''">{{item.text}}</li>
            </ul>
        </div>
        <div class="bill_wrap">
            <div class="bill_tabbar">
                <ul>
                    <li>申请日期</li>
                    <li>金额</li>
                    <li>手续费</li>
                    <li>审核状态</li>
                </ul>
            </div>
            <div class="bill_content" v-if="active==0">
                <ul>
                    <li>
                       20124545
                    </li>
                    <li>120212</li>
                    <li>- 65.2</li>
                    <li class="succeed">审核成功</li>
                </ul>
                <ul>
                    <li>
                       20124545
                    </li>
                    <li>120212</li>
                    <li>- 65.2</li>
                    <li class="succeed">审核成功</li>
                </ul>
                <ul>
                    <li>
                       20124545
                    </li>
                    <li>120212</li>
                    <li>- 65.2</li>
                    <li class="succeed">审核成功</li>
                </ul>
            </div>
            <div class="bill_content" v-if="active!=0">
                <ul>
                    <li>
                        20124545
                    </li>
                    <li>120212</li>
                    <li>65.2</li>
                    <li class="failure">审核失败</li>
                </ul>
                <ul>
                    <li>
                        20124545
                    </li>
                    <li>120212</li>
                    <li>65.2</li>
                    <li class="failure">审核失败</li>
                </ul>
                <ul>
                    <li>
                        20124545
                    </li>
                    <li>120212</li>
                    <li>65.2</li>
                    <li class="failure">审核失败</li>
                </ul>
            </div>
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
    width: 25%;
    font-weight: bold;
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
.bill_content{
    width: 100%;
    height: 100px;
    line-height: 100px;
}
.bill_content li{
    float: left;
    width: 25%;
    background: #ffc787;
}
.bill_content ul:nth-of-type(2n) li{
    background: #ffbb7e;
}
</style>