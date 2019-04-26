import Vuex from "vuex";
import Vue from "vue";
import gw from "./modules/gw";
import componentList from "../db/component-list";
import pageConfig from "../db/page-config";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        count: 1,
        pageConfig,
        componentList,
        comBoxComponentList: {}
    },
    mutations: {
        add(state, count) {
            state.count += count;
        },
        //追加一个组件
        addComponentToList(state, {comId, pageId, component}) {
            let obj = JSON.parse(JSON.stringify(state.pageConfig));
            //向页面的组件列表追加一个组件
            if (pageId) {
                //已经存在该页面的配置项
                if (obj[pageId]) {
                    // obj[pageId].componentList.push(component);
                    obj[pageId].componentList.push(component);
                } else {
                    obj[pageId] = {
                        config: {},
                        componentList: [component]
                    }
                }
            } else if (comId) {
                //向容器组件的组件列表追加一个组件
                let com = obj[pageId].componentList.find(item => item.id === comId);
                com.componentList.push(component);
            }
            state.pageConfig = obj;
            // console.log("推入组件", component);
            // state.componentList = state.componentList.concat(component);
        },
        setComponentList(state, list) {
            state.componentList = [...list];
        }
    },
    modules: {
        gw
    }
});