/**
 * 在拖拽样式组件到目标区域后，添加一个新的组件
 */
import getPageName from "../../../utils/gw/getPageName";
import LinkedList from "../../LinkedList";
import {initComponentsList} from "../initComponents";
import { REAL_PREFIX as dom_real_prefix } from "../prefix";//dom节点上的前缀
import {REAL_PREFIX as com_real_prefix} from "../../../config/components/prefix";//组件名的前缀
import {getRealElData} from "../id";//获取生成real组件的id方法
export default ({componentName, pageY, part}) => {
    let manifest = window.manifest || {};
    let pageName = getPageName();
    //如果没有当前页面的组件结构，将其声明为一个空链表
    if (!manifest[pageName]) {
        manifest[pageName] = {
            header: new LinkedList(),
            main: new LinkedList(),
            footer: new LinkedList(),
            config: {}
        }
        // manifest[pageName] = new LinkedList();
    }
    //获取该组件应该插入的索引值
    let index = getIndex(pageY, part);
    // console.log(`应该放到第${index}的位置`);
    let _componentName = com_real_prefix + componentName;//对应的真实组件的名称
    // console.log("最终拿到的index", index);
    //构建一个组件对象结构，插入到当前页面的组件结构中
    let com = {
        id: getRealElData(),
        componentName: componentName,
        index,
        config: {},
    }
    //插入链表中
    if (index !== -1) {
        manifest[pageName][part].insert(index, com)
    } else {
        manifest[pageName][part].push(com);
    };
    window.manifest = manifest;
    // console.log("manifest", window.manifest);
    //
    initComponentsList();
    //更新页面
    // update();
}

/**
 * 获取组件应该插入的位置
 * @param {*} pageY 
 */
function getIndex(pageY, part) {
    //获取当前页面上所有data属性带有dom_real_prefix前缀的组件
    // let coms = document.querySelectorAll(`div[class*=${part}] div[data-id|=${dom_real_prefix}]`);
    let coms = document.querySelectorAll(`div[class*=${part}] div[data-id]`);
    // console.log("coms", coms);
    if (coms.length) {
        //需要比较当前drop（拖拽结束）时的纵坐标和组件们的纵坐标（这里取的是getBoundingClientRect().bottom）
        // console.log("pageY:", pageY);
        for (let index = 0; index < coms.length; index++) {
            let bottom = coms[index].getBoundingClientRect().bottom;
            // console.log(`第${index}个组件的bottom值：${bottom}`);
            if (pageY <= bottom) {
                //当pageY第一次小于某个组件的bottom时，
                //代表当插入到这个组件之前
                return index;
            }
        }
        //返回-1，代表要插入到最后一个
        return coms.length;
    }
    //如果当前页面没有组件，序列返回0
    return 0;
}