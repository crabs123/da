export type ItemPropTypes = {
  oneColumnSize: number;
  borderWidth: number;
  index: number;
  style?: Object;
  tenthItemStyle?: Object;
};

export interface IMidPickSliderProps {
  value: number;
  onValueChange: (input: number) => void;
  renderThumb?: Function;
  thumbStyle?: Object;
  multiplicity: number;
  decimalPlaces?: number;
  arrayLength: number;
  scrollEnabled: boolean;
  mainContainerStyle?: Object;
  itemStyle?: Object;
  tenthItemStyle?: Object;
  initialPositionValue: number;
  maximumValue?: number;
}

export interface IMidPickSliderState {
  width: number;
  items: Array<number>;
  oneItemWidth: number;
  value: number;
}

export interface Element {
  index: number;
}
