import Router from "vue-router";
import Vue from "vue";
Vue.use(Router);
import Test from "../containers/test";
// const Test = () => import("../containers/test.vue");
export const createRouter = () => {
    return new Router({
        // mode: "history",
        routes: [
            {
                path: "/",
                component: Test
            }
        ]
    });
}