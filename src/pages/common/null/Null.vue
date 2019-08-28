<template>
    <div class="null">
        <img class="null_img" src="static/images/cart.png">
        <div class="null_text">暂无{{text}}数据哦~</div>
    </div>
</template>

<script>
    export default {
        name:'Null',
        props: {
            text: {
                type: String
            }
        },
    }
</script>

<style lang="scss" scoped>
.null_img{
    margin: 30vh auto 20px;
    width: 300px;
    height: 300px;
}
.null_text{
    letter-spacing: 2px;
    line-height: 100px;
}
</style>