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

import {getYuMing} from '@/utils/auth.js'

export default function ajax(url = '', data = {}, type = 'POST') {
	let baseUrl = getYuMing();
	if(baseUrl){
		if(url.indexOf(baseUrl)===-1){
			url=baseUrl+url
		}	
	}
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
				url:url,
				method: type,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'charset': 'utf-8',
					'X-Requested-With': 'XMLhttpRequest'
				},

				success: res => {
					resHandle(res,resolve)
				},
				fail: (err) => {
					reject(err)
					uni.showToast({
						title: '网络错误,请联系管理员',
						duration: 2000
					});
				}
			});
		})
	} else {
		return new Promise(function(resolve, reject) {
			// 发送 请求
			uni.request({
				url:url,
				method: type,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'charset': 'utf-8',
					'X-Requested-With': 'XMLhttpRequest'
				},
				data: data,
				success: res => {
					resHandle(res,resolve)
				},
				fail: (err) => {	
					reject(err)
					uni.showToast({
						title: '网络错误,请联系管理员',
						icon:'none',
						duration: 2000
					});
				}
			});
		})
	}

}

function resHandle(res,resolve){
	if(res.data.code===0){
		resolve(res)
	}else if(res.data.code===1001){
		uni.showToast({
			title: res.data.msg,
			duration: 2000,
			icon:'none',
			success:()=>{
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		});	
	}else if(res.data.code===1){
			uni.showModal({
			content: res.data.msg,
			confirmText:'知道了',
			confirmColor:'#3690ff',
			showCancel: false,	
			success: res => {
				// if (res.confirm) {
				// 	
				// } else if (res.cancel) {
				// 
				// }		
			}
		});
	
	}
}