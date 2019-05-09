import store from "../store";
/**
 * 根据id从pageConfig对象中找到对应的组件
 * @param {String} id 要找的组件Id
 * @param {Object} data pageConfig对象
 */
export const getComById = (id, data) => {
    if (!data) {
        data = JSON.parse(JSON.stringify(store.state.pageConfig));
    }
    //先找页面
    let pageId = store.state.currentPageId;
    let com = data[pageId].componentList.find(item => item.id === id);
    if (com) return com;
    //找到所有的盒子组件
    let boxComponents = [];
    let getBoxComponents = (_componentList) => {
        _componentList.forEach(item => {
            if (item.group === "box") {
                boxComponents.push(item);
                if (item.config.componentList) {
                    //同时遍历该box组件下面的componentList
                    getBoxComponents(item.config.componentList);
                }
            }
        });
    }
    getBoxComponents(data[pageId].componentList);
    for (let box of boxComponents) {
        if (box.config.componentList) {
            for (let item of box.config.componentList) {
                if (item.id === id) {
                    return item;
                }
            }
        }
    }
}

export const deleteComById = (id) => {
    let data = JSON.parse(JSON.stringify(store.state.pageConfig));
    let pageId = store.state.currentPageId;
    let index = 0;
    
    for (let item of data[pageId].componentList) {
        //判断该组件是否是页面上的
        //先找页面
        if (item.id === id) {
            data[pageId].componentList.splice(index, 1);
            break;
        } else if (item.group === "box") {
            //遍历该自由容器的组件列表
            let index2 = 0;
            for (let item2 of item.config.componentList) {
                if (item2.id === id) {
                    item.config.componentList.splice(index2, 1);
                    break;
                }
                index2++;
            }
        }
        index++;
    }
    store.commit("setPageConfig", data);
}

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
    // let pageId = store.state.currentPageId;
    //先找page里
    // let com = obj[pageId].componentList.find(item => item.id === id);
    let com = getComById(id, obj);
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
    let com = getComById(id);
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