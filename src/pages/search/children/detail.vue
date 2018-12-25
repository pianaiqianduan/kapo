<template>
    <div class="detail">
        <div>

            <form-preview 
            header-label="门店名称" :header-value="this.orderList[0][0][0].nameValue" :body-items="this.orderList[0][0]"
            style="margin-top:3%"></form-preview>
            <div class="xh">
                <form-preview v-for="(item,index) in this.orderList[0][1]" :key="index"
                :body-items="item"
                style="margin-top:3%"></form-preview>
            </div>
            
        </div>
    </div>
</template>

<script>
import { FormPreview } from 'vux'
import {mapState} from 'vuex'
export default {
    name:"detail",
    components:{
        FormPreview
    },
    data(){
        return{
            
        }
    },
    methods:{
    },
    computed:{
        ...mapState(['orderList'])
    },
}
</script>

<style scoped>
    .detail{
        padding-top: 13%;
        padding-bottom: 25%
    }
    .detail >>>.weui-form-preview__value{
        font-size: 0.9em;
    }
    .xh >>>.weui-form-preview__hd{
        display: none
    }
</style>


