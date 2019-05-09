<template>
    <div class="edit-box-com-cover" 
        v-show="visible" 
        :style="{width}" 
        @click="hide">
        <div class="top"></div>
        <div class="rest"></div>
    </div>
</template>
<script>
export default {
    props: {
        //遮罩的显示状态
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            width: (document.body.offsetWidth - 200) + "px"
        }
    },
    methods: {
        //隐藏遮罩
        hide() {
            this.$store.commit("gw/setAdd2BoxComCoverVisible", false);
        }
    }
}
</script>
<style lang="scss" scoped>
.edit-box-com-cover {
    height: 100%;
    position: fixed;
    right: 0;
    top: 0;

    .top {
        position: absolute;
        left: -200px;
        top: 0;
        background: rgba(0, 0, 0, 0.6);
        height: 45px;
        width: 200px;
        z-index: 1;
    }

    .rest {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
    }
}
</style>


