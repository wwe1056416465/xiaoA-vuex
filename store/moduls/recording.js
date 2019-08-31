import {
	reqRprocess,
	reqMainFlow,
	reqQuestions,
	reqSpecil
} from '@/api/recording.js'
const state={
	rprocessList:[],
	mainFlowList:[],
	qustionFlowList:[],
	specialFlowList:[]
}
const mutations={
	SET_RPROCESS_LIST:(state,rprocessList) =>{
		state.rprocessList=rprocessList
	},
	SET_MAIN_FLOW_LIST:(state,mainFlowList) => {
		state.mainFlowList=mainFlowList
	},
	SET_QUESTION_FLOW_LIST:(state,qustionFlowList) => {
		state.qustionFlowList=qustionFlowList
	},
	SET_SPECIAL_FLOW_LIST:(state,specialFlowList) => {
		state.specialFlowList=specialFlowList
	}
}
const actions={
	// 获取机器流程列表
	getRprocessList({commit},reqData){
		return new Promise((resolve,reject)=>{
			reqRprocess(reqData).then(res=>{
				for (let i = 0,len=res.data.data.length; i < len; i++) {
					if (!res.data.data[i].createddate) {
						res.data.data[i].createddate = '-'
					}
				}
				let rprocessList=res.data.data
				commit('SET_RPROCESS_LIST',rprocessList)
				resolve(res)
			})
		})
	},
	// 获取主流程列表
	getMainFlow({commit},reqData){
		return new Promise((resolve,reject)=>{
			reqMainFlow(reqData).then(res=>{
				console.log(res,'主流程')
				let mainFlowList= res.data.data;
				commit('SET_MAIN_FLOW_LIST',mainFlowList)
				resolve(res)
			})
		})
	},
	// 获取问题流程
	getQuestions({commit},reqData){
		return new Promise((resolve,reject)=>{
			reqQuestions(reqData).then(res=>{
				console.log(res,'问题流程')
				let qustionFlowList=res.data.data
				commit('SET_QUESTION_FLOW_LIST',qustionFlowList)
				resolve(res)
			})
		})
	},
	// 获取特殊流程
	getSpecil({commit},reqData){
		return new Promise((resolve,reject)=>{
			reqSpecil(reqData).then(res=>{
				console.log(res,'特殊流程')
				let specialFlowList=res.data.data
				commit('SET_SPECIAL_FLOW_LIST',specialFlowList)
				resolve(res)
			})
		})
	}
}

export default {
	namespaced:true,
	state,
	mutations,
	actions
}