<template>
  <div id="chart"></div>
</template>

<script>
import echarts from 'echarts'
import { createOption } from './chart'
export default {
  name: 'HelloWorld',
  data () {
    return {}
  },
  mounted () {
    this.drawChart()
  },
  methods: {
    drawChart () {
      const option = createOption()
      const myChart = echarts.init(document.getElementById('chart'))
      myChart.setOption(option)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #chart {
    width: 1100px;
    height: 800px;
    margin: auto;
  }
</style>
