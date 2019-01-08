<template>
    <div class="information">
        <group>
            <datetime
                v-model="dateValue"
                :title="titD"
                placeholder="请选择">
            </datetime>
        </group>
         <group>
            <x-textarea  v-model="textValue" placeholder="请输入备注单号" :show-counter="true" :max="60"></x-textarea>
        </group>
        
        <div class="tj">
            <flexbox>
                <FlexboxItem>
                    <p style="padding-left:8%">订单总数量:
                        <span style="color:rgb(151,5,5)">{{this.numBox}}</span>箱
                        <span style="color:rgb(151,5,5)">{{this.numBag}}</span>袋
                    </p>
                </FlexboxItem>
                <flexbox-item >
                    <x-button type="primary"  @click.native="tj">确认提交</x-button>
                </flexbox-item>
            </flexbox>
        </div>
        
    </div>
</template>

<script>
// var kaObj = JSON.parse(sessionStorage.kaObj)
// var userName = localStorage.userName
// var passWord = localStorage.passWord

import { Group, Selector, Datetime, XTextarea,   } from 'vux'
import{  Flexbox, FlexboxItem ,XButton,Cell} from 'vux';
import { mapState , mapGetters, mapMutations } from 'vuex'
export default {
    name:'information',
    props:['numBox','numBag'],
    components:{
        Group,
        Selector,
        Datetime,
        XTextarea,
        Flexbox, 
        FlexboxItem, 
        XButton,
        Cell,
        XTextarea 
    },
    data(){
        return{
            dateValue:'',    //时间日期选择
            titD:"送货日期选择"+`<span style="color:red">*</span>`,   //添加*为必填选项
            textValue:'',   //备注单号填写
        }
    },
    computed:{
        ...mapGetters(['products']),
        ...mapState(['chooseStoreObj'])
    },
    methods:{
        
        ...mapMutations(['cancelChooseList']),
       tj(){
           if(!this.dateValue){
               this.$vux.alert.show({
                    title: '注意',
                    content: '请选择送货日期',
                })
           }else{
                const _this = this 
                this.$vux.confirm.show({
                    title:"注意",
                    content:"确定要提交吗？",
                    onCancel () {      //取消的回调
                    
                    },
                    onConfirm () {    //确定的回调
                        console.log(_this.products)
                        _this.$axios.get(_this.url+'preorderKaController.do?saveKaddcx',{         
                                params:{
                                    userName:localStorage.userName,
                                    passWord:localStorage.passWord,
                                    customerCode :_this.chooseStoreObj.customerCode,
                                    storescode:_this.chooseStoreObj.storescode,
                                    // userName:"20090083",
                                    // passWord:"123456",
                                    // customerCode:"20090083",
                                    // storescode:"01",
                                    products:JSON.stringify(_this.products) ,  //产品
                                    dbillDate:_this.dateValue,  //日期
                                    vnote:_this.textValue     //备注
                                }
                            }).then(res=>{                 
                                console.log(res)
                                if(res.data.success == true){
                                    _this.cancelChooseList()      //删除信息
                                    _this.textValue =""
                                    _this.$vux.toast.show({
                                        time:'1500',
                                        type:'success',
                                        text: res.data.msg
                                    })
                                    setTimeout(() => {
                                        _this.$router.push({path:"/"})
                                    }, 1500);
                                    
                                }else{
                                    _this.$vux.toast.show({
                                        time:'1500',
                                        type:'cancel',
                                        text: res.data.msg
                                    })
                                }
                            }).catch(e=>{
                                _this.$vux.alert.show({
                                    title: '注意',
                                    content: '服务器出错,请稍后再试',
                                })
                            }) 
                    }
                })
               
           }
       }

    },
}
</script>

<style scoped>
    .information{
        margin-bottom: 10%;
    }
    .tj{
 
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        height:auto;
        background: #CDC8B1;
    }
    .tj >>> .weui-btn{
        border-radius: 0;
    }
    .tj >>> .vux-flexbox-item{
        margin-left: auto !important
    }
</style>


