<template>
  <div>
    <el-row :gutter="20">
      <el-col
        v-for="axis in axes"
        :key="axis.id"
        :span="6"
      >
        <decision-axis-card
         :axis="axis"
          @addAxisValue="addAxisValue"
          @updateAxisName="updateAxisName"
          @removeAxis="removeAxis"
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
import { defineComponent, ref } from 'vue'
/* eslint-disable */
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
/* eslint-enable */
import { Axis } from '@/types'
import DecisionAxisCard from '@/components/DecisionAxisCard.vue'

export default defineComponent({
  name: 'DecisionSchema',
  components: { DecisionAxisCard },
  setup () {
    const axes = ref<Axis[]>([{
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
    const removeAxis = (id: string) => {
      axes.value = axes.value.filter((i) => i.id !== id)
    }
    const addAxis = () => {
      axes.value.push({ id: uuidv4(), name: '', values: [] })
    }
    const updateAxisName = (event: {
      id: string,
      name: string,
    }) => {
      const axisToModify = axes.value.find((i) => i.id === event.id) || { name: '' }
      axisToModify.name = event.name
    }
    const addAxisValue = (event: {
      id: string,
      value: string,
    }) => {
      const axisToModify = axes.value.find((i) => i.id === event.id)
      if (axisToModify) {
        const values = axisToModify.values
        values.push(event.value)
      }
      // axisToModify.values.push('asd')
    }
    return {
      axes,
      addAxis,
      addAxisValue,
      removeAxis,
      updateAxisName
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
