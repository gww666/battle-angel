const base = require("../props-export.js");
module.exports = base.concat([
    {
        title: "占位符",
        prop: "placeholder"
    },
    {
        title: "图标",
        prop: "icon",
        type: "select",
        defaultValue: "phone",
        values: [
            {key: "手机号", value: "phone"},
            {key: "密码", value: "password"}
        ]
    },
    {
        title: "背景颜色",
        prop: "backgroundColor"
    },
    {
        title: "边框圆角弧度",
        prop: "borderRadius"
    },
]);