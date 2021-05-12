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
        // Remove not defined values
        d.values = d.values.filter((axisValue: AxisValue) => newAxisSchema.map((axis: Axis) => axis.id).includes(axisValue.axisId))

        // Remove values that do not exist anymore and update numericValue in case value schema has been modified for axis
        d.values.forEach((axisValue: AxisValue) => {
          const newAxis = newAxisSchema.find((axis: Axis) => axis.id === axisValue.axisId)
          if (newAxis) {
            if (!newAxis.values.includes(axisValue.value)) {
              axisValue.value = newAxis.values[0]
              axisValue.numericValue = getNumericValueForAxis(newAxis.values[0], newAxis)
            } else {
              axisValue.numericValue = getNumericValueForAxis(axisValue.value, newAxis)
            }
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
