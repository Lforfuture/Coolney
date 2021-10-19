<template>
  <Layout>
    <div class="statistics">
      <van-tabs v-model="inOut" title-active-color="#00a1e9" color="#00a1e9">
        <van-tab title="支出" name="-"></van-tab>
        <van-tab title="收入" name="+"></van-tab>
      </van-tabs>
      <Chart v-if="inOut === '-'" :option="chartOption"></Chart>
      <Chart v-if="inOut === '+'" :option="chartOption"></Chart>
      <dl
        class="showList"
        v-for="oneDayList in daysList"
        :key="oneDayList.date"
      >
        <dt class="date-title">
          <span>{{ oneDayList.date }}</span>
          <span v-if="inOut === '-'" class="day-pay">支出 -{{ oneDayList.pay }}</span>
          <span v-if="inOut === '+'" class="day-income">收入 +{{ oneDayList.income }}</span>
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
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { RecordItem } from "@/custom";
import { Tab, Tabs, Lazyload } from "vant";
import Chart from "@/components/Statistics/Chart.vue";
import { Component, Watch } from "vue-property-decorator";
import dayjs from "dayjs";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Lazyload);
Vue.use(Lazyload, {
  lazyComponent: true,
});
@Component({ components: { Chart } })
export default class Statistics extends Vue {
  num = 0;
  inOut = "-";
  currentList = [] as RecordItem[];
  chartOption = {
    legend: {
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "item",
    },
    dataset: {
      source: [
        ["买", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
        ["乐", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
        ["吃", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
        ["玩", 25.2, 37.1, 41.2, 18, 33.9, 49.1],
      ],
    },
    series: [
      {
        type: "pie",
        id: "pie",
        radius: ["50%", "80%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        legend: {
          itemStyle: {
            color: "red",
          },
        },
        label: {
          show: false,
          position: "center",
          formatter: "{b}: {d}%",
        },
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 0,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "18",
          },
        },
      },
    ],
  };
  beforeCreate() {
    this.$store.commit("fetchRecordsList");
    this.$store.commit("fetchTagsList");
    this.$store.commit("fetchMonthList");
  }
  get monthList(): RecordItem[] {
    return this.$store.state.monthList;
  }
  get payList(): RecordItem[] {
    return this.monthList.filter((record) => record.inOut === "-");
  }
  get incomeList(): RecordItem[] {
    return this.monthList.filter((record) => record.inOut === "+");
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
    const { currentList } = this;
    let daysList: daysListType = {};
    for (let i = 0; i < currentList.length; i++) {
      const date = dayjs(currentList[i].time).format("MM-DD");
      daysList[date] = daysList[date] || {
        date: date,
        pay: 0,
        income: 0,
        items: [],
      };
      daysList[date].items.push(currentList[i]);
      if (currentList[i].inOut === "-") {
        daysList[date].pay += currentList[i].amount;
      } else {
        daysList[date].income += currentList[i].amount;
      }
    }
    return daysList;
  }
  setPaySource() {
    let newSource: [string, number][] = [];
    for (let i = 0; i < this.payList.length; i++) {
      newSource.push([this.payList[i].describe, this.payList[i].amount]);
    }
    this.chartOption.dataset.source = newSource;
    this.currentList = this.payList;
  }
  setIncomeSource() {
    let newSource: [string, number][] = [];
    for (let i = 0; i < this.incomeList.length; i++) {
      newSource.push([this.incomeList[i].describe, this.incomeList[i].amount]);
    }
    this.chartOption.dataset.source = newSource;
    this.currentList = this.incomeList;
  }
  created() {
    console.log(this.payList);
    this.setPaySource();
  }
  @Watch("monthList")
  onUpdateMonthList() {
    if (this.inOut === "-") {
      this.setPaySource();
    } else {
      this.setIncomeSource();
    }
  }
  @Watch("inOut")
  onUpdateOption(newValue: string) {
    if (newValue === "-") {
      this.setPaySource();
    } else {
      this.setIncomeSource();
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
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
</style>