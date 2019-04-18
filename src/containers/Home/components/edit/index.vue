<script>
import Vue from "vue";
import Component from "vue-class-component";
//初始化监听
import "../../util/message";
import {postMessage} from "../../util/index";
import Input from "../form/input";
import Form from "../form";
import {Button, Radio} from "ant-design-vue";
// Vue.use(Form);
// Vue.use(Input);
Vue.use(Radio);
Vue.use(Button);

@Component
export default class Edit extends Vue {
    // tabValue = "1";
    handleSubmit() {
        let getValues = this.tabValue === "1" ? this.$refs.pageForm.getValues : this.$refs.comForm.getValues;
        let values = getValues();
        console.log("submit", values);
        let data = {
            type: this.tabValue === "1" ? "changePageProps" : "changeComponentProps",
            data: {
                id: this.editId,
                config: {
                    ...values
                }
            }
        }
        postMessage(data, "*");
    }
    onRadioChange(e) {
        // this.tabValue = e.target.value;
        this.$store.commit("gw/setEditActiveTab", e.target.value);
        if (e.target.value === "1") {
            this.$store.commit("gw/setEditId", "page");
        }
    }
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
        return this.$store.state.gw.pageProps[this.editId] || [];
    }
    //组件支持编辑的属性列表
    get componentPropsList() {
        return this.$store.state.gw.componentProps[this.editId] || [];
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
                    <div class="component-props-box">
                        <Form ref="comForm">
                            {
                                this.componentPropsList.map(item => {
                                    return (
                                        <Input label={item.prop} id={item.prop} />
                                    )
                                })
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
            </div>
        )
    }
    initListener() {
        //当iframe里点击了组件编辑按钮时，需要回显组件值
        //为了防止重复监听，每次监听前先清除
        PSEvent.remove("showComponentConfig");
        PSEvent.listen("showComponentConfig", (config) => {
            // console.log("config", config);
            this.$refs.comForm.setValues(config);
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

