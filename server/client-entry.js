import {createApp} from "./app.js";
import "../plugin/ps";
const {app, router, store} = createApp();
if (window.__INITIAL_STATE__) {
    console.log("window.__INITIAL_STATE__", window.__INITIAL_STATE__);
    
    // let url = location.pathname || "/";
    // if (location.search) url += location.search;
    // if (location.hash) url += location.hash;
    // const nowRoute = router.match(url);
    // window.__INITIAL_STATE__.route.query = nowRoute.query;
    // window.__INITIAL_STATE__.route.hash = nowRoute.hash;
    store.replaceState(window.__INITIAL_STATE__);
}
router.onReady(() => {
    app.$mount("#root");
});