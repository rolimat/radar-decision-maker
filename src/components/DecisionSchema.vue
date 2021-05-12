<template>
  <div>
    <el-row :gutter="20">
      <el-col
        v-for="axis in axisSchemaState"
        :key="axis.id"
        :span="6"
      >
        <decision-axis-card
         :id="axis.id"
        />
      </el-col>
      <el-col :span="6">
        <el-card
          @click="addAxis"
          class="box-card"
        >
          <i class="el-icon-circle-plus-outline" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { generateUuid } from '@/common/uuid'
import DecisionAxisCard from '@/components/DecisionAxisCard.vue'
import { Axis } from '@/types'

export default defineComponent({
  name: 'DecisionSchema',
  components: { DecisionAxisCard },
  setup () {
    const axisSchemaState = inject('axisSchemaState', ref<Axis[]>())
    const addAxis = () => {
      if (axisSchemaState.value) {
        axisSchemaState.value.push({ id: generateUuid(), name: '', values: [] })
      }
    }
    return {
      axisSchemaState,
      addAxis
    }
  }
})
</script>

<style lang="scss" scoped>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-icon-delete {
    padding: 0 0 0 10px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
</style>
