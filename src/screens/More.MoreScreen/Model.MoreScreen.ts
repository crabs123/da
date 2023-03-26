import { GestureResponderEvent } from "react-native";

export interface IIconInMore {
  name: string;
  function: ((event: GestureResponderEvent) => void) | undefined;
  icon: () => JSX.Element;
}
