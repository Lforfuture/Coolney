<template>
  <Layout>
    <div class="showList">
      <ul class="dayList">
        <li class="showItem">
          <Icon name="trip"></Icon>
          <span class="describe">旅游</span>
          <span>99元</span>
        </li>
        <li class="showItem">
          <Icon name="food"></Icon>
          <span class="describe">用餐</span>
          <span>77元</span>
        </li>
      </ul>
    </div>
    <router-link to="make_record" class="addRecord">记一笔</router-link>
  </Layout>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Detals extends Vue {}
</script>

<style lang="scss" scoped>
.showList {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .dayList {
    display: flex;
    flex-direction: column;
    .showItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5em 1em;
      width: 90vw;
      .describe{
        margin-right: auto;
        margin-left: 1em;
      }
      &:not(:first-child) {
        border-top: 1px solid #e6e6e6;
      }
    }
  }
}
.addRecord {
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 16px;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid;
  color: #00a1e9;
}
</style>