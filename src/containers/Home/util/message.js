import store from "../../../store";
const events = (type) => {
    const _events = {
        getComponentProps(data) {
            store.commit("gw/setEditId", data.id);
            store.dispatch("gw/getComponentPropsList", {
                group: data.group,
                id: data.id
            });
            store.commit("gw/setEditActiveTab", "2");
        }
    }
    return _events[type] || (() => {});
}
window.addEventListener("message", data => {
    data = data.data;
    console.log("操作台---data", data);
    events(data.type)(data.data);
}, false);