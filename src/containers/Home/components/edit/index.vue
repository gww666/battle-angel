<script>
import Vue from "vue";
import Component from "vue-class-component";
//初始化监听
import "../../util/message";
import {postMessage} from "../../util/index";
import Input from "../form/input";
import Select from "../form/select";
import Form from "../form";
import {Button, Radio} from "ant-design-vue";
import Cover from "./cover";
Vue.use(Radio);
Vue.use(Button);

@Component
export default class Edit extends Vue {
    //获取当前编辑的面板
    //1为页面配置，2为组件配置
    get tabValue() {
        return this.$store.state.gw.editActiveTab;
    }
    //获取正在编辑的模块id
    get editId() {
        return this.$store.state.gw.editId;
    }
    //页面支持编辑的属性列表
    get pagePropsList() {
        return this.$store.state.gw.pageProps[this.currentPageId] || [];
    }
    //组件支持编辑的属性列表
    get componentPropsList() {
        return this.$store.state.gw.componentProps[this.editId] || [];
    }
    //根据属性列表展示组件
    get componentsForProps() {
        if (!this.$store.state.gw.componentProps[this.editId]) return [];
        let arr = this.$store.state.gw.componentProps[this.editId]
        .filter(item => !item.private)
        .map(item => {
            return this.formElRender(item);
        });
        return arr;
    }
    //获得当前页面的component类别为box的
    get boxComponentList() {
        //默认追加一个节点，代表根页面
        return [{
            key: "page",
            value: "page"
        }].concat(this.$store.getters["gw/boxComponentList"].map(item => {
            return {
                key: item.id,
                value: item.id
            }
        }));
    }
    get currentPageId() {
        return this.$store.state.gw.currentPageId;
    }
    get add2BoxComCoverVisible() {
        return this.$store.state.gw.add2BoxComCoverVisible;
    }

    getFormInstance() {
        return this.tabValue === "1" ? 
            this.$refs.pageForm : 
            this.$refs.comForm;
    }
    // tabValue = "1";
    handleSubmit() {
        let getValues = this.tabValue === "1" ? this.$refs.pageForm.getValues : this.$refs.comForm.getValues;
        let values = getValues();
        console.log("submit", values);
        let data = {
            type: this.tabValue === "1" ? "changePageProps" : "changeComponentProps",
            data: {
                id: this.tabValue === "1" ? this.currentPageId : this.editId,
                config: {
                    ...values
                }
            }
        }
        postMessage(data, "*");
    }
    //切换编辑面板
    onRadioChange(e) {
        // this.tabValue = e.target.value;
        this.$store.commit("gw/setEditActiveTab", e.target.value);
        if (e.target.value === "1") {
            this.$store.commit("gw/setEditId", this.currentPageId);
            //从服务端请求页面支持的props配置项
            this.$store.dispatch("gw/getPagePropsList", {pageId: this.currentPageId})
        }
    }
    //切换组件的父组件
    onComParentChange(newVal, oldVal) {
        if (!oldVal) return;
        //拿到父组件的id
        //通知iframe改变引用关系
        //在iframe里回传事件，调用compiler接口
        postMessage({
            type: "changeComParent",
            data: {
                cb: "replyChangeComParent",
                comId: this.editId,
                newParentId: newVal,
                oldParentId: oldVal,
                pageId: this.currentPageId
            }
        });
    }
    handleFormBtnEvent(propType) {
        let comId = this.editId;
        const _event = {
            //水平居中的事件
            alignCenter: () => {
                let form = this.getFormInstance();
                form.setValues({
                    left: "50%",
                    transform: "translateX(-50%)"
                });
            },
            //向自由容器中添加组件
            addComToBox: () => {
                this.$store.commit("gw/setBoxComId", comId);
                //追加到body中
                document.body.appendChild(document.querySelector(".edit-box-com-cover"));
                //显示遮罩
                this.$store.commit("gw/setAdd2BoxComCoverVisible", true);
            }
        };
        if (_event[propType]) {
            _event[propType]();
        } else {
            console.warn(`handleFormBtnEvent: 没有定义${propType}事件`);
        }
    }
    //根据条件渲染表单元素
    formElRender(item) {
        let type = item.type || "input";
        switch (type) {
            case "input":
                return <Input label={item.prop} id={item.prop} />;
            case "button":
                return (
                    <div>
                        <a-button type="primary"
                            onClick={this.handleFormBtnEvent.bind(this, item.prop)}>
                            {item.title}
                        </a-button>
                    </div>
                );
            case "select":
                return <Select id={item.prop} label={item.prop} values={item.values}></Select>;
        }
    }
    render() {
        //是否显示提交按钮
        let shouSubmitBtn = (this.tabValue === "1" && this.pagePropsList.length) || (this.tabValue === "2" && this.componentPropsList.length);
        return (
            <div class="edit-box">
                {/**切换配置选项卡 */} 
                <div class="radio-box">
                    <a-radio-group name="radioGroup"
                        value={this.tabValue}
                        onChange={this.onRadioChange}>
                        <a-radio value="1">page</a-radio>
                        <a-radio value="2">component</a-radio>
                    </a-radio-group>
                </div>
                {/** 页面属性设置 */}
                {
                    this.tabValue === "1" ?
                    //页面属性配置面板
                    <div class="page-props-box">
                        <Form ref="pageForm">
                            {
                                this.pagePropsList.map(item => {
                                    return (
                                        <Input label={item.prop} id={item.prop} />
                                    )
                                })
                            }
                        </Form>
                    </div> :
                    //组件属性配置面板
                    <div class="component-props-box">
                        <Form ref="comForm">
                            {
                                this.componentsForProps
                            }
                        </Form>
                    </div>
                }
                {
                    shouSubmitBtn ? 
                    <a-button
                        type="primary"
                        onClick={this.handleSubmit}
                    >
                        应用
                    </a-button> :
                    <div></div>
                }
                <Cover visible={this.add2BoxComCoverVisible} />
            </div>
        )
    }
    initListener() {
        //当iframe里点击了组件编辑按钮时，需要回显组件值
        //为了防止重复监听，每次监听前先清除
        window.PSEvent.remove("showComponentConfig");
        window.PSEvent.listen("showComponentConfig", (config) => {
            // console.log("config", config);
            this.$refs.comForm.setValues(config);
        });
        window.PSEvent.remove("showPageConfig");
        window.PSEvent.listen("showPageConfig", (config) => {
            console.log("page-props-config", config);
            this.$refs.pageForm.setValues(config);
        });
    }
    mounted() {
        //初始化监听，当切换组件id时，对input值进行清空
        this.initListener();
    }
}
</script>
<style lang="scss" scoped>
.edit-box {
    height: 726px;
    width: 600px;
    border: 1px solid #f1f1f1;
    position: relative;
    padding: 15px;

    .radio-box {
        position: absolute;
        top: -50px;
        left: 0;
        // padding: 0 10px;
        // transform: translateY(-50px);
    }

}
</style>

