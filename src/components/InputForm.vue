<template>
  <div class="form-wrapper">
    <label class="form">
      <div class="tip">{{ formName }}</div>
      <input
        type="text"
        @change="onValueChanged($event.target.value)"
        :placeholder="placeholder"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class InputForm extends Vue {
  @Prop(String) formName!: string;
  @Prop(String) placeholder?: string;
  onValueChanged(value: string): void {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";
.form-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: flex-end;
  .form {
    
    width: 100%;
    font-size: 16px;
    display: flex;
    align-items: flex-end;
    .tip {
      display: flex;
      align-items: center;
      padding: 0 1em;
      height: 5vh;
      background-color: #ecd030;
    }
    input {
      height: 5vh;
      flex-grow: 1;
      border: none;
      background-color: #f1e07d;
    }
  }
}
</style>