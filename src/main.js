import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import '@/core/lazy_lib/antd_component'
import '@/core/use'
import 'ant-design-vue/dist/antd.css'
import i18n from '@/lang'

Vue.config.productionTip = false

import plugin from '@/plugin'

Vue.use(plugin)

new Vue({
	router,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app')
