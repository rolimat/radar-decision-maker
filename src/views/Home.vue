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
      name: '231',
      values: ['a', 'b']
    },
    {
      id: '3',
      name: 'fdsfsd',
      values: ['a', 'b']
    }])

    const decisionState = ref<DecisionChart[]>([{
      id: 'aaaaa',
      name: 'aaaaa',
      values: [
        {
          label: 'aaa',
          value: 'sdas',
          numericValue: 20
        },
        {
          label: 'abb',
          value: 'sdas',
          numericValue: 25
        },
        {
          label: 'acc',
          value: 'sdas',
          numericValue: 30
        }
      ]
    },
    {
      id: 'bbbbb',
      name: 'bbbbbb',
      values: [{
        label: 'baa',
        value: 'sdas',
        numericValue: 40
      },
      {
        label: 'bbb',
        value: 'sdas',
        numericValue: 45
      },
      {
        label: 'bcc',
        value: 'sdas',
        numericValue: 50
      }]
    },
    {
      id: 'ccccc',
      name: 'ccccc',
      values: [{
        label: 'caa',
        value: 'sdas',
        numericValue: 60
      },
      {
        label: 'cbb',
        value: 'sdas',
        numericValue: 65
      },
      {
        label: 'ccc',
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
