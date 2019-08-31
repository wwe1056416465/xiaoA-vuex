<template>
	<view v-show="ifshow" @tap="close" class="popup-layer">
		<view ref="popRef" class="popup-content" :class="{task:page=='task'}"  @tap.stop="stopEvent" :style="_location">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	import {getToken} from '@/utils/auth.js'
	export default {
		name: 'popup-layer',
		props: {
			direction: {
				type: String,
				default: 'top', // 方向  top，bottom，left，right 
				
			},
			page: {
				type:String,
				default: ''
			}
		},
		data() {
			return {
				ifshow: false, // 是否展示,
				translateValue: -100, // 位移距离
				timer: null,
				iftoggle: false,

			};
		},
		computed: {
			_translate() {
				const transformObj = {
					'top': `transform:translateY(${-this.translateValue}%)`,
					'bottom': `transform:translateY(${this.translateValue}%)`,
					'left': `transform:translateX(${-this.translateValue}%)`,
					'right': `transform:translateX(${this.translateValue}%)`
				};
				return transformObj[this.direction]
			},
			_location() {
				const positionValue = {
					'top': 'bottom:0px;width:100%;',
					'bottom': 'top:0px;width:100%;',
					'left': 'right:0px;height:100%;',
					'right': 'left:0px;height:100%;',
				};
				return positionValue[this.direction] + this._translate;
			}
		},
		methods: {
			tip(tipText){
				uni.showToast({
					title: tipText,
					icon:'none',
					duration: 2000
					});
			},
			show() {
				this.ifshow = true;
				let _open = setTimeout(() => {
					this.translateValue = 0;
					_open = null;
				}, 100)
				let _toggle = setTimeout(() => {
					this.iftoggle = true;
					_toggle = null;
				}, 300);
			},
			close() {
				if (this.timer !== null || !this.iftoggle) {
					return;
				}
				this.translateValue = -100;
				this.timer = setTimeout(() => {
					this.ifshow = false;
					this.timer = null;
					this.iftoggle = false;
				}, 300);
			},
			stopEvent(event) {
				let id = this.$store.getters.taskId
				let access_token=getToken()
				let status = this.$store.getters.taskStatus
				let newStatus=null//新状态
				let taskDirectives =this.$store.getters.taskDirectives		
				let taskFail=this.$store.getters.taskFail	
					
				if(taskDirectives=="analyze"){
					uni.navigateTo({
						url: '/pages/task/task?id='+id
					});
				}else if(taskDirectives=="stop"){
					if(status!=2){
						this.ifshow=false;
						this.tip('该操作只针对正在运行的任务')
						return false;
					}
					newStatus=3
					this.$store.dispatch('task/stopTask',{id,access_token,newStatus}).then(res=>{
						this.ifshow=false;
					})
					newStatus=null
				}else if(taskDirectives=="continue"){
					if(status!=3){
						this.ifshow=false;
						this.tip('该操作只针对暂停发送的任务')
						return false;
					}
					newStatus=2
					this.$store.dispatch('task/restartTask',{id,access_token,newStatus}).then(res=>{
						this.ifshow=false;
					})
					newStatus=null
				}else if(taskDirectives=='failCall'){
					if(taskFail===0){
						this.ifshow=false;
						this.tip('该操作只针对呼叫失败的任务')
						return false;
					}
					newStatus=2
					this.$store.dispatch('task/recallTask',{id,access_token,newStatus}).then(res=>{
						this.ifshow=false;
					})
					newStatus=null
				}else if(taskDirectives=="delete"){
					let reqData={
						"id[]":id,
						access_token
					}
					this.$store.dispatch('task/deleteMTask',reqData).then(res=>{
						this.ifshow=false;
					})
				}else if(taskDirectives=='cancel'){
					this.ifshow=false;
				}
			
			},
		}
	}
</script>

<style >
	.popup-layer {
		position: fixed;
		z-index: 999999;
		background: rgba(0, 0, 0, .3);
		height: 100%;
		width: 100%;
		top: 0px;
		left: 0px;
	}

	.popup-content {
		position: fixed;
		z-index: 1000000;
		background: #FFFFFF;
		max-height: 60%;
		overflow-y: auto;
		transition: all .3s ease;
	}
	uni-button:after{
		border: none;
	}
	.task{
		background: none;
	}
</style>
