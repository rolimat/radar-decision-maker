<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-input
          placeholder="Axis name"
          v-model="axis.name"
          clearable
        />
        <i
          @click="removeAxis"
          class="el-icon-delete"
        />
      </div>
    </template>
    <div v-for="value in axis.values" :key="value" class="text item">
      <span>{{ value }}</span>
      <span @click="removeAxisValue(value)"><i class="el-icon-close" /></span>
    </div>
    <div v-if="isAxesValuesEditing">
      <el-input
        placeholder="Value name"
        v-model="editingAxisValueName"
        clearable
      />
      <span @click="confirmValue"><i class="el-icon-check" /></span>
      <span @click="isAxesValuesEditing = false"><i class="el-icon-close" /></span>
    </div>
    <div
      v-else
      @click="editAxesValues"
    >
      <i class="el-icon-circle-plus-outline" />
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject } from 'vue'
import { Axis } from '@/types'

export default defineComponent({
  name: 'DecisionAxisCard',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const isAxesValuesEditing = ref(false)
    const editingAxisValueName = ref('')
    const axisSchemaState = inject('axisSchemaState', ref<Axis[]>())

    const axis = computed(() => {
      if (axisSchemaState.value) {
        return axisSchemaState.value.find((axis: Axis) => axis.id === props.id)
      }
      return {}
    })

    const editAxesValues = () => {
      editingAxisValueName.value = ''
      isAxesValuesEditing.value = true
    }
    const confirmValue = () => {
      if (axisSchemaState.value) {
        axisSchemaState.value = axisSchemaState.value.map((axis: Axis) => {
          if (axis.id === props.id) {
            axis.values.push(editingAxisValueName.value)
          }
          return axis
        })
      }

      isAxesValuesEditing.value = false
    }
    const removeAxisValue = (toRemoveValue: string) => {
      if (axisSchemaState.value) {
        axisSchemaState.value = axisSchemaState.value.map((axis: Axis) => {
          if (axis.id === props.id) {
            axis.values = axis.values.filter((val: string) => val !== toRemoveValue)
          }
          return axis
        })
      }
    }
    const removeAxis = () => {
      if (axisSchemaState.value) {
        axisSchemaState.value = axisSchemaState.value.filter((axis: Axis) => axis.id !== props.id)
      }
    }

    return { axis, confirmValue, editAxesValues, removeAxisValue, removeAxis, editingAxisValueName, isAxesValuesEditing }
  }
})
</script>

<style scoped>

</style>
