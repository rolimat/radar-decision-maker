<template>
  <div class="home">
    <el-button type="primary">el-button</el-button>

    i18nTEST: {{ t('teest') }}
    <el-row :gutter="20">
      <el-col :span="8">
        <DecisionItem />
      </el-col>
      <el-col :span="8">
        <DecisionItem />
      </el-col>
      <el-col :span="8">
        <DecisionItem />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DecisionItem from '@/components/DecisionItem.vue'
import { useI18n } from 'vue-i18n' // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    DecisionItem
  },
  setup () {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const datasets = [
      {
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
      }
    ]
    const chartData = { labels, datasets }

    return { t, chartData }
  }
})
</script>

<style>
</style>
