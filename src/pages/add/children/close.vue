<template>
    <div class="close" v-show="show">
        <Flexbox>
            <FlexboxItem>
                <p style="padding-left:8%">订单总数量:
                    <span style="color:rgb(151,5,5)">{{this.allNum}}</span>箱
                    <span style="color:rgb(151,5,5)">{{this.allBagNum}}</span>袋
                </p>
            </FlexboxItem>
            <FlexboxItem>
                <x-button type="warn" style="margin-right:0" @click.native="close">去结算</x-button>
            </FlexboxItem>
        </Flexbox>
    </div>
</template>

<script>
import { XButton } from 'vux'
import {mapMutations,mapState,mapGetters} from 'vuex'
import { Flexbox, FlexboxItem } from 'vux'
export default {
    name:'close',
    components:{
        XButton,
        Flexbox,
        FlexboxItem
    },
    data(){
        return{
            show:true
        }
    },
    methods:{
        ...mapMutations(['toClose']),
        close(){
            const that = this 
            this.$vux.confirm.show({
                title:"注意",
                content:"确定要去结算吗？",
                onCancel () {      //取消的回调
                
                },
                onConfirm () {    //确定的回调
                    that.toClose()
                    if(that.isHaveProduct){
                        that.$router.push({path:"/list"})
                        
                    }else{
                        that.$vux.alert.show({
                            title: '注意',
                            content: '暂无可结算的产品!',
                        })
                    }
                }
            })
                
        }
        
    },
    computed:{
        ...mapState(['isHaveProduct']),
        ...mapGetters(['allNum','allBagNum'])
    },
    mounted(){
        //来判断show的值，从而实现页面的更改
        let _this =this
        _this.bus.$on('change',function(msg){
        _this.show=msg;
        })
    }
    
}
</script>

<style scoped>
    .close{
        border: 1px solid #ccc;
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 50px;
        background: #CDC8B1;
    }
</style>

