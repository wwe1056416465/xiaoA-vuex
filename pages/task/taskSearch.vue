<template>
	<view class="content">
		<view class="form">
			<form @submit="formSubmit" @reset="formReset">
				<!-- 子账号 -->
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db">
							<picker @change="choose_account" :value="index2" :range="array2">
								<view class="uni-input uni-navigate-bottom">{{ array2[index2] }}</view>
							</picker>
						</view>
					</view>
				</view>
				<!-- 搜索任务名称 -->
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db"><input class="uni-input" name="input" v-model="jobname" placeholder="请输入任务名称" /></view>
					</view>
				</view>
				<!-- 选择话术模板 -->
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db">
							<picker @change="project_sn" :value="index" :range="array">
								<view class="uni-input uni-navigate-bottom">{{ array[index] }}</view>
							</picker>
						</view>
					</view>
				</view>
				<!-- 选择任务状态 -->
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db">
							<picker @change="project_st" :value="index3" :range="array3">
								<view class="uni-input uni-navigate-bottom">{{ array3[index3] }}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="datesearch">
					<view class="uni-list " style="margin: 0;">
						<view class="uni-list-cell addcell">
							<view class="uni-list-cell-left" style="padding: 0 8px;">开始时间</view>
							<view class="uni-list-cell-db">
								<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindstartChange">
									<view class="uni-input" style="padding: 0;">{{ date }}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="line">—</view>
					<view class="uni-list" style="margin: 0;">
						<view class="uni-list-cell addcell">
							<view class="uni-list-cell-left" style="padding: 0 8px;">结束时间</view>
							<view class="uni-list-cell-db">
								<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindendChange">
									<view class="uni-input" style="padding: 0;">{{ date2 }}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view><button type="primary" class="savebutton" @click="search">保存</button></view>
			</form>
			<view style="height: 60px;"></view>
		</view>
	</view>
</template>
<script>
	import {yh_getStorage,getToken} from '@/utils/auth'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				title: 'picker',
				index: 0,
				array3: ['选择任务状态', '待启动', '正在发送', '暂停发送', '发送成功'],
				index2: 0,
				index3: 0,
				date: '',
				date2: '',
				callflowId: '',
				status: ['', 1, 2, 3, 4],
				statu: '',
				userid: '',
				jobname: '',
				starttime: '',
				endtime: ''
			};
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			array2(){
				return this.$store.getters.childrenArray
			},
			array(){
				return this.$store.getters.flownames
			},
			userids(){
				return this.$store.getters.userids
			},
			callflowIds(){
				return this.$store.getters.callflowIds
			}
		},
		onShow() {
			console.log()
			if(this.$store.getters.childrenArray.length===0){
				let userid=yh_getStorage('userid')
				let access_token=getToken()
				// 获取子账号
				this.$store.dispatch('indexInfo/getChildList',{userid,access_token})
			}
		},

		methods: {
			search() {
				this.$store.dispatch('task/emptyTaskList')//重载任务列表
				let data = {}
				data['m.useradminid'] = this.userid
				data['m.jobname|like'] = this.jobname
				data['m.callflowid'] = this.callflowId
				data['m.status'] = this.statu
				data['m.createddate|egt'] = this.starttime
				data['m.createddate|elt'] = this.endtime
				data=JSON.stringify(data)
				let	access_token= getToken()
				let	page= 1
				let	limit= 5
				// 调用查询任务方法
				this.$store.dispatch('task/taskQuery',data)
				this.$store.dispatch('task/getTaskInfo',{page,limit,data,access_token}).then(res=>{
				uni.switchTab({
					url: '/pages/tabBar/task/task'
				})
				})
			},
			// 选择任务模板
			project_sn: function(e) {
				this.index = e.target.value;
				this.callflowId = this.callflowIds[this.index];
			},
			// 选择任务名称
			project_st: function(e) {
				this.index3 = e.target.value;
				this.statu = this.status[this.index3];
			},
			// 选择子账号
			choose_account: function(e) {
				this.index2 = e.target.value;
				this.userid = this.userids[this.index2];
				let	useradminid= this.userid
				let	access_token= getToken()
				this.$store.dispatch('indexInfo/getCallflow',{useradminid,access_token})
			},
			radiowaihu: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			radiotinghu: function(evt) {
				for (let i = 0; i < this.items1.length; i++) {
					if (this.items1[i].value === evt.target.value) {
						this.current1 = i;
						break;
					}
				}
			},
			radiochonghu: function(evt) {
				for (let i = 0; i < this.items2.length; i++) {
					if (this.items2[i].value === evt.target.value) {
						this.current2 = i;
						break;
					}
				}
			},
			bindTextAreaBlur: function(e) {
				console.log(e.detail.value);
			},

			bindstartChange: function(e) {
				this.date = e.target.value;
				this.starttime = this.date + ' 00:00:00';
				console.log(this.starttime);
			},
			bindendChange: function(e) {
				this.date2 = e.target.value;
				this.endtime = this.date2 + ' 23:59:59';
				console.log(this.endtime);
			},
			getDate(type) {
				const date = new Date();

				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			}
		}
	};
</script>
<style>
	.content {
		padding: 30upx;
		font-family: 'Segoe UI', 'Lucida Grande', Helvetica, Arial, 'Microsoft YaHei', FreeSans, Arimo, 'Droid Sans', 'wenquanyi micro hei', 'Hiragino Sans GB', 'Hiragino Sans GB W3',
			FontAwesome, sans-serif;
	}

	.icon-red {
		padding: 0 5upx;
		font-size: 12px;
		color: red;
	}

	.addTack_top {
		font-size: 12px;
		color: #888888;
	}

	.uni-list,
	.uni-textarea {
		background-color: #efefef;
		font-size: 12px;
		margin: 25upx 0;
		padding: 0;
		border-radius: 6px;
	}

	.uni-list::before,
	.uni-list::after,
	.uni-input,
	.uni-list-cell::after {
		background-color: transparent;
	}

	.icon-w {
		padding: 0 5upx;
		font-size: 12px;
		color: transparent;
	}

	.addcell {
		height: 40px;
		line-height: 40px;
	}

	textarea {
		height: 80px;
		padding: 10px 0;
	}

	.uni-radio .uni-radio-input {
		width: 40upx;
		height: 40upx;
	}

	.addradio {
		float: left;
		margin-right: 100upx;
	}

	.textareacell {
		padding: 10px 0;
		-webkit-align-items: initial;
		-ms-flex-align: initial;
		align-items: initial;
	}

	.uni-textarea {
		padding: 0px;
	}

	uni-textarea[data-v-becdca92] {
		padding: 0px;
	}

	.uni-list-cell-db {
		overflow: hidden;
		white-space: nowrap;
	}

	.savebutton {
		background-color: #3690ff;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		border-radius: 30px;
		margin-top: 20px;
	}

	.daoruhaoma view {
		float: left;
		margin-right: 10px;
	}

	.daoruhaoma_text {
		font-size: 12px;
		padding: 0 12px;
		border-radius: 6px 0px 0px 6px;
		background-color: #efefef;
		height: 40px;
		line-height: 40px;
	}

	.addtaskdown {
		height: 38px;
		line-height: 38px;
		font-size: 12px;
		color: #0093e6;
		border: 1px solid #0093e6;
	}

	.daoru {
		height: 38px;
		line-height: 38px;
		font-size: 12px;
		background-color: #3691ff;
		color: #fff;
		border: none;
	}

	.clearfix::before,
	.clearfix::after {
		content: '';
		display: block;
		height: 0;
		line-height: 0;
		visibility: hidden;
		clear: both;
	}

	.datesearch {
		display: flex;
		height: 40px;
	}
</style>
