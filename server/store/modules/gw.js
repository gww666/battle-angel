
export default {
    namespaced: true,
    state: {
        componentList: [{
            group: "button",
            id: "120161",
            name: "button1",
            path: "component/button/button1.vue",
            type: "button1",
        }]
    },
    mutations: {
        setComponentList(state, component) {
            console.log("推入组件", component);
            // if (state.componentsInfo[component.type]) {
            //     state.componentsInfo[component.type].push(component);
            // } else {
            //     state.componentsInfo[component.type] = [component];
            // }
            state.componentList = state.componentList.concat(component);
            // state.componentList.push(component);
        }
    }
}