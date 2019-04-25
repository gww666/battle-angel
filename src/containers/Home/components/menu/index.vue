<script>
import Vue from "vue";
import Component from "vue-class-component";
import {Button, Modal} from "ant-design-vue";
import {postMessage} from "../../util";
import Form from "../form";
import Select from "../form/select";
import Input from "../form/input";
// import {generateMenu} from "./dropdown";
Vue.use(Button);
Vue.use(Modal);
@Component
export default class Menu extends Vue {
    newFileModalVisible = false;
    newFileType = "";
    newFileValues = [
        {key: "项目", value: "project"},
        {key: "页面", value: "page"},
    ];
    layoutValues = [
        {key: "flex布局", value: "flex"},
        {key: "绝对定位布局", value: "absolute"},
    ];

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
        await this.$store.dispatch("getIframeSrc", needImportComponentList);
        //请求页面配置
        this.$store.dispatch("gw/getPagePropsList", {});
    }
    async save() {
        //给iframe发消息，拿到其配置信息
        postMessage({
            type: "getComList"
        });
        const {needImportComponentList} = this.$store.state;
    }
    //新建文件或项目或组件
    newFile(event) {
        this.newFileModalVisible = true;
    }
    handleNewFileTypeChange(value) {
        console.log("change", value);
        
        this.newFileType = value;
    }
    handleNewFileOK() {
        console.log("OK");
        let form = this.$refs.newFileForm;
        //拿到值
        let values = form.getValues();
        console.log(values);
        this.newFileModalVisible = false;
    }
    handleNewFileCancel() {
        console.log("Cancel");
        this.newFileModalVisible = false;
    }
    add(e) {
        e.stopPropagation();
        console.log("add");
        
    }
    copy() {

    }
    async download() {
        await this.$store.dispatch("gw/downloadPage");
    }
    render() {
        return (
            <div class="menu-btn-box">
                <a-button onClick={this._import} size="small" loading={this.isCompiling}>导入</a-button>
                <a-button onClick={this.save} size="small">保存</a-button>
                <a-button onClick={this.download} size="small" loading={this.isDownloading}>下载</a-button>
                <a-button onClick={(event) => this.newFile(event)} size="small">新建</a-button>
                <a-modal
                    title="新建"
                    visible={this.newFileModalVisible}
                    onOk={this.handleNewFileOK}
                    onCancel={() => this.handleNewFileCancel()}
                    >
                    <Form ref="newFileForm">
                        <Select label="新建类型" 
                            id="newFileType"
                            values={this.newFileValues} 
                            change={this.handleNewFileTypeChange}>
                        </Select>
                        {this.newFileType === "page" ? 
                            <Select 
                                id="layoutType"
                                label="布局类型" 
                                values={this.layoutValues}>
                            </Select> :
                            ""
                        }
                        <Input label="名称" id="newFileName"></Input>
                    </Form>
                </a-modal>
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
