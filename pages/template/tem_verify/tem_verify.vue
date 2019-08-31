<template>
	<view class="uni-tab-bar">
		<view class="">
			<view class="tabs">
				<view @click="cur=0" :class="{tab_active:cur==0}">全部</view>
				<view @click="cur=1" :class="{tab_active:cur==1}">待审核</view>
				<view @click="cur=2" :class="{tab_active:cur==2}">审核中</view>
				<view @click="cur=3" :class="{tab_active:cur==3}">审核成功</view>
				<view @click="cur=4" :class="{tab_active:cur==4}">审核失败</view>
			</view>
			<view class="space10"></view>
			<view  v-for="(item, index) in tem_vList" :key="index">
				<view class="content" v-show="cur==0">
					<view class="tem_list">
						<view class="tem_left">{{item.text}}</view>
						<view class="tem_right text_dg" v-show="item.status==1">待审核</view>
						<view class="tem_right text_vi" v-show="item.status==2">审核中</view>
						<view class="tem_right text_gr" v-show="item.status==3">审核成功</view>
						<view class="tem_right text_red" v-show="item.status==4">审核失败</view>
					</view>
				</view>
				<view class="content" v-show="cur==1 && item.status==1">
					<view class="tem_list" >
						<view class="tem_left">{{item.text}}</view>
						<view class="tem_right text_dg" v-show="item.status==1">待审核</view>
					</view>						
				</view>		
				<view class="content" v-show="cur==2 && item.status==2">
					<view class="tem_list">
						<view class="tem_left">{{item.text}}</view>
						<view class="tem_right text_vi" v-show="item.status==2">审核中</view>
					</view>						
				</view>
				<view class="content" v-show="cur==3 && item.status==3">
					<view class="tem_list" >
						<view class="tem_left">{{item.text}}</view>
						<view class="tem_right text_gr" v-show="item.status==3">审核成功</view>
					</view>						
				</view>
				<view class="content" v-show="cur==4&& item.status==4">
					<view class="tem_list">
						<view class="tem_left">{{item.text}}</view>
						<view class="tem_right text_red" v-show="item.status==4">审核失败</view>
					</view>						
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ajax from '../../../common/api.js'
	import {reqSubAccountAudio} from '@/api/recording.js'
	import {getToken} from '@/utils/auth.js'
	export default{
		data() {
			return {
				cur:0,		
				callflowid:'',
				useradminid:'',
				tem_vList:[],
			}
		},
		// 获取参数
		onLoad(option) {
			this.callflowid = option.callflowid;
			this.useradminid=option.useradminid
		},
		onShow() {
			this.tem_verify();
		},
		methods: {
			// 审核列表
			tem_verify(){
				let datas={};
				datas['text|like']="" 
				datas['useradminid']=this.useradminid
				let	data=JSON.stringify(datas)
				let	callflowid=this.callflowid
				let	isApplet="1"
				let	access_token=getToken()
				reqSubAccountAudio({data,callflowid,isApplet,access_token}).then(res=>{
					this.tem_vList=res.data.data
				})
			},
// 			//跳转到详情页
// 			tem_detail(id,callflowid,pages){
// 				uni.navigateTo({
// 					url:'/pages/template/tem_detial/tem_de?id='+id+'&callflowid='+this.callflowid+'&pages='+pages
// 				})	
// 			}
			
		}
	}
</script>

<style>
	page{
		background-color: #f5f5f5 !important;
		
	}
	.uni-tab-bar-loading {
		text-align: center;
		font-size: 28upx;
		color: #999;
	}
	.space10 {
		background-color: #f5f5f5;
		padding: 5px;
	}
	
	.tem_list{
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #f1f1f1;
		padding: 15px;
	}
	.tem_list view{
		font-size: 12px;
	}
	.text_gr{
		color: #79da49;
	}
	.text_dg{
		color: #ff9900;
	}
	.tabs{
		display: flex;
		justify-content: space-around;
		border-bottom: 1px solid #eee;
		background-color: #fff;
	}
	.tabs view{
		text-align: center;
		padding: 10px 0px;
		font-size: 12px;
		width: 100%;
	}
	.tab_active{
		border-bottom: 3px solid #3690ff;
		color: #3690ff;
	}
	.tem_right{
	}
	.tem_left{
		width: 85%;
	}
	/* 成功 */
	.text_gr{
		color: #75CD00;
	}
	/* 待审核 */
	.text_dg{
		color: #FFA648;
	}
	/* 失败 */
	.text_red{
		color: #F5222D;
	}
	/* 审核中 */
	.text_vi{
		color:#3690ff;
	}
	.content{
		background-color: #fff;
	}
</style>
