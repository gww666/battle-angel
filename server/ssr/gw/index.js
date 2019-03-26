const path = require("path");
const fs = require("fs");
const {SucModel, ErrModel} = require("../../util/resModel");
const resolve = _path => {
    return path.resolve(__dirname, _path);
}
//获取组件支持的prop
const getProps = (ctx, next) => {
    let {group} = ctx.query;
    // console.log("getProps", query);
    let selfProps = resolve(`../../components/${group}/props-export.js`);
    let commonProps = resolve(`../../components/props-export.js`);
    let array = [];
    try {
        array = require(selfProps);
    } catch (err) {
        // console.log("读取公共props-export文件");
        array = require(commonProps);
    }
    ctx.body = new SucModel(array, "success");
}
module.exports = {
    getProps
}