import editBtn from "./css-modules/edit-button";
import styleLoader from "./css-modules";
import {getComConfigById} from "../../util/setConfig";
import store from "../../store";
import { Modal } from 'ant-design-vue'
// import {getClass} from "../../utils/gw/utils";
class Edit {
    constructor(dom) {
        this.initMouseEvent(dom);
    }
    /**
     * 添加鼠标移入移出事件
     * @param {*} el 
     * @param {*} obj 
     */
    initMouseEvent(el, {componentName, handleType, index, deleteAble} = {deleteAble: true}) {
        // if (handleType === "add") return;
        
        
        let id = el.getAttribute("data-baid");
        let group = el.getAttribute("data-bagroup");
        el.onmouseenter = () => {
            // console.log("鼠标进入");
            showCover();
        }
        el.onmouseleave = () => {
            // console.log("鼠标离开");
            hideCover();
        }
        //创建一个浮层
        function showCover() {
            // console.log("el", el);
            let width = getComputedStyle(el, null).width;
            let height = getComputedStyle(el, null).height;
            !el.style.position && (el.style.position = "relative");
            let cover = `
                <div class="edit-cover" 
                    style="border: 3px dashed #2489c5;width: ${width};height: ${height};
                    position: absolute;left: 0;top: 0;
                    z-index: 1;box-sizing: border-box;">
                    <div style="height: 30px;width: 150px;position: absolute;
                        right: 0;top: 0;display: flex;justify-content: space-between;">
                        <span class="cover-edit-btn"
                            style="${styleLoader(editBtn.blue_btn)}">
                            编辑
                        </span>
                        <span class="cover-del-btn" 
                            style="${deleteAble ? styleLoader(editBtn.blue_btn) : styleLoader(editBtn.blue_btn_disable)}">
                            删除
                        </span>
                    </div>
                </div>
            `;
            el.insertAdjacentHTML("afterbegin", cover);
            //添加编辑按钮点击事件
            el.querySelector(".cover-edit-btn").onclick = editClickEvent;
            el.querySelector(".cover-del-btn").onclick = deleteClickEvent;
        }
        //隐藏浮层
        function hideCover() {
            el.querySelector(".edit-cover") && el.removeChild(el.querySelector(".edit-cover"));
        }
        function editClickEvent() {
            console.log("点击编辑按钮", id, group);
            let data = {
                type: "getComponentProps",
                data: {
                    id,
                    group,
                    config: getComConfigById(el, id)
                }
            }
            //告诉父页面点击的组件信息
            window.parent.postMessage(data, "*");
        }
        function deleteClickEvent() {
        	// if (!deleteAble) {
        	// 	console.log("该组件不能删除");
        	// 	return;
        	// }
            console.log("点击删除按钮按钮", id, group);
            // Modal.confirm({
            //     cancelText: '取消',
            //     okText: '确定',
            //     content: '确定删除这个组件么',
            //     onOk: () => {
                    store.commit('deleteComponentById', {id, group})
                    let data = {
                        type: "deleteComponentById",
                        data: {
                            id,
                            group
                        }
                    }
                    // let parentNode = el.parentNode;
                    //告诉父页面要删除的组件信息
                    window.parent.postMessage(data, "*");
                    // let part = getPart(parentNode);
                    // console.log("parentNode", parentNode, part);
                    // del({position: index, part});
                }
            // })
        }
    }
}
const doEdit = (dom) => {
    new Edit(dom);
}


export default doEdit;