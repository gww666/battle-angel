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

const generateComponents = () => {
    let _path = path.resolve(__dirname, "../containers/test/import.js");
    //拿到导入的样式组件
    let code = fs.readFileSync(_path, "utf-8");
    let ast = recast.parse(code);
    ast.program.body.forEach(item => {
        if (item.type === "ImportDeclaration") {
            //执行复制操作
            let value = item.source.value;
            //把componentPath由alias转换为真实的路径
            value = value.split("/");
            value.splice(0, 1);
            let type = value[0];//组件类别
            value = value.join("/");
            let componentPath = path.join(__dirname, "../components", value);
            let distPath = path.join(__dirname, "../download/components", value);
            //复制样式组件
            copy(componentPath, distPath);
            //同时复制该目录下的base组件
            let baseComponentPath = path.join(__dirname, "../components", type, "base");
            let baseDistPath = path.join(__dirname, "../download/components", type, "base");
            copy(baseComponentPath, baseDistPath);
        }
    });
}
const helper = (type, componentName) => {
    return `
        <template>
            <${componentName}></${componentName}>
        </template>
        <script>
        import ${componentName} from "component/${type}/${componentName}";
        export default {
            components: {
                ${componentName}
            }
        }
        </script>
    `;
}
const generateContainers = () => {
    //创建containers文件夹
    fs.mkdirSync(path.resolve(__dirname, "../download/containers"));
    //创建页面文件夹
    let pagePath = path.resolve(__dirname, `../download/containers/${"test"}`)
    fs.mkdirSync(pagePath);
    //在页面文件夹下copy过来index.vue
    copy(
        path.resolve(__dirname, "../containers/test/index.vue"),
        path.join(pagePath, "index.vue"),
    );
    //在该页面目录下生成components逻辑组件文件夹
    copy(
        path.resolve(__dirname, "../download/components"),
        path.join(pagePath, "components")
    );
    //生成import.js文件
    let importFile = path.join(pagePath, "import.js");
    //拿到类别
    let arr = fs.readdirSync(path.resolve(pagePath, "components"));
    let importCode = [];
    let componentsName = "";
    arr.forEach(item => {
        //拿到每个组件
        let subArr = fs.readdirSync(path.join(pagePath, "components", item));
        subArr.forEach(subItem => {
            //判断这一层是目录还是文件，如果是目录，则读取目录下面的index.vue文件
            //否则直接更改该文件
            let targetPath = path.join(pagePath, "components", item, subItem);
            let stats = fs.statSync(targetPath);
            //import语句
            let importItem = "";
            if (stats.isFile()) {
                //直接更改该文件
                //获取文件名称
                let fileName = path.parse(targetPath).name;
                fs.writeFileSync(targetPath, helper(item, fileName));
                //生成import语句
                //排除base组件
                if (fileName !== "base") {
                    importItem = `import ${fileName} from "./components/${item}/${subItem}";`;
                    componentsName += `${fileName},`;
                }
            } else {
                targetPath = path.join(targetPath, "index.vue");
                fs.writeFileSync(targetPath, helper(item, subItem));
                //生成import语句
                //排除base组件
                if (subItem !== "base") {
                    importItem = `import ${subItem} from "./components/${item}/${subItem}";`;
                    componentsName += `${subItem},`;
                }
                
            }
            importCode.push(importItem);
        });
    });
    let code = `${importCode.join("")}export default {components: {${componentsName}}}`;
    //写入import.js
    fs.writeFileSync(importFile, code);
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

