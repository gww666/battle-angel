
export default {
    namespaced: true,
    state: {
        componentList: []
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