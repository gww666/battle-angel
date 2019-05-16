<template>
    <div :class="['test-box', pageId]" :style="mStyle">
        <component 
            v-for="(item, index) in componentList" 
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
import Vue from "vue";
import Component from "vue-class-component";
import components from "./import";
import PrivateInit from "./private.init";
import {initData, initListenerCallback} from "../../util/preview-helper";
export default {
    mixins: [components, PrivateInit],
    data() {
        return {
            mStyle: {}
        }
    },
    computed: {
        componentList() {
            let page = this.$store.state.pageConfig[this.pageId];
            if (page) {
                return page.componentList;
            } else {
                return [];
            }
        }
    },
    methods: {
        
    },
    created() {
        initData(this, "page");
    },
    mounted() {
        initListenerCallback(this, "page");
    }
}

</script>

<style lang="scss" scoped>
.test-box {
    // position: relative;
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>

