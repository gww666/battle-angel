const path = require("path");
module.exports = {
    TEMPLATE_PATH: path.resolve(__dirname, "../public/index.html"),
    PROD_CLIENT_MANIFEST_PATH: path.resolve(__dirname, "../client-dist/vue-ssr-client-manifest.json"),
    PROD_SERVER_MANIFEST_PATH: path.resolve(__dirname, "../server-dist/vue-ssr-server-bundle.json"),
}