import Vue from "vue";
import "./plugin/ps";
import {createRouter} from "./routers";
// import {createStore} from "./store";
import store from "./store";
import App from "./App.vue";
const router = createRouter();
new Vue({
    router,
    store,
    render: h => h(App),
    el: "#app"
});