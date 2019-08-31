<template>
	<view class="content">
		<view class="space10"></view>
		<view class="tede_all">
			<!-- 头部 -->
			
			<view class="tede_top" ref="aaa">
				<view class="tede_ti" style="font-size: 14px;">{{nodename}}</view>
				<view  v-for="(item, cindex) in luyingcunchu" :key="cindex">
					<view class="tede_con active">剩余<text v-show="item.mold==2 ">0</text><text v-show="item.mold==1 ">1</text>条待录音<text class="record-state"
						 v-show="item.mold==2 ">已录制</text>
						 <text v-show="item.audioList!=''">
							 <text class="text_dg" style="margin: 0 5px;" v-show="item.status==1">待审核</text>
							 <text class="text_vi" style="margin: 0 5px;" v-show="item.status==2">审核中</text>
							 <text class="text_gr" style="margin: 0 5px;" v-show="item.status==3">审核成功</text>
							 <text class="text_red" style="margin: 0 5px;" v-show="item.status==4">审核失败</text>
						 </text>
					</view>
					<view class="tede_tarea" @click="textear(cindex)">
						<view class="de_textear" :class="pers1==cindex?'active':'' ">{{item.text}}</view>
					</view>
					<view class="record" v-if="hasRecord" v-for="(item, index) in item.audioList" :key="index">
					  <!-- <view class="voice  {{time.recordTime(duration)}}" bindtap="playVoice" wx:if="{{hasRecord === true}}"> -->
					  <view class="voice" @click="playVoice(cindex,index)" :class="pers1==cindex&&pres==index?'active':'' ">
						<view class="icon-voice">
							<view v-show="!playing || item.plays=='1'">
								<image v-if="pers1==cindex&&pres==index" src="../../../static/img/bofang_ac.png"></image>
								<image v-else src="../../../static/img/bofang_re.png"></image>
							</view>
						   <image v-show="playing && item.plays=='0' " src="../../../static/img/bofang_aa.gif"></image>
						</view>   
						<text class="time">{{item.audioList.duration}}<text>″</text></text>
					  </view>
					  <image v-show="index!=0" class="icon-delet" src="../../../static/img/delete.png" @click='deletRecord(cindex,index)'></image>
					</view>
				</view>
			</view>
			
		</view>
		<!-- 底部 -->
		<view style="height: 240px;"></view>
		<view class="de_all_bottom" :class="[srec_xia==true?'border_top':'']">
			<view class="tede_audio">
					<view class="recording">
						<view class="to-record">
						  <view class="record-content">
							<view class="animation1" v-show="recording"></view>
							<view class=" animation2" v-show="recording"></view>
							<button class="btn" @click="startRecord()">
							<!-- <button class="btn" catchlongpress='startRecord' catchtap='isDelet' catchtouchend="stopRecord"> -->
							  <view  class="record-img" v-show="!recording">
								<image src="../../../static/image/voice@3x.png"></image>
							  </view>
							 <view class="record-img active" v-show="recording">
								<image src="../../../static/image/voice_active@3x.png"></image>
							  </view>
							</button>
						  </view>
						</view> 
						<view class="click_text" v-show="!recording">点击开始录音</view>
						<view class="click_text" v-show="recording">点击结束录音</view>
					<!-- 	<view class="ck_text">
							<checkbox value="cb" checked="true" color="#3690ff" class="uni-common-mt"/>
							<text>智能裁剪录音前后空白片段</text>
						</view> -->
					</view>
				</view>	
			<view class="tede_bottom">
				<button @click="prepage()" class="btn_te">上一页</button>
				<button :disabled="isButtonDisabled" @click="saveaudia(luyingcunchu[pers1].id,luyingcunchu[pers1].callflowid,luyingcunchu[pers1].status,luyingcunchu[pers1].type,luyingcunchu[pers1].text)">保存录音</button>
				<button @click="nextpage()" class="btn_te">下一页</button>
			</view>
		</view>	
	</view>
</template>
<script>
import ajax from '@/api/api.js'
import {reqNodeInfo,reqOneInfoById,reqAddVoice} from '@/api/recording.js'
import {getToken,getYuMing} from '@/utils/auth.js'
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
const $url=getYuMing()
innerAudioContext.autoplay = true;
const options = {
	sampleRate: 8000, //采样率
	encodeBitRate: 16000, //编码码率
	format: 'aac', //音频格式，有效值 aac/mp3
	}; 
export default {
	data() {
		return {
			playing:false,//播放录音图片
			recording: false,//录音图片
			duration: [],//时间
			voicePath :'',//临时语音文件
			hasRecord:false,//播放录音模块
			isButtonDisabled:true,//改变按钮颜色
			id:'',
			callflowid:'',//流程id
			teoneinfo:{},//列表数据
			fileaudio:'',//返回的临时数据
			nodename:'',//节点名称
			filepath:'',//返回的文件路径
			filenamesrc:'',//获取现在的录音文件
			filename:'',//返回的文件名
			pages:0,//当前页数
			pageaulen:'',//返回节点的长度
			type:'',//类型区分(主流程,问题流程,特殊流程)
			getJumpTargets:'',//返回语境列表
			isSuccess:false,//是否保存成功录音
			srec_xia:false,//超出底部部分加上边框
			voicePathList:[],//临时语音文件
			pres:0,//点击当前的index
			luyingcunchu:[],//录音存储
			pers1:0,//点击边框切换
			sRecord:false,//录音切换
		};
	},
	
    onLoad(option) {
		this.callflowid=option.callflowid;
		this.id=option.id;
		this.pages=option.pages;
		this.type=option.type;
		this.getoneinfo();
		// this.onPageScroll(this.$refs.aaa);
        let self = this;
        recorderManager.onStop(function (res) {
			self.fileaudio=JSON.stringify(res);
			res.plays='1'
			self.luyingcunchu[self.pers1].audioList.push(res)
			if(self.luyingcunchu[self.pers1].audioList[self.pres].tempFilePath!=''){
				self.title=true
				self.hasRecord=true
			}
        });
    },
	onHide(){
		innerAudioContext.pause();
		this.playing=false;
	},
	onUnload(){
		innerAudioContext.pause();
		this.playing=false;
	},
    methods: {

		//点击选中录音
		textear(index){
			console.log(this.pres)
			if(this.pers1===index){
			}else{
				if(this.luyingcunchu[this.pers1].audioList.length>1){
						uni.showModal({
						content: '请保存或删除当前录音后才可切换语音文本录音',
						confirmText:'知道了',
						confirmColor:'#3690ff',
						showCancel: false,	
						success: res => {
							if (res.confirm) {
							} else if (res.cancel) {
							}
							
						}
					});
				}else{
					this.pers1=index;
				}
			}
			
		},
		//列表
		getoneinfo(){
			let	id=this.id
			let	isApplet="1"
			let	callflowid=this.callflowid
			let	access_token=getToken()
			reqNodeInfo({id,isApplet,callflowid,access_token}).then(res=>{
				this.nodename=res.data.data.name;
					for(let i=0;i<res.data.data.audio.length;i++){
						this.audiotype=res.data.data.audio[i].type;
						if(this.audiotype==1){
							let id=res.data.data.audio[i].recordFileId||res.data.data.audio[i].fileid
							// 获取每个语音文件的语音信息
							reqOneInfoById({id,isApplet,callflowid,access_token}).then(res=>{
								this.filepath = res.data.data.filepath;
								this.filename = res.data.data.filename;
								var data=res.data.data;
								data.audioList=[]
								if(this.filename!==''){
									this.hasRecord=true;
									this.isButtonDisabled=true;
									this.download(res=>{
										let tempFilePath=res
										data.audioList.push({
											tempFilePath,
											plays:'1'
										})
										this.luyingcunchu.push(data)
									});																																			
								}else{
									this.luyingcunchu.push(data)
								}
							})						
						}	
					}
			})

		},
		//下载录音
		download(){
				let access_token=getToken()
				uni.downloadFile({
					url: $url + '/adminspa/File/readFile?filename='+this.filepath+this.filename+'&access_token='+access_token, 
					success: (res) => {
						this.filenamesrc=res.tempFilePath;
						arguments[0](res.tempFilePath)
					}
				});	
		},
		// 开始录音
        startRecord() {	
			this.playing=false;
			innerAudioContext.pause();
			this.sRecord=!this.sRecord
			if(this.sRecord==true){
				if(this.luyingcunchu[this.pers1].audioList.length==0){
					uni.showModal({
						content: '该语音文本暂不能录音,需要话术私有者先对其生成声音文件',
						confirmText:'知道了',
						confirmColor:'#3690ff',
						showCancel: false,	
						success: res => {
							if (res.confirm) {
								
							} else if (res.cancel) {
							
							}
							
						}
					});
				}else{
					if(this.luyingcunchu[this.pers1].audioList.length>=3){
						uni.showModal({
							content: '最多只能录制3条',
							confirmText:'知道了',
							confirmColor:'#3690ff',
							showCancel: false,	
							success: res => {
								if (res.confirm) {
									
								} else if (res.cancel) {
								
								}
								
							}
						});
					}else{
						this.isSuccess=false;//重置为未保存状态
						this.isButtonDisabled=false;
						this.recording = true,
						recorderManager.start();
					}
				}
			}else{
				this.recording = false,
				recorderManager.stop();
			}
			
			
			
        },
		// 结束录音
//         endRecord() {
// 			this.recording = false,
//             recorderManager.stop();
//         },
		// 播放录音
        playVoice(cindex,index) {
			this.recording = false,
			recorderManager.stop();
			for(let i=0;i<this.luyingcunchu.length;i++){
				for(let j=0;j<this.luyingcunchu[i].audioList.length;j++){
					this.luyingcunchu[i].audioList[j].plays='1';		
				}
			}
			this.luyingcunchu[cindex].audioList[index].plays='0';
			this.playing=!this.playing
			this.pres=index;
			innerAudioContext.autoplay = true;
			innerAudioContext.loop = false;
			innerAudioContext.obeyMuteSwitch = true;
			innerAudioContext.src = this.luyingcunchu[cindex].audioList[index].tempFilePath;	
			if(this.playing){
				 innerAudioContext.play();
			}else{
				innerAudioContext.pause();
			}
			 innerAudioContext.onEnded((res) => {
				this.playing = false
			})
			innerAudioContext.onError((res) => {
				this.playing = false
			})
			innerAudioContext.onStop((res) => {
				this.playing = false
			})
	
        },
		// 删除录音
		deletRecord(cindex,index){
			let self = this
			wx.showModal({
				title: '删除录音',
				content: '录音删除后无法恢复?',
				success: function(res) {
					if (res.confirm) {
						innerAudioContext.pause();
						self.luyingcunchu[cindex].audioList.splice(index,1)
						var vocie=self.luyingcunchu[cindex].audioList.length
						if(self.pres==0){

						}else if(index==vocie){
							self.pres=index-1;
						}
					} else if (res.cancel) {
					}
				}
			})
			
		},
		// 保存录音
		saveaudia(fileid,callflowid,status,type,saytxt){
			 if(this.luyingcunchu[this.pers1].mold==2){
				fileid=this.luyingcunchu[this.pers1].pid;
			}
			let isApplet='1'
			let access_token=getToken()
			wx.showModal({
				title: '保存录音',
				content: '仅保存选中的录音其他未选中录音将自动清除',
				success:res=> {
					if (res.confirm) {
						uni.showLoading({
							title: '正在上传录音'
						});
						uni.uploadFile({
							url: $url +'/adminspa/audio/upload?callflowid='+this.callflowid+'&access_token='+access_token,
							method: 'POST',	
							formData:{
								fileid,
								isApplet,
							},
							filePath:this.luyingcunchu[this.pers1].audioList[this.pres].tempFilePath,
							name: 'file',
							header: {
								charset: 'utf-8',
								'X-Requested-With': 'XMLhttpRequest',
							},
							success: res => {
								let data = JSON.parse(res.data);
								let filename = data.data.filename;
								let filepath = data.data.filepath;
								let id=data.data.id
								// uni.setStorageSync('oldid',oldid);
								let type='1'
								let textbak=""
								// let reqData={
								// 		isApplet:'1',
								// 		fileid:fileid,
								// 		id:oldid,
								// 		callflowid:callflowid,
								// 		// status:status,
								// 		filepath:svpath,
								// 		filename:svname,
								// 		type:'1',
								// 		saytxt:text,
								// 		textbak:'',
								// 		access_token: this.$store.state.token
								// 	};
								reqAddVoice({isApplet,fileid,id,callflowid,filename,filepath,type,saytxt,textbak,access_token}).then(res=>{
									uni.hideLoading();//隐藏loading
									uni.showToast({
										title: '保存成功',
										duration: 1000,
									});
									// 上传录音后删除其他
									var arrindex=this.luyingcunchu[this.pers1].audioList[this.pres]
									this.luyingcunchu[this.pers1].audioList.splice(0,this.luyingcunchu[this.pers1].audioList.length);
									this.luyingcunchu[this.pers1].audioList.push(arrindex);
									this.hasRecord=true;// 保存成功显示播放图片
									this.isButtonDisabled=true;//禁用表单
									// 此分支表示有本地录音 并把保存成功标志改为true
									const saveArr=this.luyingcunchu[this.pers1].audioList.filter(item=>item.fileSize)
									if(saveArr.length!==0){
										this.isSuccess=true;
									}
								})
								// ajax('/adminspa/audio/addVoice',reqData).then(res=>{
								// 			uni.hideLoading();//隐藏loading
								// 			uni.showToast({
								// 				title: '保存成功',
								// 				duration: 1000,
								// 			});
								// 			// 上传录音后删除其他
								// 			var arrindex=this.luyingcunchu[this.pers1].audioList[this.pres]
								// 			this.luyingcunchu[this.pers1].audioList.splice(0,this.luyingcunchu[this.pers1].audioList.length);
								// 			this.luyingcunchu[this.pers1].audioList.push(arrindex);
								// 			this.hasRecord=true;// 保存成功显示播放图片
								// 			this.isButtonDisabled=true;//禁用表单
								// 			// 此分支表示有本地录音 并把保存成功标志改为true
								// 			const saveArr=this.luyingcunchu[this.pers1].audioList.filter(item=>item.fileSize)
								// 			if(saveArr.length!==0){
								// 				this.isSuccess=true;
								// 			}
								// })
								
							},
							fail:err => {
								console.log(err)
								
							}
						})
						
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
			
		},
		// 上一页跳转具体实现
		pre(){
			if(this.pages <= 0){
				uni.showToast({
					title: '暂无上一条',
					duration: 2000,
					icon: 'none'
				});
				if(this.fistFlag){
					this.pages=parseInt(this.pages)+1;
				}
				return ;				
			}else{	
				// 跳转上一页是清空时间和本地语音文件
				this.luyingcunchu.splice(0,this.luyingcunchu.length)
				this.duration='';
				this.pages=this.pages-1;
				if(this.type==1){
					this.getJumpTargets= '/adminspa/rprocess/getJumpTargets'
				}else if(this.type==2 || this.type==4){
					this.getJumpTargets= '/adminspa/questions/index?type=2'
				}else if(this.type==3){
					this.getJumpTargets= '/adminspa/special/index?type=3'
				}
				let	isApplet='1'
				let	callflowid=this.callflowid
				let	access_token= getToken()
					
				ajax(this.getJumpTargets,{isApplet,callflowid,access_token}).then(res=>{
						let id;//每页的id
						let callflowid;//每页的callflowid
						if(this.type==1){
							// let arr=res.data.data.list[this.pages];
							id=res.data.data.list[0].data[this.pages].id
							callflowid=this.callflowid
						}else{
							let arr=res.data.data[this.pages];
							id=res.data.data[this.pages].id
							callflowid=res.data.data[this.pages].callflowid
						}
						// let reqData={
						// 		id:id,
						// 		callflowid:pagecowfowid,
						// 		access_token: this.$store.state.token
						// 	}
					return reqNodeInfo({id,callflowid,access_token})
					// return	ajax('/adminspa/rprocess/getNodeInfo',reqData)
				}).then(res=>{
					this.nodename=res.data.data.name;
					return res.data.data.audio
					
				}).then(audios=>{
					console.log(audios,'111')
						this.luyingcunchu=[];
						for(let i=0;i<audios.length;i++){
							if(audios[i].type!=1){
								continue
							}
							let id=audios[i].fileid
							
							// let reqData={
							// 	isApplet:'1',
							// 	id:audios[i].fileid,
							// 	callflowid:this.callflowid,
							// 	access_token: this.$store.state.token
							// 	};
							reqOneInfoById({isApplet,id,callflowid,access_token}).then(res=>{
								wx.showLoading({
								  title: '录音加载中',
								  duration: 500,
								});
								this.filepath = res.data.data.filepath;
								this.filename = res.data.data.filename;
								var data=res.data.data;
								data.audioList=[]
								if(this.filename!==''){
									this.hasRecord=true;
									this.isButtonDisabled=true;
									this.download(res=>{
										let tempFilePath=res
									
										data.audioList.push({
											tempFilePath
										})
										this.luyingcunchu.push(data)
									});																																			
								}else{
									this.luyingcunchu.push(data)
									this.hasRecord=false;
								}
							})
							// ajax('/adminspa/audio/getOneInfoById',reqData).then(res=>{
							// 			if(res){
							// 				
							// 			}
							// })
						}		
				})
			
			}
		},
		//上一页跳转
		prepage(){
			var prArr=this.luyingcunchu.filter(item=>item.audioList)
			if(prArr.length!=0){
				var prepageArr=this.luyingcunchu[this.pers1].audioList.filter(item=>item.fileSize)
				if(!this.isSuccess&&prepageArr.length!=0){
						uni.showModal({
						title: '温馨提示',
						content: '录音未保存',
						showCancel: true,				
						confirmText:'去保存',
						cancelText:'不保存',
						success: res => {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								this.isSuccess=false;
								innerAudioContext.pause();
								this.playing=false;
								this.pre();
						
							}					
						}
					});
					
				}else{
					innerAudioContext.pause();
					this.playing=false;
					this.pre()
				
				}
			}
		},
		// 下一页跳转具体实现
		next(){
			let total;
			if(this.type==1){
				total=uni.getStorageSync('totalA')-1
			}else if(this.type==2){
				total=uni.getStorageSync('totalB')-1
			}else if(this.type==3){
				total=uni.getStorageSync('totalC')-1
			}
			if(this.pages>=total){
				uni.showToast({
					title: '暂无下一条',
					duration: 2000,
					icon: 'none'
				});
				if(this.lastFlag){
					this.pages=parseInt(this.pages)-1;
				}
				return;
			}else{
				this.voicePath='';
				this.duration='';
				this.pages=parseInt(this.pages)+1;
				if(this.type==1){
					this.getJumpTargets=  '/adminspa/rprocess/getJumpTargets'
				}else if(this.type==2){
					this.getJumpTargets=  '/adminspa/questions/index?type=2'
				}else if(this.type==3){
					this.getJumpTargets=  '/adminspa/special/index?type=3'
				}
				let	isApplet='1'
				let	callflowid=this.callflowid
				let	access_token=getToken()	
				ajax(this.getJumpTargets,{isApplet,callflowid,access_token}).then(res=>{
						let id;//每一页的id
						let callflowid;//每一页的callflowid
						if(this.type==1){
							// let arr=res.data.data.list[this.pages];
							id=res.data.data.list[0].data[this.pages].id
							callflowid=this.callflowid
						}else{
							let arr=res.data.data[this.pages];
							id=res.data.data[this.pages].id
							callflowid=res.data.data[this.pages].callflowid
						};
						// let reqData={
						// 		id:id,
						// 		callflowid:pagecowfowid,
						// 		access_token: this.$store.state.token
						// 	}
						return reqNodeInfo({id,callflowid,access_token})
						// return ajax('/adminspa/rprocess/getNodeInfo',reqData);
				}).then(res=>{
						this.nodename=res.data.data.name;
						return res.data.data.audio
						
				}).then(audios=>{
						this.luyingcunchu=[];
						for(let i=0;i<audios.length;i++){	
							if(audios[i].type!=1){
								continue
							}
							let id=audios[i].fileid
							// let reqData={
							// 	id:audios[i].fileid,
							// 	callflowid:this.callflowid,
							// 	access_token: this.$store.state.token
							// 	};
							reqOneInfoById({id,callflowid,access_token}).then(res=>{
									wx.showLoading({
								  title: '录音加载中',
								  duration: 500,
								});
								
								this.filepath = res.data.data.filepath;
								this.filename = res.data.data.filename;
								var data=res.data.data;
								data.audioList=[]
								if(this.filename!==''){
									this.hasRecord=true;
									this.isButtonDisabled=true;
									this.download(res=>{
										let tempFilePath=res
									
										data.audioList.push({
											tempFilePath
										})
										this.luyingcunchu.push(data)
										
									});																																			
								}else{
									this.luyingcunchu.push(data)
									this.hasRecord=false;
								}
							})
							// ajax('/adminspa/audio/getOneInfoById',reqData).then(res=>{
							// 			if(res){
							// 			
							// 			}
							// })
						}		
					})
			
			}
		},
		//下一页跳转
		nextpage(){
			var prArr=this.luyingcunchu.filter(item=>item.audioList)
			if(prArr.length!=0){
			var prepageArr=this.luyingcunchu[this.pers1].audioList.filter(item=>item.fileSize)
			if(!this.isSuccess&&prepageArr.length!=0){
				uni.showModal({
					title: '温馨提示',
					content: '录音未保存',
					showCancel: true,				
					confirmText:'去保存',
					cancelText:'不保存',
					success: res => {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							
							this.isSuccess=false;
							this.playing=false;
							innerAudioContext.pause();
							this.next();
							
						}	
					}
				});
						
			}else{
				innerAudioContext.pause();
				this.playing=false;
				this.next();
					
			}
		}
		}
		
    }
}
</script>

<style>
	.tede_all{
		padding: 18px;
		background-color: #fff;
/* 		margin-bottom: 240px;
 */		overflow-y: scroll;
	}
	.tede_con{
		color: #999;
		font-size: 12px;
		margin: 3px 0;
	}
	.space10 {
		background-color: #f5f5f5;
		padding: 5px;
	}
	.tede_audio{
		position: relative;
		text-align: center;
		color: #ccc;
	}
	.tede_bottom{
		position: fixed;
		bottom: 15upx;
		background-color: #FFFFFF;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.tede_bottom button{
		font-size: 14px;
		width: 100px;
		height: 36px;
		line-height: 36px;
		background-color: #3690ff;
		border-color: #3690ff;
		color: #fff;
	}
	.btn_te{
		color: #3690ff !important;
		background-color:transparent !important;
	}
	.tede_bottom button::after {
		border: 1px solid #3690ff;
	}
	button[disabled]{
		background-color: #3892ff80 !important;
		border-color: transparent !important;
		color: #fff !important;
	}
	.recording {
		padding-top: 7px;
		text-align: center;
		text-align: center;
		flex-direction: column;
		justify-content: flex-end;
	}
	.recording-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.record-content{
		position: relative;
		display:inline-block;
	}
	.record-content .btn{
		
		box-sizing:border-box;
		border-radius:50%;
		border:transparent;
		padding:0;
		background:none;
		border: none;
	}
	.record-img {
		width:90px;
		height:90px;
		border:1px solid #ccc;
		border-radius:50%;
		display:flex;
		flex-direction:column;
		align-items:center;
		}
	.record-img.active{
		background-color: #007AFF;
	}
	.recording-time {
		text-align: center;
		font-size: 40upx;
		color: #1296db;
	}
	.record-img image{
		display:inline-block;
		width:20px;
		height: 25px;
		margin-top:35px;
	}
	.animation1 {
	  width: 110px;
	  height: 110px;
	  border-radius: 50%;
	  border: 1px solid #3691FF;
	  position: absolute;
	  top: -10px;
	  left: -10px;
	  -webkit-animation: animation1 0.5s ease 0s infinite alternate;
	}
	.animation2 {
	  width: 100px;
	  height: 100;
	  border-radius: 50%;
	  border: 1px solid #3691FF;
	  position: absolute;
	  top: -5px;
	  left: -5px;
	  -webkit-animation: animation2 0.5s ease 0s infinite alternate;
	}
	.record-state{
		margin: 0 10px;
		color: #6ac96a;
	}
	@keyframes animation1 {
	  0% {
		opacity: 0;
		width: 90px;
		height: 90px;
		position: absolute;
		top: 0;
		left: 0;
	  }
	  100% {
		opacity: 0.6;
		width: 110px;
		height: 110px;
	  }
	}
	@keyframes animation2 {
	  0% {
		opacity: 0;
		width: 90px;
		height: 90px;
		position: absolute;
		top: 0;
		left: 0;
	  }
	  100% {
		opacity: 0.6;
		width: 100px;
		height:100px;
	  }
	}
	.record{
	    margin-top: 15px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 40px;
	}
	.record .voice {
	  position: relative;
	  box-sizing: border-box;
	  display: flex;
	  flex-direction: row;
	  width: 180px;
	  height: 40px;
	  border: 1px solid #7F8389;
	  border-radius: 5px;
	  color:#7F8389;
	  }
	  .record .voice.active {
		border: 1px solid #3690ff;
		color: #3690ff;
	   }
	  .icon-voice image{
		  display:inline-bock;
		  width:20px;
		  height:20px;
		  padding: 10px;
	  }
	  .time{
		width:100%;
		line-height:40px;
		padding:0 5px;
		font-size:14px;
	  }
	  .time text{
		  font-size:16px;
	  }
	  .icon-delet{
		padding: 5px;
		display:inline-block;
		width:18px;
		height:18px;
		border-radius:100%;
		border: 1px solid #3690ff;
		margin-top: 5px;
	  }
	  .de_textear{
		  font-size: 12px;  
		  border: 1px solid #7F8389;
		  border-radius: 5px;
		  padding: 8px;
		  min-height: 120px;
		  color: #7F8389;
	  }
	  .de_textear.active{
	  	color: #3690ff;
		border: 1px solid #3690ff;
	  }
	  .tede_top{
		 margin-bottom: 15px;
	  }
	  .click_text{
		  padding: 5px;
		  color: #ccc;
		  font-size: 13px;
	  }
	  .ck_text{
		  font-size: 12px;
		  color: #000;
	  }
	  checkbox{
		zoom: 60%;
	  }
	  .de_all_bottom{
		  position: fixed;
		  bottom: 0;
		  height: 240px;
		  background-color: #fff;
		  width: 100%;
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
	  .border_top{
		  border-top: 1px solid #f5f5f5;
	  }
</style>
