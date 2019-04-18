const recast = require("recast");
const fs = require("fs");
const path = require("path");
const {SucModel} = require("../util/resModel.js");
const helper = (comList = []) => {
    let code = [];
    // comList.forEach(item => {
    //     for 
    // });
    return `
        export default ${JSON.stringify(comList)};
    `
}
module.exports = async (ctx) => {
    let {list} = ctx.params;
    // console.log("打印参数", params);
    let _path = path.resolve(__dirname, "../db/component-list.js");
    // let code = fs.readFileSync(path.resolve(__dirname, "../db/component-list.js"), "utf-8");
    // const ast = recast.parse(code);
    // let res = ast.program.body;
    let code = helper(list);
    fs.writeFileSync(_path, code);
    ctx.body = new SucModel([], "success");
}