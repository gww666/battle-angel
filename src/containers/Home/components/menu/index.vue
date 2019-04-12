<script>
import Vue from "vue";
import Component from "vue-class-component";
import {Button} from "ant-design-vue";
import {postMessage} from "../../util";
Vue.use(Button);
@Component
export default class Menu extends Vue {

    initDrag() {
        // let menu = document.querySelector(".dangling-menu-box");
        // let menu = document.querySelector(".btn-box");
        //把menu变为可拖拽的
        // new Drag(menu);
    }
    //导入组件，开始编译
    async _import() {
        const {needImportComponentList} = this.$store.state.gw;
        await this.$store.dispatch("getIframeSrc", needImportComponentList);
        //请求页面配置
        this.$store.dispatch("gw/getPagePropsList", {});
    }
    add(e) {
        e.stopPropagation();
        console.log("add");
        
    }
    copy() {

    }
    async download() {
        //给Iframe发送消息
        // postMessage({
        //     type: "getHtml"
        // });
        await this.$store.dispatch("gw/downloadPage");
    }
    render() {
        return (
            <div class="menu-btn-box">
                <a-button onClick={this._import} size="small">导入</a-button>
                <a-button onClick={this.download} size="small">下载</a-button>
            </div>
        )
    }
    mounted() {
    }

}
</script>
<style lang="scss" scoped>
.menu-btn-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #fafafa;

    &>button {
        margin-right: 10px;
    }
}
</style>


