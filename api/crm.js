import ajax from './api.js'

// crm首页列表
export function reqCrmHistory(data){
	return ajax('/adminspa/Jcdr/history',data)
}
// crm通话详情-客户资料
export function reqShowInfo(data){
	return ajax('/adminspa/Jcdr/showInfo',data,"GET")
}
// crm通话详情-通话结果
export function reqJcdrInfo(data){
	return ajax('/adminspa/Jcdr/getJcdrInfo',data)
}
// crm通话详情-通话记录
export function reqSeeSess(data){
	return ajax('/adminspa/Jcdr/seeSess',data)
}