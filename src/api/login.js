import { axios } from '@/utils/request'
import { loginURL } from '@/config'
import QS from 'qs'
export function login({ username, password }) {
	// let parms = new FormData()
	// formData.append('grant_type', 'password')
	// formData.append('client_id', '2')
	// formData.append('client_secret', 'RQIW2FFs1xCj0oQQd5OUeLatmseitrn9IZbTftMR')
	// formData.append('scope', '*')
	// formData.append('username', username)
	// formData.append('password', password)
	let parms = {
		grant_type: 'password',
		client_id: '2',
		client_secret: 'RQIW2FFs1xCj0oQQd5OUeLatmseitrn9IZbTftMR',
		scope: '*',
		username,
		password
  }
  return new Promise(resolve => {
   
    resolve()
  })
	// return axios({
	// 	url: loginURL,
	// 	method: 'post',
	// 	data: QS.stringify(parms)
	// })
}

export function logout() {}

export function getInfo() {}
