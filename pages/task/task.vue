<template>
	<view class="content">
		<view class="yh_card">
			<view class="index-title" >数据统计</view>
			<view class="uni-flex uni-row ">
				<view class="flex-item">
					<view class="flex-top">
						<text class="num">{{ analysisData.completed }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">已呼数</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num">{{ analysisData.uncompleted }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">未呼数</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num">{{ analysisData.success }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">接通数</view>
				</view>
			</view>
			<view class="uni-flex uni-row bg-qian">
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num">{{ analysisData.sratio }}</text>
						<text class="flex-top_text">%</text>
					</view>
					<view class="flex-bottom">接通率</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num">{{ analysisData.duration }}</text>
						<text class="flex-top_text">秒</text>
					</view>
					<view class="flex-bottom">总通话时长</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num">{{ analysisData.avgduration }}</text>
						<text class="flex-top_text">秒</text>
					</view>
					<view class="flex-bottom">平均通话时长</view>
				</view>
			</view>
			<view class="uni-flex uni-row">
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num">{{ analysisData.crm }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">A/B/C类客户</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num">{{ analysisData.crmratio }}</text>
						<text class="flex-top_text">个</text>
					</view>
					<view class="flex-bottom">意向客户比例</view>
				</view>
				<view class="flex-item ">
					<view class="flex-top">
						<text class="num">{{ analysisData.opt }}</text>
						<text class="flex-top_text">次</text>
					</view>
					<view class="flex-bottom">转人工坐席次数</view>
				</view>
			</view>
		</view>
		<view class="space10"></view>
		<view class="qiun-columns">
			<view class="index-title">分类统计</view>
			<view class="qiun-charts" style="padding-top:20px;" >
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
			</view>
		</view>
		<!-- 环形图 -->
		<view class="qiun-columns">
			<view class="qiun-charts qiun-rows" >
				<canvas canvas-id="canvasPie" id="canvasPie" class="charts-pie" @touchstart="touchPie"></canvas>
				<view class="qiun-bg-white charts-right">
					<view>
						<block v-for="(item, index) in piearr" :key="index">
							<view class="qiun-rows legend-itme">
								<view class="legend-itme-point" :style="{'background-color':item.color}"></view>
								<view class="legend-itme-text">{{item.name}}:  {{item.ratio}}</view>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<view class="space10"></view>
		<view class="yh_card">
			<view class="index-title">热点问题</view>
			<!-- <view class="in_study">
				<text class="shuzi">1、</text>
				<text>我社保可以吗？(2.0)</text>
			</view>
			<view class="in_study">
				<text class="shuzi">2、</text>
				<text>我是麦怎么算？(2.0)</text>
			</view>
			<view class="in_study">
				<text class="shuzi">3、</text>
				<text>你们是什么，公司(2.0)</text>
			</view>
			<view class="in_study">
				<text class="shuzi">4、</text>
				<text>喂，你好，你好哪个能贷(2.0)</text>
			</view>
			<view class="in_study">
				<text class="shuzi">5、</text>
				<text>3加5等于几？(2.0)</text>
			</view>
			<view class="in_study">
				<text class="shuzi">6、</text>
				<text>6666666？(2.0)</text>
			</view>
			<view class="in_study">
				<text class="shuzi">7、</text>
				<text>77777(2.0)</text>
			</view>
			<view class="in_study">
				<text class="shuzi">8、</text>
				<text>我都没讲话的.(2.0)</text>
			</view>
			<view class="in_study">
				<text class="shuzi">9、</text>
				<text>可以啊，你讲(2.0)</text>
			</view>
			<view class="in_study">
				<text class="shuzi">10、</text>
				<text>你出什么金额？(2.0)</text>
			</view> -->
		</view>
		<view class="footer">敬请期待...</view>
	</view>
</template>
<script>
import uCharts from '@/components/u-charts/u-charts.js';
import {getToken} from '@/utils/auth.js'
import  ajax from '../../common/api.js'
var _self;
var canvaColumn=null;
var canvaPie=null;
export default {
	data() {
		return {
			// analysisData: {}, //任务分析数据
			id: '',
			cWidth:'',
			cHeight:'',
			pixelRatio:1,
			serverData:'',
			piearr:[]
		};
	},
	computed: {
		analysisData(){
			return this.$store.getters.analysisData
		},
		Column(){
			return this.$store.getters.Column
		},
		Ring(){
			return this.$store.getters.Ring
		}
	},
	onLoad(option) {
		// 获取上个页面url传递的参数
		let id = option.id;
		let access_token=getToken()
		_self = this;
		// 设置图标宽高
		this.cWidth=uni.upx2px(700);
		this.cHeight=uni.upx2px(500);
		// 调用获取任务分析数据
		// this.getmarkanalysisinfo();
		this.$store.dispatch('task/getMarkanalysisinfo',{id,access_token}).then(res=>{
			this.showColumn("canvasColumn",this.Column)
			this.showPie("canvasPie",this.Ring);
		})
	},
	methods: {

		// 柱状图
		showColumn(canvasId,chartData){
				canvaColumn=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					legend:false,
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						// disabled:true
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'group',
							width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
						}
					  }
				});			
		},
		// 点击动画显示信息
		touchColumn(e){
				canvaColumn.showToolTip(e, {
					format: function (item, category) {
						if(typeof item.data === 'object'){
							return category + ' ' + item.data.value 
						}else{
							return category + ' ' + item.data 
						}
					}
				});
			},
		// 环装图
		showPie(canvasId,chartData){
			canvaPie=new uCharts(			
				{
					$this:_self,
					canvasId: canvasId,
					type: 'ring',
					fontSize:11,
					legend:false,
					extra: {
						pie: {
						  offsetAngle: -45,
						  ringWidth: 30*_self.pixelRatio,
						  lableWidth:15
						}
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*0.7,
					height: _self.cHeight*_self.pixelRatio,
					disablePieStroke: true,
					dataLabel: false,
				});
				
				this.piearr=canvaPie.opts.series;
		},
		//点击环状图动画显示的信息
		touchPie(e){
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
		},
	}
};
</script>

<style>
.content {
	color: #404040;
	font-family: 'Segoe UI', 'Lucida Grande', Helvetica, Arial, 'Microsoft YaHei', FreeSans, Arimo, 'Droid Sans', 'wenquanyi micro hei', 'Hiragino Sans GB', 'Hiragino Sans GB W3',
		FontAwesome, sans-serif;
	font-size: 14px !important;
	text-align: center;

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
	padding: 3px 12px;
	font-size: 12px;
}

.in_question {
	padding: 5px 15px;
	display: flex;
	justify-content: space-between;
}

.in_question view {
	font-size: 12px;
}

.flex-top_text {
	font-size: 12px;
}

.flex-bottom {
	font-size: 12px;
	color: #999;
}

.footer {
	padding: 20px 0;
}

.shuzi {
	color: #000;
}
.qiun-charts{width: 740upx; height:550upx;background-color: #FFFFFF;}
.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
.qiun-rows{display:flex; flex-direction:row !important;}
.qiun-columns{display:flex; flex-direction:column !important;}
.qiun-common-mt{margin-top:10upx;}
.qiun-bg-white{background:#FFFFFF;}
.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
.charts-pie{flex: 1; height:500upx;background-color: #FFFFFF;}
.charts-right{display:flex;align-items:center;width: 270upx; height:500upx;background-color: #FFFFFF;}
.legend-itme{width: 250upx; margin-left: 30upx; height:50upx;align-items:center;}
.legend-itme-point{width: 20upx; height:20upx; margin: 15upx;  border: 1px solid #FFFFFF; border-radius: 20upx;background-color: #000000;}
.legend-itme-text{height:50upx;line-height: 50upx;color: #666666;font-size: 26upx;}
</style>
