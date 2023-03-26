import { StyleSheet } from "react-native";
import ScaleManager from "@assets/ScaleManager";

class BackgroundHeaderComponentStyles {
  private static _styles = StyleSheet.create({
    linearGradient: {
      height: ScaleManager.BACKGROUND_HEADER_HEIGHT,
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default BackgroundHeaderComponentStyles.styles;
