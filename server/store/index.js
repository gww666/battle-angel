import Vuex from "vuex";
import Vue from "vue";
import gw from "./modules/gw";
import componentList from "../db/component-list";
import pageConfig from "../db/page-config";
import {getComById} from "../util/setConfig";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        count: 1,
        pageConfig,
        componentList,
        currentPageId: "t3",
        comBoxComponentList: {}
    },
    getters: {
    },
    mutations: {
        add(state, count) {
            state.count += count;
        },
        //追加一个组件
        addComponentToList(state, {pageId, component, boxComId}) {
            // console.log("追加一个组件", addComponentToList);
            let obj = JSON.parse(JSON.stringify(state.pageConfig));
            //如果有boxComId，代表要添加到自由容器中
            if (boxComId) {
                let com = getComById(boxComId, obj);
                if (com.config.componentList) {
                    com.config.componentList.push(component);
                } else {
                    com.config.componentList = [component];
                }
            } else {
                //已经存在该页面的配置项
                if (obj[pageId]) {
                    obj[pageId].componentList.push(component);
                } else {
                    obj[pageId] = {
                        config: {},
                        componentList: [component]
                    }
                }
            }
            state.pageConfig = obj;
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