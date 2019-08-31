import {reqIndexInfo,reqChildren,reqCallflow} from '@/api/indexInfo.js'

const state={
	indexInfo:null,//首页信息
	childrenArray:null,//子账号
	userids:null,//userids
	flownames:null,//话术模板名称
	callflowIds:null,//话术模板id
	showPhones:null,//主叫号
	mais:null,//AI数
	queryIndex:null
}

const mutations={
	SET_INDEXINFO:(state,indexInfo) => {
		state.indexInfo=indexInfo
	},
	SET_CHILDREN_ARRAY:(state,childrenArray) => {
		state.childrenArray=childrenArray
	},
	SET_USERIDS:(state,userids) => {
		state.userids=userids
	},
	SET_CALLFLOWS:(state,flownames) => {
		state.flownames=flownames
	},
	SET_CALLFLOW_IDS:(state,callflowIds) => {
		state.callflowIds=callflowIds
	},
	SET_PHONES:(state,showPhones) => {
		state.showPhones=showPhones
	},
	SET_MAIS:(state,mais) => {
		state.mais=mais
	},
	SET_QUERY_INDEX:(state,queryIndex) => {
		state.queryIndex=queryIndex
	}
}

const actions={
	getIndexInfo({commit,state},queryData){
		return new Promise((resolve,reject)=>{
			reqIndexInfo(queryData).then(res=>{
				const {data}=res.data
				commit('SET_INDEXINFO',data)
				resolve(res)
			})
		})
		
	},
	saveQueryIndex({commit},queryIndex){
		commit('SET_QUERY_INDEX',queryIndex)
		uni.switchTab({
			url: "/pages/tabBar/index/index"
		})
	},
	// 获取该用户的子账号
	getChildList({commit,state},reqData){
		return new Promise((resolve,reject)=>{
			reqChildren(reqData).then(res=>{
				let array = res.data.data,
				childrenArray = [],
				userids=[];
				let mais=[]
				for (let i = 0; i < array.length; i++) {
					childrenArray.push(array[i].username)
					userids.push(array[i].userid);
					mais.push(array[i].mn_ai)
				}
				childrenArray.unshift('请选择子账号')
				userids.unshift('')
				mais.unshift('')
				commit('SET_CHILDREN_ARRAY',childrenArray)
				commit('SET_USERIDS',userids)
				commit('SET_MAIS',mais)
				resolve(res)
			})
		})	
	},
	// 获取话术模板
	getCallflow({commit,state},reqData){
		return new Promise((resolve,reject)=>{
			reqCallflow(reqData).then(res=>{
				console.log(res);
				let callflows = res.data.data.callflow
				let phoneArr = res.data.data.phone;
				let flownames = []
				let callflowIds=[]
				let showPhones=[]
				// let addPhones=[]
				for (let i = 0; i < callflows.length ; i++) {
					flownames.push(callflows[i].flowname)
					callflowIds.push(callflows[i].id)
				}
				flownames.unshift('请选择话术模板')
				callflowIds.unshift('')
				for (let i = 0; i < phoneArr.length; i++) {
					showPhones.push(phoneArr[i].phoneno);
					// addPhones.push(phoneArr[i].phoneno);
				}
				showPhones.unshift('请选择主叫号');
				// addPhones.unshift('');
				commit('SET_PHONES',showPhones)
				commit('SET_CALLFLOWS',flownames)
				commit('SET_CALLFLOW_IDS',callflowIds)
				resolve(res)
			})
		})
	}
}

export default{
	namespaced: true,
	state,
	mutations,
	actions
}