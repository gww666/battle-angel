const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const baseConfig = require("./webpack.base.config");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const Visualizer = require("webpack-visualizer-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const assetsPath = require("./utils");

const getConfig = (mode = "development") => {
    const isDev = mode === "development";

    let config = {
        mode,
        entry: path.resolve(__dirname, "../client-entry.js"),
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "../client-dist")
        },
        plugins: [
            new VueSSRClientPlugin(),
            // new CopyWebpackPlugin([
            //     {
            //         from: path.resolve(__dirname, "../public/static"),
            //         to: path.resolve(__dirname, "../client-dist/public")
            //     }
            // ])
        ],
        resolve: {
            alias: {
                "model": path.resolve(__dirname, "../src/client/model")
            }
        }
    }
    config = merge(config, {
        output: {
            publicPath: isDev ? "http://127.0.0.1:3000" : "/", 
            filename: "public/[name].js",
        },
        optimization: {
            removeAvailableModules: true,
            minimizer: [
                new UglifyJsPlugin()
            ],
            runtimeChunk: {
                name: "manifest"
            },
            //production模式下，该值自动为true
            minimize: true,
            splitChunks: {
                chunks: "all",
                // cacheGroups: {
                //     styles: {            
                //         name: 'styles',
                //         test: /\.scss|css$/,
                //         chunks: 'all',    // merge all the css chunk to one file
                //         enforce: true
                //     }
                // }
            }
        },
        plugins: [
            // new MiniCssExtractPlugin({
            //     filename: "css/[name].css",
            //     chunkFilename: "css/[contenthash:12].css"
            // })
        ],

    });
    return merge(baseConfig, config);
}
// let mode = process.env.NODE_ENV || "production";


// module.exports = merge(baseConfig, config);
// module.exports = getConfig("production");
module.exports = getConfig;