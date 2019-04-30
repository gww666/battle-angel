<script>
import Vue from "vue";
import Component from "vue-class-component";
import {Button, Modal} from "ant-design-vue";
import Form from "../form";
import Select from "../form/select";
import Input from "../form/input";
Vue.use(Button);
Vue.use(Modal);
@Component
export default class NewFile extends Vue {
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
    get currentProjectId() {
        return this.$store.state.gw.currentProjectId;
    }
    //新建文件或项目或组件
    newFile(event) {
        this.newFileModalVisible = true;
    }
    handleNewFileTypeChange(value) {
        console.log("change", value);
        
        this.newFileType = value;
    }
    //创建操作的确定按钮
    async handleNewFileOK() {
        let form = this.$refs.newFileForm;
        //拿到值
        let values = form.getValues();
        console.log(values);
        let params = {
            ...values
        }
        delete params.name;
        if (values.type === "page") {
            params.pageId = values.name;
            params.projectId = this.currentProjectId;
        } else {
            params.projectId = values.name;
        }
        await this.$store.dispatch("gw/newFile", params);
        this.newFileModalVisible = false;
    }
    handleNewFileCancel() {
        this.newFileModalVisible = false;
    }
    //生成id
    generateId(prefix) {
        let range = 10000;
        return prefix + parseInt(Math.random() * range + range);
    }
    render() {
        return (
            <div>
                <a-button onClick={(event) => this.newFile(event)} size="small">新建</a-button>
                <a-modal
                    title="新建"
                    visible={this.newFileModalVisible}
                    onOk={this.handleNewFileOK}
                    onCancel={() => this.handleNewFileCancel()}
                    >
                    <Form ref="newFileForm">
                        <Select label="新建类型" 
                            id="type"
                            values={this.newFileValues} 
                            change={this.handleNewFileTypeChange}>
                        </Select>
                        {this.newFileType === "page" ? 
                            <Select 
                                id="layout"
                                label="布局类型" 
                                values={this.layoutValues}>
                            </Select> :
                            ""
                        }
                        <Input label="名称" id="name"></Input>
                    </Form>
                </a-modal>
            </div>
        )
    }
}
</script>