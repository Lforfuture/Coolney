<template>
  <div class="icon-containor">
    <svg class="icon">
      <use :xlink:href="'#' + name" />
    </svg>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line no-undef
let importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../assets/icon", true, /\.svg$/));
} catch (error) {
  console.log(error);
}
export default {
  props: ["name"],
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: 2vh;
  width: 2em;
  height: 2em;
  vertical-align: -0, 15em;
  fill: currentColor;
  overflow: hidden;
}
</style>