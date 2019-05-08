const fs = require("fs");
const path = require("path");
const { SucModel, ErrModel } = require("../../util/resModel");
const excludeList = require("../../config/excluded-components");
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
// 左侧组件列表
const getKitsList = async (ctx, next) => {
    // components中的props
    let basePropsPath = path.resolve(__dirname, "../../components/props-export.js");
    let baseProps = getProps(basePropsPath);
    try {
        let baseList = fs.readdirSync(path.resolve(__dirname, "../../components"));
        let data = [];
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
                        baseObject.list.push({
                            name: subName,
                            path: `component/${baseName}/${subName}`,
                            type: subName,
                            config: kitProps || classProps || baseProps || []
                        });
                    }
                });
                data.push(baseObject);
            }
        });
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
// 创建的项目
const getProjectsList = async (ctx, next) => {
    try{
        let projectsList = fs.readdirSync(path.resolve(__dirname, "../../project"));
        let arr = [];
        projectsList.forEach(item => {
            arr.push({
                name: item
            })
        });
        ctx.body = new SucModel(arr, "获取项目列表成功");
    } catch (err) {
        ctx.body = new ErrModel("", "获取项目列表失败");
    }
};
// 创建的页面
const getProjectPages = async (ctx, next) => {
    let parmas = ctx.query;
    try{
        let projectId = parmas.projectId;
        let projectsList = fs.readdirSync(path.resolve(__dirname, `../../project/${projectId}/containers`));
        let arr = [];
        projectsList.forEach(item => {
            if(item !== "private") {
                arr.push({
                    name: item
                })
            }
        });
        ctx.body = new SucModel(arr, "获取页面列表成功");
    } catch (err) {
        ctx.body = new ErrModel("", "获取页面列表失败");
    }
};
module.exports = {
    getKitsList,
    getReadyKits,
    getProjectsList,
    getProjectPages
};