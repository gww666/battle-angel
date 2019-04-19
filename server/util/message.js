// import {createStore} from "../store";
// const store = createStore();
// import {createStore} from "../store";
import store from "../store";
import Drag from "../plugin/drag";
import Edit from "../plugin/edit";
import components from "../containers/test/import";
const postMessage = (data) => {
    window.parent.postMessage(data, "*");
}
//接收父页面的postmessage
const events = (type) => {
    const _event = {
        reload(data) {
            console.log("需要刷新");
            let url = data.url;
            window.location.href = url;
        },
        addComponent(data) {
            let component = data.component;
            store.commit("addComponentToList", component);
            //顺便初始化组建的拖拽等事件
            //nextTick
            setTimeout(() => {
                Array.from(document.querySelectorAll("div[data-baid]")).forEach(item => {
                    new Drag(item, {
                        // plugins: [
                        //     Edit
                        // ],
                        init(dom) {
                            new Edit(dom)
                            
                        },
                        dragCompleted(dom) {

                        }
                    });
                });
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
            let list = JSON.parse(JSON.stringify(store.state.componentList));
            for (let item of list) {
                if (item.id === data.id) {
                    item.config = data.config;
                }
            }
            store.commit("setComponentList", list);

        },
        //获取当前页面组件配置信息
        getComList(data) {
            // return document.documentElement.outerHTML;
            postMessage({
                type: "returnComList",
                data: {
                    list: store.state.componentList
                }
            });
        },
    }
    if (_event[type]) {
        return _event[type];
    }
    return () => {};
}
const receiveMessage = (data) => {
    data = data.data;
    console.log("接收到data", data);
    // data = JSON.parse(data.data);
    events(data.type)(data.data);
    
}
// if (typeof window !== undefined) {
window.addEventListener("message", receiveMessage, false);
window.addEventListener("message", receiveMessage, false);
// }


