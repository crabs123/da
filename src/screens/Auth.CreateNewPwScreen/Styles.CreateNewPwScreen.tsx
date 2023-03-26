import { COLORS, THEMES } from "@src/assets";
import FONTS from "@src/assets/fonts";
import { StyleSheet } from "react-native";
import ScaleManager from "@src/assets/ScaleManager";

class CreateNewPwScreenStyles {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      justifyContent: "space-between",
    },
    textInputTitle: {
      fontSize: ScaleManager.moderateScale(15),
      fontFamily: FONTS.interSemiBold,
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      marginTop: ScaleManager.PADDING_SIZE,
      marginBottom: ScaleManager.scaleSizeHeight(8),
      lineHeight: ScaleManager.scaleSizeHeight(20),
    },
    nextButtonContainer: {
      ...THEMES.commonButtonStyle(COLORS.mainColor),
    },
    nextText: {
      ...THEMES.commonMediumTextStyle(COLORS.white),
    },
    showHidePasswordButton: {
      height: ScaleManager.TEXT_INPUT_HEIGHT,
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      alignSelf: "center",
      right: ScaleManager.PADDING_SIZE,
      borderColor: COLORS.grayLighter,
      borderLeftColor: COLORS.white,
      borderRadius: 8,
    },
    inputWrapper: {
      marginTop: ScaleManager.scaleSizeHeight(10),
      opacity: 1,
      justifyContent: "flex-start",
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

export default CreateNewPwScreenStyles.styles;
