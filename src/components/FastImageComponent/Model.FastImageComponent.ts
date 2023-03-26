import { ViewStyle } from "react-native";
import { ImageStyle } from "react-native-fast-image";
export interface IFastImageComponentProps {
  uri: string;
  pictureStyle: ImageStyle;
  loadingStyleProps?: ViewStyle;
  children?: React.ReactNode;
}
