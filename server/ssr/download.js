const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const rimraf = require("rimraf");
const clientWebpackConfig = require("../build/webpack.client.config.js");
const {copy} = require("../util/server-util.js");
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
//server目录下需要copy的目录
let serverDirCopyList = [
    "build",
    "routers",
    "store",
    "components",
    "util/message.js",
    "main.js",
    "App.vue"
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
    // let scanPath = fs.resolve(__dirname, "../../server");
    let arr = fs.readdirSync(scanPath);
    for (let item of arr) {
        let _path = path.join(scanPath, item);
        let _needCopy = needCopy(_path);
        // let _dirNeedCopy = dirNeedCopy(_path);
        if (_needCopy) {
            copy(_path, path.join(downloadDir, _needCopy));
        } else if (fs.statSync(_path).isDirectory()) {
            _copy(path.join(scanPath, item));
        }
        // else if (fs.statSync(_path).isDirectory() && !_needCopy) {
        //     continue;
        // }
    }
}



module.exports = async (ctx) => {
    _copy();

    // let clientConfig = clientWebpackConfig("production");
    // //删除完毕，开始编译
    // await removeDirectory(path.resolve(__dirname, "../client-dist"));
    // //编译客户端的文件
    // await compiler(clientConfig);
    // fs.writeFileSync(htmlPath, html);
    ctx.body = new SucModel([], "创建成功");
}

