module.exports = {
	presets: [
		"@vue/app",
		// "@babel/preset-stage-2"
	],
	plugins: [
		"@babel/plugin-syntax-dynamic-import",
		"@babel/plugin-transform-runtime",
		[
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
		],
		[
			"@babel/plugin-proposal-class-properties", 
			{
				"loose": false
			}
		],
		[
			"import",
			{
				"libraryName": "ant-design-vue",
				"libraryDirectory": "lib",
				"style": "css"
			}
		]
	]
}
