<template>
    <div class="search">
        <group>
            <x-input placeholder="请输入单据号" v-model="Numbervalue"></x-input>
        </group>
        <group>
            <selector  placeholder="单据状态选择" :options="list" v-model="defaultValue"></selector>
        </group>
        <div class="tit">
            <group style="width:50%">
                <datetime v-model="startDate" placeholder="订单开始日期" :end-date="Tday"></datetime> 
            </group>
            <group  style="width:50%">
                <datetime v-model="endDate" placeholder="订单结束日期" :end-date="Tday"></datetime>
            </group>
        </div>
        <div class="btnS">
            <x-button type="primary" mini @click.native="tj" style="width:90%">查询</x-button>
        </div>
        <divider>查询结果</divider> 
       
            <div id="mescroll" class="mescroll" mescroll-touch-y v-show="isShow" key="div" v-if="dataList" >
                <div>
                    <x-table :cell-bordered="false" style="background-color:#fff;">
                        <thead>
                            <tr>
                                <th>订单号</th>

                                <th>订单状态</th>
                                <th>产品数量</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in dataList" :key="index">
                                <td>
                                    <a  href="javascript:;" @click="detail(item.id)">
                                    {{item.orderNumber}}
                                </a>
                                </td>
                              
                                <td v-if="item.state=='1'">自由</td>
                                <td v-else>已生成订单</td>
                                <td v-if="item.totalNumber && item.totalPackageNumber">
                                    <span style="color:rgb(151,5,5)">{{item.totalNumber}}</span>箱
                                    <span style="color:rgb(151,5,5)">{{item.totalPackageNumber}}</span>袋       
                                </td>
                                <td v-else-if="item.totalNumber && !item.totalPackageNumber">
                                    <span style="color:rgb(151,5,5)">{{item.totalNumber}}</span>箱
                                </td>
                                <td v-else-if="!item.totalNumber && item.totalPackageNumber">
                                    <span style="color:rgb(151,5,5)">{{item.totalPackageNumber}}</span>袋   
                                </td>
                            </tr>
                            
                        </tbody>

                    </x-table>
                </div>
            </div>
       
    </div>
</template>

<script>
// var kaObj = JSON.parse(sessionStorage.kaObj)
// var userName = localStorage.userName
// var passWord = localStorage.passWord

import {Group, Datetime, Selector, Search, Divider, XButton, Flexbox, FlexboxItem, XTable, XInput  } from 'vux'
import {mapMutations,mapState} from 'vuex'
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
export default {
    name:'searc',
    components:{
        Group,
        Datetime,
        Selector,
        Search,
        Divider,
        XButton,
        Flexbox, 
        FlexboxItem,
        XTable,
        XInput
    },
    data(){
        return{
            startDate:'',
            endDate:'',
            list:[
                {key:'1',value:'自由'},
                {key:'2',value:'已生成订单'},
            ],
            defaultValue:'',
            mescroll: null, //mescroll实例对象
            dataList:[], //列表数据
            isShow:false,
            Tday:'',
            Numbervalue:''
        }
    },
    computed:{
        ...mapState(['chooseStoreObj'])
    },
    methods:{
        ...mapMutations(['getOrderId','getOrderList']),
        tj(){               //查询方法
            if(this.startDate || this.endDate || this.Numbervalue || this.defaultValue){      //查询条件不能为空
                if(!this.isShow && this.mescroll){   //当查询条件变化时
                    this.isShow = true
                    //重置列表数据
					this.mescroll.resetUpScroll();
                }else if(this.mescroll == null){
                    this.isShow = true
                    this.mescroll = new MeScroll("mescroll", { //初始化mescroll,确保此处配置的id能够被找到
                    up: {   
                            
                            callback: this.upCallback,
                            // 数据第一页无数据时
                            empty:{ 
                                warpId : 'mescroll' , 
                                icon : null , 
                                tip : "暂无订单数据,请重新输入查询条件~" , 
                                btntext : "" , 
                                btnClick : null,
                                supportTap : false 
                            },
                            // 列表的数据要大于1条才能显示end
                            noMoreSize:1,

                            // 硬件加速样式,使动画更流畅
                            hardwareClass:"mescroll-hardware",

                            // 上拉加载中的样式修改
                            htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',

                            // 加载完毕时的样式修改
                            htmlNodata:'<p class="upwarp-nodata"> -- 加载完毕 -- </p>',
                                
                            // 是否在初始化完毕之后自动执行一次上拉回调
                            auto:true,
                        },
                        down: {
                            use:false
                        }
                        
                    });
                }
            }else{
                this.$vux.alert.show({
                    title: '注意',
                    content: '查询条件不能为空',
                })
            }

        },
        upCallback(page) {
            //联网请求
            this.$axios.get(this.url+'preorderKaController.do?findKaddcxList', {
            params: {
                page: page.num, //页码
                rows: page.size, //每页长度
                userName:localStorage.userName,
                passWord:localStorage.passWord,
                customerCode:this.chooseStoreObj.customerCode,
                orderNumber:this.Numbervalue,
                orderDateStart:this.startDate,
                orderDateEnd:this.endDate,
                state:this.defaultValue
            }
            }).then((response)=> {
                //请求的列表数据
                let arr = response.data.orders;
                //如果是第一页需手动制空列表
                if (page.num == 1) this.dataList = [];
                //把请求到的数据添加到列表
                this.dataList = this.dataList.concat(arr);
                //数据渲染成功后,隐藏下拉刷新的状态
                this.$nextTick(() => {
                    this.mescroll.endSuccess(arr.length);
                })
           
            }).catch((e)=> {
                //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                this.mescroll.endErr();
            })
            
        },
        //点击订单方法
        detail(id){
            
            this.$axios.get(this.url+'preorderKaController.do?findKaddcxDetail',{         
                params:{
                    userName:localStorage.userName,
                    passWord:localStorage.passWord,
                    orderId:id
                }
            }).then(res=>{
                console.log(res)
                let obj =res.data.order
                let arr = []
                arr.push(obj)
                arr.push(res.data.orderProducts)
                console.log(arr)
                this.getOrderList(arr)
                this.$router.push({path:"/detail"})
            }).catch(e=>{
                this.$vux.alert.show({
                    title: '注意',
                    content: '服务器出错,请稍后再试',
                })
            }) 
        }

    },
    watch:{              
      Numbervalue(val,oldValue){
            if(val != oldValue){
               this.isShow = false;
            }
        },
        defaultValue(val,oldValue){
            if(val != oldValue){
                this.isShow = false;
            }
        },
        startDate(val,oldValue){
            if(val != oldValue){
                this.isShow = false;
            }
        },
        endDate(val,oldValue){
            if(val != oldValue){
                this.isShow = false;
            }
        }
    },
    created(){
        let dayN = new Date()  //创建日期对象
        let year = dayN.getFullYear()
        let mon = dayN.getMonth()
        if(mon+1 < 10){
            mon = '0' + (mon+1)
        }else{
            mon = (mon+1)
        }
        let day = dayN.getDate()
        if(day < 10){
            day = '0' + day
        }
        let Tday = year + '-' + mon + '-' + day
        this.Tday = Tday
        this.startDate = Tday
        this.endDate = Tday
    },
    beforeRouteLeave (to, from, next) {  //离开页面前,进入到首页的时候搜索条件初始化
    if(to.path == '/'){
        this.isShow = false;
        this.mescroll == null;
    }else if(to.path == '/selectStore'){
        this.isShow = false;
        this.mescroll == null;
    }
    next()
  }
 
}

</script>

<style scoped>
    .search{
        padding-top: 13%;
        position: relative;
        top:0;
        left: 0;
    }
    .search >>> .vux-flexbox-item{
        padding-left: 20%;
    }
    .btnS{
        padding-top: 3%;
        text-align: center
    }
    /* 修改日期选择a标签的默认样式 */
    .search >>> .vux-datetime{
        text-decoration: none;
    }
    .search >>> .weui-cells{
        margin-top:0;
        line-height: 1.22
    }
    .search >>> .weui-select{
        height: 38px;
        line-height: 38px;
    }
    .tit{
        display: flex;
    }
    .tit >>> .weui-cell__ft{
        text-align: left
    }
    /*通过fixed固定mescroll的高度*/
    .mescroll {
        position: fixed;
        top: 41%;
        bottom: 0;
        height: auto;
    }
    .mescroll >>> .mescroll-upwarp{
        padding-bottom: 21%;
    }

    .mescroll-totop{
        bottom: 30%;
    }
    .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active{
    transition: opacity 1s;
  }
</style>
