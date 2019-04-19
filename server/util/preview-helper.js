/**
 * created by gw
 * 2019-4-17
 */
import StyleLoader from "../plugin/edit/css-modules";
import store from "../store";
import {setComConfigById, getComConfigById} from "../util/setConfig";
import Edit from "../plugin/edit";
import Drag from "../plugin/drag";
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
    if (typeof window.PSEvent !== "undefined") {
        window.PSEvent.listen(vm.componentId, (data) => {
            mapData(vm, data)
        });
    }
}

export const initData = (vm) => {
    let component = vm.$store.state.componentList.find(item => item.id === vm.componentId);
    if (component && component.config) {
        mapData(vm, component.config);
    }
}

//把绝对定位元素的坐标点存到vuex中
export const setPosition = (el) => {
    //获取组件ID
    let id = el.getAttribute("data-baid");
    let left = window.getComputedStyle(el, null).left;
    let top = window.getComputedStyle(el, null).top;
    setComConfigById(id, {left, top});
}

//初始化drag
export const initDrag = () => {
    const postMessage = (data) => {
        window.parent.postMessage(data, "*");
    }
    Array.from(document.querySelectorAll("div[data-baid]")).forEach(item => {
        let id = item.getAttribute("data-baid");
        let group = item.getAttribute("data-bagroup");
        
        new Drag(item, {
            init(dom) {
                new Edit(dom)
            },
            dragStart(dom) {
                let config = getComConfigById(dom, id);
                postMessage({
                    type: "getComponentProps",
                    data: {
                        // tab: "2",
                        tag: "dragStart",
                        id,
                        config,
                        group
                    }
                });
            },
            dragCompleted(dom) {
                setPosition(dom);
                // let id = dom.getAttribute("data-baid");
                let config = getComConfigById(dom, id);
                postMessage({
                    type: "updateEditComProps",
                    data: {
                        config
                    }
                });
            }
        });
    });
} 