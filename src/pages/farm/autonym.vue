<template>
    <div class="height-88">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title="实名认证" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/head_back.png">
		</TopHeader>
        <div class="autonym_item">
            <label>
                <span class="item_title">真实姓名:</span><input class="item_input" type="text" v-model="name" placeholder="请填写真实姓名">
            </label>
        </div>
        <div class="autonym_item">
            <label>
                <span class="item_title">手机号码:</span><input class="item_input" type="text" v-model="phone" placeholder="请填写手机号码">
            </label>
        </div>
        <div class="autonym_item">
            <label>
                <span class="item_title">身份证号码:</span><input class="item_input" type="text" v-model="autonym" placeholder="请填写身份证号码">
            </label>
        </div>
        <div class="identity">
            <input class="picture_inp" type="file" @change="upLoad($event,1)" accept="image/*">
            <div class="identity_title">
                身份证正面
            </div>
            <div class="identity_content">
                <img v-if="!identity_1" class="identity_img" src="/static/images/farm/identity-1.png">
                <img v-else class="identity_img" :src="identity_1">
            </div>
        </div>
        <div class="identity">
            <input class="picture_inp" type="file" @change="upLoad($event,2)" accept="image/*">
            <div class="identity_title">
                身份证反面
            </div>
            <div class="identity_content">
                <img v-if="!identity_2" class="identity_img" src="/static/images/farm/identity-2.png">
                <img v-else class="identity_img" :src="identity_2">
            </div>
        </div>
        <p v-if="id">{{desc}}</p>
        <div class="identity_btn" v-if="id" @click="send">
            提交
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'autonym',
        data(){
            return{
                name:'',
                phone:'',
                autonym:'',
                identity_1:'',
                identity_2:'',
                flag:true,
                img_1:'',
                img_2:'',
                user_info:'',
                id:'',
                desc:''
            }
        },
        mounted(){
            this.initalize();
        },
        methods:{
            initalize(){
                let _this = this;
                this.$axios.post('user/id_card_add')
                .then(function(res){
                    console.log(res.data);
                    _this.name = res.data.data.user_name;
                    _this.phone = res.data.data.phone;
                    _this.autonym = res.data.data.id_card;
                    _this.img_1 = _this.identity_1 = res.data.data.idcard_front;
                    _this.img_2 = _this.identity_2 = res.data.data.idcard_back;
                    _this.id = res.data.data.id;
                    _this.desc = res.data.data.desc;
                    if(res.data.data == ''){
                        _this.id = -1;
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            upLoad(e,index){
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
                        if(index==1){
                            _this.identity_1 = base64;
                        }else{
                            _this.identity_2 = base64;
                        }
                        _this.$axios.post('user/uploads',{
                            image:base64
                        })
                        .then(function(res){
                            console.log(res);
                            if(res.data.status == 1){
                                if(index==1){
                                    _this.img_1 = res.data.data;
                                }else{
                                    _this.img_2 = res.data.data;
                                }
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
            send(){
                if(!this.name){
                    Toast('请输入真实姓名');
                    return false;
                }
                if(!this.phone){
                    Toast('请输入手机号码');
                    return false;
                }
                if(this.autonym==''){
                    Toast('请输入身份证号码');
                    return false;
                }
                if(this.identity_1==''||this.identity_2==''){
                    Toast('请上传身份证图片');
                    return false;
                }
                if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
                    Toast.fail("手机号码有误，请重填");
                    return false; 
                }
                if(!this.flag){
                    return false;
                }
                this.flag = false;
                let _this = this;
                this.$axios.post('user/id_card',{
                    token:localStorage.getItem('token'),
                    name:_this.name,
                    phone:_this.phone,
                    id_card:_this.autonym,
                    idcard_front:_this.img_1,
                    idcard_back:_this.img_2,
                    id:_this.id==-1?'':_this.id,
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1){
                        Toast.success('提交成功,等待审核');
                        _this.$router.push({name:'farm'})
                    }else{
                        Toast(res.data.msg)
                    }
                    _this.flag = true;
                })
                .catch(function(error){
                    console.log(error);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.autonym_item{
    margin: 20px 24px;
    width: 702px;
    height: 80px;
    text-align: left;
    line-height: 80px;
    color: #4a1901;
    background: #b38a5b;
    border-top: 4px solid #916f49;
    border-left: 4px solid #916f49;
}
.item_title{
    display: inline-block;
    width: 170px;
    text-align: right;
}
.item_input{
    margin-left: 20px;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #e9c295;
}
.identity{
    position: relative;
    margin: 20px 24px;
    width: 702px;
    height: 380px;
    background: #ffe4b8;
}
.identity_title{
    height: 60px;
    line-height: 60px;
    background: #cfaf7c;
}
.identity_content{
    height: 320px;
}
.identity_img{
    margin: 15px auto;
    height: 90%;
    max-width: 100%;
}
.identity_btn{
    margin: 20px auto;
    width: 140px;
    height: 65px;
    line-height: 65px;
    font-size: 28px;
    color: #fff;
    background: url('https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/sugar_btn.png')no-repeat;
    background-size: contain;
}
.picture_inp{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
</style>