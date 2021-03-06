module.exports = {
    devServer: {
        hot: true,
        disableHostCheck: true,
        hotOnly: true,
        proxy: {
            "/api": {
                target: "http://127.0.0.1:3000",
                changeOrigin: true,
            }
        }
    }
}

