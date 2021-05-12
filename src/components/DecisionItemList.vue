<template>
  <el-row :gutter="20">
    <el-col
      v-for="decision in decisionState"
      :key="decision.id"
      :span="12"
    >
      <DecisionItem :decisionId="decision.id" />
    </el-col>
    <el-col>
      <template v-if="isAdding">
<!--        TODO: extract this to a new component-->
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
      <i
        v-else
        @click="displayAddDecision"
        class="el-icon-circle-plus-outline"
      />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { Axis, AxisValue, DecisionChart } from '@/types'
import { generateUuid } from '@/common/uuid'
import DecisionItem from '@/components/DecisionItem.vue'
import { getNumericValueForAxis } from '@/common/axis'
export default defineComponent({
  name: 'DecisionItemList',
  components: {
    DecisionItem
  },
  setup () {
    const decisionState = inject('decisionState', ref<DecisionChart[]>())
    const axisSchemaState = inject('axisSchemaState', ref<Axis[]>())
    const isAdding = ref(false)
    const newDecision = ref<DecisionChart>({ id: '-1', name: '', values: [] })

    const addDecision = () => {
      if (decisionState.value) {
        decisionState.value.push(newDecision.value)
      }
      isAdding.value = false
    }
    const displayAddDecision = () => {
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
      isAdding.value = true
    }
    const getAxisPossibleValues = (axisId: string) => {
      if (axisSchemaState.value) {
        const axis = axisSchemaState.value.find((axis: Axis) => axis.id === axisId)
        if (axis) {
          return axis.values
        }
      }
    }
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
    return { addDecision, decisionState, displayAddDecision, getAxisPossibleValues, handleValueChange, isAdding, newDecision }
  }
})
</script>

<style scoped>

</style>
