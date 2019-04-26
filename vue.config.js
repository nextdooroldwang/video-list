const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
	return path.join(__dirname, dir)
}

const utils = {
	assetsPath: function(_path) {
		const assetsSubDirectory = process.env.NODE_ENV === 'production' ? 'static' : 'static'

		return path.posix.join(assetsSubDirectory, _path)
	},
	resolve: function(dir) {
		return path.join(__dirname, '..', dir)
	}
}

module.exports = {
	configureWebpack: {
		plugins: [
			// Ignore all locale files of moment.js
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
		],
		module: {
			rules: [
				{
					test: /\.(woff2?|eot|ttf|otf)(\?.*)$/,
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
					}
				}
			]
		}
	},

	chainWebpack: config => {
		//svg loader
		const svgRule = config.module.rule('svg')
		svgRule.uses.clear()
		svgRule.use('vue-svg-loader').loader('vue-svg-loader')
		//alias
		config.resolve.alias
			.set('@api', resolve('src/api'))
			.set('@assets', resolve('src/assets'))
			.set('@components', resolve('src/components'))
			.set('@views', resolve('src/views'))
	},

	devServer: {
		proxy: {
			'/token': {
				target: 'https://logindev.mobingi.com/access_token', //代理接口
				changeOrigin: true,
				pathRewrite: {
					'^/token': '' //代理的路径
				}
			}
		}
	},

	lintOnSave: undefined,
	// babel-loader no-ignore node_modules/*
	transpileDependencies: [],

	productionSourceMap: false
}
