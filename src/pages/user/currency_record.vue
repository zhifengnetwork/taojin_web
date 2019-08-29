<template>
    <div class="height-88 public_bg">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="交易记录" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="record" @scroll="page">
            <div class="record_item" v-for="(item,index) in record" :key="index">
                <p class="item_id">{{item.type_text}}</p>
                <p class="item_time">{{item.add_time}}</p>
                <div class="item_num">
                    <span>{{item.currency}}</span>
                </div>
            </div>
            <Null text="交易" v-if="flag"></Null>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'currency_record',
        data(){
            return {
                record:[],
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
                this.$axios.post('index/currency_list',{
                    token:localStorage.getItem('token'),
                    page:_this.pages
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        for(let i=0;i<res.data.data.length;i++){
                            _this.record.push(res.data.data[i]);
                        }
                        if(res.data.data==''){
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
                if(e.target.scrollTop+e.target.offsetHeight==e.target.scrollHeight-5){
                    this.pages++;
                    this.initalize();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.record{
    margin: 20px auto;
    width: 702px;
    height: 1180px;
    overflow-y: scroll;
    border: 4px solid #c17b2a;
    border-radius: 20px;
    background: #ffc787;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.record_item{
    position: relative;
    margin: 10px auto;
    width: 680px;
    height: 126px;
    line-height: 50px;
    text-align: left;
    text-indent: 60px;
    background: #b38a5b;
}
.item_id{
    padding-top: 10px;
    color: #fff;
}
.item_num{
    position: absolute;
    right: 36px;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 150px;
    height: 60px;
    line-height: 60px;
    text-indent: 0;
    text-align: center;
    color: #fff;
    background: url('../../../static/images/balance_money.png')no-repeat;
    background-size: 100% 60px;
}
</style>