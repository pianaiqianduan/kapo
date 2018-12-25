<template>
    <div class="login">
        <div class="content">
            <group>
                <x-input placeholder="请输入账号" v-model="account"></x-input>
                <x-input placeholder="请输入密码" v-model="pawd" type="password" ></x-input>
            </group>
        </div>
        <div class="footer">
            <x-button type="primary" @click.native="tj">登录</x-button>
        </div>
        
    </div>
</template>

<script>

import { Group, XInput, XButton,  XImg} from 'vux'      //引入所需的组件
import{mapMutations} from 'vuex';
export default {
    name:'login',
    components:{                         //注册组件
        Group,
        XInput,
        XButton,
        XImg,
    },
    data(){
        return{
            account:'',
            pawd:'',
        }
    },
    methods:{
        ...mapMutations(['login_require']),
        tj(){
            // this.$router.push({path:'/enter'})
            
            if(this.account!='' && this.pawd!=''){
                this.$axios.get('http://192.168.16.225:8080/synear/preorderBranchServiceController.do?checkuser',{         
                    params:{
                        userName:this.account,
                        passWord:this.pawd,
                        systemCode:'ba5a342de80806fe'
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.data.roleType == '6'){
                        let kaObj = {
                            customerCode:res.data.customerCode,
                            customerid: res.data.customerid,
                            storescode: res.data.storescode
                        }
                        localStorage.userName = this.account
                        localStorage.passWord = this.pawd
                        sessionStorage.kaObj = JSON.stringify(kaObj)
                        this.login_require(true)
                        this.$router.push({path:'/'})
                    }
                }).catch(e=>{
                    this.$vux.alert.show({
                        title: '注意',
                        content: '服务器出错,请稍后再试',
                    })
                })   
            }else{
                this.$vux.toast.show({
                    time:'2000',
                    type:'warn',
                    text: '用户名和密码不能为空'
                })
            }
           
        }
    },
    // created(){
    //     let url = location.href.split('#')[0] 
    //     this.$axios.get('http://171.8.66.195:8080/synear/orderReceiptController.do?getWechatConfigureList'+'&url='+url  ,{
    //     }).then(res =>{
    //         console.log(res)
    //         let data = JSON.parse(res.data.slice(1,res.data.length-1))
    //         this.$wechat.config({
    //                 debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //                 appId: 'wxc61954ab5a7b5efb', // 必填，公众号的唯一标识
    //                 timestamp: data.timestamp, // 必填，生成签名的时间戳
    //                 nonceStr: data.noncestr, // 必填，生成签名的随机串
    //                 signature: data.signature, // 必填，签名
    //                 jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
    //             })
    //     })
    //     this.$wechat.error(function (res) {
    //         console.log(res)
    //         alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
    //     });
    // },
}
</script>


<style scoped>
    .login{
        padding-top: 32%;
    }
    .header{
       text-align: center
    }
    .footer{
        padding-top: 15%;
    }
</style>

