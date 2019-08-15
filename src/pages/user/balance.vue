<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="我的余额" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
            
		</TopHeader>
        <div class="balance_content">
            <div class="balance_info">
                <div class="balance_info_item">
                    <p>可提现余额</p>
                    <p>122.00</p>
                </div>
                <div class="balance_info_item">
                    <p>出局余额</p>
                    <p>122.00</p>
                </div>
            </div>
            <div class="balance_btn">
                <router-link to="withdraw">
                    提现
                </router-link>
            </div>
        </div>
        <div class="balance_option">
            <div class="option_item" v-for="(item,index) in option_item" :key="index">
                <router-link :to="item.pages">
                    {{item.text}}
                    <div class="option_icon">
                        <van-icon name="arrow"/>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'balance',
        data(){
            return{
                option_item:[
                    {text:'提现明细',pages:'withdraw_record'},
                    {text:'账单明细',pages:'withdraw_bill'},
                ]
            }
        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
.balance_content{
    width: 100%;
    height: 600px;
    background: red;
}
.balance_info{
    height: 400px;
    background: orange;
}
.balance_info_item{
    float: left;
    margin-top: 120px;
    width: 50%;
    line-height: 50px;
}
.balance_info_item p:nth-of-type(2){
    font-size: 60px;
    line-height: 100px;
}
.balance_btn{
    margin: 40px 24px;
    height: 120px;
    line-height: 120px;
    background: skyblue;
    border-radius: 20px;
}
.balance_option{
    border-top: 20px solid #e5e5e5;
}
.option_item{
    position: relative;
    height: 150px;
    line-height: 150px;
    text-align: left;
    text-indent: 60px;
    border-bottom: 1px solid #ccc;
    background: #fff;
}
.option_icon{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 20px;
  margin: auto;
}
</style>