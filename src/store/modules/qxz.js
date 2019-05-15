import {
    GET_PROJECTS,
    GET_PAGES,
    GET_PAGE_CONF
} from "../../config/api";
import axios from "axios";
import {postMessage} from "../../containers/Home/util";
const handleData = (data) => {
    if (data.status === 200 && data.data.returnCode === 1) {
        return data.data.data;
    } else {
        alert(data.data.message);
        return null;
    }
}
export default {
    namespaced: true,
    state: {
        projectsList: [],
        pagesList: []
    },
    getters: {
        getProjectsList: state => {
            return state.projectsList;
        },
        getPagesList: state => {
            return state.projectsList;
        }
    },
    mutations: {
        setProjectsList(state, list) {
            state.projectsList = list;
        },
        setPagesList(state, data) {
            state.pagesList = data;
        }
    },
    actions: {
        // 获取项目列表
        async requestProjectsList({commit}) {
            let options = {
                method: "GET",
                url: GET_PROJECTS
            }
            let data = await axios(options);
            let list = handleData(data) || [];
            commit("setProjectsList", list);
        },
        // 获取页面列表
        async requestPagesList({commit, dispatch}, projectId, noCompile) {
            let options = {
                method: "GET",
                url: GET_PAGES,
                params: {
                    projectId
                }
            };
            let data = await axios(options);
            data = handleData(data) || [];
            let homePage = data[0];
            data.forEach(item => {
                if(item.isMainPage) {
                    homePage = item;
                }
            });
            // 新增页面重新拉取或是没有页面
            if(noCompile || !homePage) {
                commit("gw/setCurrentPageId", "", {root: true});
                return;
            };
            
            // 修改选中的页面
            commit("gw/setCurrentPageId", homePage.name, {root: true});
            commit("setPagesList", data);
            dispatch("requestPageConf");
        },
        // 获取页面已引入的组件
        async requestPageConf({commit, dispatch, rootState}, noCompile) {
            let { currentPageId, currentProjectId } = rootState.gw;
            // 请求页面已引入的组件
            let options = {
                method: "GET",
                url: GET_PAGE_CONF,
                params: {
                    projectId: currentProjectId,
                    pageId: currentPageId   
                }
            };
            let data = await axios(options);
            data = handleData(data);
            // 没组件，不编译
            if(!data.length) {
                commit("gw/setNeedImportComponentList", [], {root: true});
            }else {
                // 设置要引入的组件列表
                commit("gw/setNeedImportComponentList", data, {root: true});
            };
            if(noCompile) {
                return
            }
            // 编译
            await dispatch("getIframeSrc", {
                projectId: currentProjectId,
                pageId: currentPageId
            }, {root: true});
            
            //请求页面配置
            await dispatch("gw/getPagePropsList", {pageId: currentPageId}, {root: true});
            //这里之所以加一个setTimeout是为了iframe页面初始化完毕
            setTimeout(() => {
                postMessage({
                    type: "getPageProps",
                    data: {
                        cb: "updatePageProps",
                        pageId: currentPageId
                    }
                });
            }, 100);
        }
    }
}