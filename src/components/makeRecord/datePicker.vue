<template>
  <div class="date-picker-wrapper">
    <van-cell
      id="date-picker"
      icon="calendar-o"
      center
      is-link
      arrow-direction="down"
      @click="onShowMonthPicker"
    >
      <div class="date">{{ currentDateString }}</div>
    </van-cell>
    <van-popup
      @click-overlay="onShowMonthPicker"
      round
      position="bottom"
      :style="{ height: '30vh' }"
      v-model="showMonthPicker"
    >
      <van-datetime-picker
        type="year-month"
        title="选择年月"
        @confirm="onMonthConfirm"
        @cancel="onShowMonthPicker"
      />
    </van-popup>
    <van-calendar
      ref="rili"
      :min-date="minDate"
      :max-date="maxDate"
      :default-date="currentDate"
      v-model="showDatePicker"
      @confirm="onDateConfirm"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Calendar, Icon } from "vant";
import dayjs from "dayjs";
Vue.use(Calendar);
Vue.use(Icon);
@Component
export default class datePicker extends Vue {
  currentDateString = ""; //选择的时间
  currentDate = {} as Date
  showMonthPicker = false;
  showDatePicker = false;
  ifMonthConfirm =false
  minDate:Date = new Date;
  maxDate:Date = new Date;
  created() {
    this.currentDate = new Date
    this.currentDateString = dayjs().format("YYYY-MM-DD");
  }
  onShowMonthPicker(): void {
    this.showMonthPicker = !this.showMonthPicker;
  }
  onMonthConfirm(date: Date) {
    this.currentDate = date
    this.minDate = new Date(dayjs(date).year(), 0, 1);
    this.maxDate = new Date(dayjs(date).year(), 11, 31);
    this.onShowDatePicker()
  }
  onShowDatePicker(){
    this.showDatePicker = !this.showDatePicker;
  }
  onDateConfirm(date: Date): void {
    this.showDatePicker = !this.showDatePicker;
    this.currentDateString = dayjs(date).format("YYYY-MM-DD");
    this.currentDate = date
    this.onShowMonthPicker();
    this.$emit("updateTime",dayjs(date).format())
  }
}
</script>

<style lang="scss" scoped>
#date-picker {
  flex-grow: 1;
  display: flex;
  justify-content: space-around;
  margin-bottom: 1vh;
  .date {
    width: 100%;
    text-align: center;
  }
  .van-icon-calendar-o::before {
    font-size: 5vh;
  }
}
</style>