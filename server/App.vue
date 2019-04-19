<template>
    <div id="root">
        <router-view></router-view>
    </div>
</template>
<script>
import Edit from "./plugin/edit";
import Drag from "./plugin/drag";
import {setPosition, initDrag} from "./util/preview-helper";
export default {
    methods: {
        //该方法download时会被删除掉
        __private__init() {
            // const postMessage = (data) => {
            //     window.parent.postMessage(data, "*");
            // }
            import("./util/message.js");
            initDrag();
            // let that = this;
            // Array.from(document.querySelectorAll("div[data-baid]")).forEach(item => {
            //     let id = item.getAttribute("data-baid");
            //     let group = item.getAttribute("data-bagroup");
                
            //     new Drag(item, {
            //         init(dom) {
            //             new Edit(dom)
            //         },
            //         dragStart(dom) {
            //             let config = that.$store.state.componentList.find(com => com.id === id).config;
            //             postMessage({
            //                 type: "getComponentProps",
            //                 data: {
            //                     // tab: "2",
            //                     tag: "dragStart",
            //                     id,
            //                     config,
            //                     group
            //                 }
            //             });
            //         },
            //         dragCompleted(dom) {
            //             setPosition(dom);
            //             // let id = dom.getAttribute("data-baid");
            //             let config = that.$store.state.componentList.find(com => com.id === id).config
            //             postMessage({
            //                 type: "updateEditComProps",
            //                 data: {
            //                     config
            //                 }
            //             });
            //         }
            //     });
            // });
        },
    },
    mounted() {
        this.__private__init();
    }
}
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    .clear {
        clear: both;
    }
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    html, body, #root {
        height: 100%;
        width: 100%;
    }
</style>
