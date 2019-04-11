const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const rimraf = require("rimraf");
const clientWebpackConfig = require("../build/webpack.client.config.js");
const {SucModel} = require("../util/resModel.js");

const compiler = (configPath) => {
    return new Promise((resolve) => {
        let _compiler = webpack(configPath);
        _compiler.run((err, stats) => {
            // console.log("err", err);
            // console.log("stats", stats);
            resolve();
        });

    });
}
const removeDirectory = (path) => {
    return new Promise(resolve => {
        rimraf(path, resolve);
    });
}
module.exports = async (ctx) => {
    let html = ctx.params.html;
    let clientConfig = clientWebpackConfig("production");
    //删除完毕，开始编译
    await removeDirectory(path.resolve(__dirname, "../client-dist"));
    //编译客户端的文件
    await compiler(clientConfig);
    //将html内容里的绝对路径去掉
    html = html.replace(/http:\/\/127\.0\.0\.1:3000/g, "");
    //写入index.html文件
    let htmlPath = path.resolve(__dirname, "../client-dist/index.html");
    fs.writeFileSync(htmlPath, html);
    ctx.body = new SucModel([], "创建成功");
}

