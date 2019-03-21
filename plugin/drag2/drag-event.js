export function initDragEvent(el, obj = {}) {
    // console.log("开始拖拽");
    
    //给dom元素添加dragable=true，该dom元素通常是样式组件的外部盒子
    el.draggable = true;
    //该dom元素下面的img标签禁用它的浏览器默认行为
    el.querySelector("img") && 
        (el.querySelector("img").draggable = false);
    el.ondragstart = (e) => {
        console.log("开始拖拽", e);
        // dragStartTrigger(obj);
        // obj.handleType === "sort" && (obj.startPageY = e.pageY);
        let data = JSON.stringify(obj);
        // e.dataTransfer.setData("dragData", data);
    }
    el.ondragend = (e) => {
        e.preventDefault();
        console.log("end");
    }
}

export function initDropEvent({el, part}) {
    console.log("置为可拖拽的区域", el);
    
    //allowDrop
    // console.log("打印是否可以拖拽");
    // el.ondargenter = (e) => {
    //     e.preventDefault();
    //     console.log("enter");
        
    // }
    // el.ondragover = (e) => {
    //     //阻止默认浏览器行为
    //     e.preventDefault();
    //     console.log("over");
    // }
    // //dropevent
    // el.ondrop = (e) => {
    //     e.preventDefault();
    //     //获取信息
    //     // let t = JSON.parse(e.dataTransfer.getData("dragData"));
    //     console.log("拖拽结束");
    // }
    el.addEventListener("dragover", e => {
        e.preventDefault();
        // console.log("拖拽结束");
    }, false);
    el.addEventListener("dargenter", e => {
        e.preventDefault();
        console.log("拖拽结束");
    }, false);
    el.addEventListener("drop", e => {
        e.preventDefault();
        console.log("拖拽结束");
    }, false);
}
