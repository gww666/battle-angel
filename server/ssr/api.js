const KoaRouter = require("koa-router");
const compiler = require("./compiler");
const router = new KoaRouter({
    prefix: "/api"
});
//编译的接口
router.post("/compiler", compiler);

module.exports = router;