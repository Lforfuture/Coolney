<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="writeNumber">7</button>
      <button @click="writeNumber">8</button>
      <button @click="writeNumber">9</button>
      <button @click="remove">删除</button>
      <button @click="writeNumber">4</button>
      <button @click="writeNumber">5</button>
      <button @click="writeNumber">6</button>
      <button @click="clear">清空</button>
      <button @click="writeNumber">1</button>
      <button @click="writeNumber">2</button>
      <button @click="writeNumber">3</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="writeNumber">.</button>
      <button @click="writeNumber" class="zero">0</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class NumberPad extends Vue {
  @Prop(String) chosenTag?:string
  output = "0";
  writeNumber(e: MouseEvent) {
    const button = e.target as HTMLButtonElement;
    const input = button.textContent as string;
    if (this.output.length >= 16) {
      alert("太长啦");
      return;
    }
    if (this.output === "0") {
      if (input === ".") {
        this.output = "0.";
      } else if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      }
    } else if (this.output.indexOf(".") >= 0) {
      if (input === ".") {
        return;
      } else {
        this.output += input;
      }
    } else {
      this.output += input;
    }
  }
  remove(): void {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear(): void {
    this.output = "0";
  }
  ok():void{
    if(!this.chosenTag){
      window.alert("请先选择标签")
    }else{
      this.$emit("update:amount",parseFloat(this.output))
      this.$emit("submit")
      this.output = "0"
      window.alert("记录成功")
    }
  }
}
</script>


<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  width: 100%;
  .output {
    background-color: #bfe3f3;
    font-size: 20px;
    font-family: Consolas, monospace;
    padding: 10px 16px;
    text-align: right;
    min-height: 30px;
  }
  .buttons {
    @extend %clearfix;
    > button {
      font-size: 3vh;
      width: 25%;
      height: 8vh;
      float: left;
      background-color: transparent;
      border: none;
      &.ok {
        height: 16vh;
        float: right;
      }
      &.zero {
        width: 50%;
      }
      $buttonColor: #bfe3f3;
      &:nth-child(1) {
        background: $buttonColor;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($color: $buttonColor, $amount: 3%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($color: $buttonColor, $amount: 6%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($color: $buttonColor, $amount: 9%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10),
      &:nth-child(13) {
        background: darken($color: $buttonColor, $amount: 12%);
      }
      &:nth-child(8),
      &:nth-child(11) {
        background: darken($color: $buttonColor, $amount: 15%);
      }
      &:nth-child(14) {
        background: darken($color: $buttonColor, $amount: 17%);
      }
      &:nth-child(12) {
        background: darken($color: $buttonColor, $amount: 18%);
      }
    }
  }
}
</style>