<template>
    <div class="test-box">
        <component v-for="(item, index) in componentList" :is="item.type" :key="index + '' + item.type"></component>
    </div>
</template>

<script>
// import Header from "./components/Header";
// import Input1 from "../components/input/1";
import Vue from "vue";
import Component from "vue-class-component";
import components from "./import";
export default {
    mixins: [components],
    computed: {
        componentList() {
            // console.log("打印数据", this.$store.state.gw.componentList);
            
            return this.$store.state.gw.componentList;
        }
    },
    // components: {
    //     Input1
    // }
}
// @Component({
//     computed: {
//         componentList() {
//             console.log("打印数据", this.$store.state.gw.componentList);
            
//             return this.$store.state.gw.componentList;
//         }
//     }
// })
// export default class Test extends Vue {
//     render(h) {
//         return (
//             <div class="test-box">
//                 {
//                     this.componentList.map((item, index) => {
//                         return (
//                             <component is={item.type}></component>
//                         )
//                     })
//                 }
                
//             </div>
//         )
//     }
//     mounted() {
//         setTimeout(() => {
//             console.log("延迟打印数据", this.$store.state.gw.componentList);
//         }, 5000);
//     }
// }

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

