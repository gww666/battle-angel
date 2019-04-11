import Vue from "vue";
import {sync} from "vuex-router-sync";
import {createRouter} from "./routers";
// import {createStore} from "./store";
import store from "./store";
import App from "./App.vue";

export const createApp = () => {
    const router = createRouter();
    // const store = createStore();
    sync(store, router);
    // console.log("sync同步之后的store", store);
    // console.log("sync同步之后的store2", JSON.parse(JSON.stringify(store)));
    
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });
    
    return {app, router, store};
    // return {app, store};
}