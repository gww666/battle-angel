<script>
import Vue from "vue";
import Component from "vue-class-component";
import {Button, Modal} from "ant-design-vue";
import {postMessage} from "../../util";
import Form from "../form";
import Select from "../form/select";
import Input from "../form/input";
import ProjectSelect from "./project-select";
import NewFile from "./new-file";
// import {generateMenu} from "./dropdown";
Vue.use(Button);
Vue.use(Modal);
@Component
export default class Menu extends Vue {
    get currentPageId() {
        return this.$store.state.gw.currentPageId;
    }
    get currentProjectId() {
        return this.$store.state.gw.currentProjectId;
    }
    //下载接口的状态
    get isDownloading() {
        return this.$store.state.gw.isDownloading;
    }
    //编译接口的状态
    get isCompiling() {
        return this.$store.state.isCompiling;
    }
    //导入组件，开始编译
    async _import() {
        const {needImportComponentList} = this.$store.state.gw;
        await this.$store.dispatch("getIframeSrc", {
            componentList: needImportComponentList,
            projectId: this.currentProjectId,
            pageId: this.currentPageId
        });
        //请求页面配置
        this.$store.dispatch("gw/getPagePropsList", {});
    }
    async save() {
        //给iframe发消息，拿到其配置信息
        postMessage({
            type: "getPageConfig",
            data: {
                cb: "savePageConfig"
            }
        });
        const {needImportComponentList} = this.$store.state;
    }
    //新建文件或项目或组件
    newFile(event) {
        this.newFileModalVisible = true;
    }
    copy() {

    }
    async download() {
        await this.$store.dispatch("gw/downloadPage");
    }
    render() {
        return (
            <div class="menu-btn-box">
                <div class="left">
                    <a-button onClick={this._import} size="small" loading={this.isCompiling}>导入</a-button>
                    <a-button onClick={this.save} size="small">保存</a-button>
                    <a-button onClick={this.download} size="small" loading={this.isDownloading}>下载</a-button>
                    <NewFile />
                </div>
                <div class="right">
                    <ProjectSelect />
                </div>
            </div>
        )
    }
    mounted() {
    }

}
</script>
<style lang="scss" scoped>
.menu-btn-box {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 15px;
    display: flex;
    // align-items: center;
    justify-content: space-between;
    background-color: #fafafa;

    .left {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        &>button {
            margin-right: 10px;
        }
    }

    .right {
        display: flex;
        align-items: center;
    }

    
}

</style>
