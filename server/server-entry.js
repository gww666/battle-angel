import {createApp} from "./app";
export default (context) => {
    // let url = context.url;
    let url = "/";
    return new Promise((resolve, reject) => {
        const {app, router, store} = createApp();
        router.push(url);
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                reject({code: 404});
            }
            // console.log("matchedComponents", matchedComponents);
            // console.log("router", router);
            // console.log("有匹配到的组件", url);
            
            //数据预取
            Promise.all(matchedComponents.map(component => {
                if (component.asyncData) {
                    console.log("存在asyncData");
                    return component.asyncData({
                        store,
                        route: router.currentRoute
                    });
                }
            })).then(data => {
                context.state = store.state;
                resolve(app);
            }).catch(reject);
        }, reject);
    });
}