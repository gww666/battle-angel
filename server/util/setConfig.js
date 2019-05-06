import store from "../store";
//主要是把元素的样式值填充到config对象里
export const mapComputedStyle = (el, config) => {
    //遍历config
    for (let key in config) {
        //判断属性属于样式，并且没有值，获取该元素的默认样式返回
        if (key in document.documentElement.style && !config[key]) {
            config[key] = window.getComputedStyle(el, null)[key];
        }
    }
    return config;
}
/**
 * 根据id修改componentList里对应组件的config
 * @param {String} id 
 * @param {Object} config 
 */
export const setComConfigById = (id, config) => {
    // let list = JSON.parse(JSON.stringify(store.state.componentList));
    let obj = JSON.parse(JSON.stringify(store.state.pageConfig));
    let pageId = store.state.currentPageId;
    //先找page里
    let com = obj[pageId].componentList.find(item => item.id === id);
    if (com) {
        com.config = Object.assign(com.config, config);
    } 
    store.commit("setPageConfig", obj);
}

/**
 * 根据组件id获取组件的配置项，并对其做了一层样式填充的包装
 * @param {Object} el 可省略
 * @param {String} id 必传
 * @param {Boolean} origin 可省略
 */
export const getComConfigById = (el, id, origin) => {
    //处理参数
    if (typeof el === "string") {
        origin = id;
        id = el;
        el = document.querySelector(`div[data-baid="${id}"]`);
    }
    let pageId = store.state.currentPageId;
    let obj = JSON.parse(JSON.stringify(store.state.pageConfig));
    let com = obj[pageId].componentList.find(item => item.id === id);
    if (origin) {
        return com.config;
    } else {
        return mapComputedStyle(
            el, 
            com.config
        );
    }
    
} 
/**
 * 根据组件id获取其完整对象数据
 * @param {*} id 
 */
export const getComDataById = (id) => {
    let pageId = store.state.currentPageId;
    let obj = JSON.parse(JSON.stringify(store.state.pageConfig));
    let com = obj[pageId].componentList.find(item => item.id === id);
    return com;
}