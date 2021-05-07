import { ref } from 'vue'
/* eslint-disable */
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
/* eslint-enable */
import { DecisionChart } from '@/types'

export const decisionState = ref<DecisionChart[]>([{
  id: 'aaaaa',
  name: 'aaaaa',
  values: [
    {
      label: 'aaa',
      value: 'sdas',
      numericValue: 20
    },
    {
      label: 'abb',
      value: 'sdas',
      numericValue: 25
    },
    {
      label: 'acc',
      value: 'sdas',
      numericValue: 30
    }
  ]
},
{
  id: 'bbbbb',
  name: 'bbbbbb',
  values: [{
    label: 'baa',
    value: 'sdas',
    numericValue: 40
  },
  {
    label: 'bbb',
    value: 'sdas',
    numericValue: 45
  },
  {
    label: 'bcc',
    value: 'sdas',
    numericValue: 50
  }]
},
{
  id: 'ccccc',
  name: 'ccccc',
  values: [{
    label: 'caa',
    value: 'sdas',
    numericValue: 60
  },
  {
    label: 'cbb',
    value: 'sdas',
    numericValue: 65
  },
  {
    label: 'ccc',
    value: 'sdas',
    numericValue: 70
  }]
}])
