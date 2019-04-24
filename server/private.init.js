import {initDrag, px2rem} from "./util/preview-helper";
import "./util/message.js";
export default {
    mounted() {
        //设置当前工作模式为edit
        //这将会使得生成的页面在不同环境下有不同的工作方式
        window.BA_ENV = "edit";
        //挂载成为全局api
        window.r = px2rem;
        initDrag();
    }
}