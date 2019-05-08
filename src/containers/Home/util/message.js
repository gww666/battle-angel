import store from "../../../store";
import { Modal } from 'ant-design-vue'
import { postMessage } from './index'
const events = (type) => {
    const _events = {
        async getComponentProps(data) {
            console.log("接收到getComponentProps事件");
            //当前编辑的组件id，存到vuex中
            store.commit("gw/setEditId", data.id);
            //从服务端获取这个组件支持哪些配置项
            await store.dispatch("gw/getComponentPropsList", {
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
        //调用save接口
        async savePageConfig(data) {
            store.dispatch("gw/savePageConfig", {
                pageConfig: data.config,
                projectId: store.state.gw.currentProjectId
            });
        },
        async returnPageConfig(data) {
            //保存到vuex中
            store.commit("gw/setPageConfig", data.config);
        },
        async updateEditComProps(data) {
            setTimeout(() => {
                PSEvent.trigger("showComponentConfig", data.config);
            }, 17);
        },
        async replyChangeComParent(data) {
            let {componentList} = data;
            await store.dispatch("getIframeSrc", {
                componentList,
                projectId: store.state.gw.currentProjectId,
                pageId: store.state.gw.currentPageId
            });
        }
    }
    return _events[type] || (() => {});
}
window.addEventListener("message", data => {
    data = data.data;
    console.log("操作台---data", data);
    events(data.type)(data.data);
}, false);