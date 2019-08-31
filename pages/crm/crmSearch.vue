<template>
	<view class="content">
		<view class="form">
			<form @submit="formSubmit" @reset="formReset">
			
			
				<!-- 搜索任务名称 -->
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db"><input class="uni-input" placeholder="任务名称" v-model="jobname" /></view>
					</view>
				</view>
				<!-- 搜索主叫号或者被叫号 -->
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db"><input class="uni-input" placeholder="主叫号码或者被叫号码" v-model="callerno" /></view>
					</view>
				</view>
				<!-- 搜索通话编号 -->
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db"><input class="uni-input" placeholder="通话编号" v-model="callid" /></view>
					</view>
				</view>
				<!-- 选择呼叫类型 -->
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db">
							<picker @change="change_call_type" :value="index1" :range="array1">
								<view class="uni-input uni-navigate-bottom">{{ array1[index1] }}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="datesearch margin-b30">
					<!-- 最大通话时长 -->
					<view class="uni-list " style="margin: 0;">
						<view class="uni-list-cell addcell">
							<view class="uni-list-cell-db"><input class="uni-input" placeholder="通话时长≤" v-model="durationeg" /></view>
						</view>
					</view>
					<view class="line">—</view>
					<!-- 最小通话时长 -->
					<view class="uni-list" style="margin: 0;">
						<view class="uni-list-cell addcell">
							<view class="uni-list-cell-db"><input class="uni-input" placeholder="通话时长≥" v-model="durationel" /></view>
						</view>
					</view>
				</view>
				<!-- 选择开始时间 -->
				<view class="datesearch margin-b30">
					<view class="uni-list " style="margin: 0;">
						<view class="uni-list-cell addcell">
							<view class="uni-list-cell-left" style="padding: 0 20upx;">开始时间</view>
							<view class="uni-list-cell-db">
								<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindstartChange">
									<view class="uni-input" style="padding: 0;">{{ date }}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="line">—</view>
					<!-- 选择结束时间 -->
					<view class="uni-list" style="margin: 0;">
						<view class="uni-list-cell addcell">
							<view class="uni-list-cell-left" style="padding: 0 20upx;">结束时间</view>
							<view class="uni-list-cell-db">
								<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindendChange">
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
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import moment from '@/common/moment.min.js';
import {getToken} from '@/utils/auth.js'
import ajax from '../../common/api.js'
export default {
	components: {
		uniPopup
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		const initStart=this.initDate('initStart');
		const initEnd=this.initDate('initEnd');
		return {
			index1:0,//呼叫类型索引值
			array1:['请选择呼叫类型', '呼出','呼入'],
			date: initStart,//开始时间初始化
			date2: initEnd,//结束时间初始化
			jobname: '',//任务名称
			durationeg: '',//最小通话时长
			durationel: '',//最大通话时长
			starttimeeg: initStart+' 00:00:00',//开始时间
			starttimeel: initEnd+' 23:59:59',//结束时间
			callerno:'',//主叫号或者被叫好
			callid:'',//通话编号
			calltype:'',//呼叫类型
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods: {
		search() {
			this.$store.dispatch('crm/emptyCrmList')//重载crm列表
			let data = {};
			data['j.jobname|like'] = this.jobname;
			data['t.callerno|t.calleeno|like'] = this.callerno;
			data['t.callid'] = this.callid;
			data['t.calltype'] = this.calltype;
			data['t.duration|egt'] = this.durationeg;
			data['t.duration|elt'] = this.durationel;
			data['t.starttime|egt'] = this.starttimeeg;
			data['t.starttime|elt'] = this.starttimeel;
			data=JSON.stringify(data)
			let	access_token= getToken()
			let	page= 1
			let	limit= 5
			this.$store.dispatch('crm/crmQuery',data)
			this.$store.dispatch('crm/getCrmHistory',{page,limit,data,access_token}).then(res=>{
				if(res.data.data.length < 5){
					this.$store.dispatch('task/loadMoreStatus',2)
				}
				uni.switchTab({
					url: '/pages/tabBar/crm/crm'
				})
			})
		},
		change_call_type: function(e) {
			this.index1 = e.target.value;
			if(this.index1==0){
				this.calltype='';
			}else{
				this.calltype=this.index1;
			}
			
		},

		bindstartChange: function(e) {
			let start = '00:00:00';
			this.date = e.target.value;
			this.starttimeeg = moment(this.date).format('YYYY-MM-DD') + ' ' + start;
		},
		bindendChange: function(e) {
			let end = '23:59:59';
			this.date2 = e.target.value;
			this.starttimeel = moment(this.date2).format('YYYY-MM-DD') + ' ' + end;
		},
		initDate(type){
			let date;
			if(type=="initStart"){
				date=moment().subtract(10, "days").format("YYYY-MM-DD");
			}else if(type=="initEnd"){
				date=moment().subtract(0, "days").format("YYYY-MM-DD");
			}
			return date;
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
			if (type === 'start') {
				year = year - 1;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
	
	}
};
</script>
<style scoped>
@import '../../common/uni.css';
.curr-pointer {
	cursor: pointer;
}
.display-flex {
	display: flex;
}
.content {
	padding: 30upx;
	font-family: 'Segoe UI', 'Lucida Grande', Helvetica, Arial, 'Microsoft YaHei', FreeSans, Arimo, 'Droid Sans', 'wenquanyi micro hei', 'Hiragino Sans GB', 'Hiragino Sans GB W3',
		FontAwesome, sans-serif;
}
.padding-left-10 {
	padding-left: 10upx;
}
.show {
	text-align: center;
	color: #0093e6;
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
.datesearch {
	display: flex;
	height: 40px;
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
.show_bottom {
	font-size: 16upx;
	color: #bebebe;
	margin: 40upx;
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

page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	background-color: #fff;
}

view {
	font-size: 28upx;
	line-height: inherit;
}

.example {
	padding: 0 30upx 30upx;
}

.example-title {
	font-size: 32upx;
	line-height: 32upx;
	color: #777;
	margin: 40upx 25upx;
	position: relative;
}

.example .example-title {
	margin: 40upx 0;
}

.example-body {
	padding: 0 40upx;
}

.uni-padding-wrap {
	padding: 0 30upx;
}

button {
	margin: 20upx 0;
}

.uni-helllo-text {
	height: 100upx;
	line-height: 100upx;
	text-align: center;
}

.center-box {
	width: 500upx;
	height: 500upx;
}

.uni-list-item {
	text-align: left;
	line-height: 80upx;
	border-bottom: 1px #f5f5f5 solid;
}

.uni-list-item:last-child {
	border: none;
}

.center-box .image {
	width: 100%;
	height: 100%;
}

.bottom-title {
	line-height: 60upx;
	font-size: 24upx;
	padding: 15upx 0;
}

.bottom-content {
	display: flex;
	flex-wrap: wrap;
	padding: 0 35upx;
}

.bottom-content-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 15upx;
	width: 25%;
	box-sizing: border-box;
}

.bottom-content-image {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90upx;
	height: 90upx;
	overflow: hidden;
	background: #007aff;
	border-radius: 10upx;
}

.bottom-content-text {
	font-size: 26upx;
	color: #333;
	margin-top: 10upx;
}

.bottom-btn {
	height: 90upx;
	line-height: 90upx;
	border-top: 1px #f5f5f5 solid;
}

.bottom-content-image.wx {
	background: #00ce47;
}

.bottom-content-image.qq {
	background: #00b6f6;
}

.bottom-content-image.sina {
	background: #ff766a;
}

.bottom-content-image.copy {
	background: #07ccd0;
}

@font-face {
	font-family: 'iconfont';
	/* project id 1028200 */
	src: url('https://at.alicdn.com/t/font_1028200_47ewtwy4t04.ttf') format('truetype');
}

.icon {
	font-family: 'iconfont';
	font-size: 40upx;
	color: #fff;
}
.border-bottom-1 {
	border-bottom: 1px solid #bebebe;
}
.popup-name {
	width: 300upx;
}
.lay-button {
	width: 100%;
	height: 80upx;
	align-items: center;
}
.lay-btn {
	cursor: pointer;
	flex: 0 0 50%;
	text-align: center;
}
.confirme {
	border-right: 1upx solid #bebebe;
}
.line {
	color: #ddd;
	width: 60px;
	height: 40px;
	line-height: 40px;
	text-align: center;
}
</style>
