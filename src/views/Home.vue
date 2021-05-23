<template>
  <div class="home">
    <el-button type="primary">el-button</el-button>

    i18nTEST: {{ t('teest') }}

    <decision-schema />
    <decision-item-list />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, ref, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n' // @ is an alias to /src
import { Axis, DecisionChart, AxisValue } from '@/types'
import DecisionSchema from '@/components/DecisionSchema.vue'
import DecisionItemList from '@/components/DecisionItemList.vue'
import { getNumericValueForAxis } from '@/common/axis'

export default defineComponent({
  name: 'Home',
  components: {
    DecisionItemList,
    DecisionSchema
  },
  setup () {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })

    const axisSchemaState = ref<Axis[]>([])
    const decisionState = ref<DecisionChart[]>([])

    provide('axisSchemaState', axisSchemaState)
    provide('decisionState', decisionState)

    watch(axisSchemaState, (newAxisSchema) => {
      decisionState.value.forEach((d: DecisionChart) => {
        // Update decision axis values according to the new schema
        d.values = newAxisSchema.map((axis: Axis) => {
          const axisValue = d.values.find((v: AxisValue) => v.axisId === axis.id)
          const value = axisValue ? axisValue.value : axis.values[0]
          const numericValue = getNumericValueForAxis(value, axis)
          return {
            axisId: axis.id,
            label: axis.name,
            value,
            numericValue
          }
        })
      })
    })
    watchEffect(() => {
      if (axisSchemaState.value.length) {
        localStorage.setItem('axisSchemaState', JSON.stringify(axisSchemaState.value))
      }
      if (decisionState.value.length) {
        localStorage.setItem('decisionState', JSON.stringify(decisionState.value))
      }
    })

    onMounted(() => {
      const storedDecisonState = localStorage.getItem('decisionState')
      if (storedDecisonState) {
        decisionState.value = JSON.parse(storedDecisonState)
      }
      const storedAxisSchemaState = localStorage.getItem('axisSchemaState')
      if (storedAxisSchemaState) {
        axisSchemaState.value = JSON.parse(storedAxisSchemaState)
      }
    })

    return { t }
  }
})
</script>

<style>
</style>
