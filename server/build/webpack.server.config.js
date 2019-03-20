const merge = require("webpack-merge");
const path = require("path");
const baseConfig = require("./webpack.base.config");
const VueSSRServerPlugin  = require("vue-server-renderer/server-plugin");
let mode = process.env.NODE_ENV || "production";
console.log("mode", mode);
const isDev = mode === "development";

let config = {
    mode,
    entry: path.resolve(__dirname, "../server-entry.js"),
    target: "node",
    devtool: "source-map",
    output: {
        libraryTarget: "commonjs2",
        path: path.resolve(__dirname, "../server-dist")
    },
    externals: Object.keys(require("../../package.json").dependencies),
    plugins: [
        new VueSSRServerPlugin()
    ],
    resolve: {
        alias: {
            // "model": path.resolve(__dirname, "../src/server/model")
        }
    }
}

module.exports = merge(baseConfig, config);

