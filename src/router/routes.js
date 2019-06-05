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
				redirect: '/dashboard/workplace',
				component: RouteView,
				meta: { title: '仪表盘', keepAlive: false, icon: 'form', permission: ['dashboard'] },
				children: [
					{
						path: '/dashboard/workplace',
						name: 'Workplace',
						component: () => import('@/views/dashboard'),
						meta: { title: '工作台', keepAlive: false, permission: ['dashboard'] }
					}
					// 外部链接
					// {
					//   path: 'https://www.baidu.com/',
					//   name: 'Monitor',
					//   meta: { title: '监控页（外部）', target: '_blank' }
					// },
				]
			},
			{
				path: '/customer',
				redirect: '/customer/list',
				component: RouteView,
				meta: { title: '用户管理', keepAlive: false, icon: 'form', permission: ['customer'] },
				children: [
					{
						path: '/customer/list',
						name: 'CustomerList',
						component: () => import('@/views/dashboard'),
						meta: { title: '用户列表', keepAlive: false, permission: ['customer'] }
					},
					{
						path: '/customer/company',
						name: 'CompanyList',
						component: () => import('@/views/dashboard'),
						meta: { title: '公司列表', keepAlive: false, permission: ['dashboard'] }
					},
					{
						path: '/customer/order',
						name: 'OrderList',
						component: () => import('@/views/dashboard'),
						meta: { title: '订购列表', keepAlive: false, permission: ['dashboard'] }
					},
					{
						path: '/customer/bloopy',
						name: 'BloopyList',
						component: () => import('@/views/dashboard'),
						meta: { title: 'Bloopy列表', keepAlive: false, permission: ['dashboard'] }
					},
					{
						path: '/customer/remote',
						name: 'RemoteControl',
						component: () => import('@/views/dashboard'),
						meta: { title: '远程控制', keepAlive: false, permission: ['dashboard'] }
					},
					{
						path: '/customer/message',
						name: 'MessageSend',
						component: () => import('@/views/dashboard'),
						meta: { title: '通知群发', keepAlive: false, permission: ['dashboard'] }
					}
				]
			},
			{
				path: '/monitor',
				redirect: '/monitor/maintain',
				component: RouteView,
				meta: { title: '平台监控', keepAlive: false, icon: 'form', permission: ['dashboard'] },
				children: [
					{
						path: '/monitor/maintain',
						name: 'MaintainData',
						component: () => import('@/views/dashboard'),
						meta: { title: '运维数据监控', keepAlive: false, permission: ['dashboard'] }
					},
					{
						path: '/monitor/operation',
						name: 'OperationalData',
						component: () => import('@/views/dashboard'),
						meta: { title: '运营数据监控', keepAlive: false, permission: ['dashboard'] }
					}
				]
			},
			{
				path: '/log',
				redirect: '/log/admin',
				component: RouteView,
				meta: { title: '日志管理', keepAlive: false, icon: 'form', permission: ['dashboard'] },
				children: [
					{
						path: '/log/operat',
						name: 'OperatLog',
						component: () => import('@/views/dashboard'),
						meta: { title: '操作日志', keepAlive: false, permission: ['dashboard'] }
					}
				]
			},
			{
				path: '/permission',
				redirect: '/permission/admin',
				component: RouteView,
				meta: { title: '权限管理', keepAlive: false, icon: 'form', permission: ['dashboard'] },
				children: [
					{
						path: '/permission/admin',
						name: 'PermissionAdmin',
						component: () => import('@/views/dashboard'),
						meta: { title: '管理员列表', keepAlive: false, permission: ['dashboard'] }
					},
					{
						path: '/permission/distribution',
						name: 'PermissionDistribution',
						component: () => import('@/views/dashboard'),
						meta: { title: '权限划分', keepAlive: false, permission: ['dashboard'] }
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
