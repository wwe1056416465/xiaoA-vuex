import {
	reaTqskInfo,
	reqMarkanalysisinfo,
	reqStop,
	reqRestartTask,
	reqRecall,
	reqDeleteM,
	reqAddTask
	} from '@/api/task.js'
const state={
	taskList:[],
	analysisData:{},
	Column:null,
	Ring:null,
	taskId:'',
	taskStatus:'',
	taskDirectives:'',
	taskFail:0,
	taskQueryCriteria:null,
	addTaskFlag:true,
	loadStatus:0
}
const mutations={
	// 存储务列表
	SET_TASKLIST:(state,taskList) => {
		state.taskList=taskList
	},
	// 存储任务分析数据
	SET_ANALYSIS_DATA:(state,analysisData) => {
		state.analysisData=analysisData
	},
	// 存储柱状图配置项
	SET_COLUMN:(state,Column) => {
		state.Column=Column
	},
	// 存储饼图配置项
	SET_RING:(state,Ring) => {
		state.Ring=Ring
	},
	// 重置任务列表
	RESET_TASKLIST:(state) => {
		state.taskList=[]
	},
	// 存储操作任务id
	SAVE_TASKID:(state,taskId) => {
		state.taskId=taskId
	},
	// 存储操作任务状态
	SAVE_TASK_STATUS:(state,taskStatus) =>{
		state.taskStatus=taskStatus
	},
	// 存储操作任务指令
	SAVE_TASK_DIRECTIVES:(state,taskDirectives) => {
		state.taskDirectives=taskDirectives
	},
	// 存储任务失败数量
	SAVE_TASK_FAIL:(state,taskFail) => {
		state.taskFail=taskFail
	},
	// 存储任务列表查询条件
	SAVE_TASK_QUERY:(state,taskQueryCriteria)=>{
		state.taskQueryCriteria=taskQueryCriteria
	},
	SET_ADD_TASK_FLAG:(state,addTaskFlag) => {
		state.addTaskFlag=addTaskFlag
	},
	SET_lOAD_MORE_STATUS:(state,loadStatus) =>{
		state.loadStatus=loadStatus
	},
	CLEAR_TASK_QUERY:(state) =>{
		state.taskQueryCriteria=null
	}
}
const actions={
	// 获取任务首页信息
	getTaskInfo({commit,state},reqData){
		return new Promise((resolve,reject)=>{
			reaTqskInfo(reqData).then(res=>{
				if(res.data.data.length<5){
					state.loadStatus=2
				}
				for (let i = 0; i < res.data.data.length; i++) {
					let percent =res.data.data[i].completed>0?res.data.data[i].completed / res.data.data[i].total:0
					percent = percent * 100;
					percent = percent.toFixed(0);
					res.data.data[i].percent = percent;
				}
				let taskList=state.taskList
				console.log(taskList,'为拼接');
				taskList=taskList.concat(res.data.data)
				console.log(taskList,'已拼接');
				commit('SET_TASKLIST',taskList)
				resolve(res)
			})
		})
	},
	// 清空任务列表
	emptyTaskList({commit}){
		commit('RESET_TASKLIST')
	},
	// 获取任务分析页面数据
	getMarkanalysisinfo({commit,state},reqData){
		return new Promise((resolve,reject)=>{
			reqMarkanalysisinfo(reqData).then(res=>{
				console.log(res,'任务分析数据')
				let analysisData=res.data.data
				commit('SET_ANALYSIS_DATA',analysisData)
				let Column={categories:[],series:[]};
				let barColors=['#3690ff', '#2bbdff', '#ffbf69', '#ff7d7d', '#a1eb3e', '#dcdcdc',  '#ffb50c'];
				// 柱状图
				Column.categories=res.data.data.classify_line.xaxis;
				let barData=res.data.data.classify_line.series;
				let data=[];
				let total=0;
				for(let i=0,len=barData.length;i<len;i++){
					if(barData[i]==0){
						data.push(0);
					}else{
						data.push({"value":barData[i],"color":barColors[i]});				
					};					
					total+=barData[i];
				}
				Column.series=[{"data":data}]
				
				let Ring={series:[]};
				let ringData=res.data.data.classify_cake.series;
				let series=[];
				for(let i=0,len=ringData.length;i<len;i++){
					var ratio
					if(total==0){
						ratio='0%';				
					}else{
						ratio=(ringData[i]['value']/total).toFixed(2);
						ratio=ratio*100+'%';
					}						
					series.push({
						"name":ringData[i]['name'],
						"data":ringData[i]['value'],
						"color":barColors[i],
						"ratio":ratio
					})
				};
				Ring={'series':series}				
				commit('SET_COLUMN',Column)
				commit('SET_RING',Ring)
				resolve(res)
				
			})
		})
	},
	// 保存当前点击任务id
	saveTaskId({commit},taskId){
		commit('SAVE_TASKID',taskId)
	},
	// 保存当前点击任务状态
	saveTaskStatus({commit},taskStatus){
		commit('SAVE_TASK_STATUS',taskStatus)
	},
	// 保存当前任务的失败数量
	saveTaskFail({commit},taskFail){
		commit('SAVE_TASK_FAIL',taskFail)
	},
	// 当前操作任务的指令
	saveTaskDirectives({commit},taskDirectives){
		console.log(taskDirectives,'actions')
		commit('SAVE_TASK_DIRECTIVES',taskDirectives)
	},
	// 保存上拉下拉的显示文本索引
	loadMoreStatus({commit,state},loadStatus){
		commit('SET_lOAD_MORE_STATUS',loadStatus)
	},
	// 暂停任务
	stopTask({commit,state},reqData){
		directivesHandler({commit,state},reqData,reqStop)
	},
	// 继续任务
	restartTask({commit,state},reqData){
		directivesHandler({commit,state},reqData,reqRestartTask)
	},
	// 失败重呼
	recallTask({commit,state},reqData){
		directivesHandler({commit,state},reqData,reqRecall)
	},
	// 删除任务
	deleteMTask({commit,state},reqData){
		return new Promise((resolve,reject)=>{
			reqDeleteM(reqData).then(res=>{
				state.taskList.some((item, index) => {
					if (item.id == reqData['id[]']) {
						state.taskList.splice(index, 1)
					}
				})
				resolve(res)
			})
		})
	},
	// 保存查询条件
	taskQuery({commit},taskQueryCriteria){
		commit('SAVE_TASK_QUERY',taskQueryCriteria)
	},
	// 清空查询条件
	clearTaskQuery({commit}){
		commit('CLEAR_TASK_QUERY')
	},
	// 新增任务
	addTask({commit,state},reqData){
		return new Promise((resolve,reject)=>{
			reqAddTask(reqData).then(res=>{
				console.log(res);
				resolve(res)
			})
		})
	},
	// 设置新建任务成功的标记
	setAddTaskFalg({commit,state},addTaskFlag){
		commit('SET_ADD_TASK_FLAG',addTaskFlag)
	}
}

// 暂停/继续/失败重呼任务处理程序
function directivesHandler({commit,state},reqData,reqHandler){
	const {id,access_token,newStatus}=reqData
	return new Promise((resolve,reject)=>{
		reqHandler({id,access_token}).then(res=>{
			state.taskList.some(item=>{
				if(item.id==id){
					item.status = newStatus;
				}
			})
			resolve(res)
		})
	})
}
export default{
	namespaced: true,
	state,
	mutations,
	actions
}
