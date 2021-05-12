<template>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-input
            v-model="decision.name"
            placeholder="Decision name"
            clearable
          />
          <i
            @click="closeEdit"
            class="el-icon-back"
          />
        </div>
      </template>
      <div>
        <div v-for="value in decision.values" :key="value.label">
          <span>{{ value.label }}:</span>
          <span>
            <el-dropdown @command="handleValueChange">
              <span class="el-dropdown-link">
                {{ value.value }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="axisValue in getAxisPossibleValues(value.axisId)"
                    :key="axisValue"
                    :command="`${value.axisId}%%${axisValue}`"
                  >
                    {{ axisValue }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
        </div>
      </div>
    </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed, PropType } from 'vue'
import { Axis, AxisValue, DecisionChart } from '@/types'
import { getNumericValueForAxis } from '@/common/axis'
export default defineComponent({
  name: 'DecisionItemEditor',
  props: {
    decisionId: {
      type: String,
      required: true
    }
  },
  setup (props, { emit }) {
    const axisSchemaState = inject('axisSchemaState', ref<Axis[]>())

    const decisionState = inject('decisionState', ref<DecisionChart[]>())
    const defaultDecisionChart = { name: '', values: [{ axisId: '-1', label: '', value: '', numericValue: 0 }] }
    const decision = (decisionState.value && decisionState.value.find((d: DecisionChart) => d.id === props.decisionId)) || defaultDecisionChart

    const closeEdit = () => {
      emit('closeEdit')
    }
    const handleValueChange = (command: string) => {
      decision.values = decision.values.map((d: AxisValue) => {
        const axisId = command.split('%%')[0]
        const value = command.split('%%')[1]
        if (d.axisId === axisId) {
          d.value = value
          if (axisSchemaState.value) {
            const axis = axisSchemaState.value.find((axis: Axis) => axis.id === axisId)
            d.numericValue = getNumericValueForAxis(value, axis)
          }
        }
        return d
      })
    }

    const getAxisPossibleValues = (axisId: string) => {
      if (axisSchemaState.value) {
        const axis = axisSchemaState.value.find((axis: Axis) => axis.id === axisId)
        if (axis) {
          return axis.values
        }
      }
    }

    return { decision, closeEdit, getAxisPossibleValues, handleValueChange }
  }
})
</script>

<style scoped>

</style>
