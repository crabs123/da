import { ViewStyle } from "react-native";

export enum ERightIconHeaderComponent {
  search = "search",
  notification = "notification",
  plus = "plus",
  text = "text",
}

export interface IHeaderComponentProps {
  showBackButton?: boolean;
  mainTitle?: string;
  rightIcon?: ERightIconHeaderComponent;
  handlePressRightIcon?: Function;
  customRightButtonStyle?: ViewStyle;
  showShadow?: boolean;
  customBackFunction?: Function;
  middleTitleOnPress?: Function;
  selectedProductsNo?: number;
  showFullMiddleTitle?: boolean;
  transparentBackground?: boolean;
  backgroundColor?: string;
}
