<template>
	<view class="uni-tab-bar">
		<view class="temlist_top">
			<view class="tem_top">
				共<text class="">{{totalFile}}</text>条录音,
				已完成<text class="text_gr">{{totalRecordFile}}</text>条,
				未完成<text class="text_dg">{{unRecordFile}}</text>条
			</view>
			<view class="tabs">
				<view @click="cur=0" :class="{tab_active:cur==0}">主流程</view>
				<view @click="cur=1" :class="{tab_active:cur==1}">问题流程</view>
				<view @click="cur=2" :class="{tab_active:cur==2}">特殊流程</view>
			</view>
			<view class="space10"></view>
			<view class="content" v-show="cur==0">
				<view class="tem_list" @click="tem_List(callflowid,item.contextid)" v-for="(item, index) in templates" :key="index">
					<view class="tem_left">{{item.contextName}}</view>
					<view class="tem_right text_dg" v-show="item.isComplete=='未完成'">{{item.isComplete}}</view>
					<view class="tem_right text_gr" v-show="item.isComplete=='已完成'">{{item.isComplete}}</view>
				</view>
			</view>
			<view class="content" v-show="cur==1">
				<view v-for="(item, index) in qustions" :key="index">
					<view class="tem_list" @click="tem_questions(item.id,item.callflowid,index,item.type)" >
						<view class="tem_left">{{item.name}}</view>
					<view class="tem_right text_dg" v-show="item.isComplete=='未完成'">{{item.isComplete}}</view>
					<view class="tem_right text_gr" v-show="item.isComplete=='已完成'">{{item.isComplete}}</view>
					</view>
				</view>						
			</view>		
			<view class="content" v-show="cur==2">
				<view class="tem_list" @click="tem_specli(item.id,item.callflowid,index,item.type)" v-for="(item, index) in stuTem" :key="index">
					<view class="tem_left">{{item.name}}</view>
					<view class="tem_right text_dg" v-show="item.isComplete=='未完成'">{{item.isComplete}}</view>
					<view class="tem_right text_gr" v-show="item.isComplete=='已完成'">{{item.isComplete}}</view>
				</view>						
			</view>
		</view>
		<view class="temlist_bottom">
			<view @click="audit()">提交审核</view>
			<view @click="Jverify()">审核列表</view>
		</view>
	</view>
</template>
<script>
import mediaList from '@/components/tab-nvue/mediaList.vue';
import {getToken} from '@/utils/auth.js'
import {reqUpvoice} from '@/api/recording.js'
import ajax from '../../common/api.js'
export default {
	data() {
		return {
			cur:0,
			// templates:{},
			callflowid:'',
			// stuTem:[],
			// qustions:{},
			nodename:'',
			audiolen:'',
			audiotype:'',
			totalFile:'',
			totalRecordFile:'',
			unRecordFile:''
		}
	},
	computed:{
		templates(){
			return this.$store.getters.mainFlowList
		},
		qustions(){
			return this.$store.getters.qustionFlowList
		},
		stuTem(){
			return this.$store.getters.specialFlowList
		}
	},
	// 获取参数
	onLoad(option) {
		this.callflowid=option.callflowid;
		this.industryid=option.industryid;
		this.useradminid=option.useradminid;
		this.totalFile=option.totalFile;
		this.totalRecordFile=option.totalRecordFile;
		this.unRecordFile=option.unRecordFile;
		
	},
	onShow() {
	
		let callflowid=this.callflowid
		let isApplet='1'
		let access_token=getToken()
		let data={isApplet:"1"}
		data=JSON.stringify(data)
		// this.gettemInfo();
		this.$store.dispatch('recording/getMainFlow',{callflowid,isApplet,access_token})
		// this.getquestion();
		this.$store.dispatch('recording/getQuestions',{callflowid,data,access_token})
		// this.getspecil();
		this.$store.dispatch('recording/getSpecil',{callflowid,data,access_token})
		
	},
	methods: {
		//跳转到审核列表
		Jverify(){
			uni.navigateTo({
				url:'/pages/template/tem_verify/tem_verify?callflowid='+this.callflowid+'&useradminid='+this.useradminid
			})	
		},
		//提交审核
		audit(){
			uni.showModal({
				title:'提交审核',
				content: '只对节点中语音文本为待审核及审核失败的录音提交审核。确定提交审核吗?',
				confirmText:'确定',
				confirmColor:'#3690ff',
				success: res => {
					if (res.confirm) {
						// 确定提交审核
						let	isApplet='1'
						let	status=2
						let	action='checkall'
						let	callflowid=this.callflowid
						let	access_token= getToken()
								
						reqUpvoice({isApplet,status,action,callflowid,access_token}).then(res=>{
								this.tip('已成功提交审核，请等待审核结果！')
						})
					} 
					// else if (res.cancel) {
					// }		
				}
			});
		},
		tip(tipText){
			uni.showModal({
				content: tipText,
				confirmText:'知道了',
				confirmColor:'#3690ff',
				showCancel: false,	
				success: res => {
					// if (res.confirm) {
					// 	
					// } else if (res.cancel) {
					// 
					// }
				}
			})
		},
		//主流程列表
	// 	gettemInfo() {
	// 		let reqData={
	// 				callflowid:this.callflowid,
	// 				isApplet:'1',
	// 				access_token: this.$store.state.token
	// 			};
	// 		ajax('/adminspa/rprocess/getBasicNodeLevel',reqData).then(res=>{
	// 				this.templates = res.data.data;
	// 		})
	// 
	// 	},
		//问题流程列表
// 		getquestion(){
// 			var datas={
// 				isApplet:"1"
// 			};
// 			let reqData={	
// 					data: JSON.stringify(datas),
// 					access_token:getToken()
// 				};
// 			ajax('/adminspa/questions/index?callflowid='+this.callflowid+'&type=2',reqData).then(res=>{
// 				console.log(res,res.data.data,'原问题流程属性')
// 					this.nodename= res.data.data.name
// 					for(let i = 0;i<res.data.data.length;i++){
// 						res.data.data[i].pages=i;
// 					}
// 					this.qustions = res.data.data;
// 					uni.setStorageSync('nodename', this.nodename);
// 					uni.setStorageSync('totalB',res.data.data.length)
// 			})
// 
// 		},
		//特殊流程列表
		// getspecil(){
		// 	var datas={
		// 		isApplet:"1"
		// 	};
		// 	let reqData={
		// 			data: JSON.stringify(datas),
		// 			access_token: this.$store.state.token
		// 		};
		// 	ajax('/adminspa/special/index?callflowid='+this.callflowid+'&type=3',reqData).then(res=>{
		// 			let arr=res.data.data;
		// 			this.stuTem=[];
		// 			for(let i = 0; i < arr.length; i++){
		// 				res.data.data[i].name=arr[i].name
		// 				res.data.data[i].pages=i;
		// 			}
		// 			this.stuTem=res.data.data
		// 			uni.setStorageSync('totalC',res.data.data.length)
		// 	})
		// },
		//语境跳转到节点页
		tem_List(callid,contextid){
			uni.navigateTo({
				url:'/pages/template/temlist/temlist?callflowid='+callid+"&contextid="+contextid
			})	
		},
		//问题流程跳转到录音
		tem_questions(id,callflowid,pages,type){
			uni.navigateTo({
				url:'/pages/template/tem_detial/tem_de?id='+id+'&callflowid='+this.callflowid+'&pages='+pages+'&type=2'
			})
		},
		//特殊流程跳转到录音
		tem_specli(id,callflowid,pages,type){
			uni.navigateTo({
				url:'/pages/template/tem_detial/tem_de?id='+id+'&callflowid='+this.callflowid+'&pages='+pages+'&type=3'
			})

		},
	},
	
};
</script>

<style>
	page{
		background-color: #f5f5f5 !important;
		
	}
	view{
		font-size: 14px;
	}
.uni-tab-bar-loading {
	text-align: center;
	font-size: 28upx;
	color: #999;
}
.swiper-tab-list {
	width: 50%;
	padding: 10px 0;
}
.swiper-tab-list.active {
	border-bottom: 2px solid #007aff;
}

.tem_top{
	text-align: center;
	padding: 10px ;
	background-color: #fff;
	border-bottom: 1px solid #f5f5f5;
}
.tem_top text{
	margin: 0px 3px;
}
.space10 {
	background-color: #f5f5f5;
	padding: 5px;
}
.num1{
	color: #47c577;
	font-size: 14px;
	margin: 0 5px;
}
.num2{
	color: #ff0000;
	font-size: 14px;
}
.tem_list{
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #f1f1f1;
	padding: 15px;
}
.tem_list view{
	font-size: 12px;
}
.text_gr{
	color: #75CD00;
}
.text_dg{
	color: #FFA648;
}
.tabs{
	display: flex;
	justify-content: space-between;
	background-color: #fff;
}
.tabs view{
	text-align: center;
	width: 100%;
	padding: 10px;
}
.tab_active{
	border-bottom: 3px solid #3690ff;
	color: #3690ff;
}
.temlist_top{
	margin-bottom: 40px;
}
.temlist_bottom{
	display: flex;
	justify-content: space-between;
	position: fixed;
	bottom: 0;
	width: 100%;
}
.temlist_bottom view{
	background-color: #fff;
	text-align: center;
	font-size: 14px;
	border: none;
	width: 100%;
	border-radius: 0;
	height: 40px;
	line-height: 40px;
	font-size: 15px;
	font-weight: 600;
	border-top: 1px solid #eee;
}
.temlist_bottom view:nth-child(1){
	border-right: 1px solid #eee;
}
.content{
	background-color: #fff;
}
</style>
