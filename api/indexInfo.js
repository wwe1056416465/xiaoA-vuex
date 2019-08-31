// 引入请求函数
import ajax from './api'

// 获取首页信息
export function reqIndexInfo(indexIata){
	const {data,access_token}=indexIata
	return ajax('/adminspa/markanalysis/getanalysisdata',{data,access_token})
}
// 获取子账号
export function reqChildren(data){
	const {userid,access_token}=data
	return ajax('/adminspa/member/getchildlist.html', {userid,access_token}, 'GET')
}
// 获取话术模板
export function reqCallflow(data){
	const {useradminid,access_token}=data
	return ajax('/adminspa/Phone/getUserPhone.html', {useradminid,access_token}, 'GET')
}