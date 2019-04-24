const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const rimraf = require("rimraf");
// const clientWebpackConfig = require("../build/webpack.client.config.js");
const {copy} = require("../util/server-util.js");
const {SucModel} = require("../util/resModel.js");
const recast = require("recast");

const removeDirectory = (path) => {
    return new Promise(resolve => {
        rimraf(path, resolve);
    });
}
const resolve = (_path) => {
    return path.resolve(__dirname, _path);
}
//server目录下需要copy的目录
let serverDirCopyList = [
    // "build/webpack.base.config.js",
    // "build/webpack.client.config.js",
    "routers",
    "store",
    "public",
    // "components",
    // "util/message.js",
    "plugin/drag",
    "plugin/edit",
    "util/preview-helper.js",
    "util/setConfig.js",
    "db",
    "main.js",
    "App.vue",
    "private.init.js"
]
//判定文件是否需要copy
const needCopy = (_path) => {
    for (let item of serverDirCopyList) {
        let reg = new RegExp(`.*${item}$`);
        if (reg.test(_path)) {
            return item;
        }
    }
}

const _copy = (scanPath = path.resolve(__dirname, "../../server")) => {
    //创建download目录
    let downloadDir = path.resolve(__dirname, `../${"download"}`);
    let arr = fs.readdirSync(scanPath);
    for (let item of arr) {
        let _path = path.join(scanPath, item);
        let _needCopy = needCopy(_path);
        if (_needCopy) {
            copy(_path, path.join(downloadDir, _needCopy));
        } else if (fs.statSync(_path).isDirectory()) {
            _copy(path.join(scanPath, item));
        }
    }
}

//拷贝样式组件
const generateComponents = () => {
    //扫描containers目录
    let pagesDirPath = resolve("../containers");
    let pageArr = fs.readdirSync(pagesDirPath);
    pageArr.forEach(dirName => {
        if (dirName !== "private") {
            let importJSFilePath = resolve(`../containers/${dirName}/import.js`);
            //拿到导入的样式组件
            let code = fs.readFileSync(importJSFilePath, "utf-8");
            let ast = recast.parse(code);
            ast.program.body.forEach(item => {
                if (item.type === "ImportDeclaration") {
                    //执行复制操作
                    let value = item.source.value;
                    console.log("value", value);
                    //把componentPath由alias转换为真实的路径
                    //原始value形如./components/button/button1
                    value = value.split("/");
                    // value.splice(0, 1);
                    let group = value[2];//组件类别
                    let name = value[3];//组件名称
                    // value = value.join("/");
                    let componentPath = path.join(__dirname, "../components", group, name);
                    let distPath = path.join(__dirname, "../download/components", group, name);
                    //复制样式组件
                    copy(componentPath, distPath);
                    //同时复制该目录下的base组件
                    let baseComponentPath = path.join(__dirname, "../components", group, "base");
                    let baseDistPath = path.join(__dirname, "../download/components", group, "base");
                    copy(baseComponentPath, baseDistPath);
                }
            });
        }
    });    
}

const generateContainers = () => {
    //扫描containers目录
    let pagesDirPath = resolve("../containers");
    let arr = fs.readdirSync(pagesDirPath);
    arr.forEach(dirName => {
        if (dirName !== "private") {
            //可以复制
            copy(
                resolve(`../containers/${dirName}`),
                resolve(`../download/containers/${dirName}`),
            );
        }
    });
}

const generateRouter = () => {
    let importFile = path.resolve(__dirname, "../download/routers/import.js");
    let arr = fs.readdirSync(path.resolve(__dirname, "../download/containers"));
    let importCode = [];
    let routes = [];
    arr.forEach(item => {
        let importStr = `import ${item} from "../containers/${item}";`;
        importCode.push(importStr);
        let routeStr = `
            {
                path: "/${item}",
                name: "${item}",
                component: ${item}
            }
        `;
        routes.push(routeStr);
    });
    let code = `
        ${importCode.join("")}
        export default [
            ${routes.join(",")}
        ]
    `;
    fs.writeFileSync(importFile, code);

}

const generateConfig = () => {
    //package.json
    copy(
        path.resolve(__dirname, "../template/package.json"),
        path.resolve(__dirname, "../download/package.json"),
    );
    //.babelrc
    copy(
        path.resolve(__dirname, "../template/.babelrc"),
        path.resolve(__dirname, "../download/.babelrc"),
    );
    //build
    copy(
        path.resolve(__dirname, "../template/build"),
        path.resolve(__dirname, "../download/build"),
    );
}

//清除无用信息
const treeShaking = () => {
    //main.js
    let _path = path.resolve(__dirname, "../download/main.js");
    let content = fs.readFileSync(_path, "utf-8");
    content = content.replace(`import "./plugin/ps";`, "");
    fs.writeFileSync(_path, content);
    //App.vue
    _path = path.resolve(__dirname, "../download/private.init.js");
    // content = fs.readFileSync(_path, "utf-8");
    // content = content.replace(`import {setPosition, initDrag} from "./util/preview-helper";`, "");
    // content = content.replace(/^__private__init\(\)\s\{.*\}$/, "");
    // content = content.replace(/^this\.__private__init\(\);$/, "");
    content = "export default {};"
    fs.writeFileSync(_path, content);


}


module.exports = async (ctx) => {
    await removeDirectory(path.resolve(__dirname, "../download"));
    _copy();
    generateComponents();
    generateContainers();
    generateRouter();
    generateConfig();
    treeShaking();
    ctx.body = new SucModel([], "创建成功");
}

