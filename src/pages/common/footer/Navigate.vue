<template>
    <div class="Navigate">
        <ul>
            <li v-for="(item,index) in list" :key="index" @click="page(index)">
                <router-link :to="item.pages">
                    <i class="iconfont" :class="item.pages==$route.path?item.imgactive:item.img"></i>
                    <span>{{item.name}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'Navigate',
        data(){
            return{
                list:[
                    {name:'首页',img:'iconhome',imgactive:'iconai-home',pages:'/Home'},
                    {name:'排位',img:'iconrank',imgactive:'iconpaiming',pages:'/Rank'},
                    {name:'挂卖',img:'iconjiaoyi1',imgactive:'iconjiaoyi',pages:'/Deal'},
                    {name:'我的',img:'iconwode',imgactive:'icon04f',pages:'/User'}
                ]
            }
        },
        methods:{
            page(index){
                this.$router.push({'path':this.list[index].pages})
            }
        }
    }
</script>

<style lang="scss" scoped>
.Navigate{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 98px;
	background:#ffffff;
    border-top: 1px solid #f8f2f2;
	z-index:10;
}
ul{
    width: 100%;
    height: 100%;
}
li{
    float: left;
    width: 25%;
    height: 100%;
    text-align: center;
}
i{
    display: block;
    color: #151515;
    margin: 10px auto;
    width: 36px;
    height: 36px;
}
span{
    color: #151515;
    font-size: 28px;
}
</style>