<template>
	<view class="content">
		<view class="space10"></view>
		<view v-for="(item, index) in templates" :key="index">
			<view class="tem_list" @click="tem_detial(item.id,item.callflowid,item.pages)">
				<view class="tem_left">{{item.name}}</view>
				<view class="tem_right text_dg" v-show="item.isComplete=='未完成'">{{item.isComplete}}</view>
				<view class="tem_right text_gr" v-show="item.isComplete=='已完成'">{{item.isComplete}}</view>
 			</view>
		</view>
	</view>
</template>
<script>
	import mediaList from '@/components/tab-nvue/mediaList.vue';
	import {getToken} from '@/utils/auth.js'
	import {reqJumpTargets} from '@/api/recording.js'
	export default {
		data() {
			return {
				templates: [],
				tipText: '',
				audioid: '',
				audiolen: '',
				nodename: '',
			}
		},
		// 获取参数
		onLoad(option) {
			this.callflowid = option.callflowid
			this.contextid=option.contextid
			
		},
		onShow() {
			this.gettemList();
		},
		created() {
		},
		//节点列表
		methods: {
			gettemList() {
				let	isApplet='1'
				let	callflowid= this.callflowid
				let	access_token= getToken()
				var that=this
				reqJumpTargets({isApplet,callflowid,access_token}).then(res=>{
					let arr = res.data.data.list;
					let ch_arr=arr.filter(item=>item.contextid==that.contextid)
					ch_arr=ch_arr[0].data
					let ch_use_arr=[]
					Object.keys(ch_arr).some((key,index)=>{
						ch_use_arr.push({
							name:ch_arr[key].name,
							pages:index,
							callflowid:that.callflowid,
							id:ch_arr[key].id,
							isComplete:ch_arr[key].isComplete,
						})
					})
					uni.setStorageSync('totalA', ch_use_arr.length)
					this.templates =ch_use_arr;	
				})
			},
			//节点跳转到录音
			tem_detial(id, callflowid, pages) {
				uni.navigateTo({
					url: '/pages/template/tem_detial/tem_de?id=' +id + '&callflowid=' + this.callflowid + '&pages=' +
						pages + '&type=1' 
				})
			},
		}
	};
</script>

<style>
	page{
		background-color: #f5f5f5;
	}
	.tem_top {
		text-align: center;
		padding: 10px;
	}

	.space10 {
		background-color: #f5f5f5;
		padding: 5px;
	}

	.num1 {
		color: #47c577;
		font-size: 11px;
	}

	.num2 {
		color: #ff0000;
		font-size: 11px;
	}

	.tem_list {
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #f5f5f5;
		padding: 15px;
	}

	.tem_list view {
		font-size: 12px;
	}

	.text_gr {
		color: #79da49;
	}

	.text_gr{
		color: #75CD00;
	}
	.text_dg{
		color: #FFA648;
	}
</style>
