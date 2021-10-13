<template>
  <Layout>
    <div class="show-wrapper">
      <ul class="showList">
        <li class="showItem" v-for="(record, index) in monthList" :key="index">
          <Icon :name="record.chosenTag"></Icon>
          <span class="describe">{{ record.describe }}</span>
          <span class="note">{{ record.note }}</span>
          <span>{{ record.inOut }}{{ record.amount }}</span>
        </li>
      </ul>
    </div>
    <router-link to="make_record" class="addRecord">记一笔</router-link>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { RecordItem } from "@/custom";
import dayjs from "dayjs";
@Component
export default class Detals extends Vue {
  beforeCreate() {
    this.$store.commit("fetchRecordsList");
    this.$store.commit("fetchTagsList");
  }
  get monthList(): RecordItem[] {
    return this.$store.state.recordsList.filter((record: RecordItem) => {
      return dayjs(record.time).format("YYYY-MM") === this.$store.state.currentMonth;
    });
  }
}
</script>

<style lang="scss" scoped>
.show-wrapper {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .showList {
    display: flex;
    flex-direction: column;
    .showItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5em 1em;
      width: 90vw;
      .describe {
        margin-left: 1em;
        margin-right: 1em;
      }
      .note {
        margin-right: auto;
        color: #3994d1;
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