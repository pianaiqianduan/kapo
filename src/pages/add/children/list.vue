<template>
    <div class="list">
        <div class="content">
            <div>
                <divider >订单详情</divider>
                <form-preview v-for="(item,index) in this.productList" :key="index" header-label="产品名称" 
                :header-value="item[0].titC" :body-items="item" style="margin-top:5%"></form-preview>
            </div>
        </div>
        <divider style="margin-top:5%">信息补充</divider>
        <infor :numBox="this.allNum" :numBag="this.allBagNum"></infor>
    </div>
</template>

<script>
import { FormPreview,Divider } from 'vux'
import { Cell, Group, Selector} from 'vux'
import {mapState,mapGetters} from 'vuex'

import information from './information'
export default {
    name:'orderFrom',
    components:{
        FormPreview,
        Divider,
        Cell,
        Group,
        infor:information,
        Selector
    },
    data(){
        return{
           
        }
    },
    methods:{

    },
    watch:{

    },
    computed:{
        ...mapGetters(['allNum','allBagNum']),
        ...mapState(['productList'])
    },
}
</script>

<style scoped>
    .list{
        padding-top: 12%;
        padding-bottom: 25%;
    }
    .content>div{
        padding-top:5%;
    }

    /* 修改面板中的头部字体大小 */
    .content >>> .weui-form-preview__value{
        font-size: 0.9em;
    }
    .content >>> .weui-form-preview__hd{
        padding: 2px 14px;
        /* color: rgb(151,5,5) */
    }

    /* 修改总计的字体颜色和大小 */
    .content >>>.vux-label{
        font-size: 20px;
        color:rgb(151,5,5)
    }
    .content >>> .weui-cell__ft{
        font-size: 20px;
        color:rgb(151,5,5)
    }

    .address >>>.weui-cell__ft{
        text-align: left;
        width: 100%;
    }
    /* .content >>> .weui-form-preview__hd{
        text-align:left
    } */
</style>






