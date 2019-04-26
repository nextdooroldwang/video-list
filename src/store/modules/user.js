import { TOKEN } from '@/store/mutation-types'
import { getStore, setStore, clearStore } from '@/utils/storage'
import { login, getInfo, logout } from '@/api/login'
const app = {
	state: {
		token: getStore(TOKEN)
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
						setStore(TOKEN, response.access_token, 7 * 24 * 60 * 60 * 1000)
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
				clearStore(TOKEN)

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
