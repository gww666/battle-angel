import store from "../../store";
import {initNativeDrag} from "../../util/preview-helper";
//拖拽结束后更新组件列表的排序
export const sort = ({id, top}) => {
    // return;
    let pageId = store.state.currentPageId;
    let obj = JSON.parse(JSON.stringify(store.state.pageConfig));
    let comList = obj[pageId].componentList;
    //找到该组件的位置
    let originIndex = comList.findIndex(item => item.id === id);
    //先删除该元素
    let com = comList.splice(originIndex, 1)[0];
    //首先获取页面上所有直接子元素
    let els = Array.from(document.querySelectorAll("div[data-baid]"));
    console.log("els", els);
    
    let index = 0;
    let exist = false;
    for (let el of els) {
        //判断该元素的顶部距离第一次小于哪个元素的顶部距离，
        //插入到其前面
        let target = el.getBoundingClientRect().bottom;
        console.log("top", top);
        console.log("target", target);
        // if (top < target && el.getAttribute("data-baid") !== id) {
        if (top < target) {
            exist = true;
            break;
        }
        index++;
    }
    // index = exist ? index : originIndex;
    console.log("exist", exist);
    console.log("originIndex", originIndex);
    console.log("index", index);
    
    comList.splice(index, 0, com);
    console.log("打印更改后的comList", comList);
    
    //
    store.commit("setPageConfig", obj);
    //
    setTimeout(() => {
        initNativeDrag();
    }, 17);
}