<template>
	<view class="content">
		<view class="yh_card">
			<view class="index-title" style="margin-top: 3px;">数据统计</view>
			<view class="uni-flex uni-row ">
				<view class="flex-item">
					<view class="flex-top">
						<text class="num" >{{ indexInfo.completed.total}}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">已呼数</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num" v-if="indexInfo.success">{{ indexInfo.success.total }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">接通数</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num" v-if="indexInfo.sratio">{{ indexInfo.sratio.total }}</text>
						<text class="flex-top_text">%</text>
					</view>
					<view class="flex-bottom">接通率</view>
				</view>
			</view>
			<view class="uni-flex uni-row bg-qian">
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num" v-if="indexInfo.duration">{{ indexInfo.duration.total }}</text>
						<text v-show="s" class="flex-top_text">秒</text>
						<text v-show="m" class="flex-top_text">分</text>
						<text v-show="h" class="flex-top_text">时</text>
					</view>
					<view class="flex-bottom">总通话时长</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num" v-if="indexInfo.avgduration">{{ indexInfo.avgduration.total }}</text>
						<text v-show="ss" class="flex-top_text">秒</text>
						<text v-show="mm" class="flex-top_text">分</text>
						<text v-show="hh" class="flex-top_text">时</text>
					</view>
					<view class="flex-bottom">平均通话时长</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num" v-if="indexInfo.crm">{{ indexInfo.crm.total }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">A/B/C类客户</view>
				</view>
			</view>
			<view class="uni-flex uni-row">
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num" v-if="indexInfo.crmratio">{{ indexInfo.crmratio.total }}</text>
						<text class="flex-top_text">%</text>
					</view>
					<view class="flex-bottom">意向客户比例</view>
				</view>
			</view>
		</view>
		<view class="space10"></view>
		<view class="yh_card">
			<view class="index-title">分类统计</view>
			<view class="uni-flex uni-row  ">
				<view class="flex-item"  v-if="indexInfo.classify" v-for="(item, index) in indexInfo.classify.legend" :key="index" :class="{ 'bg-qian': index == 5 || index == 3 || index == 4 }">
					<view class="flex-top">
						<text class="num" v-if="indexInfo.classify">{{ indexInfo.classify.total[index] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">{{ item }}</view>
				</view>
			</view>
		</view>
		<view class="space10"></view>
		<view class="yh_card">
			<view class="index-title">呼出结果统计</view>
			<view class="uni-flex uni-row  bg-qian">
				<view class="flex-item">
					<view class="flex-top">
						<text class="num" v-if="indexInfo.callResult">{{ indexInfo.callResult.data['104'] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">关机</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num" v-if="indexInfo.callResult">{{ indexInfo.callResult.data['106'] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">空号</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num" v-if="indexInfo.callResult">{{ indexInfo.callResult.data['109'] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">来电显示</view>
				</view>
			</view>
			<view class="uni-flex uni-row">
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num"  v-if="indexInfo.callResult">{{ indexInfo.callResult.data['110'] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">稍后再拨</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num"  v-if="indexInfo.callResult">{{ indexInfo.callResult.data['105'] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">停机</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num"  v-if="indexInfo.callResult">{{ indexInfo.callResult.data['111'] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">无法接通</view>
				</view>
			</view>
			<view class="uni-flex uni-row  bg-qian">
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num"  v-if="indexInfo.callResult">{{ indexInfo.callResult.data['108'] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">正在通话</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num"  v-if="indexInfo.callResult">{{ indexInfo.callResult.data['102'] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom" >用户正忙</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num"  v-if="indexInfo.callResult">{{ indexInfo.callResult.data['103'] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">用户拒接</view>
				</view>
			</view>
			<view class="uni-flex uni-row">
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num"  v-if="indexInfo.callResult">{{ indexInfo.callResult.data['112'] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">欠费</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num"  v-if="indexInfo.callResult">{{ indexInfo.callResult.data['100'] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">正常挂机</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num"  v-if="indexInfo.callResult">{{ indexInfo.callResult.data['101'] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">无人应答</view>
				</view>
			</view>
			<view class="uni-flex uni-row bg-qian">
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num"  v-if="indexInfo.callResult">{{ indexInfo.callResult.data['200'] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">主动挂机</view>
				</view>

				<view class="flex-item ">
					<view class="flex-top">
						<text class="num"  v-if="indexInfo.callResult">{{ indexInfo.callResult.data['000'] }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">其他</view>
				</view>
			</view>
		</view>
		<view class="space10"></view>
		<view class="yh_card">
			<view class="index-title">对话分析</view>
			<view class="uni-flex uni-row ">
				<view class="flex-item">
					<view class="flex-top">
						<text class="num"  v-if="indexInfo.business">{{ indexInfo.business.total }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">非业务对话</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num" v-if="indexInfo.unbusiness">{{ indexInfo.unbusiness.total }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">业务对话</view>
				</view>
			</view>
		</view>
		<view class="space10"></view>
		<view class="yh_card">
			<view class="index-title">跳出话术</view>
			<view class="uni-flex uni-row in-task">
				<view class="flex-item">主干流程</view>
				<view class="flex-item">跳出数</view>
				<view class="flex-item">跳出率</view>
			</view>
			<view class="uni-flex uni-row " style="padding: 20upx 0;" v-if="indexInfo.speech_dap" v-for="(item, index) in indexInfo.speech_dap.data" :key="index">
				<view class="flex-item">{{ item.nodename }}</view>
				<view class="flex-item ">100%</view>
				<view class="flex-item ">1</view>
			</view>
		</view>
		<view class="space10"></view>
		<view class="yh_card">
			<view class="index-title">待学习问题</view>
			<view class="in_study" v-if="indexInfo.un_learn" v-for="(item, index) in indexInfo.un_learn.data" :key="index">
				<text>问题{{ index + 1 }}：</text>
				<!-- {{item.sort}} -->
				<text>{{ item.userspeech }}？</text>
			</view>
		</view>
		<view class="space10"></view>
		<view class="yh_card">
			<view class="index-title">热点问题</view>
			<view class="in_question" v-if="indexInfo.hot_question" v-for="(item, index) in indexInfo.hot_question.data" :key="index">
				<view>{{ item.userspeech }}？</view>
				<view>{{ item.num }}人提问</view>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 搜索 -->
		<view class="indexS">
			<view class="index_scerch " @click="index_scerch">&#xe611;</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {getToken} from '@/utils/auth.js'
	import moment from '../../../common/moment.min.js'
	export default {
		data() {
			return {
				s: false,
				m: false,
				h: false,
				ss: false,
				mm: false,
				hh: false,
			};
		},
		onNavigationBarButtonTap: function(e) {
			// 跳转到首页搜索
			uni.navigateTo({
				url: '/pages/index/search'
			});
		},
		// onLoad(){
		// 	let data=''
		// 	data=JSON.stringify(data)
		// 	let access_token=getToken()
		// 	this.$store.dispatch('indexInfo/getIndexInfo',{data,access_token})
		// },
		onShow() {
			let data=this.$store.getters.queryIndex||''
			data=JSON.stringify(data)
			let access_token=getToken()
			this.$store.dispatch('indexInfo/getIndexInfo',{data,access_token})
		},
		computed:{
			indexInfo(){
				const {indexInfo}= this.$store.state.indexInfo
				if(indexInfo){
					indexInfo.duration.total=this.secToTime(indexInfo.duration.total)
					indexInfo.avgduration.total=this.secToTime(indexInfo.avgduration.total)
					return indexInfo
				}
			},	
		},
		methods: {
			// 跳转都首页搜索
			index_scerch() {
				uni.navigateTo({
					url: '/pages/index/search'
				});
			},
			// 时间格式处理
			secToTime(num) {
				if (num / 60 < 1) {
					this.s = true;
					return num;
				} else if (num / 60 >= 1 && num / 3600 < 1) {
					this.m = true;
					return (num / 60).toFixed(1);
				} else {
					this.h = true;
					return (num / 3600).toFixed(1);
				}
			},
	
		}
	}
</script>

<style lang="scss">
	.content {
		color: #404040;
		font-family: 'Segoe UI', 'Lucida Grande', Helvetica, Arial, 'Microsoft YaHei', FreeSans, Arimo, 'Droid Sans', 'wenquanyi micro hei', 'Hiragino Sans GB', 'Hiragino Sans GB W3',
			FontAwesome, sans-serif;
		font-size: 14px !important;
		text-align: center;
		background-color: #ffffff !important;
		/* 	paddign-top:10px; */
		padding-top: 10upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}

	.index-title {
		text-align: left;
		padding: 8px 15px;
		position: relative;
		font-size: 14px;
		border-bottom: 1px solid #eee;
	}

	.index-title::after {
		content: '';
		display: block;
		width: 3px;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: #3690ff;
	}

	.uni-flex {
		flex-wrap: wrap;
	}

	.flex-item {
		padding: 10px 0;
		font-size: 12px;
		width: 33.3%;
		text-align: center;
	}

	.flex-top {
		line-height: 1.5;
	}

	.flex-top .num {
		font-size: 24px;
		margin-right: 3px;
	}

	.bg-qian {
		background-color: #f8f8f8;
	}

	.space10 {
		height: 10px;
		background-color: #f5f5f5;
	}

	.in-task {
		background-color: #f8f8f8;
		border-bottom: 1px solid #eee;
		font-weight: 600;
	}

	.in_study {
		text-align: left;
		padding: 8px 15px;
		font-size: 12px;
	}

	.in_question {
		padding: 8px 15px;
		display: flex;
		justify-content: space-between;
	}

	.in_question view {
		font-size: 12px;
	}

	.flex-bottom,
	.flex-top_text {
		font-size: 12px;
	}

	@font-face {
		font-family: 'iconfont';
		src: url('~@/static/iconfont2.ttf') format('truetype');
	}

	.indexS {
		text-align: center;
		position: fixed;
		right: 5%;
		bottom: 100px;
		z-index: 999;
	}

	.indexS .index_scerch {
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
</style>
