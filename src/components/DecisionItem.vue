<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <template v-if="isEditing">
          <el-input
            v-model="decisionName"
            placeholder="Decision name"
            clearable
          />
          <i
            @click="confirmEdit"
            class="el-icon-check"
          />
          <i
            @click="discardEdit"
            class="el-icon-close"
          />
        </template>
        <template v-else>
          <span>{{ decisionName }}</span>
          <i
            @click="enableEdit"
            class="el-icon-edit"
          />
          <i
            @click="removeDecisionItem"
            class="el-icon-delete"
          />
        </template>

      </div>
    </template>
    <div v-if="isEditing">
      EDICION!!!
    </div>
    <div v-else>
      <RadarChart :chart-data="chartData" :scale-callback="scaleCallback"/>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed } from 'vue'
import RadarChart from '@/components/RadarChart.vue'
import { Axis, DecisionChart } from '@/types'

export default defineComponent({
  name: 'DecisionItem',
  components: {
    RadarChart
  },
  props: {
    decisionId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const isEditing = ref(false)
    const decisionState = inject('decisionState', ref<DecisionChart[]>())
    const defaultDecisionChart = { name: '', values: [{ label: '', value: '', numericValue: 0 }] }
    const decision = decisionState.value ? decisionState.value.find((d: DecisionChart) => d.id === props.decisionId) || defaultDecisionChart : defaultDecisionChart
    const decisionName = ref(decision.name)
    const chartData = computed(() => {
      return {
        labels: decision.values.map((v) => v.label),
        datasets: [
          {
            label: decision.name,
            backgroundColor: '#f87979',
            data: decision.values.map((v) => v.numericValue)
          }
        ]
      }
    })
    const enableEdit = () => {
      isEditing.value = true
    }
    const confirmEdit = () => {
      decision.name = decisionName.value
      isEditing.value = false
    }
    const discardEdit = () => {
      isEditing.value = false
    }

    const scaleCallback = (value: number/* , index, values */) => {
      return value + 'asdadsd'
    }
    const removeDecisionItem = () => {
      if (decisionState.value) {
        decisionState.value = decisionState.value.filter((d: DecisionChart) => d.id !== props.decisionId)
      }
    }

    return { decisionName, isEditing, confirmEdit, discardEdit, enableEdit, chartData, scaleCallback, removeDecisionItem }
  }
})
</script>

<style scoped>

</style>
