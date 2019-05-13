<template>
    <div class="com-box" :style="mStyle">
        <component 
            v-for="(item, index) in _componentList" 
            :is="item.type" :key="index + '' + item.type"
            :componentId="item.id"
            :data-baid="item.id"
            :data-bagroup="item.group"
            :config="item.config"
            :pageId="pageId">
        </component>
    </div>
</template>
<script>
import _import from "./import";
import base from "../base";
import {getComById} from "../../../util/setConfig";
export default {
    mixins: [base, _import],
    computed: {
        _componentList() {
            let com = getComById(this.componentId, this.pageId);
            console.log("box-list", com.config.componentList);
            return com.config.componentList ? com.config.componentList : []
        }
    }
}
</script>
<style lang="scss" scoped>
.com-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    height: 200px;
    overflow: hidden;
}
</style>


