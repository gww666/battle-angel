/**
 * 拖拽真实组件进行排序
 */
import getIndex from "../getIndex";//获取应该插入的索引
import getPageName from "../../../utils/gw/getPageName";
import { initComponentsList } from "../initComponents";
export default ({pageY, startPageY, part}) => {
    let manifest = window.manifest;
    // console.log("part", part);
    let pageName = getPageName();
    let currentPageList = manifest[pageName][part];
    // console.log("currentPageList", currentPageList);
    if (!currentPageList || !currentPageList.head) return;
    let startIndex = getIndex(startPageY, part);
    let endIndex = getIndex(pageY, part);
    // console.log("拖拽真实组件排序---拖拽的第几个元素", startIndex);
    // console.log("拖拽真实组件排序---要插入的位置", endIndex);
    //交换元素
    let current = currentPageList.removeAt(startIndex);
    // console.log("打印current", current);
    currentPageList.insert(endIndex, current);
    initComponentsList();
}
