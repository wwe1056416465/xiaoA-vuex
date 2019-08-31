/*
ajax 请求函数模块
*/
/**
 * 向外部暴漏一个函数 ajax
 * @param {*} url 请求路径，默认为空
 * @param {*} data 请求参数，默认为空对象
 * @param {*} type 请求方法，默认POST
 * 
 */


export default function ajax(url = '', data = {}, type = 'POST') {
	let baseUrl = uni.getStorageSync('yuming');
	// 返回值 Promise对象 （异步返回的数据是response.data，而不是response）
	if (type === 'GET') {
		// 准备 url query 参数数据
		let dataStr = '' // 数据拼接字符串，将data连接到url
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&'
		})
		if (dataStr !== '') {
			dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
			url = url + '?' + dataStr
		}
		// 发送 get 请求
		return new Promise(function(resolve, reject) {
			// 发送 请求
			uni.request({
				url: baseUrl + url,
				method: type,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'charset': 'utf-8',
					'X-Requested-With': 'XMLhttpRequest'
				},

				success: res => {
					resolve(res)
				},
				fail: (err) => {
					console.log('errrr')
					uni.navigateTo({
						url: '/pages/login/login'
					})
					reject(err)
				}
			});
		})
	} else {
		return new Promise(function(resolve, reject) {
			// 发送 请求
			uni.request({
				url: baseUrl + url,
				method: type,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'charset': 'utf-8',
					'X-Requested-With': 'XMLhttpRequest'
				},
				data: data,
				success: res => {
					resolve(res)
				},
				fail: (err) => {
					console.log('errrr')
					uni.navigateTo({
						url: '/pages/login/login'
					})
					reject(err)
				}
			});
		})
	}

}
