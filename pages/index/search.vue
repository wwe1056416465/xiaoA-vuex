<template>
	<view class="content">
		<view class="form">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db ">
							<picker @change="choose_account" :value="index2" :range="array2">
								<view class="uni-input uni-navigate-bottom">{{ array2[index2] }}</view>
							</picker>
						</view>
					</view>
				</view>

				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db">
							<picker @change="project_sn" :value="index" :range="array">
								<view class="uni-input uni-navigate-bottom">{{ array[index] }}</view>
							</picker>
						</view>
					</view>
				</view>

				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db">
							<picker @change="dates" :value="index3" :range="array3">
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
								<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindendChange">
									<view class="uni-input" style="padding: 0;">{{ date2 }}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class="se_remarks">最多可查询一个月的呼出数据统计</view>
				<view><button type="primary" class="savebutton" @click="search">搜索</button></view>
			</form>
			<view style="height: 60px;"></view>
		</view>
	</view>
</template>

<script>
	import moment from '@/common/moment.min.js';
	import {getToken,yh_getStorage} from '@/utils/auth.js'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			});
			const initStart=this.initDate('initStart');
			const initEnd=this.initDate('initEnd')
			return {
				title: 'picker',
				index: 0,
				index2: 0,
				array3: ['昨天', '今天', '近七天', '近30天'],
				index3: 0,
				date: initStart,
				date2: initEnd,
				userid: '',
				callflowId: '',
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
			userids(){
				return this.$store.getters.userids
			},
			array(){
				return this.$store.getters.flownames
			},
			callflowIds(){
				return this.$store.getters.callflowIds
			}
			
		},
		onShow() {
			if(!this.$store.getters.childrenArray){
				let userid=yh_getStorage('userid')
				let access_token=getToken()
				// 获取子账号
				this.$store.dispatch('indexInfo/getChildList',{userid,access_token})
			}
		},
		methods: {
			// 搜索
			search() {
				let data = {}
				data.useradminid = this.userid;
				data.callflowid = this.callflowId;
				data.starttime = this.starttime||moment().subtract(1, 'days').format('YYYY-MM-DD') +' ' +'00:00:00';	
				data.endtime = this.endtime||moment().subtract(1, 'days').format('YYYY-MM-DD') +' ' +'23:59:59';
				// 保存搜索条件
				this.$store.dispatch('indexInfo/saveQueryIndex',data)
				// let access_token=getToken()
				// this.$store.dispatch('indexInfo/getIndexInfo',{data,access_token}).then(res=>{
				// 		uni.switchTab({
				// 		url: "/pages/tabBar/index/index"
				// 	})
				// })
			},
	
			// 选择任务模板
			project_sn: function(e) {
				this.index = e.target.value;
				this.callflowId = this.callflowIds[this.index];
			},
			// 选择子账号
			choose_account: function(e) {
				this.index2 = e.target.value;
				this.userid = this.userids[this.index2];	
				let	useradminid= this.userid
				let	access_token= getToken()
				if(!this.$store.getters.flownames){
					this.$store.dispatch('indexInfo/getCallflow',{useradminid,access_token})
				}
				

			},
			// 时间快捷按钮选择
			dates: function(e) {
				console.log(e)
				this.index3 = e.target.value;
				let start = '00:00:00';
				let end = '23:59:59';
				if (e.target.value == 0 || e.target.value =='') {
					// 昨天
					this.date=moment().subtract(1, 'days').format('YYYY-MM-DD');
					this.date2=moment().subtract(1, 'days').format('YYYY-MM-DD');
					this.starttime =moment().subtract(1, 'days').format('YYYY-MM-DD') +' ' +start;
					this.endtime =moment().subtract(1, 'days').format('YYYY-MM-DD') +' ' +end;
					
				} else if (e.target.value ==1) {
					// 今天
					this.date=moment().format('YYYY-MM-DD');
					this.date2=moment().format('YYYY-MM-DD');
					this.starttime = moment().format('YYYY-MM-DD') + ' ' + start;
					this.endtime = moment().format('YYYY-MM-DD') + ' ' + end;
					
				} else if (e.target.value == 2) {
					// 近七天
					this.date=moment().subtract(6, 'days').format('YYYY-MM-DD');
					this.date2=moment().format('YYYY-MM-DD ');
					this.starttime =moment().subtract(6, 'days').format('YYYY-MM-DD') +' ' +start;
					this.endtime = moment().format('YYYY-MM-DD HH:mm:ss');
					
				} else if (e.target.value ==3) {
					// 近一个月
					this.date=moment().subtract(29, 'days').format('YYYY-MM-DD');
					this.date2=moment().format('YYYY-MM-DD ');
					this.starttime =moment().subtract(29, 'days').format('YYYY-MM-DD') +' ' +start;
					this.endtime = moment().format('YYYY-MM-DD HH:mm:ss');
						
				}
			},
			// 选择开始时间
			bindstartChange: function(e) {
				let start = '00:00:00';
				this.date = e.target.value;
				this.starttime = moment(this.date).format('YYYY-MM-DD') + ' ' + start;
			},
			// 选择结束时间
			bindendChange: function(e) {
				let end = '23:59:59';
				this.date2 = e.target.value;
				this.endtime = moment(this.date2).format('YYYY-MM-DD') + ' ' + end;
			},
			initDate(type){
				let date;
				if(type=="initStart"){
					date=moment().subtract(1, "days").format("YYYY-MM-DD");
				}else if(type=="initEnd"){
					date=moment().subtract(1, "days").format("YYYY-MM-DD");
				}
				return date;
			},
			// 获取当前时间
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 3;
				} else if (type === 'end') {
					year = year + 1;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			}
		}
	}
</script>
<style>
	.content {
		padding: 10upx 30upx;
		font-family: 'Segoe UI', 'Lucida Grande', Helvetica, Arial, 'Microsoft YaHei', FreeSans, Arimo, 'Droid Sans', 'wenquanyi micro hei', 'Hiragino Sans GB', 'Hiragino Sans GB W3',
			FontAwesome, sans-serif;
	}

	.uni-list {
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

	.addcell {
		height: 40px;
		line-height: 40px;
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
		font-size: 16px;
		border-radius: 30px;
		margin-top: 20px;
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

	.line {
		width: 80px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #ddd;
	}

	.se_remarks {
		font-size: 12px;
		margin-top: 20px;
		text-align: center;
		color: #aaa;
	}

	.uni-input {
		font-size: 12px;
	}

	.uni-list-cell-left {
		font-size: 12px;
	}
</style>
