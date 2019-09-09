<template>
    <div class="height-88 promotion">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
        <TopHeader back-url="" custom-title=" " :custom-fixed="true" custom-col>
            <!-- 返回按钮 -->
            <img slot="backBtn" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/head_back.png">
        </TopHeader>
        <div class="promotion_imgWrap">
            <img class="promotion_img" :src="user_info.avatar">
        </div>
        <div class="promotion_code">
            <p class="promotion_text">我是<span>{{user_info.nick_name}}</span></p>
            <p class="promotion_text">手机号<span>{{user_info.phone}}</span></p>
            <div class="code">
                <img class="code_img" :src="code">
                <div style="display:none;" id="qrcode" ref="qrcode"></div>
            </div>
            <p class="promotion_tips">长按二维码保存</p>
        </div>
        <div class="promotion_link">
            <p class="promotion_tips">{{url}}</p>
            <div class="link_btn" @click="copyUrl">
                复制地址
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    // 二维码
    import QRCode from 'qrcodejs2'
    export default {
        name:'promotion',
        data(){
            return {
                user_info:'',
                url:'',
                code:''
            }
        },
        components: {
            qrcode: QRCode
        },
        mounted(){
            this.user_info = JSON.parse(localStorage.getItem('user_info'));
            this.initalize();
        },
        methods:{
            initalize(){
                let _this = this;
                this.$axios.post('team/share',{
                    token:localStorage.getItem('token'),
                    page:_this.pages
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        _this.url = res.data.data.url;
                        _this.qrcode();
                    }else{
                        Toast(res.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            copyUrl(){
                const input = document.createElement('input')
                document.body.appendChild(input)
                input.setAttribute('value',this.url)
                input.select()
                if(document.execCommand('copy')) {
                    document.execCommand('copy')
                }
                document.body.removeChild(input)
                Toast('复制成功')
            },
            qrcode () {
                let _this = this;
                let qrcode = new QRCode('qrcode',{
                    width: 128, // 设置宽度，单位像素
                    height: 128, // 设置高度，单位像素
                    text: _this.url // 设置二维码内容或跳转地址
                })
                this.qrimg(qrcode);
            },
            qrimg (){
                var canvas = document.getElementsByTagName('canvas')[0];
                var img = new Image();
                img.src = canvas.toDataURL('image/png');
                this.code = img.src;
                console.log(img.src)
            }
        }
    }
</script>

<style lang="scss" scoped>
.promotion{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #4a1901;
  overflow-y: scroll;
  background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/promotion_bg.png') no-repeat;
  background-size: cover;
}
.promotion_code{
    position: relative;
    margin: 120px auto 20px;
    padding-top: 140px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 702px;
    height: 700px;
}
.promotion_imgWrap{
    position: absolute;
    top: 128px;
    left: 0;
    right: 0;
    margin: auto;
    width: 200px;
    height: 200px;
    border: 8px solid #fff;
    border-radius: 50%;
    overflow: hidden;
}
.promotion_img{
    width: 100%;
    height: 100%;
}
.promotion_text{
    font-size: 30px;
    line-height: 60px;
    color: #ff8441;
    user-select: none;
}
.promotion_text span{
    margin: 0 20px;
}
.code{
    margin: 100px auto 20px;
    width: 248px;
    height: 248px;
}
.code_img{
    width:100%;
    height:100%;
    pointer-events: auto;
}
.promotion_link{
    margin: 80px auto 0;
    width: 80%;

}
.promotion_tips{
    user-select: none;
}
.link_btn{
    margin: 60px auto 0;
    width: 400px;
    height: 80px;
    line-height: 80px;
    color: #fff;
    font-size: 28px;
    user-select: none;
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/sugar_btn.png') no-repeat;
    background-size: 100% 80px;
}
</style>