const recast = require("recast");
const fs = require("fs");
const path = require("path");
const {SucModel} = require("../util/resModel.js");
const helper = (pageConfig = {}) => {
    return `
        export default ${JSON.stringify(pageConfig)};
    `
}
module.exports = async (ctx) => {
    let {pageConfig} = ctx.params;
    // console.log("打印参数", params);
    // let _path = path.resolve(__dirname, "../db/component-list.js");
    let _path = path.resolve(__dirname, "../db/page-config.js");
    let code = helper(pageConfig);
    fs.writeFileSync(_path, code);
    ctx.body = new SucModel([], "success");
}