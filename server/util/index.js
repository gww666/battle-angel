// import {createStore} from "../store";
// const store = createStore();
// import {createStore} from "../store";
import store from "../store";
//接收父页面的postmessage
const events = (type) => {
    const _event = {
        reload(data) {
            console.log("需要刷新");
            let url = data.url;
            // window.location.reload(true);
            // console.log("window.location.href", window.location.href);
            // if (typeof window !== undefined) {
                window.location.href = url;
            // }
            
            
        },
        addComponent(data) {
            let component = data.data;
            store.commit("gw/setComponentList", component);
        }

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
    events(data.type)(data);
    
}
// if (typeof window !== undefined) {
    window.addEventListener("message", receiveMessage, false);
// }


