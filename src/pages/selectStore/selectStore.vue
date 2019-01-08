<template>
    <div class="store">
        <div class="selectStore">
            <divider style="margin-bottom:15%">门店选择</divider>
            <search @on-result-click="resultClick" @on-change="getResult"  v-model="value" top="46px"
                @on-focus="onFocus" position="absolute" :results="results"
                auto-scroll-to-top placeholder="门店名称" >
                    <!-- <radio  :options="results" :selected-label-style="{color: '#09BB07'}" v-model="selectList" @on-change="change"></radio> -->
            </search>
        </div>
        <divider>选择结果</divider>
        <div style="margin-top:15%">
            <group label-width="5em" >
                <cell title="所选门店:" value-align="left">
                    <div>
                        <span style="color: green">{{storeName}}</span>
                    </div>
                </cell>
            </group>
        </div>
        
        <div class="sure">
            <x-button type="primary" style="margin-right:0" @click.native="sure">去下单</x-button>
        </div>
    </div>
    
    
</template>

<script>

import { Group, XButton,Search, Divider, Cell} from 'vux'
import {mapMutations } from 'vuex'
import { watch } from 'fs';

export default {
    name:'selectStore',
    components:{                         //注册组件
        Group,
        XButton,
        Search,
        Divider,
        Cell
    },
    data(){
        return{
            results:[],
            value:"",
            storeName:"",  //选中的门店名称
            storeList:[
                {key:"01",title:"郑州思念食品"},
                {key:"02",title:"郑州思念食品经销商下单门店2(编码:AABCDEFG123456)"},
                {key:"03",title:"郑州思念食品经销商下单门店3"},
                {key:"04",title:"郑州思念食品经销商下单门店4"},
                {key:"05",title:"郑州思念食品经销商下单门店5"},
                {key:"06",title:"郑州思念食品经销商下单门店6"},
                {key:"07",title:"郑州思念食品经销商下单门店7"},
                {key:"08",title:"郑州思念食品经销商下单门店8"},
                {key:"09",title:"郑州思念食品经销商下单门店9"},
                {key:"10",title:"郑州思念食品经销商下单门店10"},
                {key:"11",title:"郑州思念食品经销商下单门店11"},
                {key:"12",title:"郑州思念食品经销商下单门店12"},
                {key:"13",title:"郑州思念食品经销商下单门店13"},
                {key:"14",title:"郑州思念食品经销商下单门店14"},
                {key:"15",title:"郑州思念食品经销商下单门店15"},
                {key:"16",title:"郑州思念食品经销商下单门店16"},
                {key:"17",title:"郑州思念食品经销商下单门店17"},
                {key:"18",title:"郑州思念食品经销商下单门店18"},
                {key:"19",title:"郑州思念食品经销商下单门店19"},
                {key:"20",title:"郑州思念食品经销商下单门店20"},
                {key:"21",title:"郑州思念食品经销商下单门店21"},
                {key:"22",title:"郑州思念食品经销商下单门店22"},
                {key:"23",title:"郑州思念食品经销商下单门店23"},
                {key:"24",title:"郑州思念食品经销商下单门店24"},
                {key:"25",title:"郑州思念食品经销商下单门店25"}
            ],
        }
    },
    watch:{
        value(val){
            if(!val){
                this.results = this.storeList
            }
        }
    },
    methods:{
        ...mapMutations(['chooseStoreList']),

        getResult(val){         //输入文字变化触发
            this.results = val? getResult(this.value,this.storeList):[];
        },
        onFocus(){             //获取焦点时触发
            if(!this.value){
                this.results = focusGetResult(this.storeList);
            }
            
        },
        resultClick(val){     //点击选择条目时触发、

            if(val.title != "没有匹配结果,请检查门店名称是否正确"){
                this.chooseStoreList(val.title) 
                this.storeName = val.title 
            }
                         
        },
        sure(){           //点击去下单按钮时触发
            if(this.storeName){
                // this.chooseStoreList(this.storeName) 
                // let _this = this    //改变this指向
                // this.$vux.confirm.show({
                //     title:"您本次所选中的门店为:",
                //     content: _this.storeName,
                //     onCancel () {  //取消
            
                //     },
                //     onConfirm () {  //确定
                //         sessionStorage.ischoose="choose"
                //         _this.$router.push({path:"/"})
                //     }
                // })
                this.$router.push({path:"/"})
            }else{
                this.$vux.alert.show({
                    title: '注意',
                    content: '请选中门店后再下单',
                })
            }
        },
        
    },
   
    
}
function getResult(val,storeList){       //模糊查询方法
    let productList = storeList
    let re = []
    let flag = false
    for(let i in productList){

        if(productList[i].title.search(val) != -1){
            flag = true
                re.push({
                title:productList[i].title,    
                key:productList[i].key,  
            })
        }else{
            if(!flag && i ==productList.length-1){
                    re.push({
                    title:"没有匹配结果,请检查门店名称是否正确"    
                })
            }
        }
    }
            
    return re
        
}
function focusGetResult(storeList){      //模糊查询方法

    let productList = storeList
    let re = []
 
    productList.map(function(item){
        
        re.push({
            title:item.title,    
            key:item.key,  
        })
        
    })
    
    return re
}
</script>


<style scoped>
    .selectStore{
        padding-top: 25%;
        padding-bottom: 25%;
    }

    .selectStore >>> .vux-search_show{
        height: 100%;
    }

    .sure{
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
    }

</style>

