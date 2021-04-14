<template>
  <div>
    <RadarChart :chart-data="chartData"/>

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
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const datasets = [
      {
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
      }
    ]
    const chartData = { labels, datasets }

    return { chartData }
  }
})
</script>

<style scoped>

</style>
