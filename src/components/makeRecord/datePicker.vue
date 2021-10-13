<template>
  <div class="date-picker">
    <van-cell
      id="date-picker"
      icon="calendar-o"
      center
      is-link
      arrow-direction="down"
      @click="onShowMonthPicker"
    >
      <div class="date">{{ currentDate }}</div>
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
        @confirm="onShowDatePicker"
        @cancel="onShowMonthPicker"
      />
    </van-popup>
    <van-calendar
      :min-date="minDate"
      :max-date="maxDate"
      :default-date="defaultDate"
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
  defaultDate = new Date(); //今天的时间
  currentDate = ""; //选择的时间
  showMonthPicker = false;
  showDatePicker = false;
  minDate = new Date(dayjs().year(), 0, 1);
  maxDate = new Date(dayjs().year(), 11, 31);
  created() {
    this.currentDate = dayjs().format("YYYY-MM-DD");
  }
  changeDefaltDate(date: Date): void {
    this.defaultDate = date;
  }
  onShowMonthPicker(): void {
    this.showMonthPicker = !this.showMonthPicker;
  }
  onShowDatePicker(date: Date): void {
    if (date) this.changeDefaltDate(date);
    this.showDatePicker = !this.showDatePicker;
  }
  onDateConfirm(date: Date): void {
    this.showDatePicker = !this.showDatePicker;
    this.currentDate = dayjs(date).format("YYYY-MM-DD");
    this.onShowMonthPicker();
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