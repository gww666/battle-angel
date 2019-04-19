/**
 * created by gw
 * 2019-4-17
 */
import StyleLoader from "../plugin/edit/css-modules";
import store from "../store";
import {setComConfigById} from "../util/setConfig";
/**
 * 
 * @param {Object} vm 
 * @param {Object} data 
 */
const mapData = (vm, data) => {
    let mStyle = {}
    Object.keys(data).forEach(key => {
        let value = data[key];
        if (value) {
            //属于样式标签
            if (key in document.documentElement.style) {
                mStyle[key] = value;
            } else {
                vm[key] = value
            }
        }
    });
    //设置样式属性
    if (Object.keys(mStyle).length) {
        vm.mStyle = StyleLoader(mStyle);
    }
}
export const initListenerCallback = (vm) => {
    window.PSEvent.listen(vm.componentId, (data) => {
        mapData(vm, data)
    });
}

export const initData = (vm) => {
    let component = vm.$store.state.componentList.find(item => item.id === vm.componentId);
    if (component && component.config) {
        mapData(vm, component.config);
    }
}

//点击编辑按钮时调用的方法，主要是把元素的样式值填充到config对象里
export const mapComputedStyle = (el, config) => {
    // console.log("重新获取");
    
    //遍历config
    for (let key in config) {
        //判断属性属于样式，并且没有值，获取该元素的默认样式返回
        if (key in document.documentElement.style && !config[key]) {
            config[key] = window.getComputedStyle(el, null)[key];
            console.log("key", key);
            console.log("config[key]", config[key]);
            
        }
    }
    return config;
}

//把绝对定位元素的坐标点存到vuex中
export const setPosition = (el) => {
    //获取组件ID
    let id = el.getAttribute("data-baid");
    let left = window.getComputedStyle(el, null).left;
    let top = window.getComputedStyle(el, null).top;
    setComConfigById(id, {left, top});
}