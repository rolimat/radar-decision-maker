<template>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-input
            v-model="decision.name"
            placeholder="Decision name"
            clearable
          />
          <i
            @click="closeEdit"
            class="el-icon-back"
          />
        </div>
      </template>
      <div>
        <div v-for="value in decision.values" :key="value.label">
          <span>{{ value.label }}:</span>
          <span>
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ value.value }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item disabled>Action 4</el-dropdown-item>
                  <el-dropdown-item divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
        </div>
      </div>
    </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed, PropType } from 'vue'
import { DecisionChart } from '@/types'
export default defineComponent({
  name: 'DecisionItemEditor',
  props: {
    decisionId: {
      type: String,
      required: true
    }
  },
  setup (props, { emit }) {
    const decisionState = inject('decisionState', ref<DecisionChart[]>())
    const defaultDecisionChart = { name: '', values: [{ label: '', value: '', numericValue: 0 }] }
    const decision = (decisionState.value && decisionState.value.find((d: DecisionChart) => d.id === props.decisionId)) || defaultDecisionChart

    const closeEdit = () => {
      emit('closeEdit')
    }

    return { decision, closeEdit }
  }
})
</script>

<style scoped>

</style>
