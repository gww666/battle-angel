/**
 * 生成一个对象，赋值给vue组件的components属性
 */
import getPageName from "../../utils/gw/getPageName";
import store from "../../store";
import {
    REAL_PREFIX as com_real_prefix,
    EDIT_PREFIX as com_edit_prefix
} from "../../config/components/prefix";


export const initComponentsList = () => {
    // console.log("initComponentsList-start", window.manifest, window.manifest[getPageName()]);
    let list = [[[], [], []], []];
    if (window.manifest[getPageName()]) {
        let page = window.manifest[getPageName()];
        console.log("打印page",page)
        let index = {
            header: 0,
            main: 1,
            footer: 2
        }
        for (let part in page) {
            if (part === "config") {
                list[1] = page.config;
                continue;
            }
            let current = page[part].head;
            while (current) {
                list[0][index[part]].push(current.element);
                current = current.next;
            }
        }
        console.log("打印打印list",list)
        store.commit("gw/setRealComponentsList", list);
        return list;
    } else {
        console.log("没有拿到对应页面的组件", getPageName(), window.manifest[getPageName()]);
        store.commit("gw/setRealComponentsList", list)
    }
}
/**
 * componentName: 组件名称
 * id: 组件Id
 */
export const initEditComponentsList = ({componentName, id, part}) => {

    if (!componentName || !id) {
        console.warn("没有获取到要显示的编辑组件名称或id");
        let list = [];
        store.commit("gw/setEditComponentsList", list);
        return;
    }
    //防止和真实组件命名冲突。。
    let _componentName = com_edit_prefix + componentName;
    // console.log(prefix_name);
    let list = [{componentName: _componentName, id, part}];
    store.commit("gw/setEditComponentsList", list);
}

