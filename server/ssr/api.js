const KoaRouter = require("koa-router");
const compiler = require("./compiler");

const { 
    getKitsList 
} = require('./qxz')
const {
    getProps
} = require("./gw");
const router = new KoaRouter({
    prefix: "/api"
});
//编译的接口
router.post("/compiler", compiler);
//获取组件支持的props
router.get("/getProps", getProps);

// 列表的接口
router.get('/getKitsList', getKitsList);
module.exports = router;