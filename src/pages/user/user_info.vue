<template>
    <div class="height-88 user_info">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="个人资料" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="static/images/head_back.png">
            
		</TopHeader>
        <div class="info_wrap">
            <div class="info_option">
                <div class="option_item">
                    头像
                    <input class="picture_inp" type="file" @change="upLoad" accept="image/*">
                    <div class="info_picture">
                        <img class="info_img" :src="user_info.avatar?user_info.avatar:'static/images/user_icon.png'">
                    </div>
                </div>
                <div class="option_item">
                    <router-link to="user_setname">
                        用户名
                        <div class="info_name">
                            {{user_info.nick_name}}
                        </div>
                        <div class="option_icon">
                            <van-icon color="#fff" name="arrow"/>
                        </div>
                    </router-link>
                </div>
                <div class="option_item">
                    手机号绑定
                    <div class="info_phone">
                        {{user_info.phone}}
                    </div>
                    <div class="option_icon">
                        <van-icon color="#fff" name="arrow"/>
                    </div>
                </div>
                <div class="option_item">
                    <router-link to="user_amendPwd">
                        修改密码
                        <div class="option_icon">
                            <van-icon color="#fff" name="arrow"/>
                        </div>
                    </router-link>
                </div>
                <div class="option_item">
                    <router-link to="user_paymentPwd">
                        支付密码
                        <div class="option_icon">
                            <van-icon color="#fff" name="arrow"/>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="quit" @click="login">
                退出登录
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'user_info',
        data(){
            return{
                user_info:''
            }
        },
        mounted(){
            this.user_info = JSON.parse(localStorage.getItem('user_info'));
        },
        methods:{
            login(){
                this.$router.push('Login');
                localStorage.removeItem('token')
            },
            upLoad(e){
                if (!e.target.files[0].size) return;
                let _this = this;
                let file = event.target.files;
                let reader = new FileReader(), imgFile = file[0];
                if (imgFile.type.indexOf('image') == 0) {
                    reader.readAsDataURL(imgFile);
                } else {
                    this.$Message.infor('文件类型仅为图片')
                }
                let img = new Image();
                reader.onload = function (e) {
                    _this.dealImage(e.target.result, 800, printing);
                    function printing(base64) {
                        _this.$axios.post('user/updata_head_img',{
                            token:localStorage.getItem('token'),
                            head_img:base64
                        })
                        .then(function(res){
                            console.log(res);
                            if(res.data.status == 1){
                                Toast.success('上传成功');
                                _this.$router.push('User');
                            }else{
                                Toast(res.data.msg)
                            }
                        })
                        .catch(function(error){
                            console.log(error);
                        })
                    }
                };
            },
            getImgSize(base64url){
                //获取base64图片大小，返回KB数字
                var str = base64url.replace('data:image/jpeg;base64,', '');//这里根据自己上传图片的格式进行相应修改
                var strLength = str.length;
                var fileLength = parseInt(strLength - (strLength / 8) * 2);
                // 由字节转换为KB
                var size = "";
                size = (fileLength / 1024).toFixed(2);
                return parseInt(size);
            },
            //压缩方法
		    dealImage(base64, w, callback) {
                var newImage = new Image();
                var quality = 0.6;    //压缩系数0-1之间
                newImage.src = base64;
                newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
                var imgWidth, imgHeight;
                newImage.onload = function () {
                    imgWidth = this.width;
                    imgHeight = this.height;
                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    if (Math.max(imgWidth, imgHeight) > w) {
                        if (imgWidth > imgHeight) {
                            canvas.width = w;
                            canvas.height = w * imgHeight / imgWidth;
                        } else {
                            canvas.height = w;
                            canvas.width = w * imgWidth / imgHeight;
                        }
                    } else {
                        canvas.width = imgWidth;
                        canvas.height = imgHeight;
                        quality = 0.6;
                    }
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
                    var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
                    // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
                    // while (base64.length / 1024 > 150) {
                    // 	quality -= 0.01;
                    // 	base64 = canvas.toDataURL("image/jpeg", quality);
                    // }
                    // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
                    // while (base64.length / 1024 < 50) {
                    // 	quality += 0.001;
                    // 	base64 = canvas.toDataURL("image/jpeg", quality);
                    // }
                    callback(base64);//必须通过回调函数返回，否则无法及时拿到该值
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
.user_info{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #4a1901;
  background: url('../../../static/images/user_info_bg.png') no-repeat;
  background-size: cover;
}
.info_wrap{
    margin: 20px auto;
    width: 702px;
    height: 824px;
    background: #ffc787;
    border: 4px solid #c17b2a;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.info_option{
  width: 100%;
  padding: 5px 0;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.option_item:nth-of-type(1){
    margin-top: 0;
}
.option_item{
  position: relative;
  margin: 40px auto;
  width: 100%;
  height: 80px;
  line-height: 76px;
  text-align: left;
  text-indent: 30px;
  background: #b38a5b;
  border-left: 4px solid#9b774e;
  border-top: 4px solid#9b774e;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.option_item a{
    color: #4a1901;
}
.info_name,.info_phone{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 100px;
    margin: auto;
    width: 200px;
    height: 100%;
    color: #fff;
    text-indent: 0;
    text-align: right;
}
.picture_inp{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
.info_picture{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    width: 50px;
    height: 50px;
    text-indent: 0;
    border-radius: 50%;
    overflow: hidden;
}
.info_picture img{
    width: 100%;
    height: 100%;
}
.option_icon{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 40px;
  margin: auto;
}
.quit{
  display: inline-block;
  width: 140px;
  height: 66px;
  line-height: 66px;
  color: #fff;
  background: url('../../../static/images/sugar_btn.png')no-repeat;
  background-size: contain;
}

</style>