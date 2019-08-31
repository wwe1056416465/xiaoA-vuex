<template>
	<view class="content">
		<view class="addTack_top">
			<text class="icon-red">*</text>
			为必填项（新建任务仅支持android手机）
		</view>
		<view class="form">
			<form ref="form" @submit="formSubmit" @reset="formReset">
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-left">
							<text class="icon-red">*</text>
							任务名称
						</view>
						<view class="uni-list-cell-db"><input class="uni-input" name="jobname" type="text" placeholder="请输入任务名称" v-model="jobName" /></view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-left">
							<text class="icon-red">*</text>
							选择子账号
						</view>
						<view class="uni-list-cell-db">
							<picker @change="choose_account" :value="index2" :range="array2">
								<view class="uni-input uni-navigate-right">{{ array2[index2] }}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-left">
							<text class="icon-red">*</text>
							输入号码
						</view>
						<view class="uni-list-cell-db"><input class="uni-input" name="calleeno" type="text" placeholder="请输入号码" v-model="calleeno" /></view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-left">
							<text class="icon-red">*</text>
							请选择话术模板
						</view>
						<view class="uni-list-cell-db">
							<picker @change="project_sn" :value="index" :range="array">
								<view class="uni-<strong>input</strong> uni-navigate-right">{{ array[index] }}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-left">
							<text class="icon-red">*</text>
							选择主叫号
						</view>
						<view class="uni-list-cell-db">
							<picker @change="choose_callerno" :value="index3" :range="array3">
								<view class="uni-input uni-navigate-right">{{ array3[index3] }}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-left">
							<text class="icon-red">*</text>
							是否自动外呼
						</view>
						<view class="uni-list-cell-db">
							<radio-group @change="radiowaihu">
								<label class="addradios" v-for="(item, index) in items" :key="item.value">
									<view class="addradio">
										<radio :value="item.value" :checked="index === current" />
										<text>{{ item.name }}</text>
									</view>
								</label>
							</radio-group>
						</view>
					</view>
				</view>
				<view class="uni-list" v-show="current === 1">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<text class="icon-red">*</text>
							定时启动任务
						</view>
						<view class="uni-list-cell-db">
							<ruiDatePicker fields="second" start="2011-12-30 23:59:59" end="2050-12-30 23:59:59" :value="valuetime" @change="bindChange"
							 @cancel="bindCancel"></ruiDatePicker>
						</view>
					</view>
				</view>
				<!-- 			<view class="uni-list">
					<view class="uni-list-cell ">
						<view class="uni-list-cell-left">
							<text class="icon-w">*</text>
							隔天自动停呼
						</view>
						<view class="uni-list-cell-db">
							<radio-group @change="radiotinghu">
								<label class="addradios" v-for="(item, index) in items1" :key="item.value">
									<view class="addradio">
										<radio :value="item.value" :checked="index === current1" />
										<text>{{ item.name }}</text>
									</view>
								</label>
							</radio-group>
						</view>
					</view>
				</view> -->
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-left">
							<text class="icon-w">*</text>
							自动失败重呼
						</view>
						<view class="uni-list-cell-db">
							<radio-group @change="radiochonghu">
								<label class="addradios" v-for="(item, index) in items2" :key="item.value">
									<view class="addradio">
										<radio :value="item.value" :checked="index === current2" />
										<text>{{ item.name }}</text>
									</view>
								</label>
							</radio-group>
						</view>
					</view>
				</view>
				<view class="" v-show="current2 == 0">
					<!-- 选择通话结果 -->
					<view class="uni-list">
						<view class="uni-list-cell ">
							<view class="uni-list-cell-left">
								<text class="icon-w">*</text>
								选择通话结果
								<label class="radio" style="margin-left: 40upx;">
									<text style="display: inline-block;width: 70upx;">全选</text>
									<radio :checked="isAllCheck" @click="AllCheck" />
								</label>
								<view class="result">
									<text class="resultItem" :class="{ active: item.xuanzhong }" @click="checkResult(index)" v-for="(item, index) in results"
									 :key="index" data-code="item.value">
										{{ item.name }}
									</text>
								</view>
							</view>
						</view>
					</view>
					<!-- 重呼次数 -->
					<view class="uni-list">
						<view class="uni-list-cell addcell">
							<view class="uni-list-cell-left">
								<text class="icon-red">*</text>
								重呼次数
							</view>
							<view class="uni-list-cell-db"><input class="uni-input" name="callNum" placeholder="请输入重呼次数" v-model="callNum" /></view>
						</view>
					</view>
					<!-- 重呼间隔-->
					<view class="uni-list">
						<view class="uni-list-cell addcell">
							<view class="uni-list-cell-left">
								<text class="icon-red">*</text>
								重呼间隔
							</view>
							<view class="uni-list-cell-db callNum">
								<input class="uni-input" name="callStep" placeholder="请输入重呼间隔" v-model="callStep" />
								<text @click="toggleUnit">{{ timeUnit }}</text>
							</view>
						</view>
					</view>
				</view>

				<view class="uni-textarea addtextarea">
					<view class="uni-list-cell textareacell">
						<view class="uni-list-cell-left">
							<text class="icon-w">*</text>
							任务描述
						</view>
						<view class="uni-list-cell-db"><textarea placeholder="请输入任务描述" name="taskRamk" v-model="taskRamk" /></view>
					</view>
				</view>
				<view><button type="primary" class="savebutton"  @click="save" >保存</button></view>
			</form>
		</view>
	</view>
</template>
<script>
import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
import moment from '@/common/moment.min.js';
import {yh_getStorage,getToken} from '@/utils/auth.js'
import ajax from '../../common/api.js'
export default {
	components: { ruiDatePicker },
	data() {
		return {
			title: 'picker',
			index: 0,
			index2: 0,
			// 主叫号码索引
			index3: 0,
			// 呼叫结果
			results: [
				{
					value: 104,
					name: '关机',
					xuanzhong: false
				},
				{
					value: 109,
					name: '来电提醒',
					xuanzhong: false
				},
				{
					value: 110,
					name: '稍后再拨',
					xuanzhong: false
				},
				{
					value: 105,
					name: '停机',
					xuanzhong: false
				},
				{
					value: 111,
					name: '关机',
					xuanzhong: false
				},
				{
					value: 104,
					name: '无法接通',
					xuanzhong: false
				},
				{
					value: 108,
					name: '正在通话中',
					xuanzhong: false
				},
				{
					value: 102,
					name: '用户正忙',
					xuanzhong: false
				},
				{
					value: 103,
					name: '用户拒接',
					xuanzhong: false
				},
				{
					value: 112,
					name: '欠费',
					xuanzhong: false
				},
				{
					value: 101,
					name: '无人应答',
					xuanzhong: false
				}
			],
			// 是否自动外呼选项
			items: [
				{
					value: '1',
					name: '是'
				},
				{
					value: '3',
					name: '否'
				}
			],
			// 记录是否自动外呼值
			current: 1,
	
			items2: [
				{
					value: '1',
					name: '是'
				},
				{
					value: '0',
					name: '否'
				}
			],
			// 失败是否自动重呼值
			current2: 1,
			// 全选按钮初始值
			isAllCheck: false,
			// 重呼次数
			callNum: 1,
			// 重呼间隔
			callStep: '',
			// 时间单位
			timeUnit: '分钟',
			// 任务名称
			jobName: '',
			// 选中的话术模板#id
			callflowId: '',
			// 子账号#id
			userid: '',
			// 选中的主叫好
			phone: '',
			// 定时启动时间
			valuetime: '',
			//任务描述
			taskRamk: '',
			// 文件
			file: '',
			// 每个子账号的最大ai数
			mai: '',
			// 呼叫结果
			retrycondition1: '',
			// 呼叫号码
			calleeno: ''
		};
	},
	computed: {	
		// 子账号
		array2(){
			return this.$store.getters.childrenArray
		},
		// 话术模板名称
		array(){
			return this.$store.getters.flownames
		},
		// 话术模板ID
		callflowIds(){
			return this.$store.getters.callflowIds
		},
		// 主叫号
		array3(){
			return this.$store.getters.showPhones
		},
		// 子账号id
		userids(){
			return this.$store.getters.userids
		},
		mais(){
			return this.$store.getters.mais
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
		validate(tipText){
			uni.showModal({
				title: '温馨提示',
				content: tipText,
				showCancel: false,
				confirmText: '确定',
				success: res => {
					if (res.confirm) {
						return;
					}
				}
			});
			
		},
		//保存提交
		save() {
			// 提交前先做数据处理
			let dataInfo = {};
			dataInfo.jobname = this.jobName;
			dataInfo.userid = this.userid;
			dataInfo.calleeno = this.calleeno;
			dataInfo.callflowid = this.callflowId;
			dataInfo.callerno = this.phone;
			dataInfo.description = this.taskRamk;
			dataInfo.access_token = getToken();
			dataInfo.maxobline = this.mai;	
			// 前端验证
			// 是否设置自动外呼
			if (this.items[this.current].value == '3') {
				dataInfo.open = 3;
				// 自动外呼为否时 需要加一个定时启动时间
				let dates = moment(this.valuetime, 'YYYY-MM-DD HH:mm:ss').valueOf();
				let curruntDate = moment(this.getCurrentDate(), 'YYYY-MM-DD HH:mm:ss').valueOf();
				if (dates < curruntDate) {
					this.validate('不能选择比当前时间早的时间')
					return false
				}else{
					dataInfo.timedstart = this.valuetime;
				}
			} else {
				dataInfo.open = 1;
			};
			// 判断是否设置失败自动重呼
			if (this.items2[this.current2].value == 1) {
				dataInfo.autoretry = 1;
				let chooseResultNum = 0;
				let chooseResultCode = '';
				this.results.some(v => {
					if (v.xuanzhong) {
						chooseResultNum += 1;
						chooseResultCode += v.value + ',';
					}
				});
				if (chooseResultNum == 0) {
					this.validate('请至少选择一个通话结果')
					return false
				} else {
					chooseResultCode = chooseResultCode.substring(0, chooseResultCode.length - 1);
					dataInfo.retrycondition1 = chooseResultCode;
				};
				if (!this.callNum) {
					this.validate('请输入重呼次数')
					return false
	
				} else {
					dataInfo.retrytime = this.callNum;
				}
				
				if(!this.callStep){
					this.validate('请输入重呼间隔')
					return false
				}else{
					if (this.timeUnit == '小时') {
						this.callStep = this.callStep * 60 + '';
					}
					dataInfo.retryinterval = this.callStep;
				}
				
			} else {
				dataInfo.autoretry = 0;
			};
			if (!this.jobName || !this.userid || !this.calleeno || !this.callflowId || !this.phone) {
					this.validate('必填项不能为空')
					return false
	
			};
			this.disabled=true
			this.$store.dispatch('task/addTask',dataInfo).then(res=>{
						this.jobName='';
						this.calleeno='';
						this.taskRamk='';
						this.current=1;
						this.current2=1;
						this.callNum=1;
						this.callStep='';
						this.isAllCheck=false;
						this.validate(res.data.msg)
						let access_token=getToken()
						this.$store.dispatch('task/getTaskInfo',{access_token}).then(res=>{
							this.$store.dispatch('task/setAddTaskFalg',true)
						})
						
			})
	
		},
		// 全选
		AllCheck() {
			this.isAllCheck = !this.isAllCheck;
			this.results.some(v => {
				v.xuanzhong = this.isAllCheck;
			});
		},
		// 选择通过结果
		checkResult(index) {
			this.results.some((v, i) => {
				if (i == index) {
					v.xuanzhong = !v.xuanzhong;
				}
			});
		},
		// 切换时间单位
		toggleUnit() {
			if (this.timeUnit == '分钟') {
				this.timeUnit = '小时';
			} else if (this.timeUnit == '小时') {
				this.timeUnit = '分钟';
			}
		},
		// 时间选择器改变时间
		bindChange(value) {
			this.valuetime = value;
		},
		//  时间选择器取消
		bindCancel(value) {
			console.log('激活取消函数');
		},
		// 选择话术模板
		project_sn: function(e) {
			this.index = e.target.value;
			this.callflowId = this.callflowIds[e.target.value];
		},
		// 选则主叫号
		choose_callerno(e) {
			this.index3 = e.target.value;
			this.phone = this.array3[this.index3]||'';
		},
		// 选择子账号
		choose_account: function(e) {
			this.index2 = e.target.value;
			this.userid = this.userids[this.index2];
			this.mai = this.mais[this.index2];
			let	useradminid= this.userid
			let	access_token= getToken()
			// 获取话术模板和主叫号码
			this.$store.dispatch('indexInfo/getCallflow',{useradminid,access_token})
		},
		// 是否自动外呼
		radiowaihu: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
		},
		// 隔天是否自动重呼(暂时未启用)
		radiotinghu: function(evt) {
			for (let i = 0; i < this.items1.length; i++) {
				if (this.items1[i].value === evt.target.value) {
					this.current1 = i;
					break;
				}
			}
		},
		// 是否失败重呼
		radiochonghu: function(evt) {
			for (let i = 0,len=this.items2.length; i <len; i++) {
				if (this.items2[i].value === evt.target.value) {
					this.current2 = i;
					break;
				}
			}
		},
		bindTextAreaBlur: function(e) {
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
		},
		// getCurrentDate获取当前时间
		getCurrentDate() {
			var currentDate = moment().format('YYYY-MM-DD hh:mm:ss');
			return currentDate;
		}
	}
};
</script>
<style>
.content {
	overflow: hidden;
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
uni-textarea {
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
.choose_file {
	float: left;
	width: 38%;
	padding-top: 6px;
}
.choose_file .daoru {
	width: 100%;
	/* 	text-overflow: -o-ellipsis-lastline;overflow: hidden;
	text-overflow: ellipsis;display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical; */
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
.rui-picker.rui-class {
	border: none;
}
.result {
	margin-top: 20upx;
	display: flex;
	flex-wrap: wrap;
	/* 	justify-content: space-between; */
	padding-left: 15upx;
}
.resultItem {
	padding: 0px 5px;
	margin-bottom: 10upx;
	color: #3690ff;
	font-size: 12px;
	margin-right: 5upx;
	border: 1px solid #3690ff;
}
.resultItem sapn {
	line-height: auto;
}
.resultItem.active {
	background-color: #3690ff;
	color: #fff;
}
.callNum {
	display: flex;
	justify-content: space-between;
}
.callNum text {
	line-height: 40px;
	width: 60px;
	text-align: center;
	color: #666;
}
</style>
