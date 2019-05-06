// import {createStore} from "../store";
// const store = createStore();
// import {createStore} from "../store";
import store from "../store";
const postMessage = (data) => {
    window.parent.postMessage(data, "*");
}
import {initDrag, alignCenter} from "./preview-helper";
import {setComConfigById} from "./setConfig";
//接收父页面的postmessage
const events = (type) => {
    const _event = {
        reload(data) {
            console.log("需要刷新");
            let url = data.url;
            window.location.href = url;
        },
        addComponent(data) {
            let {component, pageId} = data;
            store.commit("setCurrentPageId", pageId);
            store.commit("addComponentToList", {pageId, comId: component.id, component});
            //顺便初始化组建的拖拽等事件
            //nextTick
            setTimeout(() => {
                initDrag();
            }, 0);   
        },
        // 删除组件
        deleteThisComponent(data) {
            let {id, group} = data;
            store.commit('deleteComponentById', {id, group})
            setTimeout(() => {
                initDrag();
            }, 0); 
        },
        //更改页面配置
        changePageProps(data) {
            let id = data.id;
            // delete data.id;
            // PSEvent.trigger(id, data);
            PSEvent.trigger(id, data.config);
        },
        //更改组件配置
        changeComponentProps(data) {
            let id = data.id;
            PSEvent.trigger(id, data.config);
            //保存到vuex中
            setComConfigById(id, data.config);
            // let list = JSON.parse(JSON.stringify(store.state.componentList));
            // for (let item of list) {
            //     if (item.id === data.id) {
            //         item.config = data.config;
            //     }
            // }
            // store.commit("setComponentList", list);

        },
        //获取所有页面配置信息
        getPageConfig(data) {
            // return document.documentElement.outerHTML;
            postMessage({
                type: "returnPageConfig",
                data: {
                    config: store.state.pageConfig
                }
            });
        },
        //获取某个元素水平居中的left值
        alignCenter(data) {
            alignCenter(data.comId);
        }
    }
    if (_event[type]) {
        return _event[type];
    }
    console.warn(`没有定义${type}事件的handler`);
    
    return () => {};
}
const receiveMessage = (data) => {
    data = data.data;
    console.log("接收到data", data);
    // data = JSON.parse(data.data);
    events(data.type)(data.data);
    
}
// if (typeof window !== undefined) {
// window.addEventListener("message", receiveMessage, false);
window.addEventListener("message", receiveMessage, false);
// }


