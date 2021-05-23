<template>
  <vue3-chart-js v-bind='{ ...radarChart }' />
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

export default {
  name: 'RadarChart',
  components: {
    Vue3ChartJs
  },
  props: {
    decision: {
      type: Object,
      required: true
    },
    scaleCallback: {
      type: Function,
      default: () => (value) => value
    }
  },
  setup (props) {
    const radarChart = {
      type: 'radar',
      options: {
        min: 0,
        max: 200,
        responsive: true,
        // plugins: {
        //   legend: {
        //     position: 'bottom'
        //   }
        // },
        scale: {
          ticks: {
            beginAtZero: true,
            max: 100,
            min: 0,
            stepSize: 20
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            angleLines: {
              display: false
            },
            min: 0,
            max: 100
          }
        }
      },
      data: {
        labels: props.decision.values.map((v) => v.label),
        datasets: [
          {
            label: props.decision.name,
            data: props.decision.values.map((v) => v.numericValue),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          }
        ]
      }
    }

    return {
      radarChart
    }
  }
}
</script>
