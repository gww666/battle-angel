<template>
    <div class="img1-box">
        <img src="../../../public/static/images/customer.png" />
        <span>{{text || "客户姓名"}}</span>
    </div>
</template>
<script>
import Base from "../base";
export default {
    mixins: [Base]
}
</script>
<style lang="scss" scoped>
.img1-box {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    img {
        width: 0.75rem;
        height: 0.75rem;
    }
    span {
        font-size: 0.28rem;
        color: #333;
        margin-top: 0.25rem;
    }
}
</style>


