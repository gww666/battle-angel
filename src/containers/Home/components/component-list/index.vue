<script>
// <a-icon type="picture" theme="twoTone"/>
import Vue from "vue";
import Component from "vue-class-component";
import {Collapse, Icon, Checkbox, Button} from "ant-design-vue";
import {componentsList} from "./config";
import axios from "axios";
Vue.use(Collapse);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Button);
@Component({
    data() {
        return {
            componentsList,
            activeKey: ["1"]
        }
    }
})
export default class List extends Vue {

    onChange(path) {
        console.log("path"); 
    }

    async _import() {
        // console.log("import");
        
        // let options = {
        //     url: "/api/compiler"
        // }
        // let data = await axios(options);
        // console.log("data", data);
        this.$store.dispatch("getIframeSrc");
    }

    render() {
        return (
            <div class="component-list-box">
                <div class="btn-box">
                    <a-button onClick={this._import} size="small">导入</a-button>
                </div>
                <a-collapse activeKey={this.activeKey}>
                    {
                        this.componentsList.map((item, index) => {
                            return (
                                <a-collapse-panel header={item.title} key={index + 1 + ""}>
                                    <div class="component-item-box">
                                        {
                                            item.list.map((item2, index2) => {
                                                return (
                                                    <div class="component-item">
                                                        <span>{item2.name}</span>
                                                        <a-checkbox change={() => this.onChange(item.path)}></a-checkbox>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </a-collapse-panel>
                            )
                        })
                    }
                </a-collapse>
            </div>
        )
        
    }
}
</script>
<style scoped lang="scss">
.component-list-box {
    height: 100%;

    .btn-box {
        background: #fafafa;
        padding: 10px;
        display: flex;
        justify-content: flex-end;
    }

    .ant-collapse {
        height: 100%;
    }
    .component-item {
        display: flex;
        justify-content: space-between;
        width: 100%;
        &>span {
            cursor: pointer;
        }
    }
}

</style>

