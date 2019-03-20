module.exports = async (ctx, renderer) => {
    // const context = {url: ctx.path};
    const context = {url: "/"};
    let html = await renderer.renderToString(context);
    // ctx.body = html;
    return html;
}