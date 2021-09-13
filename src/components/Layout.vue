<template>
  <div class="layout-wrapper">
    <TopMessage />
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TopMessage from "@/components/TopMessage.vue"
import { Component, Prop } from "vue-property-decorator";
@Component({ components: { TopMessage } })
export default class Layout extends Vue {
  @Prop(String) classPrefix?: string;
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1;
}
</style>