<template>
    <div class="foot">
        <tabbar style="position:fixed;" v-model="selected" v-show="show">
            <tabbar-item >
                <img slot="icon" src="./../../assets/image/enter.png">
                <img slot="icon-active" src="./../../assets/image/enter_active.png">
                <span slot="label">订单录入</span>
            </tabbar-item>
            <tabbar-item >
                <img slot="icon" src="./../../assets/image/search.png">
                 <img slot="icon-active" src="./../../assets/image/search_active.png">
                <span slot="label">订单查询</span>
            </tabbar-item>
           
        </tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
    name:"foot",
    components:{
        Tabbar,
        TabbarItem
    },
    data(){
        return{
            selected:0,
            show:true
        }
    },
    watch:{
        selected(val,oldVal){
            if(val == 0){
                this.$router.push('/')
            }else if(val == 1){
                this.$router.push('/search')
            }
        }
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

<style lang="less" scoped>
 
</style>

