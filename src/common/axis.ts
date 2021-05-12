import { Axis } from '@/types'

export function getNumericValueForAxis (value: string, axis: Axis | undefined): number {
  const valueIndex = axis ? axis.values.indexOf(value) + 1 : 1
  const numValues = axis ? axis.values.length : 1
  return Math.round((valueIndex / numValues) * 100)
}
