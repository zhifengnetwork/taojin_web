<template>
    <div class="Download">
        <img src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/live_weixin.png" alt="">
    </div>
</template>

<script>
    export default {
        name:'Download',
        mounted(){
            this.downApp();
        },
        methods:{
            downApp(){
                let ua = navigator.userAgent.toLowerCase();
                //Android终端
                let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  

        　　    //Ios终端
                let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 

                if (this.isWeixinBrowser()) {
                    
                } else {
                    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                        //Ios
                        window.location = 'http://fir.im/2avb'
                    } else if (/(Android)/i.test(navigator.userAgent)) {
                        //Android终端
                        window.location = 'http://api.519991.cn/5GCEC-1.0.0.apk'
                    }
                }
            },
            isWeixinBrowser() {
                let ua = navigator.userAgent.toLowerCase();
                return (/micromessenger/.test(ua)) ? true : false;
            }
        }
    }
</script>

<style lang="scss" scoped>
.Download{
    position: fixed;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.5);
    img{
        position:absolute;
        top:80px;
        left:0;
        right:0;
        margin:auto;
        width:90%;
        max-height:100%;
    }
}
</style>