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
    "components",
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

//生成路由导入文件
const generateRouter = (projectId, pageId, isMainPage) => {
    let projectDirPath = resolve(`../project/${projectId}`);
    let importJSFilePath = path.join(projectDirPath, "routers/import.js");
    let comImportJSFilePath = path.join(projectDirPath, `/containers/${pageId}/import.js`);
    let code = fs.readFileSync(importJSFilePath);
    //通过ast解析语法，并添加一个路由规则
    //首先拿到ast
    let ast = recast.parse(code);
    //遍历program，拿到输出语句ExportDefaultDeclaration
    let body = ast.program.body;
    for (let item of body) {
        if (item.type === "ExportDefaultDeclaration") {
            //拿到它的declaration，这里是一个ArrayExpression
            //拿到它的elements，向里面追加一个路由节点
            //路由节点是一个对象，我们这里通过ObjectExpression构建

            if(isMainPage === '1') {
                // 如果已有redirect，删掉
                for(let i = 0;i < item.declaration.elements.length;i++) {
                    if(item.declaration.elements[0].properties[1].key.name === "redirect") {
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
    //导入该页面
    //通过importDeclaration构建
    body.unshift(importDeclaration(
        [importDefaultSpecifier(identifier(pageId))],
        literal(`../containers/${pageId}`)
    ));
    //将改造完之后的ast转为字符串
    code = recast.print(ast).code;
    // 添加import.js
    let importJSCode = `export default {data() {return {pageId: "${pageId}"}},components: {}}`;
    fs.writeFileSync(importJSFilePath, code);
    fs.writeFileSync(comImportJSFilePath, importJSCode);
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
        //生成路由文件
        generateRouter(projectId, pageId, isMainPage);
    }
}

module.exports = (ctx) => {
    console.log(ctx.query);
    // isMainPage：是否设置为项目主页，是:"1"，否:"0"
    let {type, projectId, pageId, layout, isMainPage} = ctx.query;
    handler[type]({projectId, pageId, layout, isMainPage});
    ctx.body = new SucModel([], "创建成功");
}