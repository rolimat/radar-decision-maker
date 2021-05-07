<template>
  <div>
    <RadarChart :chart-data="chartData" :chart-options="chartOptions"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import RadarChart from '@/components/RadarChart.vue'
import { DecisionChart } from '@/types'

export default defineComponent({
  name: 'DecisionItem',
  components: {
    RadarChart
  },
  props: {
    decision: {
      type: Object as PropType<DecisionChart>,
      required: true
    }
  },
  setup (props) {
    const labels = props.decision.values.map((v) => v.label)
    const datasets = [
      {
        label: props.decision.name,
        backgroundColor: '#f87979',
        data: props.decision.values.map((v) => v.numericValue)
      }
    ]
    const chartData = { labels, datasets }

    const chartOptions = {
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 30,
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
