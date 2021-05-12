<template>
  <div class="home">
    <el-button type="primary">el-button</el-button>

    i18nTEST: {{ t('teest') }}

    <decision-schema />

    <el-row :gutter="20">
      <el-col
        v-for="decision in decisionState"
        :key="decision.id"
        :span="8"
      >
        <DecisionItem :decisionId="decision.id" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue'
import { useI18n } from 'vue-i18n' // @ is an alias to /src
import DecisionItem from '@/components/DecisionItem.vue'
import DecisionSchema from '@/components/DecisionSchema.vue'
import { Axis, DecisionChart } from '@/types'

export default defineComponent({
  name: 'Home',
  components: {
    DecisionItem,
    DecisionSchema
  },
  setup () {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })

    const axisSchemaState = ref<Axis[]>([{
      id: '1',
      name: 'pepito',
      values: ['a', 'b']
    },
    {
      id: '2',
      name: 'manolo',
      values: ['c', 'd']
    },
    {
      id: '3',
      name: 'pedro',
      values: ['e', 'f']
    }])

    const decisionState = ref<DecisionChart[]>([{
      id: 'aaaaa',
      name: 'aaaaa',
      values: [
        {
          axisId: '1',
          label: 'pepito',
          value: 'a',
          numericValue: 20
        },
        {
          axisId: '2',
          label: 'manolo',
          value: 'sdas',
          numericValue: 25
        },
        {
          axisId: '3',
          label: 'pedro',
          value: 'sdas',
          numericValue: 30
        }
      ]
    },
    {
      id: 'bbbbb',
      name: 'bbbbbb',
      values: [{
        axisId: '1',
        label: 'pepito',
        value: 'sdas',
        numericValue: 40
      },
      {
        axisId: '2',
        label: 'manolo',
        value: 'sdas',
        numericValue: 45
      },
      {
        axisId: '3',
        label: 'pedro',
        value: 'sdas',
        numericValue: 50
      }]
    },
    {
      id: 'ccccc',
      name: 'ccccc',
      values: [{
        axisId: '1',
        label: 'pepito',
        value: 'sdas',
        numericValue: 60
      },
      {
        axisId: '2',
        label: 'manolo',
        value: 'sdas',
        numericValue: 65
      },
      {
        axisId: '3',
        label: 'pedro',
        value: 'sdas',
        numericValue: 70
      }]
    }])

    provide('axisSchemaState', axisSchemaState)
    provide('decisionState', decisionState)

    return { t, decisionState }
  }
})
</script>

<style>
</style>
