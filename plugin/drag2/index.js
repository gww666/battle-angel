/**
 * 提供插件install方法
 * by gw, 2018-5-23
 */
// import add from "./handle/add";
// import sort from "./handle/sort";
// import del from "./handle/delete";
// import edit from "./handle/edit";
// import editBtn from "./css-modules/edit-button";
// import styleLoader from "./css-modules";
// import {getClass} from "../../utils/gw/utils";
// import {dragDropTrigger, componentReg, dragStartTrigger} from "./event";
export default (Vue) => {
    /**
     * 注册全局指令
     * 该指令使得某个dom元素具备可拖拽的能力，用于样式组件
     */
    /**
     * 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
     * @param {*} el 指令所绑定的元素，可以用来直接操作 DOM 
     * @param {*} binding 一个对象，包含一些属性
     * @param {*} vnode 
     * @param {*} oldVnode 
     */
    Vue.directive("sdrag", function (el, binding, vnode, oldVnode) {
        // console.log("el", el);
        //获取样式组件的名称，以此为区分
        let componentName = binding.value.componentName || "";
        //获取当次操作类型 add or sort
        //add代表拖拽样式组件到目标区域新增真实组件
        //sort代表拖拽已有真实组件进行排序
        let handleType = binding.value.handleType || "add";
        // 获取当前组件相对于同级组件的索引值
        let index = binding.value.index || 0;
        let deleteAble = binding.value.deleteAble === undefined ? true : binding.value.deleteAble;
        let obj = {
            componentName,
            handleType,
            index,
            deleteAble
        }
        initDragEvent(el, obj);
        // initMouseEvent(el, obj);
    });
    /**
     * 注册一个全局指令
     * 使得目标区域可以放置被拖拽的元素
     */
    Vue.directive("sdcon", {
        bind(el, binding, vnode, oldVnode) {
            // console.log("sdcon正在执行", el);
            let part = binding.value ? (binding.value.part || getPart(el)) : getPart(el);
            initDropEvent({
                el,
                part
            });
        }
    });
    /**
     * 获取元素属于哪个可拖拽区域
     * @param {*} el 
     */
    function getPart(el) {
        let _class = getClass(el);
        // console.log("getClass", _class, getClass(el));
        let part = ["main", "header", "footer"];
        for (let item of part) {
            let target = _class.find(_part => item === _part);
            if(target) {
                return target;
            }
        }
        return "main";
    }
    /**
     * 初始化拖拽事件
     * @param {Object} el 
     * @param {Object} obj
     */
    function initDragEvent(el, obj) {
        //给dom元素添加dragable=true，该dom元素通常是样式组件的外部盒子
        el.draggable = true;
        //该dom元素下面的img标签禁用它的浏览器默认行为
        el.querySelector("img") && 
            (el.querySelector("img").draggable = false);
        el.ondragstart = (e) => {
            // console.log("开始拖拽", e);
            dragStartTrigger(obj);
            obj.handleType === "sort" && (obj.startPageY = e.pageY);
            let data = JSON.stringify(obj);
            e.dataTransfer.setData("dragData", data);
        }
    }
    /**
     * 初始化目标区域放置事件
     * @param {Object} el 
     * @param {String} part 处理的区域
     */
    function initDropEvent({el, part}) {
        //allowDrop
        el.ondragover = (e) => {
            //阻止默认浏览器行为
            e.preventDefault();
        }
        //dropevent
        el.ondrop = (e) => {
            //获取信息
            let t = JSON.parse(e.dataTransfer.getData("dragData"));
            dragDropTrigger({part, componentName: t.componentName});
            //如果不符合校验机制，阻断操作
            if(part==='main' && t.componentName==='TabHead'){
                alert("Tab导航组件不能拖拽到主体内容区域")
                return
            }
            // if( componentReg({part:'main', componentName: 'TabHead'}) ){}
            if (t.handleType === "add") {
                // add({
                //     componentName: t.componentName, 
                //     pageY: e.pageY,
                //     part
                // });
            } else {
                // sort({
                //     pageY: e.pageY,
                //     startPageY: t.startPageY,
                //     part
                // });
            }
        }
    }
    /**
     * 添加鼠标移入移出事件
     * @param {*} el 
     * @param {*} obj 
     */
    // function initMouseEvent(el, {componentName, handleType, index, deleteAble}) {
    //     if (handleType === "add") return;
    //     let id = el.getAttribute("data-id");
    //     el.onmouseenter = () => {
    //         // console.log("鼠标进入");
    //         if(window.environment==='production'){return}
    //         showCover();
    //     }
    //     el.onmouseleave = () => {
    //         // console.log("鼠标离开");
    //         hideCover();
    //     }
    //     //创建一个浮层
    //     function showCover() {
    //         let width = getComputedStyle(el, null).width;
    //         let height = getComputedStyle(el, null).height;
    //         !el.style.position &&  (el.style.position = "relative");
    //         let cover = `
    //             <div class="edit-cover" 
    //                 style="border: 3px dashed #2489c5;width: ${width};height: ${height};
    //                 position: absolute;left: 0;top: 0;
    //                 z-index: 1;box-sizing: border-box;">
    //                 <div style="height: 30px;width: 150px;position: absolute;
    //                     right: 0;top: 0;display: flex;justify-content: space-between;">
    //                     <span class="cover-edit-btn"
    //                         style="${styleLoader(editBtn.blue_btn)}">
    //                         编辑
    //                     </span>
    //                     <span class="cover-del-btn" 
    //                         style="${deleteAble ? styleLoader(editBtn.blue_btn) : styleLoader(editBtn.blue_btn_disable)}">
    //                         删除
    //                     </span>
    //                 </div>
    //             </div>
    //         `;
    //         el.insertAdjacentHTML("afterbegin", cover);
    //         //添加编辑按钮点击事件
    //         el.querySelector(".cover-edit-btn").onclick = editClickEvent;
    //         el.querySelector(".cover-del-btn").onclick = deleteClickEvent;
    //     }
    //     //隐藏浮层
    //     function hideCover() {
    //         el.querySelector(".edit-cover") && el.removeChild(el.querySelector(".edit-cover"));
    //     }
    //     function editClickEvent() {
    //         // 当点击猜你喜欢组件的时候让编辑按钮变为不可点击
    //         if(componentName==="GuessYouLike"){
    //             el.querySelector(".cover-edit-btn").style = styleLoader(editBtn.blue_btn_disable)
    //         }
    //         console.log("点击编辑按钮", componentName, id);
    //         let parentNode = el.parentNode;
    //         let part = getPart(parentNode);
    //         edit({componentName, id, part});
    //     }
    //     function deleteClickEvent() {
    //     	if (!deleteAble) {
    //     		console.log("该组件不能删除");
    //     		return;
    //     	}
    //         // console.log("点击删除按钮按钮", index);
    //         let parentNode = el.parentNode;
            
    //         let part = getPart(parentNode);
    //         // console.log("parentNode", parentNode, part);
    //         del({position: index, part});
    //     }
    // }
}