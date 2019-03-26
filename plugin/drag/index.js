
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
        let plugins;
        if (plugins = this.options.plugins) {
            plugins.forEach(fn => fn(this.dom));
        }
    }
    addEventListener() {
        let dom = this.dom;
        //鼠标左键按下
        dom.onmousedown = (e) => {

            // console.log(e.target);
            // console.log("开始拖拽");
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
            // console.log("onmouseup");
            // dom.onmousedown = null;
            document.onmousemove = null;
        }
        
    }
    
}

export default Drag;