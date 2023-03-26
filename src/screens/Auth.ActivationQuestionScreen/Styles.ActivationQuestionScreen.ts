import { COLORS, THEMES } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";

class ActivationQuestionScreenStyles {
  private static _styles = StyleSheet.create({
    imageBackground: {
      height: ScaleManager.WINDOW_HEIGHT,
      width: ScaleManager.WINDOW_WIDTH,
      backgroundColor: "white",
    },
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    bodyContainer: {
      flex: 1,
      backgroundColor: "transparent",
    },
    logoContainer: {
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 100,
    },
    activationCodeText: {
      ...THEMES.commonBoldText,
      color: COLORS.white,
    },
    activationQuestionText: {
      ...THEMES.commonRegularText,
      fontSize: ScaleManager.moderateScale(15),
      marginTop: ScaleManager.PADDING_SIZE,
      color: COLORS.white,
    },
    noText: {
      ...THEMES.commonMediumTextStyle("#336CFB"),
      textDecorationLine: "underline",
    },
    separator: {
      height: "20%",
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default ActivationQuestionScreenStyles.styles;
