import { ACCESS_TOKEN } from '@/store/mutation-types'
import { login } from '@/api/login'
import Cookies from 'js-cookie'
const app = {
	state: {
		token: Cookies.get(ACCESS_TOKEN),
		name: '',
		// welcome: '',
		avatar: '',
		roles: [],
		info: {}
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_NAME: (state, { name, welcome }) => {
			state.name = name
			state.welcome = welcome
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		SET_INFO: (state, info) => {
			state.info = info
		}
	},
	actions: {
		Login({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
				login(userInfo)
					.then(response => {
						Cookies.set(ACCESS_TOKEN, response.token_type + ' ' + response.access_token, { expires: 1 })
						commit('SET_TOKEN', response.token_type + ' ' + response.access_token)
						resolve()
					})
					.catch(error => {
						console.log(error)
						reject(error)
					})
			})
		},
		// 获取用户信息
		GetInfo({ commit }) {
			return new Promise((resolve, reject) => {
				if (Cookies.get(ACCESS_TOKEN)) {
					let result = {
						name: 'mobingi',
						avatar: '',
						role: {
							permissionList: ['dashboard', 'customer']
						}
					}

					commit('SET_ROLES', result.role)
					commit('SET_INFO', result)
					commit('SET_NAME', { name: result.name })
					commit('SET_AVATAR', result.avatar)

					resolve(result)
				}
				// getInfo().then(response => {
				//   const result = response.result

				//   if (result.role && result.role.permissions.length > 0) {
				//     const role = result.role
				//     role.permissions = result.role.permissions
				//     role.permissions.map(per => {
				//       if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
				//         const action = per.actionEntitySet.map(action => { return action.action })
				//         per.actionList = action
				//       }
				//     })
				//     role.permissionList = role.permissions.map(permission => { return permission.permissionId })
				//     commit('SET_ROLES', result.role)
				//     commit('SET_INFO', result)
				//   } else {
				//     reject(new Error('getInfo: roles must be a non-null array !'))
				//   }

				//   commit('SET_NAME', { name: result.name, welcome: welcome() })
				//   commit('SET_AVATAR', result.avatar)

				//   resolve(response)
				// }).catch(error => {
				//   reject(error)
				// })
			})
		},
		Logout({ commit }) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				Cookies.remove(ACCESS_TOKEN)
				resolve()
				// logout(state.token)
				// 	.then(() => {
				// 		resolve()
				// 	})
				// 	.catch(() => {
				// 		resolve()
				// 	})
			})
		}
	}
}

export default app
