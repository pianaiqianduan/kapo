<template>
    <div>
        <div class="selectStore">
            <checklist :title="title"  required :options="storeList" v-model="selectList" 
            @on-change="change"  ref="demoObject"></checklist>
        </div>
        <div class="sure">
            <Flexbox>
                <FlexboxItem>
                    <p style="padding-left:8%">选中门店个数:
                        <span style="color:rgb(151,5,5)">{{this.selectList.length}}</span>
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

import { Flexbox, FlexboxItem, Checklist, XButton} from 'vux'
import {mapMutations} from 'vuex'
export default {
    name:'selectStore',
    components:{                         //注册组件
        Checklist,
        XButton,
        Flexbox,
        FlexboxItem
    },
    data(){
        return{
            title:"请选择要下单的门店",
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
                {key:"13",value:"郑州思念食品经销商下单门店13"}
            ],
            selectList:[],   //选中的key数组集合
        }
    },
    methods:{
        ...mapMutations(['chooseStoreList']),

        change(val){
            if(val.length){
                this.selectList = val
                this.chooseStoreList(this.selectList)          
            }
            
        },
        sure(){
            if(this.selectList.length){
                console.log(this.$refs.demoObject.getFullValue())
                let getFullArr = this.$refs.demoObject.getFullValue()
                let msg=''
                for(let k in getFullArr){
                    if( msg == "" ){
                        msg+='<p style="text-align:left">'+getFullArr[k].label+'</p>'
                    }else{
                        msg +='<p style="text-align:left">'+getFullArr[k].label+'</p>'
                    }
                }
                let _this = this    //改变this指向
                this.$vux.confirm.show({
                    title:"请确认您选中的门店名称是否正确",
                    content:msg,
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

