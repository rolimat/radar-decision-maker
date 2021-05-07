export interface AxisValue {
  label: string,
  value: string,
  numericValue: number
}

export interface DecisionChart {
  id: string,
  name: string,
  values: AxisValue[]
}
export interface Axis {
  id: string,
  name: string,
  values: string[]
}
