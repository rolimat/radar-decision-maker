<script>
import { defineComponent } from 'vue'
import { Radar } from 'vue3-chart-v2'

export default defineComponent({
  name: 'RadarChart',
  extends: Radar,
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
  computed: {
    chartOptions () {
      return {
        responsive: true,
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100,
            stepSize: 30,
            userCallback: this.scaleCallback
          },
          pointLabels: {
            fontSize: 18
          }
        },
        legend: {
          position: 'bottom'
        }
      }
    },
    chartData () {
      return {
        labels: this.decision.values.map((v) => v.label),
        datasets: [
          {
            label: this.decision.name,
            backgroundColor: '#f87979',
            data: this.decision.values.map((v) => v.numericValue)
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
})
</script>
