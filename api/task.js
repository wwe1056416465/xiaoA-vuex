import ajax from './api'
// 任务首页信息
export function reaTqskInfo(data){
	return ajax('/adminspa/marketing/index.html',data)
}
// 任务详情(数据分析)
export function reqMarkanalysisinfo(data){
	return ajax('/adminspa/markanalysis/getmarkanalysisinfo',data)
}
// 暂停任务
export function reqStop(data){
	return ajax('/adminspa/Marketing/stop',data)	
}
// 重新启动任务
export function reqRestartTask(data){
	return ajax('/adminspa/marketing/restart.html',data)	
}
// 失败重呼
export function reqRecall(data){
	return ajax('/adminspa/marketing/recall.html',data)
}
// 删除任务
export function reqDeleteM(data){
	return ajax('/adminspa/Marketing/deleteM',data)
}
// 新建任务
export function reqAddTask(data){
	return ajax('/adminspa/marketing/add.html',data)
}