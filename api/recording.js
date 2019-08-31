import ajax from './api.js'
// 机器人流程列表
export function reqRprocess(data){
	return ajax('/adminspa/Rprocess/index',data)
}
// 请求主流程列表
export function reqMainFlow(data){
	return ajax('/adminspa/rprocess/getBasicNodeLevel',data)
}
// 请求问题流程列表
export function reqQuestions(reqData){
	const {callflowid,data,access_token}=reqData
	return ajax('/adminspa/questions/index?callflowid='+callflowid+'&type=2',{data,access_token})
}
// 请求特殊流程
export function reqSpecil(reqData){
	const {callflowid,data,access_token}=reqData
	return ajax('/adminspa/special/index?callflowid='+callflowid+'&type=3',{data,access_token})
}
// 提交审核
export function reqUpvoice(data){
	return ajax('/adminspa/audio/upvoice',data)
}
// 审核列表
export function reqSubAccountAudio(data){
	return ajax('/adminspa/audio/subAccountAudio',data)
}
// 节点列表
export function reqJumpTargets(data){
	return ajax('/adminspa/rprocess/getJumpTargets',data)
}
// 节点信息
export function reqNodeInfo(data){
	return ajax('/adminspa/rprocess/getNodeInfo',data)
}
// 一个语音信息
export function reqOneInfoById(data){
	return ajax('/adminspa/audio/getOneInfoById',data)
}
// 保存录音
export function reqAddVoice(data){
	return ajax('/adminspa/audio/addVoice',data)
}