<template>
  <div id="app">
    <heade></heade>
    <transition
    mode="out-in"
    :duration="280"
    appear-active-class="fade-enter-active"  
    name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <foot v-show="isHeaderFooterShow"></foot>
  </div>
</template>

<script>
import foot from './common/footer/foot'
import heade from './common/header/head'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components:{
    foot,
    heade
  },
  computed:{
    ...mapState(['isHeaderFooterShow'])
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';    //1px解决方案
  @import '~vux/src/styles/close.less';  //css关闭图标
  @import '~vux/src/styles/reset.less';
  
  // * { touch-action: none; } 
  *{
    margin: 0
  }
  html,body,#app{
    height: 100%;
    background-color: rgb(251,249,254)
  }
  body{
    height:100%;
    min-height:100%;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active{
    transition: opacity 1s;
  }
</style>
