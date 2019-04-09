const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	configureWebpack: {
		plugins: [
			// Ignore all locale files of moment.js
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
		]
	},
	//alias
	chainWebpack: config => {
		config.resolve.alias
			.set('@api', resolve('src/api'))
			.set('@assets', resolve('src/assets'))
			.set('@components', resolve('src/components'))
			.set('@views', resolve('src/views'))
	},

	devServer: {
		proxy: 'https://www.easy-mock.com/mock/5c90bab5faf3d525b28586f2'
	},

	lintOnSave: undefined,
	// babel-loader no-ignore node_modules/*
	transpileDependencies: [],

	productionSourceMap: false
}
