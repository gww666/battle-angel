const body = () => {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let reg = /\/upload\/.+/;
            let isUpload = reg.test(ctx.path);
            // console.log("isUpload", isUpload);
            if (ctx.method === "POST" && !isUpload) {
            // if (ctx.method === "POST") {
                let body = "";
                ctx.req.on("data", chunk => {
                    body += chunk;
                });
                ctx.req.on("end", async () => {
                    // ctx.params = body;
                    ctx.params = JSON.parse(body);
                    resolve();
                });
            } else {
                resolve();
            }
        });
        await next();
    }
} 

module.exports = {
    body
}