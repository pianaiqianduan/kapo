<template>
    <div class="add">
        <div class="titS" ref="titS">
            <search top="46px" placeholder="产品名称"   v-model="value"
            @on-change="getResult"  @on-cancel="cancel"  @on-focus="onFocus" @on-blur="onBlur">
                <checklist :options="results" v-model="valueA" @on-change="choose"></checklist>
            </search>
            <div style="height:44px;width:100%" v-show="isShow"></div>
            <div class="icon">
                <img src="./../../assets/image/saoma.png" alt="" style="width:10%;height:10%">
                <x-button type="primary" style="width:65%;font-size:16px" @click.native="open">打开相机扫描包装袋条码</x-button>
            </div>
            <divider >搜索产品列表</divider>
            <button-tab v-model="demo01" style="margin-top:10px">
                <button-tab-item selected>箱</button-tab-item>
                <button-tab-item>袋</button-tab-item>
            </button-tab>
        
        </div>
        <div v-if="this.noChangeList">
            <div  v-if="!demo01" >
                <div class="content" style="margin-top:190px">
                    <pannel></pannel>
                </div>
            </div>
            <div v-else>
                <div class="content" style="margin-top:190px">
                    <pannelbag ></pannelbag>
                </div>
            </div>
        </div>
        <div v-else class="content">
            <p style="font-size: 14px;color: gray;text-align:center">暂无产品信息</p>
        </div>
        
        <close></close>
        
    </div>
</template>

<script>
import { Search, XButton, Divider, Checklist,ButtonTab, ButtonTabItem } from 'vux'
import { mapMutations,mapState } from 'vuex'
import pannel from './children/pannel'
import pannelBag from './children/pannelBag'
import close from './children/close'
export default {
    name:"add",
    components:{
        Search,
        XButton,
        Divider,
        pannel,
        close,
        Checklist,
        ButtonTab, 
        ButtonTabItem,
        pannelbag:pannelBag
    },
    data(){
        return{
            value:"",      //搜索框中的值
            valueA:[],     //多选组件中选中的值
            results:[],    //搜索到的结果
            isShow:false,  //div是否显示
            docmHeight: document.documentElement.clientHeight,  //页面的高度
            showHeight: document.documentElement.clientHeight,
            hidshow:true ,  //判断页面高度时传出去的参数
            demo01:0
        }
    },
    methods:{
        ...mapMutations(['setChooseList','scanChooseListBox','scanChooseListBag','noChangeList','checkedArr','cancelCheckedArr']),       //mutation中的方法动态改变state中的数据
        getResult(val){  //输入文字变化触发
            this.results = val? getResult(this.value):[]
        },
         choose(val){   //当多选值发生变化时
            this.checkedArr(val)
        },
        cancel(){  //点击取消时触发
            this.$store.commit('changeHeaderRight','门店选择')
            this.isShow = false
            this.results = []
            this.value = ''
            this.valueA = []
            this.cancelCheckedArr()
        },
        onFocus(){ //获取焦点时
        this.$refs.titS.style.zIndex ='999'
        this.results = []
        this.isShow = true
            if(this.value){
                this.value = ''
                this.results = []
            }
        },
        onBlur(){
            this.isShow = true
        },
        open(){
            let _this = this
            _this.$wechat.scanQRCode({
                 needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                 scanType: ["barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                 success: function (res) {
                    //  '{"resultStr":"EAN_13,6921665714849","errMsg":"scanQRCode:ok"}'
                    // alert(res.resultStr)
                    // let data =JSON.parse(res.data)
                    let code = res.resultStr
                    
                    let codeT = code.split(',')[1]
                    if(codeT){
                            // alert(codeT)
                        let productListObj = JSON.parse(sessionStorage.productList)
                        let sapIds =[]
                        let opt = ''
                        for(let j in productListObj){
                            if(productListObj[j].barcode == codeT){
                                sapIds.push(productListObj[j].productSapId)
                                
                            }
                            if(j == productListObj.length-1 ){
                                // let ids = ['0020011926','0020011926','0020011926','0020011926']
                                for(let j in sapIds){
                                    if(opt!=''){
                                        opt=opt+','+sapIds[j]
                                    }else{
                                        opt+=sapIds[j]
                                    }
                                    
                                }
                                
                            }
                            
                        }
                        
                        _this.$axios.get(_this.url+'preorderKaController.do?checkProducts',{         
                        params:{
                            userName:userName,
                            passWord:passWord,
                            customerCode:kaObj.customerCode,
                            storescode:kaObj.storescode,
                            sapIds:opt
                        }
                        }).then(res=>{
                            console.log(res)
                            if(res.data.success == true){
                                _this.$refs.titS.style.zIndex ='999'
                                let item = []
                                for(let i in res.data.products){
                                    let obj ={
                                        title:res.data.products[i].itemdesc,
                                        id:res.data.products[i].productSapId,
                                        spec:res.data.products[i].itemspec,
                                        num:0
                                    }
                                    item.push(obj)
                                }
                                if(item.length){
                                    _this.scanChooseListBox(item)           //调用mutation的方法
                                    _this.scanChooseListBag(item)
                                    _this.noChangeList(item)
                                }
                                if(_this.isHave){
                                    let strC=''
                                    if(_this.isHaveArr.length == 1){
                                        strC+=_this.isHaveArr[0].name
                                    }else{
                                        for(let j in _this.isHaveArr){  //对重复的产品数组进行循环
                                            strC = _this.isHaveArr[j]+'</br>'+strC                                        
                                        }
                                    }
                                    _this.$vux.alert.show({
                                        title: '注意,以下产品已存在',
                                        content: strC,
                                    })
                                }else{
                                    _this.$vux.toast.show({
                                        time:'1000',
                                        type:'success',
                                        text: '产品录入成功'
                                    })
                                }
                                
                            }else{
                                _this.$vux.alert.show({
                                    title: '注意',
                                    content: res.data.msg,
                                })
                            }
                        }).catch(e=>{
                            _this.$vux.alert.show({
                                title: '注意',
                                content: '服务器出错,请稍后再试',
                            })
                        }) 
                       
                    }else{
                        _this.$vux.toast.show({
                            time:'1000',
                            type:'cancel',
                            text: '请选择正确的条码'
                        })
                    } 
                 }
            });
        },
        
    },
    computed:{   //计算属性
        ...mapState(
            ['index','isHave','pannelList','isShowDiv','isHaveArr','changeHeaderRight','isClick','getBagList','getChooseList','chooseStoreObj','noChangeList']
        ),
    },
    created(){
        let url = location.href.split('#')[0]    //获取地址栏参数并修改
        this.$axios.get('http://171.8.66.195:8080/synear/orderReceiptController.do?getWechatConfigureList'+'&url='+url  ,{
        }).then(res =>{
            console.log(res)
            let data = JSON.parse(res.data.slice(1,res.data.length-1))
            console.log(data)
            this.$wechat.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wxc61954ab5a7b5efb', // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.noncestr, // 必填，生成签名的随机串
                    signature: data.signature, // 必填，签名
                    jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
                })
        })
        this.$wechat.error(function (res) {
            console.log(res)
            alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
        });
    },
    watch:{
        //判断页面高度，解决输入框把页面底部顶起的问题
        showHeight:function() {
            if(this.docmHeight > this.showHeight){  
                this.hidshow=false
                this.bus.$emit('change',this.hidshow)   //使用总线bus将参数传递出去
            }else{
                this.hidshow=true
                this.bus.$emit('change',this.hidshow)
            }
        },
        results(val){   //如果用户搜索到产品就将头部右侧的内容改为‘确定’,如果没有搜索的则改为‘退出登录’
            if(val.length){
                this.$store.commit('changeHeaderRight','确定')
            }
        
        },
        isClick(){    //当头部右侧的内容为‘确定’时,监听用户是否点击了头部右侧的内容
            if(this.isClick){
                this.results = []
                // this.isShow = true
                this.value = ''
                this.valueA = []
                // this.$refs.titS.style.zIndex ='999'
                this.$store.commit('isClick',false)
            }
        }
    },
    mounted(){
        // window.onresize监听页面高度的变化
        window.onresize = ()=>{
            return(()=>{
                this.showHeight = document.body.clientHeight;
            })()
        }
        //获取产品列表
        this.$axios.get(this.url+'preorderKaController.do?getProductList',{         
            params:{
                userName:localStorage.userName,
                passWord:localStorage.passWord,
                customerId:this.chooseStoreObj.key
            }
        }).then(res=>{
            console.log(res)
            if(res.data.rows.length){
                sessionStorage.productList = JSON.stringify(res.data.rows)
            }
        }).catch(e=>{
            this.$vux.alert.show({
                title: '注意',
                content: '服务器出错,请稍后再试',
            })
        })     
    },
}
function getResult(val){
    let productList = JSON.parse(sessionStorage.productList)
    let re = []
 
        productList.map(function(item){
            if(item.itemdesc.search(val) != -1){
                re.push({
                    value:item.itemdesc,    //产品名称
                    key:item.productSapId,  //产品id
                })
            }
        })
        
        return re
}
</script>

<style scoped>
    .add{
      padding-top: 10%;
      width: 90%;
      margin: 0 auto;
      padding-bottom: 30%;
      height: auto;
    }
    .titS{
        position: fixed;
        left: 0;
        right: 0;
        top: 46px;
        background: rgb(251,249,254);
    }
    .content{
        overflow-y: scroll;
        overflow: hidden;
    }
    .icon{
        display: inline-flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 3%;
    }
    .icon >>>.weui-btn{
        margin-left: 0;
        margin-right: 0
    }
</style>


