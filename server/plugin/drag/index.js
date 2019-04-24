
//赋予一个dom任意拖拽的能力
class Drag {
    constructor(dom, options) {
        this.options = Object.assign({}, options);
        this.dom = dom;
        this.init();
        this.addEventListener();
    }
    init() {
        this.dom.style.position = "absolute";

        //lifecycle方法
        if (this.options.init) {
            this.options.init(this.dom);
        }
    }
    addEventListener() {
        let dom = this.dom;
        dom.oncontextmenu = () => {return false};
        //鼠标左键按下
        dom.onmousedown = (e) => {
            console.log("开始拖拽");
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
            let posX = clientX - offsetX;
            let posY = clientY - offsetY;
            //鼠标滑动中
            document.onmousemove = (e) => {
                // console.log("moving", e);
                let moveX = e.clientX - clientX;
                let moveY = e.clientY - clientY;
                dom.style.left = posX + moveX + "px";
                dom.style.top = posY + moveY + "px";
            }
        }
        dom.onmouseup = (e) => {
            //lifecycle方法
            if (this.options.dragCompleted) {
                this.options.dragCompleted(this.dom);
            }
            // console.log("onmouseup");
            // dom.onmousedown = null;
            document.onmousemove = null;
        }
        
    }
    
}

export default Drag;