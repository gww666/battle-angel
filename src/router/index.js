import Router from "vue-router";
import Vue from "vue";
import Home from "../containers/Home";
import ProjectList from "../containers/ProjectList";
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: "/",
            redirect: {
                name: "projectList"
            }
        },
        {
            path: "/home",
            name: "home",
            component: Home
        },
        {
            path: "/projectList",
            name: "projectList",
            component: ProjectList
        }
    ]
})