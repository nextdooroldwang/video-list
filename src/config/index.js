let env = 'local'
if (process.env.NODE_ENV === 'production') {
	env = process.env.VUE_APP_TITLE
}

export const baseURL = {
	prod: 'https://app.mobingi.com',
	qa: 'https://appqa.mobingi.com',
	dev: 'https://appdev.mobingi.com',
	local: '/api'
}[env]

export const loginURL = {
	prod: 'https://login.mobingi.com',
	qa: 'https://loginqa.mobingi.com',
	dev: 'https://logindev.mobingi.com',
	local: '/token'
}[env]
