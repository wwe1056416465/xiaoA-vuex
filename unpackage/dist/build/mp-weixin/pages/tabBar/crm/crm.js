(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/crm/crm"],{3235:function(t,a,e){"use strict";e.r(a);var n=e("412a"),o=e("3633");for(var r in o)"default"!==r&&function(t){e.d(a,t,function(){return o[t]})}(r);e("3375");var i=e("2877"),s=Object(i["a"])(o["default"],n["a"],n["b"],!1,null,null,null);a["default"]=s.exports},3375:function(t,a,e){"use strict";var n=e("3417"),o=e.n(n);o.a},3417:function(t,a,e){},3633:function(t,a,e){"use strict";e.r(a);var n=e("f6fa"),o=e.n(n);for(var r in n)"default"!==r&&function(t){e.d(a,t,function(){return n[t]})}(r);a["default"]=o.a},"412a":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement;t._self._c},o=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return o})},f6fa:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=o(e("9dcb"));function o(t){return t&&t.__esModule?t:{default:t}}var r=function(){return e.e("components/mix-pulldown-refresh/mix-pulldown-refresh").then(e.bind(null,"ea99"))},i=function(){return e.e("components/mix-load-more/mix-load-more").then(e.bind(null,"485a"))},s={components:{mixPulldownRefresh:r,mixLoadMore:i},data:function(){return{list:[],loadMoreStatus:0,page:1,sign:"",data:""}},onShow:function(){this.data=JSON.stringify(this.$store.state.crmForm);try{var a=t.getStorageSync("sign");this.sign=a,"crmsearch"===this.sign&&(this.list=[],this.page=1,this.loadData("add"))}catch(e){}},onLoad:function(){this.loadData("add")},onHide:function(){try{t.removeStorageSync("sign"),this.$store.commit("clearCrms")}catch(a){}},onNavigationBarButtonTap:function(a){t.navigateTo({url:"/pages/crm/crmSearch"})},onReachBottom:function(){this.loadData("add")},methods:{loadData:function(a){var e=this;"add"===a&&(this.loadMoreStatus=1),setTimeout(function(){"refresh"===a&&(e.list=[],e.page=1),t.request({url:e.$url+"adminspa/Jcdr/history",method:"POST",data:{page:e.page,limit:3,data:e.data,access_token:e.$store.state.token},header:{"Content-Type":"application/x-www-form-urlencoded",charset:"utf-8","X-Requested-With":"XMLhttpRequest"},success:function(t){console.log(t,"zhang"),e.page=e.page+1;for(var a=0,n=t.data.data.length;a<n;a++)t.data.data[a].tag&&(t.data.data[a].tag=t.data.data[a].tag.split("|"));e.list=e.list.concat(t.data.data),t.data.data.length<3&&(e.loadMoreStatus=2)}}),"add"===a&&(e.loadMoreStatus=0),"refresh"===a&&(e.$refs.mixPulldownRefresh&&e.$refs.mixPulldownRefresh.endPulldownRefresh(),e.loadMoreStatus=0)},500)},detailcrm:function(a,e,o,r){var i=(0,n.default)(e,"YYYY-MM-DD HH:mm:ss").valueOf();t.navigateTo({url:"/pages/crm/crm?id="+a+"&date="+i+"&calleeno="+o+"&jobid="+r})},onPulldownReresh:function(){this.loadData("refresh")}}};a.default=s}).call(this,e("543d")["default"])}},[["be7c","common/runtime","common/vendor"]]]);