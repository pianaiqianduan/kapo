<template>
    <div class="head" style="position:fixed;left:0;right:0;top:0;z-index:999">
        <x-header :left-options="headerLeftShow">
            <marquee scrollamount="1">{{msg}}</marquee>
            <a slot="right" @click="out">{{headerRight}}</a>
        </x-header>
    </div>
</template>

<script>
// var kaObj = JSON.parse(sessionStorage.kaObj)
// var userName = localStorage.userName
// var passWord = localStorage.passWord
// var customerName = kaObj.customerName
import { XHeader } from 'vux'
import { mapMutations } from 'vuex'
import { XTable } from 'vux'
import { setInterval } from 'timers';
export default {
    name:"heade",
    components:{
        XHeader,
    },
    data(){
        return{
            // msg:customerName
            msg:"苏果门店苏果门店苏果门店苏果门店苏果门店苏果门店苏果门店",
        }
    },

    computed:{
        headerLeftShow(){    //头部左侧的‘返回’字段,默认不显示
            return this.$store.state.headerLeftShow
        },
        headerRight(){  //头部右侧的字段默认为‘退出登录’
            return this.$store.state.headerRight
        },
        checkedArr(){  //多选选中的集合
            return this.$store.state.checkedArr
        },
        isHave(){   //是否有重复的产品
            return this.$store.state.isHave
        },
        isHaveArr(){   //重复的产品数组
            return this.$store.state.isHaveArr
        }

    },
    methods:{
        ...mapMutations(['scanChooseListBox','scanChooseListBag']),
        out(){
            if(this.headerRight == '门店选择'){    //头部右侧的内容为‘退出登录’
                const _this = this   //改变this指向
                this.$vux.confirm.show({
                    title:"注意",
                    content:"您确定要重新选择门店吗？",
                    onConfirm () {    //点击确定的回调
                        _this.$router.push({path:"/selectStore"})
                    }
                })
            }else if(this.headerRight == '退出登录'){
                const _this = this   //改变this指向
                this.$vux.confirm.show({
                    title:"注意",
                    content:"您确定要退出登录吗？",
                    onConfirm () {    //点击确定的回调
                        sessionStorage.clear();  //清空sessionStorage中的内容
                        localStorage.clear()     //清空localStorage中的内容
                        window.location.href = '../login.html' //跳转到登录页面
                    }
                })
            }else if(this.headerRight == '确定'){    //头部右侧的内容为‘确定’
                if(this.checkedArr.length){      //多选有选中的值
                        this.$store.commit('isClick',true)  //调用Mutation中的isClick方法修改State中isClick的值
                        let productListObj = JSON.parse(sessionStorage.productList)  //获取到产品数组
                        let sapIds =[]  //定义产品id数组
                        let opt = ''  //定义opt
                        for(let j in productListObj){
                            for(let m in this.checkedArr){
                                if(productListObj[j].productSapId == this.checkedArr[m]){ //判断产品id是否一样
                                 sapIds.push(productListObj[j].productSapId)   //请产品id添加到sapIds中
                                
                                }
                            }
                            if(j == productListObj.length-1 ){
                                // let ids = ['0020011926','0020011926','0020011926','0020011926']
                                for(let j in sapIds){   //循环sapIds中产品id,将数组转化成字符串
                                    if(opt!=''){
                                        opt=opt+','+sapIds[j]
                                    }else{
                                        opt+=sapIds[j]
                                    }
                                    
                                }
                                
                            }
                            
                        }
                        this.$axios.get(this.url+'preorderKaController.do?checkProducts',{      //调用接口获取产品信息   
                        params:{
                            userName:"20090083",
                            passWord:"123456",
                            customerCode:"20090083",
                            storescode:"01",
                            // userName:userName,
                            // passWord:passWord,
                            // customerCode:kaObj.customerCode,
                            // storescode:kaObj.storescode,
                            sapIds:opt
                        }
                        }).then(res=>{
                            console.log(res)
                            if(res.data.success == true){ //请求成功
                             this.$store.commit('changeHeaderRight','门店选择')
                                // let item = []  
                                // for(let i in res.data.products){  //处理请求到的数据
                                //     let obj ={
                                //         title:res.data.products[i].itemdesc, //产品名称
                                //         id:res.data.products[i].productSapId, //产品id
                                //         spec:res.data.products[i].itemspec,  //产品吗描述
                                //         num:0,  //新增的数量字段
                                //     }
                                //     item.push(obj)
                                // }
                                // if(item.length){  //添加选中的产品的所有信息到getChooseList中
                                //     this.scanChooseListBox(item)
                                //     this.scanChooseListBag(item)  
                                // }
                                this.scanChooseListBox(res.data.products)
                                this.scanChooseListBag(res.data.products)
                                if(this.isHave){  //如果产品已经存在
                                    let strC=''
                                    if(this.isHaveArr.length == 1){   //重复的产品数组只有一个
                                        strC+=this.isHaveArr[0].name
                                    }else{
                                        for(let j in this.isHaveArr){   //重复的产品数组有多个进行循环
                                            strC =  this.isHaveArr[j].name+ '</br>'+strC
                                        }
                                    }
                                    this.$vux.alert.show({    //提示用户有哪些产品已经存在
                                        title: '注意,以下产品已存在',
                                        content: strC,
                                    })
                                }else{  //如果没有重复的产品,提示用户录入成功
                                    this.$store.commit('cancelCheckedArr')  //清空勾选的选项
                                    this.$vux.toast.show({
                                        time:'1000',
                                        type:'success',
                                        text: '产品录入成功'
                                    })
                                }
                            }else{  //获取产品信息失败时
                            this.$store.commit('changeHeaderRight','门店选择')
                                this.$vux.alert.show({
                                    title: '注意',
                                    content: res.data.msg,
                                })
                            }
                        }).catch(e=>{
                            this.$vux.alert.show({
                                title: '注意',
                                content: '服务器出错,请稍后再试',
                            })
                        })
                    
                }else{    //多选没有选中的值的时候,提示用户
                    this.$vux.toast.show({
                        time:'1500',
                        type:'cancel',
                        text: '产品录入失败,没有选中的产品!'
                    })
                }
            }
        }
    }
}
</script>

<style scoped>
    .head >>>.weui-dialog{
        text-align: left
    }
    /* .head >>> .vux-header .vux-header-title{
        font-size: 14px;
    } */

</style>


