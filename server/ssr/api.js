const KoaRouter = require("koa-router");
const compiler = require("./compiler");
const fs = require("fs");
const path = require('path');
const { SucModel, ErrModel } = require('../util/resModel')
const router = new KoaRouter({
    prefix: "/api"
});
//编译的接口
router.post("/compiler", compiler);

// 列表的接口
router.get('/getKitsList', async (ctx, next) => {
    let data = []
    let kitClass = fs.readdirSync(path.resolve(__dirname, '../components'))
    Array.isArray(kitClass) && kitClass.map(ele => {
        let obj = {
            type: ele,
            title: ele,
            list: []
        }
        let kitName = fs.readdirSync(path.resolve(__dirname, `../components/${ele}`))
        Array.isArray(kitName) && kitName.map(item => {
            item = item.split('.')[0]
            obj.list.push({
                name: item,
                path: `component/${ele}/${item}`,
                type: item
            })
        })
        data.push(obj)
    })
    ctx.body = new SucModel(data, '获取列表成功');
    await next()
})
module.exports = router;