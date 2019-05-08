import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
import axios from "axios";
import {COMPILER} from "../config/api";
import gw from "./modules/gw";
import qxz from "./modules/qxz";
export default new Vuex.Store({
    state: {
        count: 1,
        iframeHtml: "",
        iframeSrc: "",
        isCompiling: false
    },
    mutations: {
        add(state, count) {
            state.count += count;
        },
        setIframeSrc(state, val) {
            // state.iframeHtml = val;
            state.iframeSrc = val;
            state.isCompiling = false;
        },
        setIsCompiling(state, flag) {
            state.isCompiling = flag;
        }
    },
    actions: {
        //请求编译后的内容
        async getIframeSrc({commit}, params) {
            // return console.log(list);
            commit("setIsCompiling", true);
            let url = COMPILER;
            let options = {
                url,
                method: "post",
                data: params
            }
            let data = await axios(options);
            commit("setIframeSrc", data.data);
        }
    },
    modules: {
        gw,
        qxz
    }

});