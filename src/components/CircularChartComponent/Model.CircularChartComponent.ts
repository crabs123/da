import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type ChartPieceItem = {
  name: string;
  value: number;
  color: string;
};

export type CircularChartAnimationType = "fade" | "slide";

export type ICircularChartProps = {
  data: ChartPieceItem[];
  containerWidth: number;
  containerHeight: number;
  radius: number;
  startAngle?: number;
  endAngle?: number;
  strokeWidth?: number;
  type?: "butt" | "round";
  labelValueStyle?: StyleProp<TextStyle>;
  labelTitleStyle?: StyleProp<TextStyle>;
  labelWrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;

  animationType?: CircularChartAnimationType;
};
