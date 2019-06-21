import { axios } from '@/utils/request'
import { baseURL } from '@/config'

export function getApks() {
	return axios({
		url: baseURL + '/softwares',
		method: 'get'
	})
}

export function getApk({ id }) {
	return axios({
		url: baseURL + '/software/' + id,
		method: 'get'
	})
}

export function uploadApk(formData, onProgress) {
	return axios({
		url: baseURL + '/software',
		method: 'post',
		data: formData,
		onUploadProgress: function(e) {
			if (e.lengthComputable) {
				onProgress(e.loaded, e.total)
			}
		}
	})
}

export function updateApk(formData, onProgress, id) {
	return axios({
		url: baseURL + '/software/' + id,
		method: 'post',
		data: formData,
		onUploadProgress: function(e) {
			if (e.lengthComputable) {
				onProgress(e.loaded, e.total)
			}
		}
	})
}

export function getReleases() {
	return axios({
		url: baseURL + '/releases',
		method: 'get'
	})
}

export function getRelease({ id }) {
	return axios({
		url: baseURL + '/release/' + id,
		method: 'get'
	})
}

export function createRelease(params, onProgress) {
	return axios({
		url: baseURL + '/release',
		method: 'post',
		data: params,
		onUploadProgress: function(e) {
			if (e.lengthComputable) {
				onProgress(e.loaded, e.total)
			}
		}
	})
}

export function downloadSoftware({ id }) {
	return axios({
		url: baseURL + '/software/download/' + id,
		method: 'get'
	})
}
