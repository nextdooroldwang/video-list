import { LANG } from '@/store/mutation-types'
import { getStore, setStore } from '@/utils/storage'
const app = {
	state: {
		lang: getStore(LANG) || 'en'
	},
	mutations: {
		SET_LANG: (state, lang) => {
			state.lang = lang
			setStore(LANG, lang)
		}
	},
	actions: {
		setLang({ commit }, lang) {
			commit('SET_LANG', lang)
		}
	}
}

export default app
