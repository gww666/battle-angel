const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const devMode = process.env.NODE_ENV === "development";

module.exports = {
    entry: path.resolve(__dirname, "../main.js"),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            },
            {
                test: /\.(sa|sc|c|)ss$/,
                use: [
                    "vue-style-loader", 
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            limit: 8192,
                            // name: "static/images/[name].[hash:8].[ext]",
                            name: "[name].[hash:8].[ext]",
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html") 
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "../public/static"),
                to: path.resolve(__dirname, "../dist/static")
            }
        ])
    ],
    resolve: {
        extensions: [".js", ".vue"],
        alias: {
            component: path.resolve(__dirname, "../components")
        }
    }
}