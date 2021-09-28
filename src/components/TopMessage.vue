<template>
  <div class="topMessage-wrapper">
    <div class="title">酷你记账</div>
    <div class="inputItem">
      <van-cell 
        id="picker"
        center 
        is-link
        icon="calendar-o" 
        arrow-direction="down" 
        @click="showDatePicker"><div class="date">{{currentDate}}</div>
      </van-cell>
      <van-popup
        @click-overlay="showDatePicker"
        round
        position="bottom"
        :style="{ height: '30vh' }"
        v-model="ifShowDatePicker"
      >
        <van-datetime-picker
          v-model="selectDate"
          type="year-month"
          title="选择年月"
          @confirm="changeDate"
          @cancel="showDatePicker"
        />
        </van-popup>
    </div>
    <div class="total">
      <div class="total-item">
        <span>收入(￥)</span>
        <span class="number">99999</span>
      </div>
      <div class="total-item">
        <span>支出(￥)</span>
        <span class="number">6000</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import dayjs from "dayjs";
import { DatetimePicker, Cell, Popup } from "vant";
Vue.use(DatetimePicker);
Vue.use(Cell);
Vue.use(Popup);
@Component
export default class TopMessage extends Vue {
  currentDate = "";
  selectDate = "";
  ifShowDatePicker = false;
  created():void {
    this.currentDate = dayjs().format('YYYY-MM')
  }
  changeDate(date:Date):void{
    this.currentDate = dayjs(date).format("YYYY-MM")
    this.ifShowDatePicker = !this.ifShowDatePicker
  }
  showDatePicker(): void {
    this.ifShowDatePicker = !this.ifShowDatePicker;
    console.log(this.ifShowDatePicker);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.topMessage-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  color: black;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $mainColor;
    width: 100%;
    height: 5vh;
    color: #fff;
  }
}
.inputItem {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: black;
  width: 100%;
  height: 6vh;
  .van-icon-calendar-o::before{
        font-size: 2em;
    }
  .date{
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: 900;
  }
}
.total {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #272a3b;
  color: #fff;
  .total-item {
    color: #999999;
    font-size: 16px;
    display: flex;
    flex-direction: column;

    .number {
      color: #fff;
      padding-top: 0.5em;
      font-size: 20px;
    }
  }
}
</style>