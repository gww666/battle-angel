const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf.js");
const path = require("path");
module.exports = merge(baseConfig, {
    mode: "production",
    output: {
        publicPath: "/",
        filename: "static/js/[name].[chunkhash].js",
        path: path.resolve(__dirname, "../dist")
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: "vendor",
                    filename: "static/js/vendor.[chunkhash].js",
                    test: /(vue|vuex)/,
                    chunks: "initial"
                }
            }
        }
    }
});