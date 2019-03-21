<script>
// <a-icon type="picture" theme="twoTone"/>
import Vue from "vue";
import Component from "vue-class-component";
import {Collapse, Icon, Checkbox, Button} from "ant-design-vue";
import {componentsList} from "./config";
import axios from "axios";
import {postMessage} from "../../util";
Vue.use(Collapse);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Button);
// @Component({
//     data() {
//         return {
//             componentsList,
//             activeKey: ["1"]
//         }
//     }
// })
@Component
export default class List extends Vue {
    activeKey = ["1"];
    componentsList = componentsList;
    //记录需要导入的组件列表
    needImportComponentList = [];

    onChange(component) {
        // let arr = [].concat(needImportComponentList);
        let _index = -1;
        this.needImportComponentList.forEach((item, index) => {
            if (item.type === component.type) {
                _index = index;
            }
        });
        if (_index > -1) {
            this.needImportComponentList.splice(_index, 1);
        } else {
            this.needImportComponentList.push(component);
        }
        // console.log(component);
        console.log(this.needImportComponentList);
        
        
    }
    //导入组件，开始编译
    async _import() {
        this.$store.dispatch("getIframeSrc", this.needImportComponentList);
    }
    /**
     * 添加组件
     */
    add(item) {
        console.log("add");
        
        postMessage({
            type: "addComponent",
            data: item
        });
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
                                                        <span onClick={() => this.add(item2)}>{item2.name}</span>
                                                        <a-checkbox onChange={() => this.onChange(item2)}></a-checkbox>
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

    mounted() {
        Array.from(document.querySelectorAll(".component-item span")).forEach(item => {
            // initDragEvent(item);
        });
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

