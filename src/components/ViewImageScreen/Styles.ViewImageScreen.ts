import { COLORS } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";

class ViewImageScreenStyles {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    maskViewingPicture: {
      height: ScaleManager.STATUSBAR_HEIGHT,
      position: "absolute",
      backgroundColor: COLORS.darkOneColor,
      zIndex: 1000,
      width: "100%",
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default ViewImageScreenStyles.styles;
