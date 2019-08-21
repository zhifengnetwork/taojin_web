<template>
    <div class="height-88 public_bg">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="赠送记录" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="record">
            <div class="record_item" v-for="(item,index) in record" :key="index">
                <p class="item_id">{{item.type_text}}</p>
                <p class="item_time">{{item.createtime}}</p>
                <div class="item_num">
                    <span>{{item.integral }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'sugar_record',
        data(){
            return {
                record:''
            }
        },
        mounted(){
            this.initalize();
        },
        methods:{
            initalize(){
                let _this = this;
                this.$axios.post('index/integral_list',{
                    token:localStorage.getItem('token')
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        _this.record = res.data.data;
                    }else{
                        Toast(res.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
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
    background: url('../../../static/images/sugar_record.png')no-repeat;
    background-size: contain;
}
</style>