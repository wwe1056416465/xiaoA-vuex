(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/crm/crm"],{"32f4":function(t,e,n){"use strict";n.r(e);var a=n("a244"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e["default"]=i.a},a244:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("a34a")),i=r(n("9dcb"));function r(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,a,i,r,s){try{var o=t[r](s),c=o.value}catch(u){return void n(u)}o.done?e(c):Promise.resolve(c).then(a,i)}function o(t){return function(){var e=this,n=arguments;return new Promise(function(a,i){var r=t.apply(e,n);function o(t){s(r,a,i,o,c,"next",t)}function c(t){s(r,a,i,o,c,"throw",t)}o(void 0)})}}var c=function(){return n.e("components/tab-nvue/mediaList").then(n.bind(null,"a2d1"))},u=function(){return n.e("components/imt-audio/imt-audio").then(n.bind(null,"b327"))},d=t.createInnerAudioContext(),h={components:{mediaList:c,imtAudio:u},data:function(){return{audio:{src:"",duration:0},current:0,paused:!0,loading:!1,scrollLeft:0,isClickChange:!1,tabIndex:0,crmShow:{},jcdrShow:{},infoShow:{},recoList:[],tabBars:[{name:"客户资料",id:"kehuziliao"},{name:"通话结果",id:"tonghuajieguo"},{name:"通话记录",id:"tonghuajilu"}],array:["男","女","未识别"],personC:"",index:0,crmId:"",starttime:"",calleeno:"",jobid:""}},onLoad:function(t){this.crmId=t.id;var e=t.date;e=Number(e),this.starttime=(0,i.default)(e).format("YYYY-MM-DD HH:mm:ss"),this.calleeno=t.calleeno,this.jobid=t.jobid},onShow:function(){this.getcrmInfo(),this.getJcdrInfo(),this.getsession()},created:function(){var t=this;this.current=0,d.obeyMuteSwitch=!1,d.autoplay=!1,d.onTimeUpdate(function(){t.current=d.currentTime}),d.onPlay(function(){t.paused=!1,t.loading=!1}),d.onPause(function(){t.paused=!0}),d.onEnded(function(){t.paused=!0,t.current=0})},watch:{src:function(t){audio.src=t,this.current=0,audio.play(),this.loading=!0}},methods:{showmsg:function(){d.pause()},kaiguan:function(t){var e=this;this.$refs.child1.stopchild(),d.src=this.$url+"adminspa/file/readfile.html?filename="+t+"&access_token="+this.$store.state.token,d.paused?(d.play(),e.loading=!0):d.pause()},person:function(t){this.personC!==t.target.dataset.type&&this.jcdrShow.category!=t.target.dataset.type&&(this.personC=t.target.dataset.type)},getcrmInfo:function(){var e=this;t.request({url:this.$url+"adminspa/Jcdr/showInfo",header:{"Content-Type":"application/x-www-form-urlencoded",charset:"utf-8","X-Requested-With":"XMLhttpRequest"},data:{callid:this.crmId,date:this.starttime,calleeno:this.calleeno,jobid:this.jobid,access_token:this.$store.state.token},success:function(t){e.infoShow=t.data.data,null===e.infoShow.company&&(e.infoShow.company=""),null===e.infoShow.remark&&(e.infoShow.remark="")}})},getJcdrInfo:function(){var e=this;t.request({url:this.$url+"adminspa/Jcdr/getJcdrInfo",method:"POST",header:{"Content-Type":"application/x-www-form-urlencoded",charset:"utf-8","X-Requested-With":"XMLhttpRequest"},data:{callid:this.crmId,date:this.starttime,access_token:this.$store.state.token},success:function(t){var n=t.data.data;n.tag=n.tag.split("|"),n.callNum=n.records.length,e.jcdrShow=n,e.audio.duration=n.duration}})},getsession:function(){var e=this;t.request({url:this.$url+"adminspa/Jcdr/seeSess",method:"POST",header:{"Content-Type":"application/x-www-form-urlencoded",charset:"utf-8","X-Requested-With":"XMLhttpRequest"},data:{callid:this.crmId,date:this.starttime,access_token:this.$store.state.token},success:function(t){e.crmShow=t.data.data,e.recoList=t.data.data.record,e.audio.src=e.$url+"adminspa/File/readFile?filename="+e.crmShow.sesrec+"&access_token="+e.$store.state.token}})},saveinfo:function(){t.request({url:this.$url+"adminspa/Jcdr/saveUinfo",method:"POST",header:{"Content-Type":"application/x-www-form-urlencoded",charset:"utf-8","X-Requested-With":"XMLhttpRequest"},data:{name:this.infoShow.name,phone1:this.infoShow.calleeno,company:this.infoShow.company,addr:this.infoShow.address,access_token:this.$store.state.token},success:function(e){t.switchTab({url:"/pages/tabBar/crm/crm"})}})},sexs:function(t){this.index=t.target.value},changeTab:function(){var e=o(a.default.mark(function e(n){var i,r,s,o,c,u,d,h,l;return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(i=n.target.current,!this.isClickChange){e.next=5;break}return this.tabIndex=i,this.isClickChange=!1,e.abrupt("return");case 5:return e.next=7,this.getElSize("tab-bar");case 7:r=e.sent,s=r.scrollLeft,o=0,c=0;case 11:if(!(c<i)){e.next=19;break}return e.next=14,this.getElSize(this.tabBars[c].id);case 14:u=e.sent,o+=u.width;case 16:c++,e.next=11;break;case 19:return d=t.getSystemInfoSync().windowWidth,e.next=22,this.getElSize(this.tabBars[i].id);case 22:h=e.sent,l=h.width,o+l-s>d&&(this.scrollLeft=o+l-d),o<s&&(this.scrollLeft=o),this.isClickChange=!1,this.tabIndex=i;case 28:case"end":return e.stop()}},e,this)}));function n(t){return e.apply(this,arguments)}return n}(),getElSize:function(e){return new Promise(function(n,a){t.createSelectorQuery().select("#"+e).fields({size:!0,scrollOffset:!0},function(t){n(t)}).exec()})},tapTab:function(){var t=o(a.default.mark(function t(e){var n,i,r;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.target.dataset.current,this.tabIndex!==n){t.next=5;break}return t.abrupt("return",!1);case 5:return t.next=7,this.getElSize("tab-bar");case 7:i=t.sent,r=i.scrollLeft,this.scrollLeft=r,this.isClickChange=!0,this.tabIndex=n;case 12:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}};e.default=h}).call(this,n("543d")["default"])},b223:function(t,e,n){"use strict";var a=n("c36b"),i=n.n(a);i.a},c36b:function(t,e,n){},dff5:function(t,e,n){"use strict";n.r(e);var a=n("e3eb"),i=n("32f4");for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);n("b223");var s=n("2877"),o=Object(s["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=o.exports},e3eb:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})}},[["7b58","common/runtime","common/vendor"]]]);