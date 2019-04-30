const KoaRouter = require("koa-router");
const compiler = require("./compiler");
const download = require("./download");
const save = require("./save");
const newFile = require("./newFile");

const { 
    getKitsList,
    getReadyKits
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
//下载接口
router.post("/download", download);
//保存接口
router.post("/save", save);
//保存接口
router.get("/newFile", newFile);

// 列表的接口
router.get('/getKitsList', getKitsList);
// 获取可用的组件的接口
router.get('/getReadyKits', getReadyKits);
module.exports = router;