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
    // let stream = fs.createReadStream(path.resolve(__dirname, '../public/static/json/kits.json'), 'utf8')
    // let str = ''
    // stream.on('data', chunk => {
    //     str += chunk
    // })
    // stream.on('end', () => {
    //     console.log(JSON.parse(str), typeof JSON.parse(str), 'end')
    // })
    let data = []
    try{
        data = fs.readFileSync(path.resolve(__dirname, '../public/static/json/kits.json'), 'utf8')
        data = JSON.parse(data)
        ctx.body = new SucModel(data, '获取列表成功');
    }catch(err) {
        ctx.body = new ErrModel(data, '获取列表失败');
    }
    await next()
})
module.exports = router;