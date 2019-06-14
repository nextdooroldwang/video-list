import { UserLayout, BasicLayout, RouteView } from '@/components/layouts'

export const asyncRouterMap = [
	{
		path: '/',
		name: 'index',
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
				meta: { title: '工作台', keepAlive: false, icon: 'line-chart', permission: ['dashboard'] }
				// children: [
				// 	{
				// 		path: '/dashboard/workplace',
				// 		name: 'Workplace',
				// 		component: () => import('@/views/dashboard'),
				// 		meta: { title: '工作台', keepAlive: false, permission: ['dashboard'] }
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
				meta: { title: '用户管理', keepAlive: false, icon: 'team', permission: ['customer'] },
				children: [
					{
						path: '/customer/list',
						name: 'CustomerList',
						component: () => import('@/views/dashboard'),
						meta: { title: '用户列表', keepAlive: false, permission: [''] }
					},
					{
						path: '/customer/company',
						name: 'Company',
						hideChildrenInMenu: true,
						component: RouteView,
						redirect: '/customer/company/companyList',
						meta: { title: 'Company', keepAlive: false, permission: ['customer'] },
						children: [
							{
								path: '/customer/company/companyList',
								name: 'CompanyList',
								hidden: true,
								component: () => import('@/views/customer/CompanyList'),
								meta: { title: '公司列表', keepAlive: false, permission: ['customer'] }
							},
							{
								path: '/customer/company/companydetail',
								name: 'CompanyDetail',
								hidden: true,
								component: () => import('@/views/customer/Company'),
								meta: { title: '公司详情', keepAlive: false, permission: ['customer'] }
							}
						]
					},
					{
						path: '/customer/order',
						name: 'OrderList',
						component: () => import('@/views/dashboard'),
						meta: { title: '订购列表', keepAlive: false, permission: [''] }
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
								meta: { title: 'Bloopy列表', keepAlive: false, permission: ['customer'] }
							},
							{
								path: '/customer/bloopy/bloopydetail',
								name: 'BloopyDetail',
								hidden: true,
								component: () => import('@/views/customer/Bloopy'),
								meta: { title: 'Bloopy详情', keepAlive: false, permission: ['customer'] }
							}
						]
					},
					{
						path: '/customer/remote',
						name: 'RemoteControl',
						component: () => import('@/views/dashboard'),
						meta: { title: '远程控制', keepAlive: false, permission: [''] }
					},
					{
						path: '/customer/message',
						name: 'MessageSend',
						component: () => import('@/views/customer/MessageSend'),
						meta: { title: '通知群发', keepAlive: false, permission: ['customer'] }
					}
				]
			},
			{
				path: '/monitor',
				redirect: '/monitor/maintain',
				component: RouteView,
				meta: { title: '平台监控', keepAlive: false, icon: 'form', permission: ['monitor'] },
				children: [
					{
						path: '/monitor/maintain',
						name: 'MaintainData',
						component: () => import('@/views/dashboard'),
						meta: { title: '运维数据监控', keepAlive: false, permission: ['monitor'] }
					},
					{
						path: '/monitor/operation',
						name: 'OperationalData',
						component: () => import('@/views/dashboard'),
						meta: { title: '运营数据监控', keepAlive: false, permission: ['monitor'] }
					}
				]
			},
			{
				path: '/log',
				redirect: '/log/admin',
				component: RouteView,
				meta: { title: '日志管理', keepAlive: false, icon: 'form', permission: ['log'] },
				children: [
					{
						path: '/log/operat',
						name: 'OperatLog',
						component: () => import('@/views/dashboard'),
						meta: { title: '操作日志', keepAlive: false, permission: ['log'] }
					}
				]
			},
			{
				path: '/permission',
				redirect: '/permission/admin',
				component: RouteView,
				meta: { title: '权限管理', keepAlive: false, icon: 'form', permission: ['permission'] },
				children: [
					{
						path: '/permission/admin',
						name: 'PermissionAdmin',
						component: () => import('@/views/dashboard'),
						meta: { title: '管理员列表', keepAlive: false, permission: ['permission'] }
					},
					{
						path: '/permission/distribution',
						name: 'PermissionDistribution',
						component: () => import('@/views/dashboard'),
						meta: { title: '权限划分', keepAlive: false, permission: ['permission'] }
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
