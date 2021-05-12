<template>
  <decision-item-display
    v-if="!isEditing"
    v-model:isEditing="isEditing"
    :key="decision.id"
    :decision="decision"
  />
  <decision-item-editor
    v-else
    :decisionId="decision.id"
    @closeEdit="isEditing = false"
  />
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { DecisionChart } from '@/types'
import DecisionItemDisplay from '@/components/DecisionItemDisplay.vue'
import DecisionItemEditor from '@/components/DecisionItemEditor.vue'

export default defineComponent({
  name: 'DecisionItem',
  components: {
    DecisionItemEditor,
    DecisionItemDisplay
  },
  props: {
    decisionId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const isEditing = ref(false)
    const decisionState = inject('decisionState', ref<DecisionChart[]>())
    const defaultDecisionChart = { name: '', values: [{ label: '', value: '', numericValue: 0 }] }
    const decision = (decisionState.value && decisionState.value.find((d: DecisionChart) => d.id === props.decisionId)) || defaultDecisionChart

    const removeDecisionItem = () => {
      if (decisionState.value) {
        decisionState.value = decisionState.value.filter((d: DecisionChart) => d.id !== props.decisionId)
      }
    }

    return { decision, isEditing, removeDecisionItem }
  }
})
</script>

<style scoped>

</style>
