//封装好的函数，获取样式style(解决offset样式的bug)
function getStyle(obj, attr) {
    if (obj.currentStyle) {   //IE浏览器
        return obj.currentStyle[attr]
    } else {  //Chrome浏览器
        return getComputedStyle(obj, false)[attr]
    }
}

export default (obj, json, fn) => {
    var all = true; //假设所有运动到达目标值
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        for(var attr in json){   
            //遍历取出json里的值
            //通过in操作符，取得当前的属性值
            var value = 0;
            if (attr === 'opacity') {
                value = Math.round(parseInt(getStyle(obj, attr)) * 100)
            } else {
                value = parseInt(getStyle(obj, attr));
            }
            //计算速度
            var speed = (json[attr] - value) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (value !== json[attr] ) {
                all = false;
            }
            if (attr === 'opacity') {
                obj.style.filter = 'alpha:(opacity:' + value + speed + ')';
                obj.style.opacity = (value + speed) / 100;
            } else {
                obj.style[attr] = value + speed + 'px';
            }
        }
        if(all){
            clearInterval(obj.timer);
            if(fn){
                fn()
            }
        }
    }, 30)
}