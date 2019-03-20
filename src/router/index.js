import Router from "vue-router";
import Vue from "vue";
import Home from "../containers/Home";
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: "/",
            redirect: {
                name: "home"
            }
        },
        {
            path: "/home",
            name: "home",
            component: Home
        }
    ]
})