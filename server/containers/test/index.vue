<template>
    <div class="test-box" :style="mStyle">
        <component 
            v-for="(item, index) in componentList" 
            :is="item.type" :key="index + '' + item.type"
            :componentId="item.id"
            :data-baid="item.id"
            :data-bagroup="item.group">
        </component>
    </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import components from "./import";
export default {
    mixins: [components],
    // props: {
    //     mStyle: {
    //         type: Object,
    //         default: () => ({})
    //     }
    // },
    data() {
        return {
            mStyle: {}
        }
    },
    computed: {
        componentList() {
            return this.$store.state.componentList;
        }
    },
    methods: {
        
    },
    mounted() {
        window.PSEvent.listen("page", data => {
            let mStyle = {}
            Object.keys(data).forEach(key => {
                let value = data[key];
                //属于样式标签
                if (key in document.documentElement.style) {
                    mStyle[key] = value;
                } else {
                    this[key] = value
                }
            });
            console.log("打印style", mStyle);
            //设置样式属性
            this.mStyle =  mStyle;
        });
    }
}

</script>

<style lang="scss" scoped>
.test-box {
    position: relative;
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow-x: hidden;
}
</style>

