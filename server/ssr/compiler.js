// const KoaRouter = require("koa-router");
const path = require("path");
const fs = require("fs");
// const clientWebpackConfig = require("../build/webpack.client.config.js");
const webpack = require("webpack");
const rimraf = require("rimraf");
const {copy} = require("../util/server-util");

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
const resolve = (_path) => {
    return path.resolve(__dirname, _path);
}
const removeDirectory = (_path) => {
    return new Promise(resolve => {
        rimraf(_path, resolve);
    });
}

const indexFilehelper = (group, componentName) => {
    return `
        <template>
            <${componentName}></${componentName}>
        </template>
        <script>
        import ${componentName} from "component/${group}/${componentName}";
        import PrivateInit from "./private.init.js";
        export default {
            mixins: [PrivateInit],
            components: {
                ${componentName}
            }
        }
        </script>
    `;
}

const initFilehelper = () => {
    return `
        export default {
            props: {
                componentId: {
                    type: String,
                    default: ""
                }
            },
            provide() {
                return {
                    componentId: this.componentId
                }
            }
        }
    `;
}
const routerFilehelper = (pageName) => {
    return `
        import ${pageName} from "../containers/${pageName}";
        export default [
            {
                path: "/",
                component: ${pageName}
            }
        ]
    `;
}

const generateComponents = async ({projectId, pageId, componentList}) => {
    let pageRootPath = resolve(`../project/${projectId}/containers`);
    let pageDirPath = path.join(pageRootPath, pageId);
    //创建页面
    // fs.mkdirSync(pageDirPath);
    //创建index.vue文件
    // copy(
    //     resolve("../containers/private/index.vue"),
    //     path.join(pageDirPath, "index.vue")
    // );
    
    //创建components文件夹
    let componentsDirPath = path.join(pageDirPath, "components");
    //先删除componentsDirPath
    await removeDirectory(componentsDirPath);
    fs.mkdirSync(componentsDirPath);
    //import.js文件的路径地址
    let importJSFilePath = path.join(pageDirPath, "import.js");
    let importCode = [];
    let componentsName = "";
    componentList.forEach(item => {
        // console.log("item", item);
        
        // console.log("componentsDirPath", componentsDirPath);
        
        //组件类别文件夹地址
        let compoentTypeDirPath = path.join(componentsDirPath, item.group);
        //逻辑组件文件夹地址
        let compoentItemDirPath = path.join(compoentTypeDirPath, item.type);
        try {
            //直接创建逻辑组件文件夹
            fs.mkdirSync(compoentItemDirPath);
        } catch (err) {
            //如果出现错误，尝试创建其父目录，也就是组件类别文件夹
            fs.mkdirSync(compoentTypeDirPath);
            fs.mkdirSync(compoentItemDirPath);
        }
        //创建index.vue文件和private.init.js
        let indexFilePath = path.join(compoentItemDirPath, "index.vue");
        let initFilePath = path.join(compoentItemDirPath, "private.init.js");
        fs.writeFileSync(indexFilePath, indexFilehelper(item.group, item.type));
        fs.writeFileSync(initFilePath, initFilehelper());
        //import语句
        importCode.push(`import ${item.type} from "./components/${item.group}/${item.type}";`);
        componentsName += `${item.type},`;
    });
    let code = `${importCode.join("")}export default {data() {return {pageId: "${pageId}"}},components: {${componentsName}}}`;
    //写入import.js
    fs.writeFileSync(importJSFilePath, code);
}

const handle = async (ctx, next) => {
    //获取参数
    // let componentList = ctx.params.componentList;
    let {componentList, projectId, pageId} = ctx.params;
    let projectDirPath = path.resolve(__dirname, `../project/${projectId}`);
    // console.log("接收到参数", componentList);
    //按需引入组件
    generateComponents({componentList, projectId, pageId});
    // generateRouter();
    //删除完毕，开始编译
    await removeDirectory(path.join(projectDirPath, "client-dist/static"));
    console.log("删除完毕，开始编译");
    //打包编译客户端的文件
    let clientWebpackConfig = require(`../project/${projectId}/build/webpack.client.config.js`);
    await compiler(clientWebpackConfig("development", projectId));
    
    let html = fs.readFileSync(path.join(projectDirPath, "client-dist/index.html"), "utf-8");
    //鉴于srcdoc的问题，这里写入文件，返回链接地址
    // ctx.body = html;
    const distPath = path.join(projectDirPath, "client-dist/test.html");
    fs.writeFileSync(distPath, html);
    // console.log("pageId", pageId);
    
    ctx.body = `http://127.0.0.1:3000/public/${projectId}/test.html/#/${pageId}`;
};

// module.exports = router;
module.exports = handle;