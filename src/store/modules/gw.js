import {
    GET_PROPS,
    DOWNLOAD,
    SAVE,
    NEW_FILE
} from "../../config/api";
import axios from "axios";
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
        editId: "page",//正在编辑的组件id
        editActiveTab: "1",//1为页面配置，2为组件配置
        pageProps: {},
        componentProps: {},
        needImportComponentList: [], //点击import按钮时，传给服务端的值
        //是否正在下载
        isDownloading: false,
        //当前选中的项目id
        currentProjectId: "89",
        currentPageId: "t3",
        pageConfig: {}
    },
    getters: {
        boxComponentList: state => {
            return state.pageConfig[state.currentPageId] ?
                state.pageConfig[state.currentPageId].componentList.filter(item => item.type === "box") :
                [];
        }
    },
    mutations: {
        setComponentProps(state, {id, list}) {
            state.componentProps = {
                ...state.componentProps,
                [id]: list
            };
        },
        setPageProps(state, {id, list}) {
            console.log("setPageProps", id, list);
            
            state.pageProps = Object.assign({}, state.pageProps, {
                [id]: list
            });
        },
        setEditId(state, id) {
            state.editId = id;
        },
        setEditActiveTab(state, val) {
            state.editActiveTab = val;
        },
        setNeedImportComponentList(state, list) {
            state.needImportComponentList = list;
        },
        //设置正在下载中
        setIsDownloading(state, flag) {
            state.isDownloading = flag;
        },
        //删除一个组件
        deleteAComponentProps(state, id) {
            delete state.componentProps[id]
        },
        //设置当前选中的项目ID
        setCurrentProjectId(state, id) {
            state.currentProjectId = id;
        },
        //设置当前选中的页面ID
        setCurrentPageId(state, id) {
            state.currentPageId = id;
        },
        setPageConfig(state, config) {
            state.pageConfig = config;
        }
    },
    actions: {
        async getComponentPropsList({state, commit}, params) {
            // console.log("state", state);
            if (state.componentProps[params.id]) return;
            let options = {
                url: GET_PROPS,
                params
            }
            let data = await axios(options);
            data = handleData(data);
            commit("setComponentProps", {list: data, id: params.id});
        },
        async getPagePropsList({state, commit}, params) {
            if (state.pageProps["page"]) return;
            let test = [
                {
                    prop: "backgroundColor",
                    title: "背景颜色"
                }
            ]
            commit("setPageProps", {list: test, id: "page"});
        },
        //下载接口
        async downloadPage({commit, state}, params = {}) {
            commit("setIsDownloading", true);
            let options = {
                url: DOWNLOAD,
                method: "POST",
                data: params
            }
            let data = await axios(options);
            data = handleData(data);
            setTimeout(() => {
                commit("setIsDownloading", false);
            }, 1000);
            
        },
        //保存接口
        async savePageConfig({commit}, params = {}) {
            let options = {
                url: SAVE,
                method: "POST",
                data: params
            }
            let data = await axios(options);
            data = handleData(data);
        },
        //新建接口
        async newFile({commit}, params = {}) {
            let options = {
                url: NEW_FILE,
                params
            }
            let data = await axios(options);
            data = handleData(data);
        },
    }
}