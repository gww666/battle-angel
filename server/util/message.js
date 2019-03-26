// import {createStore} from "../store";
// const store = createStore();
// import {createStore} from "../store";
import store from "../store";
import Drag from "../../plugin/drag";
import Edit from "../../plugin/edit";
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
            store.commit("gw/setComponentList", component);
            //顺便初始化组建的拖拽等事件
            //nextTick
            setTimeout(() => {
                Array.from(document.querySelectorAll("div[data-baid]")).forEach(item => {
                    new Drag(item, {
                        plugins: [
                            Edit
                        ]
                    });
                });
            }, 0);   
        },
        //更该页面配置
        changePageProps(data) {
            let id = data.id;
            delete data.id;
            PSEvent.trigger(id, data);
        },
        //更该组件配置
        changeComponentProps(data) {
            _event.changePageProps(data);
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


