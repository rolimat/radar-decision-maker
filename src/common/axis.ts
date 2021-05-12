import { Axis, AxisValue } from '@/types'

export function getNumericValueForAxis (value: string, axis: Axis | undefined): number {
  const valueIndex = axis ? axis.values.indexOf(value) : 0
  const numValues = axis ? axis.values.length - 1 || 0 : 1
  return Math.round((valueIndex / numValues) * 100)
}

export function generateNewAxisValue (axis: Axis): AxisValue {
  return {
    axisId: axis.id,
    label: axis.name,
    value: axis.values[0],
    numericValue: getNumericValueForAxis(axis.values[0], axis)
  }
}
