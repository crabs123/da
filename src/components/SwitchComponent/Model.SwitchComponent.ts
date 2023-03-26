import { TextStyle, ViewStyle } from "react-native";

export interface ISwitchComponentProps {
  isOn: boolean;
  label?: string;
  labelPosition?: string;
  onColor: string;
  offColor: string;
  labelStyle?: TextStyle;
  thumbOnStyle?: ViewStyle;
  thumbOffStyle?: ViewStyle;
  trackOnStyle?: ViewStyle;
  trackOffStyle?: ViewStyle;
  onToggle: Function;
  icon?: JSX.Element;
  disabled?: boolean;
  animationSpeed?: number;
  useNativeDriver?: boolean;
  circleColor?: string;
  hitSlop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}
