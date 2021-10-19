<template>
  <Layout>
    <div class="show-wrapper">
      <dl
        class="showList"
        v-for="oneDayList in daysList"
        :key="oneDayList.date"
      >
        <dt class="date-title">
          <span>{{ oneDayList.date }}</span>
          <span class="day-pay">支出 -{{ oneDayList.pay }}</span>
          <span class="day-income">收入 +{{ oneDayList.income }}</span>
        </dt>
        <dd
          class="showItem"
          v-for="(item, index) in oneDayList.items"
          :key="index"
        >
          <Icon :name="item.tagName"></Icon>
          <span class="describe">{{ item.describe }}</span>
          <span class="note">{{ item.note }}</span>
          <span>{{ item.inOut }}{{ item.amount }}</span>
        </dd>
      </dl>
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
    this.$store.commit('fetchMonthList')
  }
  get monthList(): RecordItem[] {
    return this.$store.state.monthList
  }
  get daysList() {
    type oneDayList = {
      date: string;
      pay: number;
      income: number;
      items: RecordItem[];
    };
    type daysListType = {
      [key: string]: oneDayList;
    };
    let { monthList } = this;
    const daysList: daysListType = {};
    for (let i = 0; i < monthList.length; i++) {
      const date = dayjs(monthList[i].time).format("MM-DD");
      daysList[date] = daysList[date] || {
        date: date,
        pay: 0,
        income: 0,
        items: [],
      };
      daysList[date].items.push(monthList[i]);
      if (monthList[i].inOut === "-") {
        daysList[date].pay += monthList[i].amount;
      } else {
        daysList[date].income += monthList[i].amount;
      }
    }
    return daysList;
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
    align-items: center;
    width: 100%;
    .date-title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 3vh;
      color: #fff;
      background-color: #001938;
      .day-pay {
        margin-left: auto;
        margin-right: 1em;
      }
      .day-pay,
      .day-income {
        font-size: 2vh;
      }
    }
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
      &:not(:last-child) {
        border-bottom: 1px solid #e6e6e6;
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