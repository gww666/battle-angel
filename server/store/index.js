import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
export const createStore = () => {
    return new Vuex.Store({
        state: {
            count: 1
        },
        mutations: {
            add(state, count) {
                state.count += count;
            }
        },
        modules: {
            // gw
        }

    });
}