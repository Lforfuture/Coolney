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
            v-for="tag in payTagsList"
            :key="tag.id"
            @click.native="onSelect(tag.name, tag.describe)"
            :class="{ selected: tag.describe === selectedTag }"
          >
            <Icon :name="tag.name"></Icon>
            <span class="describe">{{ tag.describe }}</span>
          </swiper-slide>
          <swiper-slide>
            <Icon @click.native="onAddTag" :name="'add'"></Icon>
            <span class="describe">添加</span>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </van-tab>
      <van-tab title="收入" name="+">
        <swiper class="swiper" :options="swiperOptions">
          <swiper-slide
            v-for="tag in incomeTagsList"
            :key="tag.id"
            @click.native="onSelect(tag.name, tag.describe)"
            :class="{ selected: tag.describe === selectedTag }"
          >
            <Icon :name="tag.name"></Icon>
            <span class="describe">{{ tag.describe }}</span>
          </swiper-slide>
          <swiper-slide>
            <Icon @click.native="onAddTag" :name="'add'"></Icon>
            <span class="describe">添加</span>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Tab, Tabs, Popup } from "vant";
import { Tag } from "@/custom";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Popup);
@Component({
  components: { Swiper, SwiperSlide },
  directives: { Swiper: directive },
})
export default class tagPicker extends Vue {
  inOut = "-";
  payTagsList: Tag[] = [];
  incomeTagsList: Tab[] = [];
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
    this.payTagsList = this.$store.state.payTagsList;
    this.incomeTagsList = this.$store.state.incomeTagsList;
  }
  onSelect(tagName: string, describe: string) {
    this.selectedTag = describe;
    console.log(this.selectedTag);
    this.$emit("update:chosenTag", tagName,this.selectedTag);
  }
  onTab(tabName: string) {
    this.$emit("update:tab", tabName);
  }
  onAddTag() {
    const describe = window.prompt("请输入标签名称");
    if (describe === null) return;
    if (describe === "") {
      window.alert("不能为空！");
    } else {
      if (this.inOut === "+") {
        this.$store.commit("addIncomeTag", {
          name: "new",
          id: null,
          describe: describe,
        });
      } else if (this.inOut === "-") {
        this.$store.commit("addPayTag", {
          name: "new",
          id: null,
          describe: describe,
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tagPicker {
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