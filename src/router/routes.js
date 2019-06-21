import { UserLayout, BasicLayout, RouteView } from '@/components/layouts'

export const asyncRouterMap = [
	{
		path: '/',
		name: 'home',
		component: BasicLayout,
		meta: { title: '首页' },
		redirect: '/dashboard',
		children: [
			// dashboard
			{
				path: '/dashboard',
				name: 'dashboard',
				// redirect: '/dashboard/workplace',
				component: () => import('@/views/dashboard'),
				meta: { title: '工作台', keepAlive: true, icon: 'line-chart', permission: ['dashboard'] }
				// children: [
				// 	{
				// 		path: '/dashboard/workplace',
				// 		name: 'Workplace',
				// 		component: () => import('@/views/dashboard'),
				// 		meta: { title: '工作台',  keepAlive: true, permission: ['dashboard'] }
				// 	},
				// 	// 外部链接
				// 	{
				// 	  path: 'https://www.baidu.com/',
				// 	  name: 'Monitor',
				// 	  meta: { title: '监控页（外部）', target: '_blank' }
				// 	},
				// ]
			},
			{
				path: '/customer',
				redirect: '/customer/list',
				component: RouteView,
				meta: { title: '用户管理', keepAlive: true, icon: 'team', permission: ['customer'] },
				children: [
					{
						path: '/customer/list',
						name: 'CustomerList',
						component: () => import('@/views/dashboard'),
						meta: { title: '用户列表', keepAlive: true, permission: [''] }
					},
					{
						path: '/customer/company',
						name: 'Company',
						hideChildrenInMenu: true,
						component: RouteView,
						redirect: '/customer/company/companyList',
						meta: { title: 'Company', keepAlive: true, permission: ['customer'] },
						children: [
							{
								path: '/customer/company/companyList',
								name: 'CompanyList',
								hidden: true,
								component: () => import('@/views/customer/CompanyList'),
								meta: { title: '公司列表', keepAlive: true, permission: ['customer'] }
							},
							{
								path: '/customer/company/companydetail/:id',
								name: 'CompanyDetail',
								hidden: true,
								component: () => import('@/views/customer/Company'),
								meta: { title: '公司详情', keepAlive: true, permission: ['customer'] }
							}
						]
					},
					{
						path: '/customer/order',
						name: 'OrderList',
						component: () => import('@/views/dashboard'),
						meta: { title: '订购列表', keepAlive: true, permission: [''] }
					},
					{
						path: '/customer/bloopy',
						name: 'Bloopy',
						hideChildrenInMenu: true,
						component: RouteView,
						redirect: '/customer/bloopy/bloopyList',
						meta: { title: 'Bloopy', keepAlive: false, permission: ['customer'] },
						children: [
							{
								path: '/customer/bloopy/bloopyList',
								name: 'BloopyList',
								hidden: true,
								component: () => import('@/views/customer/BloopyList'),
								meta: { title: 'Bloopy列表', keepAlive: true, permission: ['customer'] }
							},
							{
								path: '/customer/bloopy/bloopydetail/:id',
								name: 'BloopyDetail',
								hidden: true,
								component: () => import('@/views/customer/Bloopy'),
								meta: { title: 'Bloopy详情', keepAlive: true, permission: ['customer'] }
							}
						]
					},
					{
						path: '/customer/message',
						name: 'MessageSend',
						component: () => import('@/views/customer/MessageSend'),
						meta: { title: '通知群发', keepAlive: true, permission: ['customer'] }
					}
				]
			},
			{
				path: '/monitor',
				redirect: '/monitor/maintain',
				component: RouteView,
				meta: { title: '平台监控', keepAlive: true, icon: 'form', permission: ['monitor'] },
				children: [
					{
						path: '/monitor/maintain',
						name: 'MaintainData',
						component: () => import('@/views/dashboard'),
						meta: { title: '运维数据监控', keepAlive: true, permission: ['monitor'] }
					},
					{
						path: '/monitor/operation',
						name: 'OperationalData',
						component: () => import('@/views/dashboard'),
						meta: { title: '运营数据监控', keepAlive: true, permission: ['monitor'] }
					}
				]
			},
			{
				path: '/log',
				redirect: '/log/admin',
				component: RouteView,
				meta: { title: '日志管理', keepAlive: true, icon: 'form', permission: ['log'] },
				children: [
					{
						path: '/log/operat',
						name: 'OperatLog',
						component: () => import('@/views/dashboard'),
						meta: { title: '操作日志', keepAlive: true, permission: ['log'] }
					}
				]
			},
			{
				path: '/permission',
				redirect: '/permission/admin',
				component: RouteView,
				meta: { title: '权限管理', keepAlive: true, icon: 'form', permission: ['permission'] },
				children: [
					{
						path: '/permission/admin',
						name: 'PermissionAdmin',
						component: () => import('@/views/dashboard'),
						meta: { title: '管理员列表', keepAlive: true, permission: ['permission'] }
					},
					{
						path: '/permission/distribution',
						name: 'PermissionDistribution',
						component: () => import('@/views/dashboard'),
						meta: { title: '权限划分', keepAlive: true, permission: ['permission'] }
					}
				]
			},
			{
				path: '/version',
				redirect: '/version/apk',
				component: RouteView,
				meta: { title: '软件版本管理', keepAlive: true, icon: 'tag', permission: ['version'] },
				children: [
					{
						path: '/version/apk',
						name: 'Apk',
						hideChildrenInMenu: true,
						component: RouteView,
						redirect: '/version/apk/apkList',
						meta: { title: 'APK文件包', keepAlive: true, permission: ['version'] },
						children: [
							{
								path: '/version/apk/apkList',
								name: 'ApkList',
								hidden: true,
								component: () => import('@/views/version/Apk'),
								meta: { title: 'APK文件包', keepAlive: true, permission: ['version'] }
							},
							{
								path: '/version/apk/apkDetail/:id',
								name: 'ApkDetail',
								hidden: true,
								component: () => import('@/views/version/ApkDetail'),
								meta: { title: 'APK详情', keepAlive: true, permission: ['version'] }
							},
							{
								path: '/version/apk/apkNew',
								name: 'ApkNew',
								hidden: true,
								component: () => import('@/views/version/ApkNew'),
								meta: { title: '上传新APK文件包', keepAlive: false, permission: ['version'] }
							}
						]
					},
					{
						path: '/version/upload',
						name: 'Upload',
						hideChildrenInMenu: true,
						component: RouteView,
						redirect: '/version/upload/uploadList',
						meta: { title: '已发布版本', keepAlive: true, permission: ['version'] },
						children: [
							{
								path: '/version/upload/uploadList',
								name: 'UploadList',
								hidden: true,
								component: () => import('@/views/version/Upload'),
								meta: { title: '已发布版本列表', keepAlive: true, permission: ['version'] }
							},
							{
								path: '/version/upload/uploadDetail/:id',
								name: 'UploadDetail',
								hidden: true,
								component: () => import('@/views/version/UploadDetail'),
								meta: { title: '版本发布详情', keepAlive: false, permission: ['version'] }
							},
							{
								path: '/version/upload/uploadNew',
								name: 'UploadNew',
								hidden: true,
								component: () => import('@/views/version/UploadNew'),
								meta: { title: '发布新版本', keepAlive: false, permission: ['version'] }
							}
						]
					}
				]
			}
		]
	},
	{
		path: '*',
		component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
	}
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
	{
		path: '/user',
		component: UserLayout,
		redirect: '/user/login',
		hidden: true,
		children: [
			{
				path: '/user/login',
				name: 'login',
				component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
			}
		]
	},
	{
		path: '/404',
		component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
	}
]
