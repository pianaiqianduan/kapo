<template>
    <div>
        <div class="selectStore">
            <!-- <checklist :title="title"  required :options="storeList" v-model="storeList" 
            @on-change="change"  ref="demoObject"></checklist> -->
            <group title="请选择要下单的门店">
                <radio  :options="storeList" :selected-label-style="{color: '#09BB07'}" v-model="selectList" @on-change="change"  ref="demoObject"></radio>
            </group>
        </div>
        <div class="sure">
            <Flexbox>
                <FlexboxItem>
                    <p style="padding-left:4%;font-size:14px">门店名称:
                        <span style="color:rgb(151,5,5)">{{selectName}}</span>
                    </p>
                </FlexboxItem>
                <FlexboxItem>
                    <x-button type="primary" style="margin-right:0" @click.native="sure">去下单</x-button>
                </FlexboxItem>
            </Flexbox>
        </div>
    </div>
    
    
</template>

<script>

import { Flexbox, FlexboxItem, Radio, Group, XButton} from 'vux'
import {mapMutations } from 'vuex'
export default {
    name:'selectStore',
    components:{                         //注册组件
        Radio, 
        Group,
        XButton,
        Flexbox,
        FlexboxItem
    },
    data(){
        return{
            storeList:[
                {key:"01",value:"郑州思念食品"},
                {key:"02",value:"郑州思念食品经销商下单门店2"},
                {key:"03",value:"郑州思念食品经销商下单门店3"},
                {key:"04",value:"郑州思念食品经销商下单门店4"},
                {key:"05",value:"郑州思念食品经销商下单门店5"},
                {key:"06",value:"郑州思念食品经销商下单门店6"},
                {key:"07",value:"郑州思念食品经销商下单门店7"},
                {key:"08",value:"郑州思念食品经销商下单门店8"},
                {key:"09",value:"郑州思念食品经销商下单门店9"},
                {key:"10",value:"郑州思念食品经销商下单门店10"},
                {key:"11",value:"郑州思念食品经销商下单门店11"},
                {key:"12",value:"郑州思念食品经销商下单门店12"},
                {key:"13",value:"郑州思念食品经销商下单门店13"},
                {key:"14",value:"郑州思念食品经销商下单门店14"},
                {key:"15",value:"郑州思念食品经销商下单门店15"},
                {key:"16",value:"郑州思念食品经销商下单门店16"},
                {key:"17",value:"郑州思念食品经销商下单门店17"},
                {key:"18",value:"郑州思念食品经销商下单门店18"}
            ],
            selectList:'',   //选中的key数组集合
            selectName:"",   //选中的门店名称
        }
    },

    methods:{
        ...mapMutations(['chooseStoreList']),

        change(val){
            this.selectList = val
            if(this.selectList){
                for(let i in this.storeList){
                    if(this.storeList[i].key == this.selectList){
                         this.chooseStoreList(this.storeList[i].value) 
                         this.selectName = this.storeList[i].value
                         break
                    }
                }
            }               
        },
        sure(){
            if(this.selectList){
                for(let i in this.storeList){
                    if(this.storeList[i].key == this.selectList){
                         this.chooseStoreList(this.storeList[i].value) 
                         break
                    }
                }
                let _this = this    //改变this指向
                this.$vux.confirm.show({
                    title:"请确认您选中的门店名称是否正确",
                    content: _this.selectName,
                    onCancel () {  //取消
            
                    },
                    onConfirm () {  //确定
                        sessionStorage.ischoose="choose"
                        _this.$router.push({path:"/"})
                    }
                })
            }else{
                this.$vux.alert.show({
                    title: '注意',
                    content: '请选中门店后再下单',
                })
            }
        }
    },
}
</script>


<style scoped>
    .selectStore{
        padding-top: 5%;
        padding-bottom: 20%;
    }
    .selectStore >>> .weui-cells__title{
    margin-top: 1.77em;
    margin-bottom: .5em;
    color: rgb(151,5,5);
    font-size: 18px;
    text-align: center;
    font-weight: bolder
    }
     .sure{
        border: 1px solid #ccc;
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        background: #CDC8B1;
    }
</style>

