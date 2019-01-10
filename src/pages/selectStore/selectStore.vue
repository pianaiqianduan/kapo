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
        <div style="margin-top:25%">
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
            storeList:[],
        }
    },
    watch:{
        value(val){
            if(!val){
                this.results = this.storeList
            }
        }
    },
    created(){
        let storeList = JSON.parse(sessionStorage.kaStoreList)
        let storeItems = []
        for(let k in storeList){
            let storeItem={
                key: storeList[k].customerId,
                title:storeList[k].customerName + "(门店编码" + storeList[k].customerCode + ")",
                customerCode:storeList[k].customerCode,
                storescode:storeList[k].storescode
            }
            storeItems.push(storeItem)
        }
        this.storeList = storeItems
        console.log(storeItems)
    },
    methods:{
        ...mapMutations(['chooseStoreObj']),

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
                this.chooseStoreObj(val)    //选中的门店(title,key,customerCode,storescod)
                this.storeName = val.title 
            }
                         
        },
        sure(){           //点击去下单按钮时触发
            if(this.storeName){
                
                sessionStorage.ischoose="choose"
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
                customerCode: productList[i].customerCode,
                storescode: productList[i].storescode
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
            customerCode: item.customerCode,
            storescode: item.storescode
        })
        
    })
    
    return re
}
</script>


<style scoped>
    .selectStore{
        padding-top: 80px;
        padding-bottom: 80px;
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

