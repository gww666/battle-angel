const Koa = require("koa");
// const db = require("./db");
const staticRouter = require("./ssr/static-assets.js");
// const apiRouter = require("./routers/api");
// const userRouter = require("./routers/user");
// const uploadRouter = require("./routers/upload");
const send = require("koa-send");
const isDev = process.env.NODE_ENV === "development";
const apiRouter = require("./ssr/api");
const {body} = require("./util/server-util");
// const session = require("koa-session");
// let SSRRouter;
// if (isDev) {
//     SSRRouter = require("./routers/ssr-dev");
// } else {
//     SSRRouter = require("./routers/ssr-prod");
// }
const server = new Koa();
// server.keys = [Date.now() + "-xswl-6678"];
// //注册session模块
// server.use(session({
//     maxAge: 1000 * 60 * 10,
// }, server));
//全局挂载db
// server.use(async (ctx, next) => {
//     ctx.db = db;
//     await next();
// });
//处理favicon
server.use(async (ctx, next) => {
    if (ctx.path === "/favicon.ico") {
        await send(ctx, "public" + ctx.path);
    } else {
        await next();
    }
});
server.use(body());
//使用静态资源文件的路由
server.use(staticRouter.routes()).use(staticRouter.allowedMethods());
//使用处理服务端渲染的路由
// server.use(SSRRouter.routes()).use(SSRRouter.allowedMethods());
//使用处理服务端渲染的路由
server.use(apiRouter.routes()).use(apiRouter.allowedMethods());

let port = 3000;
let host = "127.0.0.1";
server.listen(port, host, () => {
    console.log(`server is running on http://${host}:${port}`);
});