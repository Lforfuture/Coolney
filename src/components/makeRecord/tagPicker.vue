<template>
  <div class="tagPicker">
    <van-tabs
      @click="onTab"
      v-model="inOut"
      title-active-color="#00a1e9"
      color="#00a1e9"
    >
      <van-tab title="支出" name="-">
        <swiper class="swiper" :options="swiperOptions">
          <swiper-slide
            v-for="tag in tagsList"
            :key="tag.name"
            @click.native="onSelect(tag.name,tag.describe)"
            :class="{ selected: tag.name === selectedTag }"
          >
            <Icon :name="tag.name"></Icon>
            <span class="describe">{{ tag.describe }}</span>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </van-tab>
      <van-tab title="收入" name="+">收入内容</van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Tab, Tabs } from "vant";
import { Tag } from "@/custom";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
Vue.use(Tab);
Vue.use(Tabs);

@Component({
  components: { Swiper, SwiperSlide },
  directives: { Swiper: directive },
})
export default class tagPicker extends Vue {
  inOut = "-";
  tagsList: Tag[] = [];
  selectedTag = "";
  swiperOptions = {
    slidesPerView: 5,
    slidesPerGroup: 5,
    slidesPerColumn: 2,
    slidesPerColumnFill: "row",
    width: undefined,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };
  created(): void {
    this.$store.commit("fetchTagsList");
    this.tagsList = this.$store.state.tagsList;
  }
  onSelect(name: string,describe:string) {
    this.selectedTag = name;
    console.log(this.selectedTag);
    this.$emit("update:chosenTag", this.selectedTag,describe);
  }
  onTab(tabName: string) {
    this.$emit("update:tab",tabName)
  }
}
</script>

<style lang="scss" scoped>
.tagPicker{
  flex-grow: 1;
  .swiper {
  height: 20vh;
  font-size: 0.8em;
  .describe {
    font-size: 2vh;
  }
  .swiper-slide {
    height: 6vh;
    &.selected {
      color: orange;
    }
  }
  .swiper-pagination {
    bottom: 0;
  }
}
}
</style>