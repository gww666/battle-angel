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
    // } else {
    let _path = ctx.path.split("/");
    //形如["", "public", "89", "test.html"]
    let projectName = _path[2];
    // let rest = `/${_path[1]}/${_path[3]}`;
    let rest = `/${_path[3]}`;
    console.log("拼接的链接", `server/project/${projectName}/client-dist` + rest);
        
    // await send(ctx, `server/project/${projectName}/client-dist` + rest);
    await send(ctx, `server/project/${projectName}/client-dist` + rest);
    // }
    
});
// router.get("/upload/*", async ctx => {
//     console.log("静态资源文件2", ctx.path);
// });
module.exports = router;