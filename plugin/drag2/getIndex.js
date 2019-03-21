import { REAL_PREFIX as dom_real_prefix} from "./prefix";
export default function getIndex(pageY, part) {
    //获取当前页面上所有data属性带有REAL_PREFIX前缀的组件
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
        //返回最后一个下标值，代表要插入到最后一个
        return coms.length - 1;
    }
    //如果当前页面没有组件，序列返回0
    return 0;
}