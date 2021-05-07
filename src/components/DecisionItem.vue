<template>
  <div>
    <RadarChart :chart-data="chartData" :chart-options="chartOptions"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RadarChart from '@/components/RadarChart.vue'

export default defineComponent({
  name: 'DecisionItem',
  components: {
    RadarChart
  },
  setup () {
    const labels = ['January', 'February', 'March', 'April', 'May']
    const datasets = [
      {
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: [40, 20, 30, 80, 10]
      }
    ]
    const chartData = { labels, datasets }

    const chartOptions = {
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 60,
          stepSize: 20,
          userCallback: function (value: number/* , index, values */) {
            // Default callback
            return value + 'asdadsd'
          }
        },
        pointLabels: {
          fontSize: 18
        }
      },
      legend: {
        position: 'left'
      }
    }

    return { chartData, chartOptions }
  }
})
</script>

<style scoped>

</style>
