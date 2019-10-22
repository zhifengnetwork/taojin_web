<template>
    <div class="height-88 farm">
        <!-- 头部组件 back-url=>反回路径，默认返回上一页 title=>标题内容 fixed=>是否固定在顶部 rgb=>背景色 col=>字体颜色 -->
		<TopHeader back-url="" custom-title=" " style="top:10px;" :custom-fixed="true" custom-rgb custom-col>
			<!-- 返回按钮 -->
			<img slot="backBtn" src="https://taojin-zhifeng.oss-cn-shenzhen.aliyuncs.com/static/images/head_back.png">
		</TopHeader>
        <!-- 用户信息 -->
        <div class="user">
            <div class="user_img">
                <img src="/static/images/farm/head.png">
            </div>
            <div class="user_info">
                <p class="user_name">七</p>
                <span>
                    <img class="user_icon" src="/static/images/farm/chook.png">333
                </span>
                <span>
                    <img class="user_icon" src="/static/images/farm/egg.png">999
                </span>
            </div>
        </div>
        <div class="notice">
            <h3>公告</h3>
            <span>新华社金凤凰虎虎生风</span>
        </div>
        <div class="tips">
            游戏
            <br>
            说明
        </div>
        <!-- 滑动部分 -->
        <div class="chook">
            <div class="chook_item" v-for="(item,index) in 100" :key="index">
                <img src="/static/images/farm/type-1.png">
                <div class="chook_num">2</div>
                <div class="chook_name">鸡窝{{index+1}}号</div>
            </div>
        </div>
        <!-- 底部菜单 -->
        <div class="menu">
            <div class="menu_item">
                <img src="/static/images/farm/menu-1.png">
                <p>抢饲料</p>
            </div>
            <div class="menu_item">
                <img src="/static/images/farm/menu-2.png">
                <p>喂养</p>
            </div>
            <div class="menu_item">
                <img src="/static/images/farm/menu-3.png">
                <p>拾蛋</p>
            </div>
            <div class="menu_item" @click="show">
                <img src="/static/images/farm/menu-4.png">
                <p>商店</p>
            </div>
            <div class="menu_item">
                <img src="/static/images/farm/menu-5.png">
                <p>钱包</p>
            </div>
        </div>
        <div class="mask" v-if="flag">
            <div class="buy_content">
                <div class="buy_off" @click="show"></div>
                <img class="buy_bg" src="/static/images/farm/pop-up.png">
                <div class="buy_title title_left">工具</div>
                <div class="buy_title title_right">购买记录</div>
                <div class="buy_item">
                    鸡窝
                    <div class="itrm_btn">
                        <p>金沙购买</p>
                        <p>余额购买</p>
                    </div>
                </div>
                <div class="buy_item2">
                    金鸡
                    <div class="itrm_btn">
                        <p>金沙购买</p>
                        <p>余额购买</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'farm',
        data(){
            return{
                flag:false,
            }
        },
        methods:{
            show(){
                this.flag = !this.flag;
            }
        }
    }
</script>

<style lang="scss" scoped>
.farm{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #4a1901;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; 
  background: url('/static/images/farm/farm.png') no-repeat;
  background-size: 100% 100%;
}
.user{
    position: absolute;
    top: 70px;
    left: 132px;
    width: 486px;
    height: 112px;
    background: #d58d4e;
}
.user_img{
    position: relative;
    float: left;
    width: 118px;
    height: 100%;
    img{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 90px;
        height: 90px;
        border-radius: 50%;
    }
}
.user_info{
    float: left;
    color: #4a1901;
    span{
        display: inline-block;
        width: 172px;
        height: 40px;
        line-height: 40px;
        text-align: right;
        padding-right: 20px;
        border-radius: 5px;
        background: #fedf69;
        box-sizing: border-box;
        border-left: 2px solid #a86a32;
        border-top: 2px solid #a86a32;
    }
    // span:nth-type-of(2){
    //     margin-left: 10px;
    // }
}
.user_name{
    margin: 10px 0;
    width: 353px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    text-indent: 20px;
    border-radius: 5px;
    border-left: 2px solid #a86a32;
    border-top: 2px solid #a86a32;
    background: #fedf69;
}
.user_icon{
    float: left;
    margin: 2px 10px;
    width: 30px;
    height: 30px;
}
.notice{
    position: absolute;
    top: 284px;
    left: 0;
    right: 0;
    margin: auto;
    color: #eea146;
    span{
        font-size: 20px;
    }
}
.tips{
    position: absolute;
    top: 290px;
    right: 94px;
    color: #eea146;
    font-size: 20px;
}
.chook{
    position: absolute;
    top: 384px;
    left: 70px;
    width: 620px;
    height: 632px;
    overflow-y: scroll;
}
.chook_item{
    position: relative;
    float: left;
    display: flex;
    width: 180px;
    height: 215px;
    align-items: flex-end;
    img{
        width: 100%;
    }
    .chook_num{
        position: absolute;
        top: 20px;
        right: -10px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        color: #df3b3b;
        border-radius: 50%;
        background: #fff;
    }
    .chook_name{
        position: absolute;
        top: 174px;
        left: 20px;
        right: 0;
        margin: auto;
        color: #5c330c;
    }
}
.chook_item:nth-of-type(3n-1){
    margin: 0 30px;
}
.menu{
    display: flex;
    justify-content: space-around;
    position: absolute;
    width: 100%;
    bottom: 40px;
    padding: 0 24px;
    box-sizing: border-box;
}
.menu_item{
    color: #fff;
    img{
        width: 50px;
        height: 56px;
    }
}
.menu_item:nth-of-type(3) img{
    width: 60px;
}
.menu_item:nth-of-type(4) img{
    width: 66px;
}
.mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 20;
}
.buy_content{
    position: absolute;
    top: 400px;
    width: 100%;
    .buy_off{
        position: absolute;
        top: 30px;
        right: 60px;
        width: 60px;
        height: 60px;
    }
    .buy_bg{
        width: 700px;
    }
    .buy_title{
        position: absolute;
        width: 230px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    .title_left{
        top: 105px;
        left: 135px;
    }
    .title_right{
        top: 105px;
        right: 130px;
    }
    .buy_item{
        position: absolute;
        top: 170px;
        left: 115px;
        width: 528px;
        height: 150px;
        line-height: 150px;
        text-indent: 170px;
        text-align: left;
        font-size: 24px;
        font-weight: bold;
        .itrm_btn{
            position: absolute;
            top: 15px;
            right: 10px;
            width: 160px;
            height: 124px;
            line-height: 50px;
            text-indent: 0;
            text-align: center;
            p{
                margin-bottom: 25px;
                color: #fff;
                font-size: 24px;
                font-weight: bold;
                text-shadow: -1px 0 5px #622804,
                            0 1px 5px #622804,
                            1px 0 5px #622804,
                            0 -1px 5px #622804;
            }
        }
    }
    .buy_item2{
        position: absolute;
        top: 340px;
        right: 110px;
        width: 528px;
        height: 150px;
        line-height: 150px;
        text-indent: 170px;
        text-align: left;
        font-size: 24px;
        font-weight: bold;
        .itrm_btn{
            position: absolute;
            top: 15px;
            right: 10px;
            width: 160px;
            height: 124px;
            line-height: 50px;
            text-indent: 0;
            text-align: center;
            p{
                margin-bottom: 25px;
                color: #fff;
                font-size: 24px;
                font-weight: bold;
                text-shadow: -1px 0 5px #622804,
                            0 1px 5px #622804,
                            1px 0 5px #622804,
                            0 -1px 5px #622804;
            }
        }
    }
}
</style>