import Router from "vue-router";
import Vue from "vue";
Vue.use(Router);
import mRoutes from "./import.js";
export const createRouter = () => {
    return new Router({
        routes: [
            ...mRoutes
        ]
    });
}