
<script>
	import {getToken} from '@/utils/auth.js'
	export default {
		onLaunch: function () {
			const hasToken=getToken()
			if(!hasToken){
				// 判断token是否存在,存在表示已经登入,不存在为未登入
				// 未登入则到登入页面
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}else{
				console.log('已经登入,直接进入首页')
			}
		
			console.log('App Launch')
		},
		
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	/*每个页面公共css */
	@import "./common/base.css";
	

</style>
