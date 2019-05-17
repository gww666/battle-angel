const fs = require("fs");
const path = require("path");
const { SucModel, ErrModel } = require("../../util/resModel");
const excludeList = require("../../config/excluded-components");
const recast = require('recast');
const {
    identifier, 
    importDefaultSpecifier, 
    importDeclaration, 
    literal,
    objectExpression,
    property
} = recast.types.builders;
const Name = (name) => {
    let res = name.split(".");
    res.splice(res.length - 1, 1);
    return res.join(".");
};
const getProps = (_path) => {
    let hasProps = fs.existsSync(_path);
    let obj = {};
    if(hasProps) {
        let arr = require(_path);
        arr.forEach(ele => {
            if(ele.prop) {
                obj[ele.prop] = "";
            };
        });
    }
    return hasProps ? obj : hasProps;
};
const getKits = () => {
    let basePropsPath = path.resolve(__dirname, "../../components/props-export.js");
    let baseProps = getProps(basePropsPath);
    let baseList = fs.readdirSync(path.resolve(__dirname, "../../components"));
    let data = [];
    let allKits = [];
    baseList.forEach(baseName => {
        // 组件类的props
        let classPropsPath = path.resolve(__dirname, `../../components/${baseName}/props-export.js`);
        let classProps = getProps(classPropsPath);
        //判断文件夹名称是否为保留字
        if (!excludeList.includes(baseName)) {
            let componentsList = fs.readdirSync(path.resolve(__dirname, `../../components/${baseName}`));
            let baseObject =  { 
                group: baseName,
                title: baseName,
                list: []
            }
            componentsList.forEach(subName => {
                // 单个组件的props
                let kitPropsPath = path.resolve(__dirname, `../../components/${baseName}/${subName}/props-export.js`);
                let kitProps = getProps(kitPropsPath);
                //判断文件夹或文件名称是否为保留字
                if (!excludeList.includes(subName)) {
                    let listObj = {
                        name: subName,
                        path: `component/${baseName}/${subName}`,
                        type: subName,
                        config: kitProps || classProps || baseProps || []
                    };
                    let kitsObj = {
                        group: baseName,
                        path: `component/${baseName}/${subName}`,
                        type: subName,
                        config: kitProps || classProps || baseProps || []
                    }
                    baseObject.list.push(listObj);
                    allKits.push(kitsObj)
                }
            });
            data.push(baseObject);
        }
    });
    return { data, allKits };
};
// 左侧组件列表
const getKitsList = async (ctx, next) => {
    // components中的props
    try {
        let data = getKits().data;
        ctx.body = new SucModel(data, "获取列表成功");
    } catch (err) {
        ctx.body = new ErrModel([], "获取列表失败");
    }
};
// 已经导入的组件
const getReadyKits = async (ctx, next) => {
    try {
        let kitsList = fs.readFileSync(path.resolve(__dirname, "../../containers/test/import.js"), "utf8");
        ctx.body = new SucModel(kitsList, "获取导入组件成功");
    } catch (err) {
        ctx.body = new ErrModel("", "获取已导入组件失败");
    }
};
// 已创建的项目
const getProjectsList = async (ctx, next) => {
    try{
        let projectsList = fs.readdirSync(path.resolve(__dirname, "../../project"));
        let arr = [];
        projectsList.forEach(item => {
            arr.push({
                name: item,
                // isMainPage: 
            })
        });
        ctx.body = new SucModel(arr, "获取项目列表成功");
    } catch (err) {
        ctx.body = new ErrModel("", "获取项目列表失败");
    }
};
// 已创建的页面
const getProjectPages = async (ctx, next) => {
    let parmas = ctx.query;
    try{
        let projectId = parmas.projectId;
        let projectsList = fs.readdirSync(path.resolve(__dirname, `../../project/${projectId}/containers`));

        // 读取项目的route
        let projectRoute = fs.readFileSync(path.resolve(__dirname, `../../project/${projectId}/routers/import.js`));
        let ast = recast.parse(projectRoute);
        let body = ast.program.body;
        let homePage;
        for (let item of body) {
            if(item.type === "ExportDefaultDeclaration") {
                if(item.declaration.elements[0]) {
                    // 默认没首页
                    if(item.declaration.elements[0].properties[1].key.name !== "redirect") {
                        homePage = item.declaration.elements[0].properties[1].value.name;
                    }
                    for(let i = 0;i < item.declaration.elements.length;i++) {
                        if(item.declaration.elements[i].properties[1].key.name === "redirect") {
                            homePage = item.declaration.elements[i].properties[1].value.value.split("/")[1];
                            break;
                        }
                    }
                }
            }
        };
        
        let arr = [];
        projectsList.forEach(item => {
            if(item !== "private") {
                // 获取pageType
                let projectImportJs = fs.readFileSync(path.resolve(__dirname, `../../project/${projectId}/containers/${item}/import.js`));
                let pageAst = recast.parse(projectImportJs);
                let pageBody = pageAst.program.body;
                let pageType = "";
                for (let item of pageBody) {
                    if(item.type === "ExportDefaultDeclaration") {
                        if(item.declaration.properties[0].key.name === "data") {
                            let property = item.declaration.properties[0].value.body.body[0].argument.properties;
                            property.forEach(ele => {
                                if(ele.key.name === "pageType") {
                                    pageType = ele.value.value;
                                };
                            });
                        };
                    };
                };
                arr.push({
                    name: item,
                    pageType,
                    isMainPage: homePage === item
                });
            };
        });
        ctx.body = new SucModel(arr, "获取页面列表成功");
    } catch (err) {
        console.log('errr::::', err)
        ctx.body = new ErrModel("", "获取页面列表失败");
    };
};
// 获取页面已引入的组件
const getPageConf = async (ctx, next) => {
    let parmas = ctx.query;
    try{
        let projectId = parmas.projectId;
        let pageId = parmas.pageId;

        let projectPath = path.resolve(__dirname, `../../project/${projectId}/containers`);
        let projectsList = fs.readdirSync(projectPath);
        let arr = [];
        let allKits = getKits().allKits;
        for(let i = 0;i < projectsList.length;i++) {
            if(projectsList[i] === pageId) {
                let isExist = fs.existsSync(`${projectPath}/${projectsList[i]}/import.js`);
                let confs = isExist ? fs.readFileSync(`${projectPath}/${projectsList[i]}/import.js`, "utf-8") : '';
                allKits.forEach(ele => {
                    if(confs.includes(ele.path.substr(10))) {
                        arr.push(ele);
                    }
                })
                break;
            }
        }
        ctx.body = new SucModel(arr, "获取页面配置成功");
    } catch (err) {
        console.log('errrrr', err);
        ctx.body = new ErrModel("", "获取项目配置失败");
    }
};
module.exports = {
    getKitsList,
    getReadyKits,
    getProjectsList,
    getProjectPages,
    getPageConf
};