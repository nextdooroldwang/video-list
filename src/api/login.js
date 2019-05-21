import { axios } from '@/utils/request'

export function login({ username, password }) {
	let formData = new FormData()
	formData.append('grant_type', 'password')
	formData.append('client_id', '8cb7922d449c01c435e6db54bc857f4c0e4e62ad1054a5df879704ca1b1bf894')
	formData.append(
		'client_secret',
		'f8117b1ac72ab7543519823aaa0e40896b60db0ee864389e9aca7a8c23f6acce3a6493f0afd12aa876d3a69d4fddfa72007e0a622ee40ae68ba3b09b98973c9df084e07149e97262f332e4bc2c6ded6e07124a892ab9b600d381a954ede9884e2aad9c1578d7c141f6c65049ceb703676cbb95430fdd98471803c2633cbecc7dec8efd474e5b0010f2e26d4746af7811b7acb9ff1de5e903fdb46d4dbe5ce47e1af63ba5d1f35bd65cd06f8953ab0d0c471f45f8a0942e2891dfa52070d694f7d8e1ec8eb6393b92b177529fc57c3b6f774a61b6289adfd366d8b554e44753f635533fbc5523a75f07fb93048bf7a580562f31f876b8059a1d865270d9e74177'
	)
	formData.append('scope', 'openid')
	formData.append('username', username)
	formData.append('password', password)
	return axios({
		url: 'https://logindev.mobingi.com/access_token',
		method: 'post',
		data: formData
	})
}

export function logout() {}

export function getInfo() {}
