<template>
    <div class="pannel">
        <swipeout>
            <swipeout-item @on-close="handleClose" @on-open="handleOpen" transition-mode="follow" id="item.id">
                <div slot="right-menu">
                    <swipeout-button @click.native="clickFav" type="primary">取消</swipeout-button>
                    <swipeout-button @click.native="clickDel(item.id)" type="warn">删除</swipeout-button>
                </div>
                <div slot="content">
                    <group class="content">
                        <div class="search">
                            <span class="left">产品名称:</span>
                            <span style="width:100%">{{item.title}}</span>
                        </div>
                        <div class="size">
                            <span class="left">产品规格:</span>
                            <span class="msg">{{item.spec}}</span> 
                        </div>
                        <div class="num">
                            <span class="left">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量:</span>
                            <x-number :min="0" v-model="item.num" @on-change="numChange(item.id)" fillable></x-number>                         
                        </div>   
                    </group>
                </div>
             </swipeout-item>
        </swipeout>
     
        
    </div>
</template>

<script>
import { Group, Search, XNumber,XInput } from 'vux';
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
import { mapMutations } from 'vuex'
export default {
    name:"pannel",
    props:['item'],
    components:{
        Group,
        Search,
        XNumber,
        Swipeout,
        SwipeoutItem,
        SwipeoutButton,
        XInput,
        Group
    },
    data(){
        return{
        }
    },
    methods:{
        numChange(id){      //点击产品数量时触发
           let obj = {
               id:id,
               num:this.item.num
           } 
           this.productNum(obj)
        },
        handleClose(){    //菜单关闭时触发
           
        },
        handleOpen(){   //菜单打开时触发
            
        },
        clickFav(id){   //取消模板时触发
            
        },
        clickDel(id){   //删除模板时触发
             const _this = this 
            this.$vux.confirm.show({
                title:"注意",
                content:"确定要删除",
                onCancel () {      //取消的回调
                
                },
                onConfirm () {    //确定的回调
                    _this.changeItem(id)
                }
            })
        },
        ...mapMutations(['changeItem','productNum']),
    },
    mounted(){
       
    }

}
</script>

<style  scoped>
      /* 布局 */
    /* .pannel{
        display: flex;
        justify-content: space-around;
    } */
    /* 设置面板的宽度 */
    .pannel .content{
        width: 100%;
        /* margin-left: 2%;
        margin-right: 3%; */
    }
    /* 搜索框 */
    .content .search{
        display: flex;
        padding-top: 2%
    }
    .search .left{
        padding-left: 6%;
        width: 40%;
    }


    /* 产品规格样式 */
    .content .size{
        display: flex;
        padding-top: 2%
    }
    .size .left{
        width: 26%;
        padding-left: 6%;
        
    }

    /* 数量样式 */
    .content .num{
        display: flex;
    }
    .num >>> .weui-cell:before{
         border: 0;
         padding-top: 1%;
     }
    .num .left{
        width: 22%;
        padding-left: 6%;
        padding-top:3%
    }

    /* 美化单选图标 */
    /* .demo--label{
        height: 18px;
        margin-top: 20%;
    }
    .demo--radio{
        display:none
    }
    .demo--radioInput{
        background-color:#fff;
        border:1px solid #cd9a51;
        border-radius:100%;
        display:inline-block;
        height:16px;
        width:16px;
        line-height:1;
        vertical-align:bottom
    }
    .demo--radio:checked + .demo--radioInput:after{
        background-color:#cd9a51;
        border-radius:100%;content:"";
        display:inline-block;
        height:12px;
        margin:2px;
        width:12px
    }
    .demo--checkbox.demo--radioInput,.demo--radio:checked + .demo--checkbox.demo--radioInput:after{
        border-radius:0
    } */
</style>


