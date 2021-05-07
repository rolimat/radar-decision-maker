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
        <DecisionItem :decision="decision" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n' // @ is an alias to /src
import { decisionState } from '@/shareables/decission-state'
import DecisionItem from '@/components/DecisionItem.vue'
import DecisionSchema from '@/components/DecisionSchema.vue'

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

    return { t, decisionState }
  }
})
</script>

<style>
</style>
