(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-template-template"],{"16b2":function(t,e,i){var n=i("b10b");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("5c974b45",n,!0,{sourceMap:!1,shadowMode:!1})},"1bc9":function(t,e,i){"use strict";i.r(e);var n=i("5631"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a},"2acc":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-tab-bar"},[i("v-uni-view",{staticClass:"tabs"},[i("v-uni-view",{class:{tab_active:0==t.cur},on:{click:function(e){e=t.$handleEvent(e),t.cur=0}}},[t._v("主流程")]),i("v-uni-view",{class:{tab_active:1==t.cur},on:{click:function(e){e=t.$handleEvent(e),t.cur=1}}},[t._v("问题流程")]),i("v-uni-view",{class:{tab_active:2==t.cur},on:{click:function(e){e=t.$handleEvent(e),t.cur=2}}},[t._v("特殊流程")])],1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:0==t.cur,expression:"cur==0"}],staticClass:"content"},t._l(t.templates,function(e,n){return i("v-uni-view",{key:n,staticClass:"tem_list",on:{click:function(e){e=t.$handleEvent(e),t.tem_List(t.callflowid)}}},[i("v-uni-view",{staticClass:"tem_left"},[t._v(t._s(e.contextName))])],1)}),1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1==t.cur,expression:"cur==1"}],staticClass:"content"},t._l(t.qustions,function(e,n){return i("v-uni-view",{key:n},[i("v-uni-view",{staticClass:"tem_list",on:{click:function(i){i=t.$handleEvent(i),t.tem_questions(e.id,e.callflowid,e.pages,e.type)}}},[i("v-uni-view",{staticClass:"tem_left"},[t._v(t._s(e.name))])],1)],1)}),1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:2==t.cur,expression:"cur==2"}],staticClass:"content"},t._l(t.stuTem,function(e,n){return i("v-uni-view",{key:n,staticClass:"tem_list",on:{click:function(i){i=t.$handleEvent(i),t.tem_specli(e.id,e.callflowid,e.pages,e.type)}}},[i("v-uni-view",{staticClass:"tem_left"},[t._v(t._s(e.name))])],1)}),1)],1)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},"4f72":function(t,e,i){"use strict";var n=i("4fde"),a=i.n(n);a.a},"4fde":function(t,e,i){var n=i("c339");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("361fbfde",n,!0,{sourceMap:!1,shadowMode:!1})},5631:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;a(i("a2d1"));var n=a(i("84e6"));function a(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{cur:0,templates:{},callflowid:"",stuTem:[],qustions:{},nodename:"",audiolen:"",audiotype:""}},onLoad:function(t){this.callflowid=t.callflowid,this.industryid=t.industryid,this.useradminid=t.useradminid},onShow:function(){this.gettemInfo(),this.getquestion(),this.getspecil()},created:function(){uni.showModal({title:"温馨提示",content:"只能对语音文件或tts文件进行录音",showCancel:!1,confirmText:"确定",success:function(t){t.confirm?console.log("用户点击确定"):t.cancel}})},methods:{gettemInfo:function(){var t=this,e={callflowid:this.callflowid,access_token:this.$store.state.token};(0,n.default)("/adminspa/rprocess/getBasicNodeLevel",e).then(function(e){t.templates=e.data.data})},getquestion:function(){var t=this,e={access_token:this.$store.state.token};(0,n.default)("/adminspa/questions/index?callflowid="+this.callflowid+"&type=2",e).then(function(e){t.nodename=e.data.data.name;for(var i=0;i<e.data.data.length;i++)e.data.data[i].pages=i;t.qustions=e.data.data,uni.setStorageSync("nodename",t.nodename),uni.setStorageSync("total",e.data.data.length)})},getspecil:function(){var t=this,e={access_token:this.$store.state.token};(0,n.default)("/adminspa/special/index?callflowid="+this.callflowid+"&type=3",e).then(function(e){var i=e.data.data;t.stuTem=[];for(var n=0;n<i.length;n++)e.data.data[n].name=i[n].name,e.data.data[n].pages=n;t.stuTem=e.data.data,uni.setStorageSync("total",e.data.data.length)})},tem_List:function(t){uni.navigateTo({url:"/pages/template/temlist/temlist?callflowid="+t})},tem_questions:function(t,e,i,n){uni.showToast({title:"录音请在微信小程序",duration:2e3,icon:"none"})},tem_specli:function(t,e,i,n){uni.showToast({title:"录音请在微信小程序",duration:2e3,icon:"none"})}}};e.default=o},"84e6":function(t,e,i){"use strict";function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"POST",n=uni.getStorageSync("yuming");if("GET"===i){var a="";return Object.keys(e).forEach(function(t){a+=t+"="+e[t]+"&"}),""!==a&&(a=a.substring(0,a.lastIndexOf("&")),t=t+"?"+a),new Promise(function(e,a){uni.request({url:n+t,method:i,header:{"Content-Type":"application/x-www-form-urlencoded",charset:"utf-8","X-Requested-With":"XMLhttpRequest"},success:function(t){e(t)},fail:function(t){console.log("errrr"),uni.navigateTo({url:"/pages/login/login"}),a(t)}})})}return new Promise(function(a,o){uni.request({url:n+t,method:i,header:{"Content-Type":"application/x-www-form-urlencoded",charset:"utf-8","X-Requested-With":"XMLhttpRequest"},data:e,success:function(t){a(t)},fail:function(t){console.log("errrr"),uni.navigateTo({url:"/pages/login/login"}),o(t)}})})}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},9857:function(t,e,i){"use strict";i.r(e);var n=i("afec"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a},a2d1:function(t,e,i){"use strict";i.r(e);var n=i("ae37"),a=i("9857");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("f8b8");var s=i("2877"),c=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,"53cb84ec",null);e["default"]=c.exports},ac0c:function(t,e,i){"use strict";i.r(e);var n=i("2acc"),a=i("1bc9");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("4f72");var s=i("2877"),c=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,"183e37f2",null);e["default"]=c.exports},ae37:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"list-cell",attrs:{"hover-class":"uni-list-cell-hover"},on:{click:function(e){e=t.$handleEvent(e),t.bindClick(e)}}},[t.options.title?i("v-uni-view",{staticClass:"media-list"},[i("v-uni-view",{class:{"media-image-right":2===t.options.article_type,"media-image-left":1===t.options.article_type}},[i("v-uni-text",{staticClass:"media-title",class:{"media-title2":1===t.options.article_type||2===t.options.article_type}},[t._v(t._s(t.options.title))]),t.options.image_list||t.options.image_url?i("v-uni-view",{staticClass:"image-section",class:{"image-section-right":2===t.options.article_type,"image-section-left":1===t.options.article_type}},[t.options.image_url?i("v-uni-image",{staticClass:"image-list1",class:{"image-list2":1===t.options.article_type||2===t.options.article_type},attrs:{src:t.options.image_url}}):t._e(),t._l(t.options.image_list,function(e,n){return t.options.image_list?i("v-uni-image",{key:n,staticClass:"image-list3",attrs:{src:e.url}}):t._e()})],2):t._e()],1),i("v-uni-view",{staticClass:"media-foot"},[i("v-uni-view",{staticClass:"media-info"},[i("v-uni-text",{staticClass:"info-text"},[t._v(t._s(t.options.source))]),i("v-uni-text",{staticClass:"info-text"},[t._v(t._s(t.options.comment_count)+"条评论")]),i("v-uni-text",{staticClass:"info-text"},[t._v(t._s(t.options.datetime))])],1),i("v-uni-view",{staticClass:"max-close-view",on:{click:function(e){e.stopPropagation(),e=t.$handleEvent(e),t.close(e)}}},[i("v-uni-view",{staticClass:"close-view"},[i("v-uni-text",{staticClass:"close"},[t._v("×")])],1)],1)],1)],1):t._e()],1)],1)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},afec:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{options:{type:Object,default:function(t){return{}}}},methods:{close:function(t){this.$emit("close")},bindClick:function(){this.$emit("click")}}};e.default=n},b10b:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"uni-view[data-v-53cb84ec]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box}.list-cell[data-v-53cb84ec]{width:%?750?%;padding:0 %?30?%}.uni-list-cell-hover[data-v-53cb84ec]{background-color:#eee}.media-list[data-v-53cb84ec]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;border-bottom-width:%?1?%;border-bottom-style:solid;border-bottom-color:#c8c7cc;padding:%?20?% 0}.media-image-right[data-v-53cb84ec]{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.media-image-left[data-v-53cb84ec]{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.media-title[data-v-53cb84ec]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.media-title[data-v-53cb84ec]{lines:3;-o-text-overflow:ellipsis;text-overflow:ellipsis;font-size:%?32?%;color:#555}.media-title2[data-v-53cb84ec]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;margin-top:%?6?%;line-height:%?40?%}.image-section[data-v-53cb84ec]{margin-top:%?20?%;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.image-section-right[data-v-53cb84ec]{margin-top:%?0?%;margin-left:%?10?%;width:%?225?%;height:%?146?%}.image-section-left[data-v-53cb84ec]{margin-top:%?0?%;margin-right:%?10?%;width:%?225?%;height:%?146?%}.image-list1[data-v-53cb84ec]{width:%?690?%;height:%?481?%}.image-list2[data-v-53cb84ec]{width:%?225?%;height:%?146?%}.image-list3[data-v-53cb84ec]{width:%?225?%;height:%?146?%}.media-info[data-v-53cb84ec]{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.info-text[data-v-53cb84ec]{margin-right:%?20?%;color:#999;font-size:%?24?%}.media-foot[data-v-53cb84ec]{margin-top:%?20?%;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.max-close-view[data-v-53cb84ec]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;height:%?40?%;width:%?80?%}.close-view[data-v-53cb84ec]{border-style:solid;border-width:1px;border-color:#999;border-radius:%?10?%;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;height:%?30?%;width:%?40?%;line-height:%?30?%}.close[data-v-53cb84ec]{text-align:center;color:#999;font-size:%?28?%}",""])},c339:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".uni-tab-bar-loading[data-v-183e37f2]{text-align:center;font-size:%?28?%;color:#999}.swiper-tab-list[data-v-183e37f2]{width:50%;padding:10px 0}.swiper-tab-list.active[data-v-183e37f2]{border-bottom:2px solid #007aff}.tem_top[data-v-183e37f2]{text-align:center;padding:10px\n}.space10[data-v-183e37f2]{background-color:#f5f5f5;padding:5px}.num1[data-v-183e37f2]{color:#47c577;font-size:13px;margin:0 5px}.num2[data-v-183e37f2]{color:red;font-size:11px}.tem_list[data-v-183e37f2]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;border-bottom:1px solid #f1f1f1;padding:15px}.tem_list uni-view[data-v-183e37f2]{font-size:12px}.text_gr[data-v-183e37f2]{color:#79da49}.text_dg[data-v-183e37f2]{color:#ffa748}.tabs[data-v-183e37f2]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;border-bottom:1px solid #eee}.tabs uni-view[data-v-183e37f2]{text-align:center;width:50%;padding:10px}.tab_active[data-v-183e37f2]{border-bottom:3px solid #007aff;color:#007aff}",""])},f8b8:function(t,e,i){"use strict";var n=i("16b2"),a=i.n(n);a.a}}]);