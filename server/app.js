import Vue from "vue";
import {sync} from "vuex-router-sync";
import {createRouter} from "./routers";
import {createStore} from "./store";
import App from "./App.vue";
export const createApp = () => {
    const router = createRouter();
    const store = createStore();
    sync(store, router);
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });
    
    return {app, router, store};
}