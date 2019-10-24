import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false
// Vue.prototype.$url = "https://aiplus.xiaoa8.com/";
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
	store,
	...App,
	created() {

	}
})
app.$mount()
