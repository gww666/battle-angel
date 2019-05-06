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
        currentPageId: "t3",
        comBoxComponentList: {}
    },
    mutations: {
        add(state, count) {
            state.count += count;
        },
        //追加一个组件
        addComponentToList(state, {comId, pageId, component}) {
            // console.log("追加一个组件", addComponentToList);
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
            console.log(state.pageConfig);
            
            // console.log("推入组件", component);
            // state.componentList = state.componentList.concat(component);
        },
        setPageConfig(state, config) {
            state.pageConfig = config;
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
        },
        setCurrentPageId(state, id) {
            state.currentPageId = id;
        }
    },
    modules: {
        gw
    }
});