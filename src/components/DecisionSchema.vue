<template>
  <div>
    <el-row :gutter="20">
      <el-col
        v-for="axis in axisSchema"
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
import { defineComponent } from 'vue'
import { axisSchema, addAxis } from '@/shareables/axis-schema'
import DecisionAxisCard from '@/components/DecisionAxisCard.vue'

export default defineComponent({
  name: 'DecisionSchema',
  components: { DecisionAxisCard },
  setup () {
    return {
      axisSchema,
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
