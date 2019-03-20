module.exports = {
	presets: [
		"@vue/app"
	],
	plugins: [
		[
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
		],
		"@babel/plugin-proposal-class-properties",
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
