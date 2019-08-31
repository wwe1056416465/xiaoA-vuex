<template>
	<view class="content">
		<view class="form">
			<form @submit="formSubmit" @reset="formReset">
				<!-- 选择子账号 -->
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db">
							<picker @change="choose_account" :value="index2" :range="array2">
								<view class="uni-input uni-navigate-bottom">{{ array2[index2] }}</view>
							</picker>
						</view>
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
				<!-- 选择状态 -->
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db">
							<picker @change="change_status" :value="index3" :range="array3">
								<view class="uni-input uni-navigate-bottom">{{ array3[index3] }}</view>
							</picker>
						</view>
					</view>
				</view>
				<!-- 搜索主叫号或者被叫号 -->
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db"><input class="uni-input" placeholder="主叫号码或者被叫号码" v-model="jobname" /></view>
					</view>
				</view>
				<!-- 选择客户分类 -->
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-db">
							<input class="uni-input" v-model="customerType" disabled="disabled" placeholder="请选择客户分类" @click="togglePopup('middle-list')" />
						</view>
					</view>
				</view>
				<!-- 弹出层=>分类选择 -->
				<uni-popup :show="type === 'middle-list'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
					<!-- 						<view class="uni-list-item" v-for="(item, index) in list" :key="index">
							滚动列表数据 {{ item }}
						</view> -->
					<view class="lay-container">
						<checkbox-group @change="checkboxChange">
							<label class="uni-list-cell uni-list-cell-pd border-bottom-1" v-for="item in items" :key="item.value">
								<view class="popup-name">{{ item.name }}</view>
								<view><checkbox :value="item.value" :checked="item.checked" /></view>
							</label>
						</checkbox-group>
					</view>
					<view class="lay-button display-flex">
						<view @click="confirm" class="lay-btn confirme">确定</view>
						<view @click="cencel" class="lay-btn cencel">取消</view>
					</view>
				</uni-popup>
				<!-- 选择开始时间 -->
				<view class="datesearch margin-b30">
					<view class="uni-list " style="margin: 0;">
						<view class="uni-list-cell addcell">
							<view class="uni-list-cell-left" style="padding: 0 20upx;">开始</view>
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
				<!-- 点击搜索更多查询条件 -->
				<view v-if="isshow">
					<view class="datesearch">
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
					<!-- 选择性别 -->
					<view class="uni-list">
						<view class="uni-list-cell addcell">
							<view class="uni-list-cell-db">
								<picker @change="choose_sex" :value="index4" :range="array4">
									<view class="uni-input uni-navigate-bottom">{{ array4[index4] }}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="datesearch margin-b30">
						<!-- 最大分值 -->
						<view class="uni-list " style="margin: 0;">
							<view class="uni-list-cell addcell">
								<view class="uni-list-cell-db"><input class="uni-input" placeholder="分值≤" /></view>
							</view>
						</view>
						<view class="line">—</view>
						<!-- 最小分值 -->
						<view class="uni-list" style="margin: 0;">
							<view class="uni-list-cell addcell">
								<view class="uni-list-cell-db"><input class="uni-input" placeholder="分值≥" /></view>
							</view>
						</view>
					</view>
					<view class="datesearch">
						<!-- 最大问题互动次数 -->
						<view class="uni-list " style="margin: 0;">
							<view class="uni-list-cell addcell">
								<view class="uni-list-cell-db"><input class="uni-input" placeholder="问题互动次数≤" /></view>
							</view>
						</view>
						<view class="line">—</view>
						<!-- 最小问题互动此时 -->
						<view class="uni-list" style="margin: 0;">
							<view class="uni-list-cell addcell">
								<view class="uni-list-cell-db"><input class="uni-input" placeholder="问题互动次数≥" /></view>
							</view>
						</view>
					</view>
					<!-- 搜搜标签 -->
					<view class="uni-list">
						<view class="uni-list-cell addcell">
							<view class="uni-list-cell-db"><input class="uni-input" placeholder="搜索标签" /></view>
						</view>
					</view>
					<view class="show_bottom text_center">最多可查阅一个月的数据</view>
				</view>
				<view v-if="!isshow" class="show" @click="changeShow">展开更多搜索</view>
				<view v-if="isshow" class="show" @click="changeShow">收起更多搜索</view>
				<view><button type="primary" class="savebutton" @click="search">保存</button></view>
			</form>
			<view style="height: 60px;"></view>
		</view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import moment from '@/common/moment.min.js';
import ajax from '../../common/api.js'
export default {
	components: {
		uniPopup
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			array: [],
			index: 0,
			title1: 'checkbox',
			items: [
				{ value: 'A', name: 'A' },
				{ value: 'B', name: 'B', checked: 'true' },
				{ value: 'C', name: 'C' },
				{ value: 'D', name: 'D' },
				{ value: 'E', name: 'E' },
				{ value: 'F', name: 'F' },
				{ value: '', name: '无' }
			],
			array2: [],
			index2: 0,
			array3: ['请选择状态', '未读', '已读'],
			index3: 0,
			array4: ['请选择性别', '男', '女', '未识别'],
			index4: 0,
			isshow: false,
			date: currentDate,
			date2: currentDate,
			type: '',
			customerType: '',
			userids: [],
			userid: '',
			callflowIds: [],
			callflowId: '',
			status: '',
			jobname: '',
			durationeg: '',
			durationel: '',
			sex: '',
			starttimeeg: '',
			starttimeel: ''
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
	onShow() {
		this.getChlidList();
	},
	methods: {
		search() {
			let data = {};
			data['t.useradminid'] = this.userid;
			data['t.callflowid'] = this.callflowId;
			// data['t.status']=this.status
			data['t.duration|egt'] = this.durationeg;
			data['t.duration|elt'] = this.durationel;
			// data['j.jobname|t.callerno|t.calleeno|t.tag|like']=this.jobname
			data['t.starttime|egt'] = this.starttimeeg;
			data['t.starttime|elt'] = this.starttimeel;
			this.$store.commit('crmSearch', data);
			try {
				uni.setStorageSync('sign', 'crmsearch');
				uni.switchTab({
					url: '/pages/tabBar/crm/crm'
				});
			} catch (e) {
				// error
			}
		},
		// 获取子账号
		getChlidList() {
			let reqData= {
					userid: this.$store.state.userInfo.userid,
					access_token: this.$store.state.token
				};
			ajax('/adminspa/member/getchildlist.html',reqData,'GET').then(res=>{
						let array = res.data.data;
					this.array2 = [];
					for (let i = 0; i < array.length; i++) {
						this.array2.push(array[i].username);
						this.userids.push(array[i].userid);
					}
					this.array2.unshift('请选择子账号');
					this.userids.unshift('');
			})

		},

		changeShow: function() {
			this.isshow = !this.isshow;
		},
		project_sn: function(e) {
			this.index = e.target.value;
			this.callflowId = this.callflowIds[this.index];
		},
		choose_account: function(e) {
			this.index2 = e.target.value;
			this.userid = this.userids[this.index2];
			let reqData = {
				useradminid: this.userid,
				access_token: this.$store.state.token,
			};
				ajax('/adminspa/Phone/getUserPhone.html', reqData, 'GET').then(res => {
				console.log(res)
				let array = res.data.data.callflow;
				this.array = [];
				for (let i = 0; i < array.length ; i++) {
					this.array.push(array[i].flowname);
					this.callflowIds.push(array[i].id);
				}
				this.array.unshift('请选择话术模板');
				this.callflowIds.unshift('');
			});
			
		},
		change_status: function(e) {
			this.index3 = e.target.value;
			// 				let stu = this.index3-1
			// 				if(stu===-1){
			// 					this.status='';
			// 				}else{
			// 					this.status=stu.toString()
			// 				}
		},
		choose_sex: function(e) {
			this.index4 = e.target.value;
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
		checkboxChange: function(e) {
			var items = this.items,
				values = e.detail.value;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i];
				if (values.includes(item.value)) {
					this.$set(item, 'checked', true);
				} else {
					this.$set(item, 'checked', false);
				}
			}
		},
		confirm: function(e) {
			let select = this.items;
			let newMessage = [];
			select.map(item => {
				if (item.checked) {
					newMessage.push(item.name);
				}
			});
			this.customerType = newMessage.toString();

			this.type = '';
		},
		cencel: function(e) {
			this.type = '';
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
		togglePopup(type) {
			this.type = type;
		}
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
