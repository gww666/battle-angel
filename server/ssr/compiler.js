// const KoaRouter = require("koa-router");
const path = require("path");
const fs = require("fs");
const clientWebpackConfig = require("../build/webpack.client.config.js");
const webpack = require("webpack");
const rimraf = require("rimraf");

const compiler = (configPath) => {
    return new Promise((resolve) => {
        // let serverCompiler = webpack(configPath);
        webpack(configPath, (err, stats) => {
            console.log("err", err);
            // console.log("stats", stats);
            resolve();
        });
        // serverCompiler.run((err, stats) => {
        //     console.log("err", err);
        //     // console.log("stats", stats);
        //     resolve();
        // });
    });
}

const removeDirectory = (path) => {
    return new Promise(resolve => {
        rimraf(path, resolve);
    });
}
const importComponent = (componentList) => {
    let componentFilePath = path.resolve(__dirname, "../containers/test/import.js");
    let arr = [];
    // let components = {};
    let components = "", comPaths = "";
    //生成import语句
    componentList.forEach(item => {
        let str = `import ${item.type} from "${item.path}";`;
        // components[item.type] = item.type;
        components += `${item.type},`
        arr.push(str);
    });
    //生成component配置
    let code = `${arr.join("")}export default {components: {${components}}}`;
    fs.writeFileSync(componentFilePath, code);
}
const handle = async (ctx, next) => {
    //获取参数
    let componentList = ctx.params.componentList;
    // console.log("接收到参数", componentList);
    //按需引入组件
    importComponent(componentList);
    //删除完毕，开始编译
    await removeDirectory(path.resolve(__dirname, "../client-dist/public"));
    console.log("删除完毕，开始编译");
    //打包编译客户端的文件
    // await compiler(clientWebpackConfig("production"));
    await compiler(clientWebpackConfig("development"));
    let html = fs.readFileSync(path.resolve(__dirname, "../client-dist/index.html"), "utf-8");
    //鉴于srcdoc的问题，这里写入文件，返回链接地址
    // ctx.body = html;
    const distPath = path.resolve(__dirname, "../client-dist/public/test.html");
    fs.writeFileSync(distPath, html);
    ctx.body = "http://127.0.0.1:3000/public/test.html";
};

// module.exports = router;
module.exports = handle;