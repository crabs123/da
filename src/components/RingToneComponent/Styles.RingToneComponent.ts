import { StyleSheet } from "react-native";
import ScaleManager from "@src/assets/ScaleManager";
import { COLORS, THEMES } from "@src/assets";

class RingToneComponentStyles {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.darkBlue10,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: ScaleManager.BACKGROUND_HEADER_HEIGHT + ScaleManager.scaleSizeHeight(50),
      width: ScaleManager.WINDOW_WIDTH,
      zIndex: 9999999,
      justifyContent: "space-between",
      alignItems: "center",
    },
    buttonWrapper: {
      height: ScaleManager.BUTTON_HEIGHT,
      flexDirection: "row",
      marginBottom: ScaleManager.scaleSizeHeight(16),
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      justifyContent: "space-between",
      alignSelf: "center",
    },
    buttonContainer: {
      height: ScaleManager.BUTTON_HEIGHT,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: ScaleManager.PADDING_SIZE,
    },
    buttonText: {
      ...THEMES.commonRegularText,
    },
    callingText: {
      ...THEMES.commonMediumText,
      color: COLORS.white,
      paddingTop: ScaleManager.BUTTON_HEIGHT,
    },
  });

  public static styles = {
    ...this._styles,
    buttonContainerStyle: (call: boolean) => {
      return {
        ...this._styles.buttonContainer,
        backgroundColor: call ? COLORS.successColor : COLORS.errorColor,
      };
    },
  };
}

export default RingToneComponentStyles.styles;
