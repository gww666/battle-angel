import store from "../../../store";
import { Modal } from 'ant-design-vue'
import { postMessage } from './index'
const events = (type) => {
    const _events = {
        // changeEditTabIndex(data) {
        //     //当前编辑的组件id，存到vuex中
        //     store.commit("gw/setEditId", data.id);
        //     store.commit("gw/setEditActiveTab", data.tab);
        //     setTimeout(() => {
        //         PSEvent.trigger("showComponentConfig", data.config);
        //     }, 17);
        // },
        getComponentProps(data) {
            console.log("接收到getComponentProps事件");
            
            //根据tag判断是什么操作触发的该事件
            // if (data.tag === "dragStart" && store.state.gw.editActiveTab === "2") {
            //     //只有当用户推拽组件并且编辑面板是处于page一侧的时候才执行下面的代码
            //     console.log("无需执行下面");
                
            //     return;
            // }
            //当前编辑的组件id，存到vuex中
            store.commit("gw/setEditId", data.id);
            //从服务端获取这个组件支持哪些配置项
            store.dispatch("gw/getComponentPropsList", {
                group: data.group,
                id: data.id
            });
            //自动切换到组件配置面板
            store.commit("gw/setEditActiveTab", "2");
            //回显当前组件的配置信息
            //nexttick
            setTimeout(() => {
                PSEvent.trigger("showComponentConfig", data.config);
            }, 17);
            
        },
        // 删除组件
        deleteComponentById(data) {
            Modal.confirm({
                cancelText: '取消',
                okText: '确定',
                content: '确定删除这个组件么',
                onOk: () => {
                    let currentState = store.state.gw
                    // 正在编辑这个要删除的组件
                    if(currentState.editId === data.id) {
                        store.commit("gw/setEditId", "")
                    }
                    // 删除componentProps里面的对应组件
                    Object.keys(currentState.componentProps).forEach(ele => {
                        if(ele === data.id) {
                            store.commit("gw/deleteAComponentProps", ele)
                        }
                    })
                    // 发个消息给iframe,执行删除
                    postMessage({
                        type: "deleteThisComponent",
                        data
                    });
                }
            })
        },
        async returnPageConfig(data) {
            store.dispatch("gw/savePageConfig", {
                pageConfig: data.config,
                projectId: store.state.gw.currentProjectId
            });
        },
        async updateEditComProps(data) {
            setTimeout(() => {
                PSEvent.trigger("showComponentConfig", data.config);
            }, 17);
        }
    }
    return _events[type] || (() => {});
}
window.addEventListener("message", data => {
    data = data.data;
    console.log("操作台---data", data);
    events(data.type)(data.data);
}, false);