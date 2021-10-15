<template>
  <div class="make-record-wrapper">
    <div class="top-bar">
      <div class="back">
        <Icon @click.native="goback" name="left"></Icon>
      </div>
    </div>
    <DatePicker @updateTime="onUpdateTime"></DatePicker>
    <TagPicker @update:tab="onTab" @update:chosenTag="onChosenTag"></TagPicker>
    <InputForm
      :formName="'备注'"
      :placeholder="'请在此输入备注'"
      @update:value="onUpdateValue"
    ></InputForm>
    <NumberPad
      @update:amount="onUpdateAmount"
      @submit="onSubmit"
      :chosenTag="record.describe"
      class="number-pad"
    ></NumberPad>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { RecordItem, Tag, RootState } from "@/custom";
import DatePicker from "@/components/makeRecord/datePicker.vue";
import TagPicker from "@/components/makeRecord/tagPicker.vue";
import NumberPad from "@/components/makeRecord/NumberPad.vue";
import InputForm from "@/components/InputForm.vue";
import dayjs from "dayjs";
@Component({
  components: { NumberPad, DatePicker, TagPicker, InputForm },
})
export default class MakeRecord extends Vue {
  //账单记录对象，每次更新账单都会将它的深拷贝push进recordList
  record: RecordItem = {
    tagName:"",
    note: "",
    inOut: "-",
    amount: 0,
    describe:"",
    time:dayjs().format()
  };
  created() {
   this.$store.commit("fetchRecordsList") 
  }
  goback() {
    this.$router.back();
  }
  //监听选择标签
  onChosenTag(tagName: string,describe:string) {
    this.record.tagName = tagName;
    this.record.describe = describe
    console.log(this.record);
  }
  //监听切换支出/收入
  onTab(inOut: string) {
    this.record.inOut = inOut;
  }
  //监听输入金额
  onUpdateAmount(amount: number) {
    this.record.amount = amount;
  }
  //监听输入备注
  onUpdateValue(note: string) {
    this.record.note = note;
  }
  onUpdateTime(time:string){
    this.record.time = time
  }
  onSubmit(){
    this.record.time
    this.$store.commit("pushRecord",this.record)
  }
}
</script>

<style lang="scss" scoped>
.make-record-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}
.inputForm {
  flex-grow: 1;
}
.top-bar {
  flex-grow: 0.1;
  display: flex;
  align-items: center;
}
</style>