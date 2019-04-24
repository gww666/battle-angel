import {
    GET_PROPS,
    DOWNLOAD,
    SAVE
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
        isDownloading: false
    },
    getters: {

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
        async saveComList({commit}, params = {}) {
            let options = {
                url: SAVE,
                method: "POST",
                data: params
            }
            let data = await axios(options);
            data = handleData(data);
        },
    }
}