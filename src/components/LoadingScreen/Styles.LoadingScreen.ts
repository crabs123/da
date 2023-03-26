import { StyleSheet } from "react-native";
import { COLORS } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";

class LoadingScreenStyles {
  private static _styles = StyleSheet.create({
    containLoading: {
      backgroundColor: COLORS.modalColor,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    lottieView: {
      flex: 1,
      alignSelf: "center",
      transform: [{ translateY: -((ScaleManager.WINDOW_HEIGHT / 100) * 5) }],
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default LoadingScreenStyles.styles;
