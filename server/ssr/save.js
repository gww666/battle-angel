const fs = require("fs");
const path = require("path");
const {SucModel} = require("../util/resModel.js");
const helper = (pageConfig = {}) => {
    return `
        export default ${JSON.stringify(pageConfig)};
    `
}
module.exports = async (ctx) => {
    let {pageConfig, projectId} = ctx.params;
    // console.log("打印参数", ctx.params);
    // let _path = path.resolve(__dirname, "../db/component-list.js");
    let _path = path.resolve(__dirname, `../project/${projectId}/db/page-config.js`);
    let code = helper(pageConfig);
    fs.writeFileSync(_path, code);
    ctx.body = new SucModel([], "success");
}