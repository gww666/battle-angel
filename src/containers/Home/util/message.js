import store from "../../../store";
const events = (type) => {
    const _events = {
        getComponentProps(data) {
            store.dispatch("gw/getComponentProps", {
                type: data.type
            });
        }
    }
    return _events[type] || (() => {});
}
window.addEventListener("message", data => {
    console.log("操作台---data", data);
    
    events(data.type)(data.data);
}, false);