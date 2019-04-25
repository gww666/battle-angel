import Vuex from "vuex";
import Vue from "vue";
import gw from "./modules/gw";
import componentList from "../db/component-list";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        count: 1,
        componentList
    },
    mutations: {
        add(state, count) {
            state.count += count;
        },
        addComponentToList(state, component) {
            console.log("推入组件", component);
            // if (state.componentsInfo[component.type]) {
            //     state.componentsInfo[component.type].push(component);
            // } else {
            //     state.componentsInfo[component.type] = [component];
            // }
            state.componentList = state.componentList.concat(component);
            // state.componentList.push(component);
        },
        setComponentList(state, list) {
            // console.log("推入组件", component);
            // if (state.componentsInfo[component.type]) {
            //     state.componentsInfo[component.type].push(component);
            // } else {
            //     state.componentsInfo[component.type] = [component];
            // }
            state.componentList = [...list];
            // state.componentList.push(component);
        },
        // 点击了一个组件的删除按钮
        deleteComponentById(state, param) {
            let list = state.componentList
            for(let i = 0;i < list.length;i++) {
                if(list[i].id === param.id) {
                    state.componentList.splice(i, 1)
                }
            }
        }
    },
    modules: {
        gw
    }
});