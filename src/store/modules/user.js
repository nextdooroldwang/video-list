import { ACCESS_TOKEN } from '@/store/mutation-types'
import { login, getInfo, logout } from '@/api/login'
import Cookies from 'js-cookie'
const app = {
	state: {
		token: Cookies.get(ACCESS_TOKEN)
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		}
	},
	actions: {
		Login({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
				login(userInfo)
					.then(response => {
						Cookies.set(ACCESS_TOKEN, response.access_token, { expires: 1 })
						commit('SET_TOKEN', response.access_token)
						resolve()
					})
					.catch(error => {
						console.log(error)
						reject(error)
					})
			})
		},
		Logout({ commit, state }) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				Cookies.remove(ACCESS_TOKEN)

				logout(state.token)
					.then(() => {
						resolve()
					})
					.catch(() => {
						resolve()
					})
			})
		}
	}
}

export default app
