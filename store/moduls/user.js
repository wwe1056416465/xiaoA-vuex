import {login,logout,reqInitdata,reqUserInfo} from '@/api/user.js'
import {setStorageSync,getToken,removeToken,yh_removeStorage} from '@/utils/auth.js'
import  data from "@/utils/demo.js"

const state = {
  token: getToken(),
  userInfo:null
}

const mutations = {
  SET_TOKEN: (state, access_token) => {
    state.access_token = access_token
  },
  SET_USERINFO:(state,userInfo) => {
	  state.userInfo=userInfo
  }
}

const actions={
	// 登入
	login({commit},usrInfo){
		return new Promise((resolve, reject)=>{
			login(usrInfo).then(res=>{
				const {data}=res.data
				commit('SET_TOKEN',data.access_token)
				setStorageSync('access_token',data.access_token)
				resolve(res)
			}).catch(err=>{
				reject(err)
			})
		})
	},
	// 登出
	logout({commit,state}){
		return new Promise((resolve,reject)=>{
			logout(getToken()).then(res=>{
				resolve(res)
				removeToken()
				yh_removeStorage('usertype')
				commit('SET_TOKEN','')
				uni.navigateTo({
					url: '/pages/login/login'
				});
			})
		})
	},
	// 初始化信息
	getinitdata({dispatch,state},reqData){
		return new Promise((resolve,reject)=>{
			reqInitdata(reqData).then(res=>{
				console.log('没有找到回来找')
				const {userid,useradminid,username}=res.data.data
				setStorageSync('userid',userid)
				const access_token=state.access_token||getToken()
				dispatch('getUserInfo',{userid,access_token,useradminid,username})
				resolve(res)
			})
		})
	},
	// 用户信息
	getUserInfo({commit,state},data){
		return new Promise((resolve,reject)=>{
			const {userid,access_token}=data
			reqUserInfo({userid,access_token}).then(res=>{
				const {consumer,endtime,mn_ai,usertype}=res.data.data
				const userInfo=Object.assign({},data,{consumer,endtime,mn_ai})
				setStorageSync('usertype',usertype)
				commit('SET_USERINFO',userInfo)
			})
			
		})
	},
	
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}