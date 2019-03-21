import gtePageName from "../../utils/gw/getPageName";
//通知拖拽结束的事件名称
export const DRAG_DROP = "dragDrop";
export const DRAG_START = "dragStart";
/**
 * 通知拖拽事件结束的方法
 * @param {*} obj 
 */
export function dragDropTrigger(obj) {
    PSEvent.trigger(DRAG_DROP, obj);
}
/**
 * 通知拖拽事件开始的方法
 * @param {*} obj 
 */
export function dragStartTrigger(obj) {
    PSEvent.trigger(DRAG_START, obj);
}
/**
 * 添加特定的组件校验机制
 */
export function componentReg(obj) {
    //part: header, main, footer
    let {componentName,part} = obj;
    let _strategies = {
        default() {
            return true;
        },
        componentName(obj){
            if(obj.part==='main' && obj.componentName==='TabHead')
                {
                    return false
                }
        }
    }
    return _strategies[componentName](obj) || _strategies.default;
}
