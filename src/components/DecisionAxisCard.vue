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
      <span><i class="el-icon-close" /></span>
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

export default defineComponent({
  name: 'DecisionAxisCard',
  props: {
    axis: {
      type: Object as PropType<Axis>,
      required: true
    }
  },
  setup (props, { emit }) {
    // TODO: compartir el estado de axis y evitar los eventos???
    const isAxesValuesEditing = ref(false)
    const editingAxisValueName = ref('')
    const axisName = ref(props.axis.name)
    watch(axisName, (name) => {
      emit('updateAxisName', { name, id: props.axis.id })
    })

    const editAxesValues = () => {
      editingAxisValueName.value = ''
      isAxesValuesEditing.value = true
    }
    const confirmValue = () => {
      emit('addAxisValue', { value: editingAxisValueName.value, id: props.axis.id })
      isAxesValuesEditing.value = false
    }
    return { axisName, confirmValue, editAxesValues, editingAxisValueName, isAxesValuesEditing }
  }
})
</script>

<style scoped>

</style>
