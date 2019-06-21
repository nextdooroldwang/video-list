import { axios } from '@/utils/request'
import { baseURL } from '@/config'
export function getCustomers(parameter) {
	return axios({
		url: baseURL + '/customers',
		method: 'get',
		params: parameter
	})
}

export function getCustomer({ id }) {
	return axios({
		url: baseURL + '/customer/' + id,
		method: 'get'
	})
}

export function getBloopys(parameter) {
	return axios({
		url: baseURL + '/bloopies',
		method: 'get',
		params: parameter
	})
}

export function getBloopy({ id }) {
	return axios({
		url: baseURL + '/bloopy/' + id,
		method: 'get'
	})
}

export function getMsgs(parameter) {
	return axios({
		url: baseURL + '/notification',
		method: 'get',
		params: parameter
	})
}

export function sendMsg(parameter) {
	return axios({
		url: baseURL + '/notification',
		method: 'post',
		data: parameter
	})
}

export function getRemote(params) {
	return axios({
		url: baseURL + '/remote',
		method: 'get',
		params
	})
}
