import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
import axios from "axios";
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
        async getIframeSrc({commit}) {
            commit("setIsCompiling", true);
            let url = "/api/compiler";
            let data = await axios(url);
            commit("setIframeSrc", data.data);

        }
    },
    modules: {
        // gw
    }

});