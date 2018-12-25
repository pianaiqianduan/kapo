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
                <flexbox-item >
                    <x-button type="primary"  @click.native="tj">提交</x-button>
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
            textValue:''   //备注单号填写
        }
    },
   computed:{
        
       
    },
    watch:{
    },
    methods:{
        ...mapGetters(['msgTj']),
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
                        _this.msgTj()
                        console.log(_this.tjProductList)
                        _this.$axios.get(_this.url+'preorderKaController.do?saveKaddcx',{         
                                params:{
                                    // userName:userName,
                                    // passWord:passWord,
                                    // customerCode :kaObj.customerCode,
                                    // storescode:kaObj.storescode,
                                    userName:"20090083",
                                    passWord:"123456",
                                    customerCode:"20090083",
                                    storescode:"01",
                                    products:JSON.stringify(_this.tjProductList) ,  //产品
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
    computed:{
        ...mapState(['tjProductList'])
    },
    // created(){
    //     let dayN = new Date()  //创建日期对象
    //     let year = dayN.getFullYear()
    //     let mon = dayN.getMonth()
    //     if(mon+1 < 10){
    //         mon = '0' + (mon+1)
    //     }else{
    //         mon = mon+1
    //     }
    //     let day = dayN.getDate()
    //     if(day < 10){
    //         day = '0' + day
    //     }
    //     let Tday = year + '-' + mon + '-' + day
    //     this.dateValue = Tday
    //     console.log(this.dateValue)
    // }
    
}
</script>

<style scoped>
    .information{
        margin-bottom: 10%;
    }
    .tj{
        border: 1px solid #ccc;
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 50px;
        height: 6.1%;
        background: #CDC8B1;
    }
    .tj >>> .weui-btn{
        border-radius: 0;
    }
    .tj >>> .vux-flexbox-item{
        margin-left: auto !important
    }
</style>


