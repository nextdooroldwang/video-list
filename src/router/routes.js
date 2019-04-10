import { BasicLayout } from '@/components/layouts'
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
	{
		path: '/',
		name: 'index',
		component: BasicLayout,
		meta: { title: '首页' },
		redirect: '/dashboard',
		children: [
			{
				path: '/dashboard',
				name: 'dashboard',
				component: () => import('@/views/dashboard'),
				meta: { title: '控制台', keepAlive: false, permission: ['dashboard'] }
			}
		]
	},
	{
		path: '/404',
		component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
	}
]
