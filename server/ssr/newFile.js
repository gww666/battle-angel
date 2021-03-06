const path = require("path");
const fs = require("fs");
const {copy} = require("../util/server-util.js");
const {SucModel} = require("../util/resModel.js");
const recast = require('recast');
const {
    identifier, 
    importDefaultSpecifier, 
    importDeclaration, 
    literal,
    objectExpression,
    property
} = recast.types.builders;

const resolve = (_path) => {
    return path.resolve(__dirname, _path);
}

//server目录下需要copy的文件夹或文件
let serverDirCopyList = [
    "build",
    "routers",
    "store",
    "public",
    // "components",
    "containers",
    "plugin",
    "util",
    "db",
    "main.js",
    "App.vue",
    "private.init.js",
    "template/.babelrc"
]

const _copy = (scanPath, distPath) => {
    let arr = serverDirCopyList;
    for (let item of arr) {
        let _path = path.join(scanPath, item);
        copy(_path, path.join(distPath, item));
    }
}

//生成private.init.js文件
const generateInitFile = ({projectId, pageId, pageType = "flex"}) => {
    let code = `
        ${pageType === "absolute" ? "" : "import {NativeDrop} from '../../plugin/drag';"}
        import {${pageType === "absolute" ? "initDrag" : "initNativeDrag"}} from "../../util/preview-helper";
        export default {
            mounted() {
                ${
                    pageType === "absolute" ? 
                        "initDrag();" : 
                        "initNativeDrag();let box = document.querySelector('" + pageId + "');new NativeDrop(box);"
                }
            }
        }
    `;
    let projectDir = resolve(`../project/${projectId}`);
    let pagePath = path.join(projectDir, "containers", pageId);
    let filePath = path.join(pagePath, "private.init.js");
    fs.writeFileSync(filePath, code);
}

//生成路由导入文件
const generateRouter = (projectId, pageId, isMainPage, pageType) => {
    let projectDirPath = resolve(`../project/${projectId}`);
    let importJSFilePath = path.join(projectDirPath, "routers/import.js");
    let comImportJSFilePath = path.join(projectDirPath, `/containers/${pageId}/import.js`);
    let storeFilePath = path.join(projectDirPath, `/store/index.js`);
    let storeCode = fs.readFileSync(storeFilePath);
    let code = fs.readFileSync(importJSFilePath);
    // 默认的currentPageId
    let defaultPageId = pageId;
    //通过ast解析语法，并添加一个路由规则
    //首先拿到ast
    let ast = recast.parse(code);
    let storeAst = recast.parse(storeCode);
    //遍历program，拿到输出语句ExportDefaultDeclaration
    let body = ast.program.body;
    let storeBody = storeAst.program.body;
    for (let item of body) {
        if (item.type === "ExportDefaultDeclaration") {
            //拿到它的declaration，这里是一个ArrayExpression
            //拿到它的elements，向里面追加一个路由节点
            //路由节点是一个对象，我们这里通过ObjectExpression构建
            
            // 创建页面时选择是首页
            if(isMainPage === '1') {
                // 如果已有redirect，删掉
                for(let i = 0;i < item.declaration.elements.length;i++) {
                    if(item.declaration.elements[i].properties[1].key.name === "redirect") {
                        item.declaration.elements.splice(i, 1);
                        i--;
                    }
                }
                // 设置路由/重定向
                item.declaration.elements.unshift(
                    objectExpression([
                        property("init", identifier("path"), literal(`/`)),
                        property("init", identifier("redirect"), literal(`/${pageId}`)),
                    ])
                );
            }else {
                // 默认没首页
                if(item.declaration.elements[0] && item.declaration.elements[0].properties[1].key.name !== "redirect") {
                    defaultPageId = item.declaration.elements[0].properties[1].value.name;
                }
                for(let i = 0;i < item.declaration.elements.length;i++) {
                    if(item.declaration.elements[i].properties[1].key.name === "redirect") {
                        defaultPageId = item.declaration.elements[i].properties[1].value.value.split('/')[1];
                        break;
                    }
                }
            }
            item.declaration.elements.push(
                objectExpression([
                    //定义path属性
                    property("init", identifier("path"), literal(`/${pageId}`)),
                    //定义component属性
                    property("init", identifier("component"), identifier(pageId))
                ])
            );
            //结束循环
            break;
        }
    }
    // 修改state中的currentPageId
    for (let item of storeBody) {
        if (item.type === "ExportDefaultDeclaration") {
            item.declaration.arguments[0].properties.forEach(ele => {
                if(ele.key.name === "state") {
                    ele.value.properties.forEach(items => {
                        if(items.key.name === "currentPageId") {
                            items.value.value = `${defaultPageId}`;
                            items.value.raw = `"${defaultPageId}"`;
                        }
                    })
                }
            })
        }
    }
    //导入该页面
    //通过importDeclaration构建
    body.unshift(importDeclaration(
        [importDefaultSpecifier(identifier(pageId))],
        literal(`../containers/${pageId}`)
    ));
    //将改造完之后的ast转为字符串
    code = recast.print(ast).code;
    storeCode = recast.print(storeAst).code;
    // 添加import.js
    let importJSCode = `export default {data() {return {pageId: "${pageId}", pageType: "${pageType}"}},components: {}}`;
    fs.writeFileSync(importJSFilePath, code);
    fs.writeFileSync(comImportJSFilePath, importJSCode);
    fs.writeFileSync(storeFilePath, storeCode);
}

const handler = {
    project({projectId}) {
        //project文件夹
        let projectRootPath = resolve("../project");
        let projectDirPath = path.join(projectRootPath, projectId);
        _copy(
            resolve("../../server"),
            projectDirPath
        );
    },
    //新建页面
    page({projectId, pageId, layout, isMainPage}) {
        let pageRootPath = resolve(`../project/${projectId}/containers`);
        let pageDirPath = path.join(pageRootPath, pageId);
        fs.mkdirSync(pageDirPath);
        //创建index.vue文件
        copy(
            path.join(pageRootPath, `private/${layout}.vue`),
            path.join(pageDirPath, `index.vue`)
        );
        //生成private.init.js文件
        generateInitFile({projectId, pageId});
        //生成路由文件
        generateRouter(projectId, pageId, isMainPage, layout);
    }
}

module.exports = (ctx) => {
    console.log(ctx.query);
    // isMainPage：是否设置为项目主页，是:"1"，否:"0"
    let {type, projectId, pageId, layout, isMainPage} = ctx.query;
    handler[type]({projectId, pageId, layout, isMainPage});
    ctx.body = new SucModel([], "创建成功");
}