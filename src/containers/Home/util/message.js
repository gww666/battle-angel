import store from "../../../store";
const events = (type) => {
    const _events = {
        getComponentProps(data) {
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
        async returnComList(data) {
            store.dispatch("gw/saveComList", {
                list: data.list
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