import { ACCESS_TOKEN } from '@/store/mutation-types'
import { login } from '@/api/login'
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
		async Login({ commit }, userInfo) {
			try {
				const response = await login(userInfo)
				Cookies.set(ACCESS_TOKEN, response.access_token, { expires: 1 })
				commit('SET_TOKEN', response.access_token)
			} catch(error) {
				console.log(error)
			}
		},
		Logout({ commit }) {
			commit('SET_TOKEN', '')
			Cookies.remove(ACCESS_TOKEN)
		}
	}
}

export default app
