const base = require("../props-export.js");
module.exports = base.concat([
    {
        title: "componentList",
        prop: "componentList",
        private: true
    },
    {
        title: "内间距",
        prop: "padding"
    },
    {
        title: "布局形式",
        prop: "display"
    },
    {
        title: "justifyContent",
        prop: "justifyContent"
    },
    {
        title: "alignItems",
        prop: "alignItems"
    },
    {
        title: "背景颜色",
        prop: "background"
    },
    {
        title: "圆角边框",
        prop: "borderRadius"
    },
    {
        title: "盒子阴影",
        prop: "boxShadow"
    },
    {
        title: "添加组件",
        prop: "addComToBox",
        type: "button"
    },
]);