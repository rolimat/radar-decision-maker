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
          @click="removeAxis(id)"
          class="el-icon-delete"
        />
      </div>
    </template>
    <div v-for="value in axis.values" :key="value" class="text item">
      <span>{{ value }}</span>
      <span @click="removeAxisValue({value, id})"><i class="el-icon-close" /></span>
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
import { defineComponent, ref, PropType, watch, computed } from 'vue'
import { getAxisById, removeAxis, addAxisValue, removeAxisValue } from '@/shareables/axisSchema'

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
    const axis = computed(() => {
      return getAxisById(props.id)
    })

    const editAxesValues = () => {
      editingAxisValueName.value = ''
      isAxesValuesEditing.value = true
    }
    const confirmValue = () => {
      addAxisValue({ value: editingAxisValueName.value, id: props.id })
      isAxesValuesEditing.value = false
    }
    return { axis, confirmValue, editAxesValues, removeAxisValue, editingAxisValueName, isAxesValuesEditing, removeAxis }
  }
})
</script>

<style scoped>

</style>
