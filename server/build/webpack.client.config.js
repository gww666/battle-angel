const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const baseConfig = require("./webpack.base.config");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const getConfig = (mode = "development", projectId) => {
    const isDev = mode === "development";
    
    let config = {
        mode,
        // entry: path.resolve(__dirname, "../client-entry.js"),
        entry: path.resolve(__dirname, "../main.js"),
        output: {
            path: path.resolve(__dirname, "../client-dist")
        },
        plugins: [
            // new VueSSRClientPlugin(),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, "../public/static/js"),
                    to: path.resolve(__dirname, "../client-dist/static/js")
                }
            ])
        ],
        // resolve: {
        //     // alias: {
        //     //     "model": path.resolve(__dirname, "../src/client/model")
        //     // }
        // }
    }
    config = merge(config, {
        output: {
            publicPath: isDev ? `http://127.0.0.1:3000/public/${projectId}/` : "/", 
            filename: "static/js/[name].js",
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
        module: {
            rules: [
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                limit: 8192,
                                // publicPath: "/abc",
                                outputPath(url, resourcePath, context) {
                                    // console.log("outputPath-url", url);
                                    // console.log("outputPath-resourcePath", resourcePath);
                                    // let relativePath = path.relative(context, resourcePath);
                                    let pathObj = path.parse(resourcePath);
                                    // console.log("pathObj", pathObj);
                                    
                                    // console.log("outputPath-relativePath", relativePath);
                                    return isDev ? `/static/images/${url}` : `static/images/${url}`;
                                },
                                // name: isDev ? "[name].[ext]" : "[name].[ext]",
                                // name: "[name].[ext]",
                            }
                        }
                    ]
                }
            ]
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