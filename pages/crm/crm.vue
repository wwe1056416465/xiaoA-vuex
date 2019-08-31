<template>
	<view class="uni-tab-bar">
		<view class="tabs">
			<view @click="cur=0" :class="{tab_active:cur==0}">客户资料</view>
			<view @click="cur=1" :class="{tab_active:cur==1}">通话结果</view>
			<view @click="cur=2" :class="{tab_active:cur==2}">通话记录</view>
		</view>
		<view class="form content contens1" v-show="cur==0">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-left">姓名 ：</view>
						<view class="uni-list-cell-db"><input class="uni-input" name="input" id="name" v-model="infoShow.name" disabled="true" /></view>
					</view>
				</view>

				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-left">电话 ：</view>
						<view class="uni-list-cell-db phones">
							<input class="uni-input" name="input" disabled="true" id="phone" v-model="infoShow.calleeno" />
							<view class="phone_icon">
								<navigator hover-class="none">
									<image src="../../static/image/call.png"></image>
								</navigator>
								<navigator hover-class="none">
									<image src="../../static/image/msg.png"></image>
								</navigator>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-left">性别 ：</view>
						<view class="uni-list-cell-db">
							<picker @change="sexs" :value="index" :range="array">
								<view class="uni-input">{{ array[index] }}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-left">公司 ：</view>
						<view class="uni-list-cell-db"><input class="uni-input" name="input" disabled="true"  id="unit" v-model="infoShow.company" /></view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell addcell">
						<view class="uni-list-cell-left">地址 ：</view>
						<view class="uni-list-cell-db"><input class="uni-input" name="input" disabled="true" v-model="infoShow.address" /></view>
					</view>
				</view>

				<view class="uni-textarea addtextarea">
					<view class="uni-list-cell textareacell">
						<view class="uni-list-cell-left">任务描述 ：</view>
						<view class="uni-list-cell-db">
							<textarea @blur="bindTextAreaBlur" disabled="true" :value="infoShow.remark" style="font-size: 12px;" />
							</view>
								</view>
							</view>
							<!-- <view>
								<button type="primary" class="savebutton" @click="saveinfo">保存</button>
								<button type="primary" class="savebutton" plain="true">加入黑名单</button>
							</view> -->
						</form>
						<view style="height: 60px;"></view>
					</view>
					
					<view class="content1 contens1"  v-show="cur==1">
						<view class="resultfirst">
							<view class="resultfirst_title">通话结果</view>
							<view class="resultfirst_con">
								<view class="resultfirst_list">
									<text>通话记录ID：</text>
									<text class="text">{{ jcdrShow.callid }}</text>
									<view>(反馈通话问题时，请附带ID)</view>
								</view>
								<view class="resultfirst_list">
									<text>呼出结果：</text>
									<text class="text">{{ jcdrShow.resultstr }}</text>
								</view>
								<view class="resultfirst_list">
									<text>问题互动次数：</text>
									<text class="text">{{jcdrShow.callNum}}</text>
								</view>
								<view class="resultfirst_list">
									<text>接通时间：</text>
									<text class="text">{{ jcdrShow.answertime }}</text>
								</view>
								<view class="resultfirst_list">
									<text>任务名称：</text>
									<text class="text">{{ jcdrShow.jobname }}</text>
								</view>
								<view class="resultfirst_list">
									<text>模板名称：</text>
									<text class="text">{{ jcdrShow.flowname }}</text>
								</view>
								<view class="resultfirst_list">
									<text>创建人：</text>
									<text class="text">{{ jcdrShow.createdby }}</text>
								</view>
								<view class="resultfirst_list">
									<text>子账号：</text>
									<text class="text">{{ jcdrShow.contactsuffix }}</text>
								</view>
							</view>
							<view class="resultfirst_block">
								<view class="block">
									<view class="time_num">{{ jcdrShow.duration }}s</view>
									<view class="time_text">通话时长</view>
								</view>
								<view class="block">
									<view class="time_num">{{ jcdrShow.score }}</view>
									<view class="time_text">分值</view>
								</view>
							</view>
						</view>
						<view class="space10"></view>
						<view class="resultse">
							<view class="resultfirst_title">AI分类</view>
							<view class="resultse_con">
								<view class="resultse_title">如果AI识别不准，您可以手动修改客户分类</view>
								<view class="resultse_block">
									<view :class="{ ai_active: jcdrShow.category == 'A类', pe_active: personC == 'A类' }" @click="person" data-type="A类">A类</view>
									<view :class="{ ai_active: jcdrShow.category == 'B类', pe_active: personC == 'B类' }" @click="person" data-type="B类">B类</view>
									<view :class="{ ai_active: jcdrShow.category == 'C类', pe_active: personC == 'C类' }" @click="person" data-type="C类">C类</view>
									<view :class="{ ai_active: jcdrShow.category == 'D类', pe_active: personC == 'D类' }" @click="person" data-type="D类">D类</view>
									<view :class="{ ai_active: jcdrShow.category == 'E类', pe_active: personC == 'E类' }" @click="person" data-type="E类">E类</view>
									<view :class="{ ai_active: jcdrShow.category == 'F类', pe_active: personC == 'F类' }" @click="person" data-type="F类">F类</view>
								</view>
								<view class="resultse_block2">
									<view class="block2_text">
										<text class="color"></text>
										<text class="text">AI分类</text>
									</view>
									<view class="block2_text">
										<text class="color2"></text>
										<text class="text">人工分类</text>
									</view>
								</view>
								<view class="resultse_tags">
									<view style="width: 60px;">标签：</view>
									<view class="resultse_tag">
										<view class="tag" v-for="(it, i) in jcdrShow.tag" :key="i" v-show="it.length">{{ it }}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="space10"></view>
						<view class="resultse">
							<view class="resultfirst_title">待学习问题</view>
							<view class="resultse_con">
								<view class="resultse_title">本次通话中AI未能回答以下问题</view>
								<!-- <view class="stu_con">
									<text>问题1：</text>
									<text>喂</text>
								</view> -->
							</view>
						</view>
					</view>
					<view class="contens1" v-show="cur==2">
						<view class="resultthir_title">通话记录</view>
						<view>
							<imt-audio ref="child1" v-on:listenToChild="showmsg"  :src="audio.src" :duration="audio.duration"  :control="false"></imt-audio>

							<view class="talks" v-for="(item, index) in recoList" :key="index">
								<view class="msg_item clearfix" v-show="item.username == 'AI'">
									<view class="uface"><image src="../../static/image/user.jpeg"></image></view>
									<view class="item_right">
										<view class="msg">{{ item.content }}</view>
									</view>
								</view>
								<view class="msg_item clearfix" v-show="item.username == '用户'">
									<view class="me_uface"><image src="../../static/image/default.png"></image></view>
									<view class="me_item_right">
										<view class="me_msg" @click="kaiguan(item.rec)">
											{{ item.content }}
											<image src="../../static/image/voice.png" class="videoimg"></image>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
		</view>
</template>
<script>
import mediaList from '@/components/tab-nvue/mediaList.vue';
import imtAudio from '@/components/imt-audio/imt-audio';
import moment from '@/common/moment.min.js';
import {getToken} from '@/utils/auth.js'
import ajax from '../../common/api.js'
const fenduanaudio = uni.createInnerAudioContext(); //创建音频
const $url=uni.getStorageSync('yuming');
export default {
	components: {
		mediaList,
		imtAudio
	},
	data() {
		return {
			// audio: {
			// 		src: '',
			// 		duration: 0
			// 	},
			cur:0,
			current: 0, //当前播放时间
			paused: true, //是否处于暂停状态
			loading: false, //是否处于读取状态
			scrollLeft: 0,
			isClickChange: false,
			tabIndex: 0,
			// crmShow: {},
			// jcdrShow: {},
			// infoShow: {},
			// recoList: [],
			array: ['男', '女', '未识别'],
			personC: '',
			index: 0,
			crmId: '',
			starttime: '',
			calleeno: '',
			jobid: ''
		};
	},
	computed: {
		infoShow() {
			return this.$store.getters.crmInfo 
		},
		audio(){
			return this.$store.getters.audio
		},
		jcdrShow(){
			return this.$store.getters.jcdrShow
		},
		recoList(){
			return this.$store.getters.recoList
		}
	},
	onUnload() {
		fenduanaudio.pause();//暂停分段录音
		this.$refs.child1.stopchild();//暂停全程录音
	},
	// 获取参数
	onLoad(option) {
		this.crmId = option.id;
		var dates = option.date;
		dates = Number(dates);
		this.starttime = moment(dates).format('YYYY-MM-DD HH:mm:ss');
		this.calleeno = option.calleeno;
		this.jobid = option.jobid;
	},
	onShow() {
		let callid= this.crmId
		let date= this.starttime
		let calleeno= this.calleeno
		let jobid= this.jobid
		let access_token=getToken()
		// this.getcrmInfo();
		this.$store.dispatch('crm/getShowInfo',{callid,date,calleeno,jobid,access_token})	
		// this.getJcdrInfo();
		this.$store.dispatch('crm/getJcdrInfo',{callid,date,access_token})
		// this.getsession();
		this.$store.dispatch('crm/getSeeSess',{callid,date,access_token})
	},
	created() {
		fenduanaudio.src = this.src;
		this.current = 0;
		fenduanaudio.obeyMuteSwitch = false;
		fenduanaudio.autoplay = false;
		//音频进度更新事件
		fenduanaudio.onTimeUpdate(() => {
			this.current = fenduanaudio.currentTime;
		});
		//音频播放事件
		fenduanaudio.onPlay(() => {
			this.paused = false;
			this.loading = false;
		});
		//音频暂停事件
		fenduanaudio.onPause(() => {
			this.paused = true;
		});
		//音频结束事件
		fenduanaudio.onEnded(() => {
			this.paused = true;
			this.current = 0;
		});
	},
	watch: {
		//监听音频地址更改
		src(e) {
			audio.src = e;
			this.current = 0;
			audio.play();
			this.loading = true;
		}
	},
	methods: {
		showmsg() {
			console.log('showmsg')
			fenduanaudio.pause();
		},
		//播放/暂停操作
		kaiguan(rec) {
			
			let that=this
			this.$refs.child1.stopchild();
			fenduanaudio.src=$url + 'adminspa/file/readfile.html?filename=' + rec+'&access_token='+this.$store.state.token;
			if (fenduanaudio.paused) { 
				fenduanaudio.play();				
				that.loading = true;
			} else {
				fenduanaudio.pause();
			}			
		},
		// 人工分类
		person(e) {
			if (this.personC === e.target.dataset.type || this.jcdrShow.category == e.target.dataset.type) {
				return;
			} else {
				this.personC = e.target.dataset.type;
			}
		},

		//通话结果
		// getJcdrInfo() {
			// let reqData= {
			// 		callid: this.crmId,
			// 		date: this.starttime,
			// 		access_token: this.$store.state.token
			// 	};
			// ajax('/adminspa/Jcdr/getJcdrInfo',reqData).then(res=>{
			// 	
			// 		let jcdr = res.data.data;
			// 		if(jcdr.tag)jcdr.tag = jcdr.tag.split('|');	
			// 		jcdr.callNum=jcdr.records.length;
			// 		this.jcdrShow = jcdr;
			// 		this.audio.duration=jcdr.duration;
			// })
		// },
		//通话记录
// 		getsession() {
// 			let reqData={
// 					callid: this.crmId,
// 					date: this.starttime,
// 					access_token: this.$store.state.token
// 				};
// 			ajax('/adminspa/Jcdr/seeSess',reqData).then(res=>{
// 					this.crmShow = res.data.data;
// 					this.recoList = res.data.data.record;
// 					this.audio.src = $url + '/adminspa/File/readFile?filename=' + this.crmShow.sesrec+'&access_token='+this.$store.state.token;					
// 			});
// 
// 		},
		// 保存用户资料
		saveinfo() {
			let reqData={
					name: this.infoShow.name,
					phone1: this.infoShow.calleeno,
					company: this.infoShow.company,
					addr: this.infoShow.address,
					access_token: this.$store.state.token
				};
			ajax('/adminspa/Jcdr/saveUinfo',reqData).then(res=>{
					uni.switchTab({
						url: '/pages/tabBar/crm/crm'
					});
			});
	
		},
		sexs: function(e) {
			this.index = e.target.value;
		},
		// tab切换
		async changeTab(e) {
			let index = e.target.current;
			if (this.isClickChange) {
				this.tabIndex = index;
				this.isClickChange = false;
				return;
			}
			let tabBar = await this.getElSize('tab-bar'),
				tabBarScrollLeft = tabBar.scrollLeft;
			let width = 0;

			for (let i = 0; i < index; i++) {
				let result = await this.getElSize(this.tabBars[i].id);
				width += result.width;
			}
			let winWidth = uni.getSystemInfoSync().windowWidth,
				nowElement = await this.getElSize(this.tabBars[index].id),
				nowWidth = nowElement.width;
			if (width + nowWidth - tabBarScrollLeft > winWidth) {
				this.scrollLeft = width + nowWidth - winWidth;
			}
			if (width < tabBarScrollLeft) {
				this.scrollLeft = width;
			}
			this.isClickChange = false;
			this.tabIndex = index; //一旦访问data就会出问题
		},
		getElSize(id) {
			//得到元素的size
			return new Promise((res, rej) => {
				uni.createSelectorQuery()
					.select('#' + id)
					.fields(
						{
							size: true,
							scrollOffset: true
						},
						data => {
							res(data);
						}
					)
					.exec();
			});
		},
		async tapTab(e) {
			//点击tab-bar
			let tabIndex = e.target.dataset.current;

			if (this.tabIndex === tabIndex) {
				return false;
			} else {
				let tabBar = await this.getElSize('tab-bar'),
					tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
				this.scrollLeft = tabBarScrollLeft;
				this.isClickChange = true;
				this.tabIndex = tabIndex;
			}
		}
	}
};
</script>

<style>

.uni-tab-bar-loading {
	text-align: center;
	font-size: 28upx;
	color: #999;
}
.swiper-tab-list {
	width: 33.33%;
	padding: 10px 0;
}
.swiper-tab-list.active {
	border-bottom: 2px solid #007aff;
}
/* 客户资料 */
.phones {
	position: relative;
}
.phone_icon {
	position: absolute;
	top: 0;
	right: 0;
	z-index: 999;
	display: flex;
}
.phone_icon navigator image {
	width: 20px;
	height: 20px;
	margin-left: 20px;
	margin-right: 10px;
	margin-top: 30upx;
}
.uni-swiper-top {
	border-bottom: 1px solid #efefef;
	display: flex;
	justify-content: space-around;
}
.tab_tile {
	font-size: 15px;
	padding: 5px 12px;
}
.active {
	border-bottom: 2px solid #3690ff;
	color: #3690ff;
}
.content {
	padding: 30upx;
	font-family: 'Segoe UI', 'Lucida Grande', Helvetica, Arial, 'Microsoft YaHei', FreeSans, Arimo, 'Droid Sans', 'wenquanyi micro hei', 'Hiragino Sans GB', 'Hiragino Sans GB W3',
		FontAwesome, sans-serif;
}
.uni-list,
.uni-textarea {
	background-color: #efefef;
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
	font-size: 12px;
	height: 40px;
	line-height: 40px;
}
.uni-radio .uni-radio-input {
	width: 40upx;
	height: 40upx;
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
.clearfix::before,
.clearfix::after {
	content: '';
	display: block;
	height: 0;
	line-height: 0;
	visibility: hidden;
	clear: both;
}
uni-swiper {
	display: block;
	height: 1000px;
}
.uni-list-cell-left {
	font-size: 12px;
}
.uni-input {
	font-size: 12px;
}
.uni-textarea uni-textarea {
	padding: 0;
}
/* 通话结果 */
.space10 {
	height: 10px;
	background-color: #f5f5f5;
}
.resultfirst,
.resultse {
	padding: 10px;
}
.resultfirst_title {
	margin: 5px 0;
	font-size: 14px;
}
.resultfirst_list {
	margin: 10px 0;
}
.resultfirst_list text,
.resultfirst_list view {
	font-size: 13px;
}
.resultfirst_list .text {
	color: #5e6871;
}
.resultfirst_block,
.resultse_tags {
	display: flex;
}
.resultfirst_block .block {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	width: 90px;
	height: 90px;
	margin-right: 15px;
	border-radius: 5px;
	background: #f5f5f5;
	text-align: center;
}
.time_num {
	font-size: 20px;
	font-weight: 600;
	color: #3690ff;
}
.time_text {
	font-size: 14px;
	color: #5e6871;
}
.resultse_block {
	display: flex;
	justify-content: space-around;
}
.resultse_block view {
	border: 1px solid #ddd;
	border-radius: 5px;
	width: 100%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	margin: 0 2px;
	font-size: 13px;
}
.resultse_title {
	font-size: 12px;
	color: #999;
	margin: 10px 0;
}
.ai_active {
	background: #3690ff;
	color: #fff;
}
.pe_active {
	background: #ffbe5f;
	color: #fff;
}
.resultse_block2 {
	display: flex;
	margin: 20px 0;
}
.block2_text {
	margin-right: 10px;
}
.block2_text .color,
.block2_text .color2 {
	background-color: #3690ff;
	display: inline-block;
	width: 16px;
	height: 16px;
	border-radius: 2px;
}
.block2_text .color2 {
	background-color: #ffbe5f;
}
.block2_text .text {
	margin: 0 5px;
}
.resultse_tag {
	display: flex;
	flex-wrap: wrap;
	flex: 1;
}
.resultse_tag view {
	background-color: #efefef;
	margin-right: 5px;
	margin-bottom: 10px;
	padding: 1px 6px;
	border-radius: 4px;
}
.stu_con {
	margin: 5px 0;
}
/* 通话记录 */
.msg_item {
	position: relative;
	margin: 20px 0;
}
.uface {
	width: 30px;
	height: 30px;
	position: absolute;
	top: 0;
	left: 20px;
}
.uface image,
.me_uface image {
	width: 100%;
	height: 100%;
}
.item_right {
	margin-left: 70px;
	margin-right: 40px;
	background-color: #e7f7ff;
	padding: 8px;
	border-radius: 10px;
	float: left;
	min-width: 25px;
}
.msg_item .msg {
	color: #2e4059;
	font-size: 12px;
	line-height: 25px;
}
.msg_item .msg:before {
	content: '';
	position: absolute;
	top: 12px;
	left: 60px;
	border-width: 12px 0 0 12px;
	border-style: solid;
	border-color: #e7f7ff transparent;
	display: block;
	width: 0;
}
.me_uface {
	width: 30px;
	height: 30px;
	position: absolute;
	top: 0;
	right: 30px;
}
.me_item_right {
	margin-left: 40px;
	margin-right: 80px;
	background-color: #e7f7ff;
	padding: 8px;
	border-radius: 10px;
	background: #3690ff;
	color: #fff;
	float: right;
	min-width: 25px;
}
.me_item_right .me_msg {
	font-size: 12px;
	line-height: 25px;
}
.msg_item .me_msg:before {
	content: '';
	position: absolute;
	top: 12px;
	right: 70px;
	border-width: 12px 12px 0 0;
	border-style: solid;
	border-color: #3690ff transparent;
	display: block;
	width: 0;
}
.videoimg {
	width: 12px;
	height: 12px;
	margin: 0 5px;
}
.resultthir_title {
	margin: 40upx;
	font-size: 14px;
}
/* audio */
.audio-control-switch {
	font-size: 16px;
}
.tab_active{
	border-bottom: 3px solid #007AFF;
	color: #007AFF;
}
.tabs{
	position: fixed;
	height: 50px;
	left:0;
	z-index: 1;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #eee;
	width: 100%;
}
.tabs view{
	text-align: center;
	width: 50%;
	padding: 10px;
	
}
.contens1{
	margin-top: 50px;
}
</style>
