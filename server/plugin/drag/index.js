//判断某个元素有无某个class
let hasClass = (el, className) => {
    let _class = el.getAttribute("class");
    if (_class) {
        let classArray = _class.split(" ");
        return classArray.includes(className);
    } else {
        return false;
    }
}
//写一个方法，找寻第一个class为box的父元素
let getFirstBoxParent = (el) => {
    if (el.parentNode.tagName === "BODY") return;
    if (hasClass(el.parentNode, "com-box")) {
        return el.parentNode;
    } else {
        return getFirstBoxParent(el.parentNode);
    }
}
//赋予一个dom任意拖拽的能力
class Drag {
    constructor(dom, options) {
        this.options = Object.assign({}, options);
        this.dom = dom;
        this.init();
        this.addEventListener();
    }
    init() {
        

        //lifecycle方法
        if (this.options.init) {
            this.options.init(this.dom);
        }
    }
    addEventListener() {
        let dom = this.dom;
        dom.oncontextmenu = () => { return false };
        //鼠标左键按下
        dom.onmousedown = (e) => {
            dom.style.position = "absolute";
            e.stopPropagation();
            // console.log("开始拖拽", dom);
            //如果存在translateX,置为none，防止对拖拽产生影响
            this.dom.style.transform = "none";
            if (this.options.dragStart) {
                this.options.dragStart(this.dom);
            }
            
            //记录鼠标点下的点
            let offsetX = e.offsetX;
            let offsetY = e.offsetY;
            let clientX = e.clientX;
            let clientY = e.clientY;
            let parentNode = getFirstBoxParent(this.dom);
            
            if (parentNode) {
                clientX = Number(getComputedStyle(this.dom, null).left.slice(0, -2));
                clientY = Number(getComputedStyle(this.dom, null).top.slice(0, -2));
            }
            let posX = clientX - offsetX;//鼠标按下的x点
            let posY = clientY - offsetY;//鼠标按下的y点
            
            //鼠标滑动中
            document.onmousemove = (e) => {
                let moveX = e.clientX - clientX;
                let moveY = e.clientY - clientY;
                if (parentNode) {
                    moveX = e.clientX - clientX - getComputedStyle(parentNode, null).left.slice(0, -2);
                    moveY = e.clientY - clientY - getComputedStyle(parentNode, null).top.slice(0, -2);
                }
                dom.style.left = posX + moveX + "px";
                dom.style.top = posY + moveY + "px";
            }
        }
        dom.onmouseup = (e) => {
            e.stopPropagation();
            //lifecycle方法
            if (this.options.dragCompleted) {
                this.options.dragCompleted(this.dom);
            }
            document.onmousemove = null;
        }

    }

}

export default Drag;