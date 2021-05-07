import { ref } from 'vue'
/* eslint-disable */
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
/* eslint-enable */
import { Axis } from '@/types'

export const axisSchemaState = ref<Axis[]>([{
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
export const removeAxis = (id: string) => {
  axisSchemaState.value = axisSchemaState.value.filter((i: Axis) => i.id !== id)
}
export const addAxis = () => {
  axisSchemaState.value.push({ id: uuidv4(), name: '', values: [] })
}
export const addAxisValue = (data: {
  id: string,
  value: string,
}) => {
  const axisToModify = axisSchemaState.value.find((i: Axis) => i.id === data.id)
  if (axisToModify) {
    const values = axisToModify.values
    values.push(data.value)
  }
}

export const removeAxisValue = (data: {
  id: string,
  value: string,
}) => {
  const axisToModify = axisSchemaState.value.find((i: Axis) => i.id === data.id)
  if (axisToModify) {
    axisToModify.values = axisToModify.values.filter((val: string) => val !== data.value)
  }
}

export const getAxisById = (id: string) => {
  return axisSchemaState.value.find((i: Axis) => i.id === id)
}
