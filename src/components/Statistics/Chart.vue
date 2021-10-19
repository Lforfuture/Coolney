<template>
  <div class="chart" ref="chart"></div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";
import * as echarts from 'echarts';
@Component
export default class Chart extends Vue {
    @Prop() option?:echarts.EChartsOption
    chart = {} as echarts.ECharts
    mounted() {
     if(this.option){
          this.chart = echarts.init(this.$refs.chart as HTMLDivElement)
         this.setOption()
     }
    }
    setOption() {
        this.chart.setOption(this.option!)
    }
    @Watch('option',{deep:true})
    onChangeOption(){
        this.setOption()
    }
}
</script>

<style lang="scss" scoped>
.chart{
    height: 50%;
}
</style>