<template>
  <el-row :gutter="20">
    <el-col
      v-for="decision in decisionState"
      :key="decision.id"
      :span="12"
    >
      <DecisionItem :decisionId="decision.id" />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { DecisionChart } from '../types'
import DecisionItem from '@/components/DecisionItem.vue'
export default defineComponent({
  name: 'DecisionItemList',
  components: {
    DecisionItem
  },
  setup () {
    const decisionState = inject('decisionState', ref<DecisionChart[]>())
    return { decisionState }
  }
})
</script>

<style scoped>

</style>
