// 引入请求函数
import ajax from './api'

//登入
export function login(data){	
	const {username,password,yuming}=data
	console.log(yuming)
	return ajax(yuming+'/adminspa/login/login',{username:username,password:password})
}

// 登出
export function logout(access_token){
	return ajax('/adminspa/login/logout.html',{access_token})
}

// 获取基本信息
export function reqInitdata(access_token){
	console.log(access_token,'请求方法')
	return ajax('/adminspa/index/getinitdata.html',{access_token})
}
// 获取用户信息
export function reqUserInfo(data){
	return ajax('/adminspa/member/getUserInfo',data)
}
// 获取子账号
export function reqChildList(data){
	return ajax('/adminspa/member/getchildlist.html',data)
}

