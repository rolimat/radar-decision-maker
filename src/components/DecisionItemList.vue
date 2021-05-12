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
        <decision-item-add @closeAdd="isAdding = false" />
      </template>
      <i
        v-else
        @click="isAdding = true"
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
import DecisionItemAdd from '@/components/DecisionItemAdd.vue'
export default defineComponent({
  name: 'DecisionItemList',
  components: {
    DecisionItemAdd,
    DecisionItem
  },
  setup () {
    const decisionState = inject('decisionState', ref<DecisionChart[]>())
    const isAdding = ref(false)

    return { decisionState, isAdding }
  }
})
</script>

<style scoped>

</style>
