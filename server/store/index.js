import Vuex from "vuex";
import Vue from "vue";
import gw from "./modules/gw";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        count: 1
    },
    mutations: {
        add(state, count) {
            state.count += count;
        }
    },
    modules: {
        gw
    }
});
// export const createStore = () => {
//     return new Vuex.Store({
//         state: {
//             count: 1
//         },
//         mutations: {
//             add(state, count) {
//                 state.count += count;
//             }
//         },
//         modules: {
//             gw
//         }

//     });
// }