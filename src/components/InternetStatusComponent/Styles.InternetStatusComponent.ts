import { COLORS } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";

class InternetStatusComponentStyles {
  private static _styles = StyleSheet.create({
    container: {
      position: "absolute",
      zIndex: 1000,
      bottom: 0,
      left: 0,
      right: 0,
      alignSelf: "center",
    },
    subContainer: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      height: ScaleManager.TEXT_INPUT_HEIGHT,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.modalColor,
      alignSelf: "center",
      marginBottom: ScaleManager.PADDING_SIZE,
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default InternetStatusComponentStyles.styles;
