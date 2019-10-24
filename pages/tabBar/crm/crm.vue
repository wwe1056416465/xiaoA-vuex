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
				<view class="" v-for="(item, index) in list" :key="index">
					<view class="crm_block" @click="detailcrm(item.callid, item.starttime, item.calleeno, item.jobid)">
						<view class="crm_title">
							<view v-show="item.sex == 1">{{ item.jobname }} (男) | {{ item.calleeno }}</view>
							<view v-show="item.sex == 2">{{ item.jobname }} (女) | {{ item.calleeno }}</view>
							<view v-show="item.sex == 0||item.sex == -1">{{ item.jobname }} (未识别) | {{ item.calleeno }}</view>
							<view v-show="item.category == 'A类'" class="crm_lei crm_Alei">A类</view>
							<view v-show="item.category == 'B类'" class="crm_lei crm_Blei">B类</view>
							<view v-show="item.category == 'C类'" class="crm_lei crm_Clei">C类</view>
							<view v-show="item.category == 'D类'" class="crm_lei crm_Dlei">D类</view>
							<view v-show="item.category == 'E类'" class="crm_lei crm_Elei">E类</view>
							<view v-show="item.category == 'F类'" class="crm_lei crm_Flei">F类</view>
						</view>
						<view class="crm_content">
							<view class="crm_con">
								<text>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 态 ：</text>
								<text v-show="item.status == 0" class="noread">未读</text>
								<text v-show="item.status == 1" class="read">已读</text>
							</view>
							<view class="crm_con">
								<text>呼出结果 ：</text>
								<text>{{ item.resultstr }}</text>
							</view>
							<view class="crm_con">
								<text>通话时长 ：</text>
								<text>{{ item.duration }}</text>
							</view>
							<view class="crm_con biaoqians">
								<text style="width:70px;">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签 ：</text>
								<view class="biaoqian">
									<view class="tag" v-for="(it, i) in item.tag" :key="i" v-show="it.length">{{ it }}</view>
									<!-- <view class="tag">{{item.tag}}</view>-->
								</view>
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
		<!-- #ifdef MP-WEIXIN -->
		<!-- 搜索 -->
		<view class="crmS">
			<view class="crm_scerch " @click="crm_scerch">&#xe611;</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
	import mixLoadMore from '@/components/mix-load-more/mix-load-more';
	import moment from '@/common/moment.min.js';
	import {getToken} from '@/utils/auth.js'
	import ajax from '../../../common/api.js'
	export default {
		components: {
			// 注册为组件标签
			mixPulldownRefresh,
			mixLoadMore
		},
		data() {
			return {
				// list: [],
				// loadMoreStatus: 0,
				page: 1,
				sign: '',
				data: ''
			};
		},
		computed: {
			list() {
				return this.$store.getters.crmList
			},
			loadMoreStatus(){
				return this.$store.getters.loadStatus
			}
		},

		onShow() {
			this.loadData('refresh');
		},

		onNavigationBarButtonTap: function(e) {
			uni.navigateTo({
				url: '/pages/crm/crmSearch'
			});
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
				}
				setTimeout(() => {
					if (type === 'refresh') {
						this.$store.dispatch('crm/emptyCrmList')//重载crm列表
						this.$store.dispatch('crm/clearCrmQuery')//清空crm查询条件
						this.page = 1;
					}
					let page=this.page
					let limit= 5
					let access_token=getToken()
					let data= this.$store.getters.crmQueryCriteria || ''
					this.$store.dispatch('crm/getCrmHistory',{page,limit,data,access_token}).then(res=>{
						this.page++;
						if (res.data.data.length < 5) {								
							this.$store.dispatch('task/loadMoreStatus',2)
						}	
					})
					if (type === 'add') {
						// this.loadMoreStatus = 0;
					} else if (type === 'refresh') {
						this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
						// this.loadMoreStatus = 0;
					}
				}, 500);
			},
			// 跳转到crm详情
			detailcrm(id, date, phone, jobid) {
				let dates = moment(date, 'YYYY-MM-DD HH:mm:ss').valueOf();
				uni.navigateTo({
					url: '/pages/crm/crm?id=' + id + '&date=' + dates + '&calleeno=' + phone + '&jobid=' + jobid
				});
			},
			// 跳转到crm搜索页面
			crm_scerch() {
				uni.navigateTo({
					url: '/pages/crm/crmSearch'
				});
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

	.list-item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 150upx;
		font-weight: bold;
		font-size: 40upx;
		color: #555;
		background: #fff;
		border-bottom: 1px solid #eee;
	}

	.loading {
		text-align: center;
		line-height: 80px;
		font-size: 13px;
		color: #999;
	}

	.crm_block {
		color: #404040;
		font-family: 'Segoe UI', 'Lucida Grande', Helvetica, Arial, 'Microsoft YaHei', FreeSans, Arimo, 'Droid Sans', 'wenquanyi micro hei', 'Hiragino Sans GB', 'Hiragino Sans GB W3',
			FontAwesome, sans-serif;
		padding: 15px;
		font-size: ;
	}

	.space10 {
		height: 10px;
		background-color: #f5f5f5;
	}

	.crm_title {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #f3f5f7;
		padding-bottom: 8px;
	}

	.crm_title view {
		font-size: 14px;
		padding: 2px 0;
	}

	.crm_lei {
		width: 80px;
		color: #fff;
		text-align: center;
		border-radius: 5px;
	}

	.crm_Alei {
		background: #3690ff;
	}

	.crm_Blei {
		background: #2bbdff;
	}

	.crm_Clei {
		background: #ffbf69;
	}

	.crm_Dlei {
		background: #ff7d7d;
	}

	.crm_Elei {
		background: #a1eb3e;
	}

	.crm_Flei {
		background: #c87ef3;
	}

	.crm_con {
		padding: 3px 0;
	}

	.crm_con text {
		color: #5e6871;
		font-size: 12px;
	}

	.read {
		color: #7ddb4e !important;
	}

	.noread {
		color: #f65f56 !important;
	}

	.biaoqians {
		display: flex;
	}

	.biaoqian {
		flex: 1;
		display: flex;
		flex-wrap: wrap;
	}

	.biaoqian .tag {
		font-size: 10px;
		color: #5e6871;
		padding: 1px 4px;
		background-color: #efefef;
		margin-right: 5px;
		margin-bottom: 5px;
	}

	.task_pages view {
		width: 20px;
		height: 100px;
		display: block;
		font-size: 13px;
		padding: 15px 0px 0px 20px;
		z-index: 1000;
		position: fixed;
		/* background: url(../../../static/image/page.png) no-repeat; */
		color: #000;
	}

	.preview_pages {
		bottom: 230px;
		right: 0px;
	}

	.next_pages {
		bottom: 150px;
		right: 0px;
	}

	@font-face {
		font-family: 'iconfont';
		src: url('~@/static/iconfont2.ttf') format('truetype');
	}

	.crmS {
		text-align: center;
		position: fixed;
		right: 5%;
		bottom: 100px;
		z-index: 999;
	}

	.crmS .crm_scerch {
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
