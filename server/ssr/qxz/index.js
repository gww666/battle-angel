const fs = require("fs");
const path = require('path');
const { SucModel, ErrModel } = require('../../util/resModel')
// 是不是文件啊？
function isFile(_path) {
    return new Promise((reslove, reject) => {
        fs.stat(_path, (err, result) => {
            if(err) {
                reslove(false)
            }else {
                reslove(result.isFile())
            }
        })
    })
}
// 左侧组件列表
const getKitsList = async (ctx, next) => {
    let data = []
    try{
        let kitClass = fs.readdirSync(path.resolve(__dirname, '../../components'))
        kitClass.forEach(ele => {
            let _path = path.resolve(__dirname, `../../components/${ele}`)
            if(!fs.statSync(_path).isFile()) {
                let obj = {
                    group: ele,
                    title: ele,
                    list: []
                }
                let kitName = fs.readdirSync(_path)
                kitName.forEach(item => {
                    item = item.split('.')[0]
                    obj.list.push({
                        name: item,
                        path: `component/${ele}/${item}`,
                        type: item
                    })
                })
                data.push(obj)
            }
        })
        ctx.body = new SucModel(data, '获取列表材功');
    }catch(err) {
        ctx.body = new ErrModel(data, '获取列表失败');
    }
}
module.exports = {
    getKitsList
}