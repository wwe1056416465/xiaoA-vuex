<template>
	<view class="content">
		<!-- 
			* 下拉刷新和加载更多组件使用示例
			* 下拉刷新组件仅支持h5和小程序端，app端受限制目前没想到好的实现。
		-->
		<!--
			* 下拉刷新组件
			* @property {Number} top 距离顶部的距离
			* @event {Function} onPulldownReresh 刷新时调用的方法
			* @event {Function} setEnableScroll 设置组件内scroll-view是否允许滚动
		-->
		<mix-pulldown-refresh ref="mixPulldownRefresh" :top="0" @refresh="onPulldownReresh">
			<view class="scroll-wrapper">
				<view class="taskList" v-for="(item, index) in list" :key="index">
					<view class="task_block" @click="showTip(item.id,item.status,item.failurenum)">
						<view class="task_title">
							<view class="text">{{ item.jobname }}</view>
							<view v-show="item.status == 1" class="task_suess bg_stop">待启动</view>
							<view v-show="item.status == 2" class="task_suess bg_blue">正在发送</view>
							<view v-show="item.status == 3" class="task_suess bg_start">暂停发送</view>
							<view v-show="item.status == 4" class="task_suess bg_complete">发送完成</view>
						</view>
						<view class="jindutiao">
							<view class="progress-box"><progress :percent="item.percent" activeColor="#3690FF" active stroke-width="5" style="border-radius: 10px;" /></view>
							<view class="tip">
								进度
								<text>{{ item.completed }}/{{ item.total }}</text>
							</view>
						</view>
						<view class="task_con">
							<view class="starttime">
								<text>开始时间 ：</text>
								<text>{{ item.createddate||'----' }}</text>
							</view>
							<view class="endtime">
								<text>结束时间 ：</text>
								<text>{{ item.finishtime||'----' }}</text>
							</view>
							<view class="user">
								<text>创建人 ：</text>
								<text>{{ item.createdby }}</text>
							</view>
							<view class="child">
								<text>子账号 ：</text>
								<text>{{ item.contactsuffix }}</text>
							</view>
						</view>
					</view>
					<view class="space10"></view>
				</view>
				<!--
					* 上滑加载更多组件
					* @property {Number} status = [0|1|2] 0加载前，1加载中，2没有更多了
				-->
				<mix-load-more :status="loadMoreStatus"></mix-load-more>
			</view>
		</mix-pulldown-refresh>
		<!-- 添加 -->
		<view class="addTack">
			<view class="task_add" @click="task_add">+</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 搜索 -->
		<view class="addTack scerch">
			<view class="task_scerch " @click="task_scerch">&#xe611</view>
		</view>
		<!-- #endif -->
		<!-- 自定义弹出层 -->
		<popup-layer ref="popup" :direction="direction" :page="taskPage" >
			<view class="zidingyi">
				<button class="caozuobtn" data-type="analyze"  @click="caozuobtn">任务分析</button>
				<button class="caozuobtn" data-type="stop"  @click="caozuobtn">暂停任务</button>
				<button class="caozuobtn" data-type="continue"  @click="caozuobtn">继续任务</button>
				<button class="caozuobtn" data-type="failCall"  @click="caozuobtn">失败重呼</button>
				<button class="caozuobtn" data-type="delete" style="color: red;" @click="caozuobtn">删除任务</button>
				<button class="caozuobtn" data-type="cancel" style="margin:10px 0; color: #09BB07;" @click="caozuobtn">取消</button>
			</view>
		</popup-layer>
	</view>
</template>

<script>
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
	import mixLoadMore from '@/components/mix-load-more/mix-load-more';
	import moment from '@/common/moment.min.js';
	import popupLayer from '@/components/popup-layer/popup-layer.vue';
	import {getToken} from '@/utils/auth.js'
	export default {
		components: {
			// 注册成为组件标签
			mixPulldownRefresh,
			mixLoadMore,
			popupLayer
		},
		data() {
			return {
				// loadMoreStatus: this.$store.getters.loadStatus,
				page: 1,
				sign: '',
				requestData: '', //筛选条件
				taskPage: 'task', //页面标识 用于弹出层
				direction: 'top', //弹出层放向
			};
		},
		computed:{
			list(){
				return this.$store.getters.taskList
			},
			loadMoreStatus(){
				return this.$store.getters.loadStatus
			}
		},
		onLoad(){
			this.loadData('refresh')
		},
		onShow(){
			if(this.$store.getters.addTaskFlag){
				this.loadData('refresh')
				this.$store.dispatch('task/setAddTaskFalg',false)
			}
		},
		onNavigationBarButtonTap: function(e) {
			// 跳转到任务搜索
			uni.navigateTo({
				url: '/pages/task/taskSearch'
			});
		},
		onHide() {
			// 隐藏弹出层
			this.$refs.popup.close();
		},
		onReachBottom() {
			//上滑加载
			this.loadData('add');
		},
		methods: {
			// 加载列表
			loadData(type) {
				if (type === 'add') {
					this.$store.dispatch('task/loadMoreStatus',1)
					// this.loadMoreStatus = 1;
				}
				setTimeout(() => {
					if (type === 'refresh') {
						this.$store.dispatch('task/emptyTaskList')//重载任务列表
						this.$store.dispatch('task/clearTaskQuery')//清空任务查询条件
						this.page = 1;
					}
					let data=this.$store.getters.taskQueryCriteria||''
					let	page= this.page
					let	limit= 5
					let	access_token= getToken()
					this.$store.dispatch('task/getTaskInfo',{page,limit,data,access_token}).then(res=>{
						this.page++;
											
					})
					if (type === 'add') {
						// this.loadMoreStatus = 0;
					}else if (type === 'refresh') {
						this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
						// this.loadMoreStatus = 0;
					}
				}, 500);
			},
			// 新增任务
			task_add: function() {
				uni.navigateTo({
					url: '/pages/task/addtask'
				});
			},
			// 查询任务
			task_scerch: function() {
				uni.navigateTo({
					url: '/pages/task/taskSearch'
				});
			},
			// 操作提示层
			caozuobtn: function(event) {
				var taskDirectives = event.target.dataset.type;
				this.$store.dispatch('task/saveTaskDirectives',taskDirectives)//保存当前操作指令
			},
			// 显示提示层
			showTip: function(id, status, fail) {
				this.$refs.popup.show();
				
				let taskId = String(id);
				let taskStatus = String(status);
				let taskFail = String(fail);
				
				this.$store.dispatch('task/saveTaskId',taskId)//保存被操作任务id
				this.$store.dispatch('task/saveTaskStatus',taskStatus)//保存被操作任务原状态
				this.$store.dispatch('task/saveTaskFail',taskFail)//保存被操作任务的失败数量
			},
			//下拉刷新
			onPulldownReresh() {
				this.loadData('refresh');
			}
		}
	};
</script>

<style>
	body.pages-tabBar-crm-crm uni-page-body,
	.content {
		background-color: #ffffff !important;
	}

	page,
	.content {
		background-color: #f8f8f8;
	}

	.newslist {
		padding: 10px;
		line-height: 60px;
		font-size: 28px;
	}

	.loading {
		text-align: center;
		line-height: 80px;
	}

	.task_block {
		padding: 5px 10px;
		color: #404040;
		font-family: 'Helvetica Neue', Helvetica, sans-serif;
	}

	.space10 {
		height: 10px;
		background-color: #f5f5f5;
	}

	.task_title {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #f3f5f7;
		padding: 6px 0;
		font-size: 14px;
	}

	.task {
		padding: 5px 0px;
	}

	view {
		font-size: 12px;
		color: #5e6871;
	}

	.task_title .text {
		font-size: 14px;
		color: #404040;
	}

	.jindutiao {
		display: flex;
		margin-top: 10px;
	}

	.tip {
		width: 82px;
		text-align: right;
		color: #000;
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

	.task_suess {
		padding: 1px 8px;
		color: #fff;
		width: 50px;
		height: 22px;
		line-height: 22px;
		text-align: center;
		border-radius: 5px;
		font-size: 10px;
	}

	.uni-progress {
		border-radius: 10px;
	}

	@font-face {
		font-family: 'iconfont';
		src: url('~@/static/iconfont2.ttf') format('truetype');
	}

	.addTack {
		text-align: center;
		position: fixed;
		right: 5%;
		bottom: 100px;
		z-index: 999;
	}

	.addTack.scerch {
		bottom: 300px;
	}

	.addTack.scerch .task_scerch {
		font-family: iconfont;
		margin-left: 20upx;
		width: 50px;
		text-align: center;
		background-color: #3690ff;
		height: 50px;
		line-height: 50px;
		border-radius: 50%;
		font-size: 20px;
		background: #3690ff;
		box-shadow: 2px 9px 16px rgba(0, 0, 0, 0.15);
		color: #fff;
	}

	.task_add {
		width: 50px;
		text-align: center;
		background-color: #3690ff;
		height: 50px;
		line-height: 50px;
		border-radius: 50%;
		font-size: 25px;
		background: #3690ff;
		box-shadow: 2px 9px 16px rgba(0, 0, 0, 0.15);
		color: #fff;
	}

	.zidingyi {
		padding: 0 10px;
	}

	.zidingyi button:after {
		border: 0;
	}

	.popup-content {
		background: none !important;
	}

	.zidingyi button {
		padding: 16upx 0;
		font-size: 18upx;
		border-radius: 0;
		border-bottom: 1px solid #eeeeee;
	}

	.bg_blue {
		background-color: #3690ff;
	}

	.bg_stop {
		background-color: #ffa748;
	}

	.bg_start {
		background-color: #ffb800;
	}

	.bg_complete {
		color: #fff;
		background-color: #75cd00;
	}

	.taskList {
		background-color: #fff;
	}
</style>
