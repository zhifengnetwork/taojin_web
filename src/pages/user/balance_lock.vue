<template>
   <div class="height-88 balance_lock">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="出局明细" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
		</TopHeader>
        <div class="record">
            <div class="record_title">
                <ul>
                    <li>ID</li>
                    <li>金额</li>
                    <li>备注</li>
                </ul>
            </div>
            <div class="info_wrap" @scroll="page">
                <div class="record_info">
                    <ul v-for="(item,index) in record" :key="index">
                        <li>{{item.id}}</li>
                        <li>{{item.money}}</li>
                        <li :class="item.status_text=='申请中'?'failure':'succeed'">{{item.intro}}</li>
                    </ul>
                </div>
                <Null text="出局" v-if="flag"></Null>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'balance_lock',
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
                this.$axios.post('index/get_lock_balance',{
                    token:localStorage.getItem('token'),
                    page:_this.pages
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        for(let i=0;i<res.data.data.length;i++){
                            _this.record.push(res.data.data[i]);
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
.balance_lock{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #4a1901;
  background: #ffda9e;
}
.info_wrap{
    width: 100%;
    height: 91%;
    overflow-y: scroll;
}
.record{
    margin: 20px auto;
    width: 702px;
    height: 1180px;
    border: 4px solid #c17b2a;
    border-radius: 20px;
    background: #ffe4b8;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.record_title{
    width: 100%;
    height: 100px;
    line-height: 100px;
}
.record_title li{
    display: block;
    float: left;
    width: 33%;
}
.record_info{
    width: 100%;
    line-height: 110px;
}
.record_info li{
    display: block;
    float: left;
    width: 33%;
    background: #ffc787;
}
.record_info ul:nth-of-type(2n) li{
    background: #ffbb7e;
}
</style>