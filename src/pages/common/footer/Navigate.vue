<template>
    <div class="Navigate">
        <ul>
            <li v-for="(item,index) in list" :key="index" @click="page(index)">
                <router-link :to="item.pages">
                    <span class="nav_item" :style="{'background-image':'url('+(item.pages==$route.path?imgactive:img)+')'}">{{item.name}}</span>
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
                    {name:'首页',pages:'/Home'},
                    {name:'排位',pages:'/Rank'},
                    {name:'挂卖',pages:'/Deal'},
                    {name:'我的',pages:'/User'}
                ],
                img:'https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/navigate.png',
                imgactive:'https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/navigate-active.png'
            }
        },
        methods:{
            page(index){
                this.$router.replace({'path':this.list[index].pages})
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
    line-height: 90px;
	background:#ffcb8f;
	z-index:10;
    user-select: none;
}
ul{
    width: 100%;
    height: 100%;
}
li{
    position: relative;
    float: left;
    width: 25%;
    height: 100%;
    text-align: center;
}
.nav_item{
    display: inline-block;
    margin-top: 10px;
    width: 100px;
    height: 80px;
    color: #f5f5f5;
    font-size: 28px;
    background-size: cover;
}
</style>