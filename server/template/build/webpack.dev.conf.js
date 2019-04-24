const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const baseConfig = require("./webpack.base.conf");
const mode = process.env.NODE_ENV || "production";
let config = merge(baseConfig, {
    mode,
    output: {
        publicPath: "",
        filename: "[name].js",
        path: path.resolve(__dirname, "../dist")
    },
    devtool: "inline-source-map",
    devServer: {
        host: "0.0.0.0",
        hot: true,
        port: 8083
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
module.exports = config;