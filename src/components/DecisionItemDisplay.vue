<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ decision.name }}</span>
        <i
          @click="enableEdit"
          class="el-icon-edit"
        />
        <i
          @click="removeDecisionItem"
          class="el-icon-delete"
        />
      </div>
    </template>
    <div>
      <RadarChart :key="decision.id" :decision="decision" :scale-callback="scaleCallback"/>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, inject, PropType } from 'vue'
import RadarChart from '@/components/RadarChart.vue'
import { DecisionChart } from '@/types'

export default defineComponent({
  name: 'DecisionItemDisplay',
  components: {
    RadarChart
  },
  props: {
    decision: {
      type: Object as PropType<DecisionChart>,
      required: true
    },
    isEditing: {
      type: Boolean,
      required: true
    }
  },
  setup (props, { emit }) {
    const decisionState = inject('decisionState', ref<DecisionChart[]>())

    const scaleCallback = (/* value: number , index, values */) => {
      return '' // value + 'asdadsd'
    }

    const removeDecisionItem = () => {
      if (decisionState.value) {
        decisionState.value = decisionState.value.filter((d: DecisionChart) => d.id !== props.decision.id)
      }
    }

    const enableEdit = () => {
      emit('update:isEditing', true)
    }

    return { enableEdit, removeDecisionItem, scaleCallback }
  }
})
</script>

<style scoped>

</style>
