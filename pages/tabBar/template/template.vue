<template>
	<view class="content">
		<view v-if="userType===4">
			<view class="" v-for="(item, index) in tem_list" :key="index" >
				<view class="task_block" @click="showtem(item.callflowid,item.industryid,item.useradminid,item.totalFile,item.totalRecordFile,item.unRecordFile)">
					<view class="call_top">
						<view class="task_title">
							<view class="text">{{ item.flowname }}</view>
						</view>
						<view class="call_stutas text_dg"  v-show="item.isComplete=='未完成'">{{item.isComplete}}</view>
						<view class="call_stutas text_gr"  v-show="item.isComplete=='已完成'">{{item.isComplete}}</view>
					</view>
					<view class="call_bottom">
						<view class="task_con">
							<view class="starttime">
								<text>开始时间 ：</text>
								<text>{{ item.createddate }}</text>
							</view>
						</view>
						<view class="call_per">进度<text>{{item.percent}}</text></view>
					</view>
				</view>
				<view v-show="index != tem_list.length - 1" class="space10"></view>
			</view>
		</view>
		<view class="tem_no_list" v-else>
			<image src="../../../static/img/tip@2x.png"></image>
			<view class="h3" style="text-align: center;">非子账号不能查看该录音模块</view>
			
      </view>
	</view>
</template>

<script>
	import moment from '@/common/moment.min.js';
	import {getToken,yh_getStorage} from '@/utils/auth.js'
	import ajax from '../../../common/api.js'
	export default {
		data() {
			return {
				userType:0
			};
		},
		computed:{
			tem_list(){
				if(this.userType===4){
					return this.$store.getters.rprocessList
				}	
			}
		},
		onShow() {
			this.userType=yh_getStorage('usertype')
			// 调用获取列表数据
			// if(this.userType===4){
			// 	let data={
			// 		isApplet:"1"
			// 	} 
			// 	 data= JSON.stringify(data)
			// 	let access_token=getToken()
			// 	this.$store.dispatch('recording/getRprocessList',{data,access_token}).then(res=>{
			// 		this.tabtip();
			// 	})
			// }
		},
		onTabItemTap(e) {
				if(this.userType===4&&e.index==3){
				let data={
					isApplet:"1"
				} 
				 data= JSON.stringify(data)
				let access_token=getToken()
				this.$store.dispatch('recording/getRprocessList',{data,access_token}).then(res=>{
				
						this.tabtip();
					
					
				})
			}
		
		},
		methods: {
			//tab切换提示
			tabtip(){
				let flag= this.tem_list.some(item=>item.isComplete=='未完成')
				if(flag){
					uni.showModal({
						title: '提示',
						content: '你还有未完成的录音 !',
						showCancel: false,				
						confirmText:'知道了',
						confirmColor:'#3690ff',
						
						success: res => {
							if (res.confirm) {
							} else if (res.cancel) {
							
							}
							
						}
					});
				}				
			},
			// 跳转到机器人流程目录
			showtem(id, industryid, useradminid,totalFile,totalRecordFile,unRecordFile) {
				uni.navigateTo({
					url: '/pages/template/template?callflowid=' + id + '&industryid=' + industryid + '&useradminid=' + useradminid+'&totalFile=' + totalFile+'&totalRecordFile=' + totalRecordFile+'&unRecordFile=' + unRecordFile
				});
			},
		
		}
	};
</script>

<style>
	page,
	.content {
		background-color: #f5f5f5 !important;
		position: relative;
		height: 100%;
	}
	.tem_no_list{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.tem_no_list image{
		width: 262px;
		min-height: 150px;
	}
	.newslist {
		padding: 10px;
		line-height: 60px;
		font-size: 28px;
	}
	.task_block {
		padding: 5px 10px;
		font-family: 'Helvetica Neue', Helvetica, sans-serif;
		background-color: #fff;
	}

	.space10 {
		height: 10px;
		background-color: #f5f5f5;
	}

	.task_title {
		display: flex;
		justify-content: space-between;
		padding: 6px 0;
		font-size: 14px;
		width: 80%;
	}

	.task {
		padding: 5px 0px;
	}

	view {
		font-size: 12px;
		color: #3c3c3c;
	}

	.task_title .text {
		font-size: 14px;
	}

	.tip {
		width: 82px;
		text-align: right;
		color: #3C3C3C;
		font-size: 13px;
		margin-right: 10px;
	}

	.progress-box {
		flex: 1;
		margin-top: 8px;
	}

	.task_con view {
		margin: 5px 0;
	}
	.call_stutas {
		width: 65px;
		border-radius: 3px;
		text-align: center;
		color: #fff;
		margin: 6px 0;
		height: 25px;
		line-height: 25px;
	}
	.call_per{
		margin: 5px 0;
		color: #000;
	}
	.call_per text{
		margin:0 4px;
	}
	.call_top,.call_bottom{
		display: flex;
		justify-content: space-between;
		align-items:center
	}
	.text_gr{
		background-color: #75CD00;
	}
	.text_dg{
		background-color: #FFA648;
	}
</style>
