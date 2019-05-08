import {
    GET_PROJECTS,
    GET_PAGES
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
        setPagesList(state, list) {
            state.pagesList = list;
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
        async requestPagesList({commit}, projectId) {
            let options = {
                method: "GET",
                url: GET_PAGES,
                params: {
                    projectId
                }
            }
            let data = await axios(options);
            let list = handleData(data) || [];
            commit("setPagesList", list);
        }
    }
}