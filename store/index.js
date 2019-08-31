import Vue from 'vue'
import Vuex from 'vuex'
import user from './moduls/user.js'
import indexInfo from './moduls/indexInfo.js'
import getters from './getters.js'
import task from './moduls/task.js'
import crm from './moduls/crm.js'
import recording from './moduls/recording.js'
Vue.use(Vuex)

const store=new Vuex.Store({
	modules:{
		user,
		indexInfo,
		task,
		crm,
		recording
	},
	getters
})

export default store