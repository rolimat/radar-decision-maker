<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-input
          v-model="newDecision.name"
          placeholder="Decision name"
          clearable
        />
        <div @click="addDecision"><i class="el-icon-check" /></div>
        <div @click="isAdding = false"><i class="el-icon-close" /></div>
      </div>
    </template>
    <div>
      <div v-for="value in newDecision.values" :key="value.label">
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
import { defineComponent, inject, onMounted, ref } from 'vue'
import { Axis, AxisValue, DecisionChart } from '@/types'
import { generateUuid } from '@/common/uuid'
import { getNumericValueForAxis } from '@/common/axis'
export default defineComponent({
  name: 'DecisionItemAdd',
  setup (props, { emit }) {
    const newDecision = ref<DecisionChart>({ id: '-1', name: '', values: [] })
    const decisionState = inject('decisionState', ref<DecisionChart[]>())
    const axisSchemaState = inject('axisSchemaState', ref<Axis[]>())

    const handleValueChange = (command: string) => {
      const axisId = command.split('%%')[0]
      const value = command.split('%%')[1]
      newDecision.value.values = newDecision.value.values.map((v: AxisValue) => {
        if (v.axisId === axisId) {
          v.value = value
          if (axisSchemaState.value) {
            v.numericValue = getNumericValueForAxis(value, axisSchemaState.value.find((a: Axis) => a.id === axisId))
          }
        }
        return v
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
    const addDecision = () => {
      if (decisionState.value) {
        decisionState.value.push(newDecision.value)
      }
      emit('closeAdd')
    }
    onMounted(() => {
      if (axisSchemaState.value) {
        const values = axisSchemaState.value.map((axis: Axis) => {
          return {
            axisId: axis.id,
            label: axis.name,
            value: axis.values[0],
            numericValue: getNumericValueForAxis(axis.values[0], axis)
          }
        })
        newDecision.value = { id: generateUuid(), name: '', values }
      }
    })
    return { newDecision, addDecision, getAxisPossibleValues, handleValueChange }
  }
})
</script>

<style scoped>

</style>
