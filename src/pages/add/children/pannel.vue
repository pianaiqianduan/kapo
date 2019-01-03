<template>
    <div class="pannel">
        <swipeout  v-for="(item,index) of this.getChooseList" :key="index">
            <swipeout-item @on-close="handleClose" @on-open="handleOpen" transition-mode="follow" id="item.id">
                <div slot="right-menu">
                    <swipeout-button @click.native="clickFav" type="primary">取消</swipeout-button>
                    <swipeout-button @click.native="clickDel(item.id)" type="warn">删除</swipeout-button>
                </div>
                <div slot="content" key="hg">
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
                                <span class="left">数量(箱):</span>
                                <x-number :min="0" v-model="item.num" @on-change="numChange(item.id,item.num)" fillable></x-number>                         
                            </div>
                    </group>
                </div>
             </swipeout-item>
        </swipeout>
    </div>
</template>

<script>
import { Group, Search,XInput } from 'vux';
   import { XNumber, } from 'vux';
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

import { mapMutations,mapState } from 'vuex'

export default {
    name:"pannel",
    components:{
        Group,
        Search,
        Swipeout,
        SwipeoutItem,
        SwipeoutButton,
        XInput,
        Group,
        XNumber,
       
    },
    data(){
        return{
            
        }
    },
    computed:{
        ...mapState(['getChooseList'])
    },
    methods:{
        ...mapMutations(['deletBoxItems','productBoxNum']),
        numChange(id,itemNum){      //点击产品数量时触发
           let obj = {
               id:id,
               num:itemNum
           } 
           this.productBoxNum(obj)
        },
        consoleIndex(){
            console.log(this.demo01)
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
                    _this.deletBoxItems(id)
                }
            })
        },
    },
    mounted(){
       
    }

}
</script>

<style  scoped>
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
    

</style>


