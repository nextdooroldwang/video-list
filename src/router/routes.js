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
