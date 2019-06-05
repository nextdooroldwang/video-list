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
	css: {
		loaderOptions: {
			less: {
				modifyVars: {
					'primary-color': '#394EFF',
					'link-color': '#394EFF',
					'border-radius-base': '10px'
				},
				javascriptEnabled: true
			}
		}
	},
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
		// 添加新的svg-sprite-loader处理svgIcon
		config.module
			.rule('svgIcon')
			.test(/\.svg$/)
			.include.add(resolve('src/assets/icon'))
			.end()
			.use('svg-sprite-loader') // 一定要添加use
			.loader('svg-sprite-loader')
			.tap(options => {
				options = {
					symbolId: 'icon-[name]'
				}
				return options
			})

		// 原有的svg图像处理loader添加exclude
		config.module
			.rule('svg')
			.exclude.add(resolve('src/assets/icon'))
			.end()
	},

	devServer: {
		proxy: {
			'/token': {
				target: 'http://192.168.50.166:8181', //代理接口
				changeOrigin: true,
				pathRewrite: {
					'^/token': '/oauth/token' //代理的路径
				}
			},
			'/api': {
				target: 'http://192.168.50.166:8181', //代理接口
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/api' //代理的路径
				}
			}
		}
	},

	lintOnSave: undefined,
	// babel-loader no-ignore node_modules/*
	transpileDependencies: [],

	productionSourceMap: false
}
