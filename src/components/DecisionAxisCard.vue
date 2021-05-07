<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-input
          placeholder="Axis name"
          v-model="axisName"
          clearable
        />
        <i
          @click="$emit('removeAxis', axis.id)"
          class="el-icon-delete"
        />
      </div>
    </template>
    <div v-for="val in axis.values" :key="val" class="text item">
      <span>{{ val }}</span>
      <span @click="removeValue(val)"><i class="el-icon-close" /></span>
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
import { defineComponent, ref, PropType, watch } from 'vue'
import { Axis } from '@/types'
import { updateAxisName, addAxisValue, removeAxisValue } from '@/shareables/axisSchema'

export default defineComponent({
  name: 'DecisionAxisCard',
  props: {
    axis: {
      type: Object as PropType<Axis>,
      required: true
    }
  },
  setup (props) {
    const isAxesValuesEditing = ref(false)
    const editingAxisValueName = ref('')
    const axisName = ref(props.axis.name)
    watch(axisName, (name) => {
      updateAxisName({ name, id: props.axis.id })
    })

    const editAxesValues = () => {
      editingAxisValueName.value = ''
      isAxesValuesEditing.value = true
    }
    const confirmValue = () => {
      addAxisValue({ value: editingAxisValueName.value, id: props.axis.id })
      isAxesValuesEditing.value = false
    }
    const removeValue = (value: string) => {
      removeAxisValue({ value, id: props.axis.id })
    }
    return { axisName, confirmValue, editAxesValues, removeValue, editingAxisValueName, isAxesValuesEditing }
  }
})
</script>

<style scoped>

</style>
