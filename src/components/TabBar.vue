<template>
  <div class="tabBar-wrapper">
      <router-link class="link" to="/details" active-class="active">明细</router-link>
      <router-link class="link" to="/statistics" active-class="active">统计</router-link>
  </div>
</template>

<script>
import Vue from "vue";
import { Component,Prop } from "vue-property-decorator";
@Component
export default class TabBar extends Vue {

}
</script>

<style lang="scss" scoped>
    .tabBar-wrapper{
        display: flex;
        justify-content: space-around;
        color: black;
        background-color: #fff;
        .link{
            height: 4vh;
            width: 50%;
            line-height: 4vh;
        }
    }
    .active{
        color: black;
        background-color: #3994d1;
    }
</style>