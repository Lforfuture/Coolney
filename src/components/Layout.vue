<template>
  <div class="layout-wrapper">
    <TopMessage ref="topMessage" />
    <TabBar/>
    <div  class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TopMessage from "@/components/TopMessage.vue"
import TabBar from '@/components/TabBar.vue';
import { Component, Prop } from "vue-property-decorator";
@Component({ components: { TopMessage, TabBar } })
export default class Layout extends Vue {
  @Prop(String) classPrefix?: string;
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  background-color: #e1e1e0;
  height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1;
}
</style>