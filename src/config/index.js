let env = 'local'
if (process.env.NODE_ENV === 'production') {
	env = process.env.VUE_APP_TITLE
}

export const baseURL = {
	prod: 'https://app.mobingi.com',
	qa: 'https://appqa.mobingi.com',
	dev: 'http://47.74.34.46:8181/api',
	local: '/api'
}[env]

export const loginURL = {
	prod: 'https://login.mobingi.com',
	qa: 'https://loginqa.mobingi.com',
	dev: 'http://47.74.34.46:8181/oauth/token',
	local: '/token'
}[env]
