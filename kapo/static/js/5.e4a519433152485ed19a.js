webpackJsonp([5],{DPlV:function(t,e){},QlWu:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o("mvHQ"),r=o.n(s),n=o("Dd8w"),i=o.n(n),a=o("rHil"),c=o("pDNl"),l=o("2sLL"),u=o("iRq5"),d=o.n(u),f=o("pFYg"),p=o.n(f),h="can_use_webp";function v(){if("undefined"!=typeof window&&window.localStorage&&"object"===("undefined"==typeof localStorage?"undefined":p()(localStorage))&&(!localStorage.getItem(h)||"available"!==localStorage.getItem(h)&&"disable"!==localStorage.getItem(h))){var t=document.createElement("img");t.onload=function(){try{localStorage.setItem(h,"available")}catch(t){}},t.onerror=function(){try{localStorage.setItem(h,"disable")}catch(t){}},t.src="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA=="}}function m(){return arguments.length>0&&void 0!==arguments[0]&&arguments[0]&&v(),"undefined"!=typeof window&&!!window.localStorage&&"available"===window.localStorage.getItem(h)}v();var g=o("OFgA"),A=(g.a,String,String,String,String,String,Number,Object,String,Number,String,{name:"x-img",mixins:[g.a],created:function(){this.$vux&&this.$vux.bus&&this.$vux.bus.$on("vux:after-view-enter",this.init)},methods:{init:function(){var t=this;this.blazy&&this.blazy.destroy(),this.$el.src=this.defaultSrc,this.$el.className=this.$el.className.replace("b-loaded",""),this.blazy=new d.a({scroller:this.scroller,container:this.container,selector:"#vux-ximg-"+this.uuid,offset:t.offset,errorClass:t.errorClass,successClass:t.successClass,separator:t.separator,success:function(e){t.$emit("on-success",t.src,e)},error:function(e,o){t.$emit("on-error",t.src,e,o)}})}},mounted:function(){var t=this;this.$el.setAttribute("id","vux-ximg-"+this.uuid),this.$nextTick(function(){setTimeout(function(){t.init()},t.delay)}),v()},computed:{currentSrc:function(){return m()&&this.webpSrc?this.webpSrc:this.src}},props:{src:String,webpSrc:String,defaultSrc:{type:String,default:"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="},errorClass:String,successClass:String,offset:{type:Number,default:100},scroller:Object,container:String,delay:{type:Number,default:0},separator:String},watch:{src:function(t){this.init()}},beforeDestroy:function(){this.blazy&&this.blazy.destroy(),this.blazy=null,this.$vux&&this.$vux.bus&&this.$vux.bus.$off("vux:after-view-enter",this.init)}}),w={render:function(){var t=this.$createElement;return(this._self._c||t)("img",{staticClass:"vux-x-img",attrs:{src:this.defaultSrc,"data-src":this.currentSrc}})},staticRenderFns:[]};var b=o("VU/8")(A,w,!1,function(t){o("DPlV")},null,null).exports,y=o("NYxO"),S=(a.a,c.a,l.a,i()({},Object(y.c)(["login_require"]),{tj:function(){var t=this;""!=this.account&&""!=this.pawd?this.$axios.get("http://192.168.16.225:8080/synear/preorderBranchServiceController.do?checkuser",{params:{userName:this.account,passWord:this.pawd,systemCode:"ba5a342de80806fe"}}).then(function(e){if(console.log(e),"6"==e.data.roleType){var o={customerCode:e.data.customerCode,customerid:e.data.customerid,storescode:e.data.storescode};localStorage.userName=t.account,localStorage.passWord=t.pawd,sessionStorage.kaObj=r()(o),t.login_require(!0),t.$router.push({path:"/"})}}).catch(function(e){t.$vux.alert.show({title:"注意",content:"服务器出错,请稍后再试"})}):this.$vux.toast.show({time:"2000",type:"warn",text:"用户名和密码不能为空"})}}),{name:"login",components:{Group:a.a,XInput:c.a,XButton:l.a,XImg:b},data:function(){return{account:"",pawd:""}},methods:i()({},Object(y.c)(["login_require"]),{tj:function(){var t=this;""!=this.account&&""!=this.pawd?this.$axios.get("http://192.168.16.225:8080/synear/preorderBranchServiceController.do?checkuser",{params:{userName:this.account,passWord:this.pawd,systemCode:"ba5a342de80806fe"}}).then(function(e){if(console.log(e),"6"==e.data.roleType){var o={customerCode:e.data.customerCode,customerid:e.data.customerid,storescode:e.data.storescode};localStorage.userName=t.account,localStorage.passWord=t.pawd,sessionStorage.kaObj=r()(o),t.login_require(!0),t.$router.push({path:"/"})}}).catch(function(e){t.$vux.alert.show({title:"注意",content:"服务器出错,请稍后再试"})}):this.$vux.toast.show({time:"2000",type:"warn",text:"用户名和密码不能为空"})}})}),x={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"login"},[o("div",{staticClass:"content"},[o("group",[o("x-input",{attrs:{placeholder:"请输入账号"},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}}),t._v(" "),o("x-input",{attrs:{placeholder:"请输入密码",type:"password"},model:{value:t.pawd,callback:function(e){t.pawd=e},expression:"pawd"}})],1)],1),t._v(" "),o("div",{staticClass:"footer"},[o("x-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return t.tj(e)}}},[t._v("登录")])],1)])},staticRenderFns:[]};var C=o("VU/8")(S,x,!1,function(t){o("hrtl")},"data-v-8d56b02a",null);e.default=C.exports},hrtl:function(t,e){},iRq5:function(t,e,o){var s,r;
/*!
  hey, [be]Lazy.js - v1.6.2 - 2016.05.09
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/void 0===(r="function"==typeof(s=function(){"use strict";var t,e,o,s="src",r="srcset";return function(s){if(!document.querySelectorAll){var r=document.createStyleSheet();document.querySelectorAll=function(t,e,o,s,n){for(n=document.all,e=[],o=(t=t.replace(/\[for\b/gi,"[htmlFor").split(",")).length;o--;){for(r.addRule(t[o],"k:v"),s=n.length;s--;)n[s].currentStyle.k&&e.push(n[s]);r.removeRule(0)}return e}}var c=this,l=c._util={};l.elements=[],l.destroyed=!0,c.options=s||{},c.options.error=c.options.error||!1,c.options.offset=c.options.offset||100,c.options.success=c.options.success||!1,c.options.selector=c.options.selector||".b-lazy",c.options.separator=c.options.separator||"|",c.options.container=!!c.options.container&&document.querySelectorAll(c.options.container),c.options.errorClass=c.options.errorClass||"b-error",c.options.breakpoints=c.options.breakpoints||!1,c.options.loadInvisible=c.options.loadInvisible||!1,c.options.successClass=c.options.successClass||"b-loaded",c.options.validateDelay=c.options.validateDelay||25,c.options.saveViewportOffsetDelay=c.options.saveViewportOffsetDelay||50,c.options.srcset=c.options.srcset||"data-srcset",c.options.src=t=c.options.src||"data-src",o=window.devicePixelRatio>1,(e={}).top=0-c.options.offset,e.left=0-c.options.offset,c.revalidate=function(){n(this)},c.load=function(t,e){var o=this.options;void 0===t.length?a(t,e,o):g(t,function(t){a(t,e,o)})},c.destroy=function(){var t=this._util;this.options.container&&g(this.options.container,function(e){m(e,"scroll",t.validateT)}),m(window,"scroll",t.validateT),m(window,"resize",t.validateT),m(window,"resize",t.saveViewportOffsetT),this.scroller&&this.scroller._xscroll&&this.scroller._xscroll.off("scroll scrollend afterrender",t.validateT,this.scroller._xscroll),t.count=0,t.elements.length=0,t.destroyed=!0},l.validateT=A(function(){i(c)},c.options.validateDelay,c),l.saveViewportOffsetT=A(function(){h(c.options.offset)},c.options.saveViewportOffsetDelay,c),h(c.options.offset),g(c.options.breakpoints,function(e){if(e.width>=window.screen.width)return t=e.src,!1}),setTimeout(function(){n(c)})};function n(t){var e=t._util;if(e.elements=function(t){for(var e=[],o=document.querySelectorAll(t),s=o.length;s--;e.unshift(o[s]));return e}(t.options.selector),e.count=e.elements.length,e.destroyed&&(e.destroyed=!1,t.options.container&&g(t.options.container,function(t){v(t,"scroll",e.validateT)}),v(window,"resize",e.saveViewportOffsetT),v(window,"resize",e.validateT),v(window,"scroll",e.validateT),t.options.scroller)){var o=t.options.scroller._xscroll,s=o.userConfig.useOriginScroll?"scroll":"scrollend";o.on("afterrender",e.validateT,t),o.on(s,e.validateT,t)}i(t)}function i(t){for(var o,s=t._util,r=0;r<s.count;r++){var n=s.elements[r];void 0,((o=n.getBoundingClientRect()).right>=e.left&&o.bottom>=e.top&&o.left<=e.right&&o.top<=e.bottom||f(n,t.options.successClass))&&(t.load(n),s.elements.splice(r,1),s.count--,r--)}0===s.count&&t.destroy()}function a(e,n,i){if(!f(e,i.successClass)&&(n||i.loadInvisible||e.offsetWidth>0&&e.offsetHeight>0)){var a=e.getAttribute(t)||e.getAttribute(i.src);if(a){var h=a.split(i.separator),A=h[o&&h.length>1?1:0],w=d(e,"img");if(w||void 0===e.src){var b=new Image,y=function(){i.error&&i.error(e,"invalid"),p(e,i.errorClass),m(b,"error",y),m(b,"load",S)},S=function(){if(w){l(e,A),u(e,r,i.srcset);var t=e.parentNode;t&&d(t,"picture")&&g(t.getElementsByTagName("source"),function(t){u(t,r,i.srcset)}),i.scroller&&i.scroller.reset()}else e.style.backgroundImage='url("'+A+'")';c(e,i),m(b,"load",S),m(b,"error",y)};v(b,"error",y),v(b,"load",S),l(b,A)}else l(e,A),c(e,i)}else d(e,"video")?(g(e.getElementsByTagName("source"),function(t){u(t,s,i.src)}),e.load(),c(e,i)):(i.error&&i.error(e,"missing"),p(e,i.errorClass))}}function c(t,e){p(t,e.successClass),e.success&&e.success(t),t.removeAttribute(e.src),g(e.breakpoints,function(e){t.removeAttribute(e.src)})}function l(t,e){t[s]=e}function u(t,e,o){var s=t.getAttribute(o);s&&(t[e]=s,t.removeAttribute(o))}function d(t,e){return t.nodeName.toLowerCase()===e}function f(t,e){return-1!==(" "+t.className+" ").indexOf(" "+e+" ")}function p(t,e){f(t,e)||(t.className+=" "+e)}function h(t){e.bottom=(window.innerHeight||document.documentElement.clientHeight)+t,e.right=(window.innerWidth||document.documentElement.clientWidth)+t}function v(t,e,o){t.attachEvent?t.attachEvent&&t.attachEvent("on"+e,o):t.addEventListener(e,o,!1)}function m(t,e,o){t.detachEvent?t.detachEvent&&t.detachEvent("on"+e,o):t.removeEventListener(e,o,!1)}function g(t,e){if(t&&e)for(var o=t.length,s=0;s<o&&!1!==e(t[s],s);s++);}function A(t,e,o){var s=0;return function(){var r=+new Date;r-s<e||(s=r,t.apply(o,arguments))}}})?s.call(e,o,e,t):s)||(t.exports=r)}});
//# sourceMappingURL=5.e4a519433152485ed19a.js.map