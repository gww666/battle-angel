import store from "../store";
export const setComConfigById = (id, config) => {
    let list = JSON.parse(JSON.stringify(store.state.componentList));
    for (let item of list) {
        if (item.id === id) {
            item.config = Object.assign(item.config, config);
            break;
        }
    }
    store.commit("setComponentList", list);
}