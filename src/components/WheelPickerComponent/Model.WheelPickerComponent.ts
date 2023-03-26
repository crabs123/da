import { Animated, FlatListProps, StyleProp, TextStyle, ViewProps, ViewStyle } from "react-native";

export interface IWheelPickerComponentProps {
  selectedIndex: number;
  options: string[];
  onChange: (index: number) => void;
  selectedIndicatorStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: TextStyle;
  itemStyle?: ViewStyle;
  itemHeight?: number;
  containerStyle?: ViewStyle;
  containerProps?: Omit<ViewProps, "style">;
  rotationFunction?: (x: number) => number;
  opacityFunction?: (x: number) => number;
  visibleRest?: number;
  decelerationRate?: "normal" | "fast" | number;
  keyProps: string;
  flatListProps?: Omit<FlatListProps<string | null>, "data" | "renderItem">;
}

export interface IItemProps {
  textStyle: StyleProp<TextStyle>;
  style: StyleProp<ViewStyle>;
  option: string | null;
  height: number;
  index: number;
  currentScrollIndex: Animated.AnimatedAddition<number>;
  visibleRest: number;
  rotationFunction: (x: number) => number;
  opacityFunction: (x: number) => number;
}
