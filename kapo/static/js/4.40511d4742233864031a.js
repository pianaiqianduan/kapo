webpackJsonp([4],{"0Yom":function(t,e){},"1DHf":function(t,e,s){"use strict";var i=s("kbG3"),l=s("0FxO"),o=function(){return{title:[String,Number],value:[String,Number,Array],isLink:Boolean,isLoading:Boolean,inlineDesc:[String,Number],primary:{type:String,default:"title"},link:[String,Object],valueAlign:[String,Boolean,Number],borderIntent:{type:Boolean,default:!0},disabled:Boolean,arrowDirection:String,alignItems:String}},n=s("wmxo"),r=function(t,e){return t.$parent&&void 0!==t.$parent[e]?t.$parent[e]:t.$parent&&t.$parent.$parent&&void 0!==t.$parent.$parent[e]?t.$parent.$parent[e]:void 0},a=(i.a,o(),{name:"cell",components:{InlineDesc:i.a},props:o(),created:function(){0},beforeMount:function(){this.hasTitleSlot=!!this.$slots.title,this.$slots.value},computed:{labelStyles:function(){return Object(n.a)({width:r(this,"labelWidth"),textAlign:r(this,"labelAlign"),marginRight:r(this,"labelMarginRight")})},valueClass:function(){return{"vux-cell-primary":"content"===this.primary||"left"===this.valueAlign,"vux-cell-align-left":"left"===this.valueAlign,"vux-cell-arrow-transition":!!this.arrowDirection,"vux-cell-arrow-up":"up"===this.arrowDirection,"vux-cell-arrow-down":"down"===this.arrowDirection}},labelClass:function(){return{"vux-cell-justify":"justify"===this.$parent.labelAlign||"justify"===this.$parent.$parent.labelAlign}},style:function(){if(this.alignItems)return{alignItems:this.alignItems}}},methods:{onClick:function(){!this.disabled&&Object(l.a)(this.link,this.$router)}},data:function(){return{hasTitleSlot:!0,hasMounted:!1}}}),u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"weui-cell",class:{"vux-tap-active":t.isLink||!!t.link,"weui-cell_access":t.isLink||!!t.link,"vux-cell-no-border-intent":!t.borderIntent,"vux-cell-disabled":t.disabled},style:t.style,on:{click:t.onClick}},[s("div",{staticClass:"weui-cell__hd"},[t._t("icon")],2),t._v(" "),s("div",{staticClass:"vux-cell-bd",class:{"vux-cell-primary":"title"===t.primary&&"left"!==t.valueAlign}},[s("p",[t.title||t.hasTitleSlot?s("label",{staticClass:"vux-label",class:t.labelClass,style:t.labelStyles},[t._t("title",[t._v(t._s(t.title))])],2):t._e(),t._v(" "),t._t("after-title")],2),t._v(" "),s("inline-desc",[t._t("inline-desc",[t._v(t._s(t.inlineDesc))])],2)],1),t._v(" "),s("div",{staticClass:"weui-cell__ft",class:t.valueClass},[t._t("value"),t._v(" "),t._t("default",[t._v(t._s(t.value))]),t._v(" "),t.isLoading?s("i",{staticClass:"weui-loading"}):t._e()],2),t._v(" "),t._t("child")],2)},staticRenderFns:[]};var c=s("VU/8")(a,u,!1,function(t){s("0Yom")},null,null);e.a=c.exports},D7i9:function(t,e){},Ya8g:function(t,e){},bKoF:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("Dd8w"),l=s.n(i),o=s("rHil"),n=s("2sLL"),r=s("HqzV"),a=s("rGqP"),u=s("1DHf"),c=s("NYxO");s("Ya8g"),o.a,n.a,r.a,a.a,u.a,l()({},Object(c.c)(["chooseStoreObj"]),{getResult:function(t){this.results=t?function(t,e){var s=e,i=[],l=!1;for(var o in s)-1!=s[o].title.search(t)?(l=!0,i.push({title:s[o].title,key:s[o].key,customerCode:s[o].customerCode,storescode:s[o].storescode})):l||o!=s.length-1||i.push({title:"没有匹配结果,请检查门店名称是否正确"});return i}(this.value,this.storeList):[]},onFocus:function(){var t,e;this.value||(this.results=(t=this.storeList,e=[],t.map(function(t){e.push({title:t.title,key:t.key,customerCode:t.customerCode,storescode:t.storescode})}),e))},resultClick:function(t){"没有匹配结果,请检查门店名称是否正确"!=t.title&&(this.$vux.loading.show({text:"Loading"}),this.chooseStoreObj(t),this.storeName=t.title,this.$vux.loading.hide())},sure:function(){this.storeName?(sessionStorage.ischoose="choose",this.$router.push({path:"/"})):this.$vux.alert.show({title:"注意",content:"请选中门店后再下单"})}});var h={name:"selectStore",components:{Group:o.a,XButton:n.a,Search:r.a,Divider:a.a,Cell:u.a},data:function(){return{results:[],value:"",storeName:"",storeList:[]}},watch:{value:function(t){t||(this.results=this.storeList)}},created:function(){var t=JSON.parse(sessionStorage.kaStoreList),e=[];for(var s in t){var i={key:t[s].customerId,title:t[s].customerName+"(门店编码"+t[s].customerCode+")",customerCode:t[s].customerCode,storescode:t[s].storescode};e.push(i)}this.storeList=e,console.log(e)},methods:l()({},Object(c.c)(["chooseStoreObj"]),{getResult:function(t){this.results=t?function(t,e){var s=e,i=[],l=!1;for(var o in s)-1!=s[o].title.search(t)?(l=!0,i.push({title:s[o].title,key:s[o].key,customerCode:s[o].customerCode,storescode:s[o].storescode})):l||o!=s.length-1||i.push({title:"没有匹配结果,请检查门店名称是否正确"});return i}(this.value,this.storeList):[]},onFocus:function(){var t,e;this.value||(this.results=(t=this.storeList,e=[],t.map(function(t){e.push({title:t.title,key:t.key,customerCode:t.customerCode,storescode:t.storescode})}),e))},resultClick:function(t){"没有匹配结果,请检查门店名称是否正确"!=t.title&&(this.$vux.loading.show({text:"Loading"}),this.chooseStoreObj(t),this.storeName=t.title,this.$vux.loading.hide())},sure:function(){this.storeName?(sessionStorage.ischoose="choose",this.$router.push({path:"/"})):this.$vux.alert.show({title:"注意",content:"请选中门店后再下单"})}})};var d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"store"},[s("div",{staticClass:"selectStore"},[s("divider",{staticStyle:{"margin-bottom":"15%"}},[t._v("门店选择")]),t._v(" "),s("search",{attrs:{top:"46px",position:"absolute",results:t.results,"auto-scroll-to-top":"",placeholder:"门店名称"},on:{"on-result-click":t.resultClick,"on-change":t.getResult,"on-focus":t.onFocus},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),t._v(" "),s("divider",[t._v("选择结果")]),t._v(" "),s("div",{staticStyle:{"margin-top":"25%"}},[s("group",{attrs:{"label-width":"5em"}},[s("cell",{attrs:{title:"所选门店:","value-align":"left"}},[s("div",[s("span",{staticStyle:{color:"green"}},[t._v(t._s(t.storeName))])])])],1)],1),t._v(" "),s("div",{staticClass:"sure"},[s("x-button",{staticStyle:{"margin-right":"0"},attrs:{type:"primary"},nativeOn:{click:function(e){return t.sure(e)}}},[t._v("去下单")])],1)],1)},staticRenderFns:[]};var v=s("VU/8")(h,d,!1,function(t){s("D7i9")},"data-v-2438f554",null);e.default=v.exports}});
//# sourceMappingURL=4.40511d4742233864031a.js.map