import { TextStyle, ViewStyle } from "react-native";

export interface SegmentedControlProps {
  segments: Array<string>;
  currentIndex: number;
  onChange: (index: number) => void;
  badgeValues?: Array<number | null>;
  isRTL?: boolean;
  containerMargin?: number;
  activeTextStyle?: TextStyle;
  inactiveTextStyle?: TextStyle;
  segmentedControlWrapper?: ViewStyle;
  pressableWrapper?: ViewStyle;
  tileStyle?: ViewStyle;
  activeBadgeStyle?: ViewStyle;
  inactiveBadgeStyle?: ViewStyle;
  badgeTextStyle?: TextStyle;
}
