const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === "development";
module.exports = {
    mode: "development",
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
                    // isDev ? "vue-style-loader" : MiniCssExtractPlugin.loader, 
                    "vue-style-loader", 
                    "css-loader",
                    "sass-loader",
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html") 
        })
    ],
    resolve: {
        extensions: [".js", ".vue"],
        alias: {
            component: path.resolve(__dirname, "../components")
        }
    }
}