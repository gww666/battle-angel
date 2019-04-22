/**
 * created by gw
 * 2019-4-17
 */
import StyleLoader from "../plugin/edit/css-modules";
import {setComConfigById, getComConfigById, getComDataById} from "../util/setConfig";
import Edit from "../plugin/edit";
import Drag from "../plugin/drag";
const postMessage = (data) => {
    window.parent.postMessage(data, "*");
}
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
export const initListenerCallback = (vm, type) => {
    if (typeof window.PSEvent !== "undefined") {
        let eventName = type === "page" ? vm.pageId : vm.componentId;
        window.PSEvent.listen(eventName, (data) => {
            mapData(vm, data)
        });
    }
}

export const initData = (vm, type) => {
    let store = vm.$store.state;
    let config = type === "page" ?
        {backgroundColor: "#fff"} :
        getComConfigById(vm.componentId);

    if (config) {
        mapData(vm, config);
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

//获取元素水平居中的left值
export const alignCenter = (comId) => {
    // //拿到组件ID
    // let comId = vm.componentId;
    // //根据组件ID获取到元素
    // let el = document.querySelector(`div[baid=${comId}]`);
    // let screenWidth = window.innerWidth;
    // let elWidth = window.getComputedStyle(el, null).width.slice(0, -2);
    // //获得当前config
    // let config = getComConfigById(comId);
    // config.left = (screenWidth - elWidth) / 2 + "px";
    // //保存到vuex中
    // setComConfigById(comId, config);
    // //更新iframe页面的组件UI
    // mapData(vm, config);
    // //通知父页面更新表单数据
    // postMessage({
    //     type: "getComponentProps",
    //     data: {
    //         id: comId,
    //         config
    //     }
    // });
    //以上为一个实现版本，但考虑到维护性采取下面的方式
    //根据组件ID获取到元素
    let el = document.querySelector(`div[baid=${comId}]`);
    let screenWidth = window.innerWidth;
    let elWidth = window.getComputedStyle(el, null).width.slice(0, -2);
    //获得当前config
    let config = getComConfigById(el, comId);
    config.left = (screenWidth - elWidth) / 2 + "px";
    //获取group
    let group = getComDataById(comId).group;
    postMessage({
        type: "getComponentProps",
        data: {
            id: comId,
            group,
            config,
        }
    });
}
