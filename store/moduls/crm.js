import {
	reqCrmHistory,
	reqShowInfo,
	reqJcdrInfo,
	reqSeeSess
} from '@/api/crm.js'
import {getYuMing,getToken} from '@/utils/auth.js'
import moment from '@/common/moment.min.js';
const state={
	crmList:[],
	crmQueryCriteria:null,
	crmInfo:null,
	audio: {
			src: '',
			duration: 0
		},
	jcdrShow:null,
	recoList:[]
}
const mutations={
	SET_CRM_LIST:(state,crmList) => {
		state.crmList=crmList
	},
	RESET_CRM_LIST:(state) =>{
		state.crmList=[]
	},
	SET_CRM_QUERY:(state,crmQueryCriteria) => {
		state.crmQueryCriteria=crmQueryCriteria
	},
	CLEAR_CRM_QUERY:(state,data) =>{
		state.crmQueryCriteria=data
	},
	SET_CRM_INFO:(state,crmInfo) => {
		state.crmInfo=crmInfo
	},
	SET_JCDR_SHOW:(state,jcdrShow) => {
		state.jcdrShow=jcdrShow
	},
	SET_RECO_LIST:(state,recoList) => {
		state.recoList=recoList
	}
}
const actions={
	// 获取crm列表
	getCrmHistory({commit,state},reqData){
		console.log(reqData);
		return new Promise((resolve,reject)=>{
			console.log('state');
			reqCrmHistory(reqData).then(res=>{
				console.log(res);
				for (let i = 0, len = res.data.data.length; i < len; i++) {
					if (res.data.data[i].tag) {
						res.data.data[i].tag = res.data.data[i].tag.split('|');
					}
				}
				let crmList=state.crmList
				crmList=crmList.concat(res.data.data)
				commit('SET_CRM_LIST',crmList)
				console.log(res);
				resolve(res)
			})
		})
	},
	// 清空crm列表
	emptyCrmList({commit}){
		commit('RESET_CRM_LIST')
	},
	// crm查询条件
	crmQuery({commit},crmQueryCriteria){
		commit('SET_CRM_QUERY',crmQueryCriteria)
	},
	// 清空crm查询条件
	clearCrmQuery({commit}){
		let data = {};
		data['j.jobname|like'] = ''
		data['t.callerno|t.calleeno|like'] =''
		data['t.callid'] = ''
		data['t.calltype'] = ''
		data['t.duration|egt'] = ''
		data['t.duration|elt'] = ''
		data['t.starttime|egt'] = moment().subtract(10, 'days').format('YYYY-MM-DD') +' 00:00:00';
		data['t.starttime|elt'] =  moment().format('YYYY-MM-DD HH:mm:ss');;
		data=JSON.stringify(data)
		commit('CLEAR_CRM_QUERY',data)
	},
	// 获取通话详情-客户资料
	getShowInfo({commit},reqData){
		return new Promise((resolve,reject)=>{
			reqShowInfo(reqData).then(res=>{
				console.log(res,'客户资料');
				let crmInfo= res.data.data
				Object.keys(crmInfo).forEach(key=>{
					if(crmInfo[key]===null){
						crmInfo[key]=''
					}
				})
				commit('SET_CRM_INFO',crmInfo)
				resolve(res)
			})
		})
	},
	// 获取通话详情-通话结果
	getJcdrInfo({commit,state},reqData){
		return new Promise((resolve,reject)=>{
			reqJcdrInfo(reqData).then(res=>{
				let jcdrShow = res.data.data;
				if(typeof jcdrShow.tag==='string'){
					jcdrShow.tag = jcdrShow.tag.split('|');
				}	
				jcdrShow.callNum=jcdrShow.records.length;
				let autioDuration=jcdrShow.duration;
				commit('SET_JCDR_SHOW',jcdrShow)
				state.audio.duration=autioDuration
			})
		})
	},
	 // 获取通话详情-通话记录
	 getSeeSess({commit,state},reqData){
		 return new Promise((resolve,reject)=>{
			 reqSeeSess(reqData).then(res=>{
				 console.log(res);
				 let $url=getYuMing()
				 let access_token=getToken()
				 let crmShow = res.data.data;
				 let recoList = res.data.data.record;
				 commit('SET_RECO_LIST',recoList)
				 state.audio.src = $url + '/adminspa/File/readFile?filename=' +crmShow.sesrec+'&access_token='+access_token;	
			 })
		 })
	 }
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}