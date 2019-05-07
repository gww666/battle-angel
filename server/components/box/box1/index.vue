<template>
    <div class="com-box">
        <component 
            v-for="(item, index) in componentList" 
            :is="item.type" :key="index + '' + item.type"
            :componentId="item.id"
            :data-baid="item.id"
            :data-bagroup="item.group"
            :config="item.config">
        </component>
    </div>
</template>
<script>
import base from "./import";
import {getComById} from "../../../util/setConfig";
export default {
    mixins: [base],
    inject: ["componentId", "config"],
    data() {
        return {

        }
    },
    computed: {
        componentList() {
            // console.log("box-config", this.config);
            // let com = this.$store.state.pageConfig["t3"].componentList.find(item => item.id === this.componentId);
            let com = getComById(this.componentId);
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
    min-height: 20px;
}
</style>


