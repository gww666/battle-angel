const KoaRouter = require("koa-router");
const path = require("path");
const send = require("koa-send");

const router = new KoaRouter({
    prefix: "/public"
});

router.get("/*", async ctx => {
    console.log("静态资源文件", ctx.path);
    let pathObj = path.parse(ctx.path);
    // if (pathObj.dir === "/public/upload") {
    //     const filename = pathObj.base;
    //     await send(ctx, "upload/" + filename);
    // } else {
    console.log("拼接的链接", "client-dist" + ctx.path);
        
    await send(ctx, "server/client-dist" + ctx.path);
    // }
    
});
// router.get("/upload/*", async ctx => {
//     console.log("静态资源文件2", ctx.path);
// });
module.exports = router;