const fs = require("fs");
const path = require('path');
const { SucModel, ErrModel } = require('../../util/resModel')

const excludeList = require('../../config/excluded-components')
// 筛除基础组建和配置文件
function isExclude(name) {
    let a = false;
    excludeList.forEach(ele => {
        name.includes(ele) && (a = true)
    })
    return a
}
// 左侧组件列表
const getKitsList = async (ctx, next) => {
    try{
        let kitClass = fs.readdirSync(path.resolve(__dirname, '../../components')), data = [];
        kitClass.forEach(ele => {
            if(!isExclude(ele)) {
                let obj = {
                    group: ele,
                    title: ele,
                    list: []
                }, kitName = fs.readdirSync(path.resolve(__dirname, `../../components/${ele}`));
                kitName.forEach(item => {
                    item = item.split('.')[0]
                    !isExclude(item) && obj.list.push({
                        name: item,
                        path: `component/${ele}/${item}`,
                        type: item
                    })
                })
                data.push(obj)
            }
        })
        ctx.body = new SucModel(data, '获取列表成功');
    }catch(err) {
        ctx.body = new ErrModel(data, '获取列表失败');
    }
}
module.exports = {
    getKitsList
}