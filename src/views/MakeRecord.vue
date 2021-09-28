<template>
  <div class="make-record-wrapper">
    <!-- 日期选择模块开始 -->
    <van-cell
      id="picker"
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
    <!-- 日期选择模块结束 -->

    <!-- 标签选项栏开始 -->
    <swiper class="swiper" :options="swiperOptions">
      <swiper-slide v-for="item in tagsList" :key="item.name"><Icon :name="item.name"></Icon></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Calendar, Icon, Tag } from "vant";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import dayjs from "dayjs";

Vue.use(Calendar);
Vue.use(Icon);

@Component({
  components: { Swiper, SwiperSlide },
  directives: { Swiper: directive },
})
export default class MakeRecord extends Vue {
  defaultDate = new Date();
  currentDate = "";
  tagsList:Tag[] = []
  showMonthPicker = false;
  showDatePicker = false;
  minDate = new Date(dayjs().year() - 5, 0, 1);
  maxDate = new Date(dayjs().year() + 5, 0, 1);
  // eslint-disable-next-line no-undef
  pages = [] as Tag[][];
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
  created(): void {
    this.$store.commit("fetchTagsList");
     this.tagsList = this.$store.state.tagsList;
    this.currentDate = dayjs().format("YYYY-MM-DD");
  }
  mounted() {
    console.log(this.$refs.swiper);
  }
  onDateConfirm(date: Date): void {
    this.showDatePicker = !this.showDatePicker;
    this.currentDate = dayjs(date).format("YYYY-MM-DD");
    this.onShowMonthPicker();
  }
  swiperOptions = {
    slidesPerView: 5,
    slidesPerGroup : 5,
    slidesPerColumn: 2,
    slidesPerColumnFill: 'row',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    }
  };
}
</script>

<style lang="scss" scoped>
$font: blue;
#picker {
  display: flex;
  justify-content: space-around;
  border: 1px solid $font;
  .date {
    width: 100%;
    text-align: center;
  }
  .van-icon-calendar-o::before {
    font-size: 2em;
  }
}
.swiper {
  height: 20vh;
  margin-left: auto;
  margin-right: auto;

  .swiper-slide {
    height: auto;
  }
}
</style>