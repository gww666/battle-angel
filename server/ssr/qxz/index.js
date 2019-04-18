const fs = require("fs");
const path = require('path');
const { SucModel, ErrModel } = require('../../util/resModel')
const excludeList = require('../../config/excluded-components')
const Name = (name) => {
    let res = name.split(".");
    res.splice(res.length - 1, 1);
    return res.join(".");
}
// 左侧组件列表
const getKitsList = async (ctx, next) => {
    try {
        let selfProps = path.resolve(__dirname, `../../components/${group}/props-export.js`);
        let commonProps = resolve(__dirname, `../../components/props-export.js`);
        let baseList = fs.readdirSync(path.resolve(__dirname, '../../components'));
        let data = [];
        baseList.forEach(baseName => {
            //判断文件夹名称是否为保留字
            if (!excludeList.includes(baseName)) {
                let componentsList = fs.readdirSync(path.resolve(__dirname, `../../components/${baseName}`));
                let baseObject =  {
                    group: baseName,
                    title: baseName,
                    list: []
                }
                componentsList.forEach(subName => {
                    //判断文件夹或文件名称是否为保留字
                    if (!excludeList.includes(subName)) {
                        baseObject.list.push({
                            name: Name(subName),
                            path: `component/${baseName}/${subName}`,
                            type: Name(subName)
                        });
                    }
                });
                data.push(baseObject);
            }
        });
        ctx.body = new SucModel(data, '获取列表成功');
    } catch (err) {
        ctx.body = new ErrModel([], '获取列表失败');
    }
}
// 已经导入的组件
const getReadyKits= async (ctx, next) => {
    try {
        let kitsList = fs.readFileSync(path.resolve(__dirname, '../../containers/test/import.js'), 'utf8')
        // let kitsList = require('../../containers/test/import.js')
        ctx.body = new SucModel(kitsList, '获取导入组件成功')
    } catch (err) {
        ctx.body = new ErrModel('', '获取已导入组件失败')
    }
}
module.exports = {
    getKitsList,
    getReadyKits
}