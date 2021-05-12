<script>
import { defineComponent } from 'vue'
import { Radar } from 'vue3-chart-v2'

export default defineComponent({
  name: 'RadarChart',
  extends: Radar,
  props: {
    chartData: {
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
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
})
</script>
