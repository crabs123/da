import { COLORS, THEMES } from "@src/assets";
import { StyleSheet } from "react-native";
import ScaleManager from "@assets/ScaleManager";
import FONTS from "@src/assets/fonts";

class SuccessScreenStyles {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      justifyContent: "space-between",
    },
    nextButtonContainer: {
      ...THEMES.commonButtonStyle(COLORS.mainColor),
    },
    nextText: {
      ...THEMES.commonMediumTextStyle(COLORS.white),
    },
    bodyContainer: {
      flex: 1,
      marginTop: ScaleManager.scaleSizeHeight(50),
    },
    iconWrapper: {
      height: ScaleManager.scaleSizeHeight(160),
      aspectRatio: 1,
      borderRadius: 1000,
      borderWidth: 1.5,
      borderColor: COLORS.successColor,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: ScaleManager.scaleSizeHeight(20),
    },
    message: {
      fontSize: ScaleManager.moderateScale(18),
      fontFamily: FONTS.interSemiBold,
      color: COLORS.mainColor,
      alignSelf: "center",
    },
  });

  public static styles = {
    ...this._styles,
    nextButtonContainerStyle: (canNext: boolean) => {
      return {
        ...this._styles.nextButtonContainer,
        backgroundColor: canNext ? COLORS.mainColor : COLORS.grayLight,
      };
    },
    nextTextStyle: (canNext: boolean) => {
      return {
        ...this._styles.nextText,
        color: canNext ? COLORS.white : COLORS.grayDark,
      };
    },
  };
}

export default SuccessScreenStyles.styles;
