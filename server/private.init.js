import {initDrag} from "./util/preview-helper";
export default {
    mounted() {
        import("./util/message.js");
        initDrag();
    }
}