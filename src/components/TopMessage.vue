<template>
  <div class="topMessage-wrapper">
    <div class="title">
      酷你记账
    </div>
    <ul class="inputList">
      <li class="inputItem">
        <span class="text">月</span>
          <el-date-picker
            v-model="date"
            type="month"
            placeholder="选择月">
          </el-date-picker>
      </li>
      <li class="inputItem">
        <span class="text">月</span>
          <el-date-picker
            v-model="date"
            type="month"
            placeholder="选择月">
          </el-date-picker>
      </li>
      <li class="inputItem">
        <span class="text">月</span>
          <el-date-picker
            v-model="date"
            type="month"
            placeholder="选择月">
          </el-date-picker>
      </li>
    </ul>
  </div>
  
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class TopMessage extends Vue {
  date = ''
  mask = 'off'
}
</script>

<style lang="scss" scoped>
  .topMessage-wrapper{
    color: #fff;
    .title{
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #284657;
      height: 5vh;
    }
  }
  .inputList {
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    > .inputItem {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    height: 6vh;
    border: 1px solid transparent;
    border-bottom: 1px solid #d9d9d9;
    ::v-deep .el-input__inner {
     height: 5vh; 
    }
  }
  }
</style>