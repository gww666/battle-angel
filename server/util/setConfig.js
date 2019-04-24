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
    let list = JSON.parse(JSON.stringify(store.state.componentList));
    for (let item of list) {
        if (item.id === id) {
            item.config = Object.assign(item.config, config);
            break;
        }
    }
    store.commit("setComponentList", list);
}

/**
 * 根据组件id获取组件的配置项，并对其做了一层样式填充的包装
 * @param {*} el 可省略
 * @param {*} id 必传
 */
export const getComConfigById = (el, id) => {

    if (typeof el === "string" && id === undefined) {
        id = el;
        el = document.querySelector(`div[data-baid="${id}"]`);
    }
    return mapComputedStyle(
        el, 
        store.state.componentList.find(item => item.id === id).config
    );
} 
/**
 * 根据组件id获取其完整对象数据
 * @param {*} id 
 */
export const getComDataById = (id) => {
    return store.state.componentList.find(item => item.id === id);
}