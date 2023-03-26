import { COLORS, THEMES } from "@src/assets";
import FONTS from "@src/assets/fonts";
import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";

class ActivationCodeScreenStyles {
  private static _styles = StyleSheet.create({
    imageBackground: {
      height: ScaleManager.WINDOW_HEIGHT,
      width: ScaleManager.WINDOW_WIDTH,
      backgroundColor: "white",
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    bodyContainer: {
      ...THEMES.container,
      paddingTop: ScaleManager.BACKGROUND_HEADER_HEIGHT / 2,
    },
    contentContainer: {
      flex: 1,
      marginTop: ScaleManager.scaleSizeHeight(30),
    },
    activationQuestionText: {
      ...THEMES.commonRegularText,
      fontSize: ScaleManager.moderateScale(15),
      marginTop: ScaleManager.PADDING_SIZE,
      color: COLORS.darkTwoColor,
      alignSelf: "center",
      marginBottom: ScaleManager.PADDING_SIZE * 2,
    },
    separator: {
      height: "20%",
    },
    cellWrapper: {
      width: ScaleManager.scaleSizeHeight(40),
      height: ScaleManager.scaleSizeHeight(50),
      borderBottomWidth: 1,
      justifyContent: "flex-end",
    },
    textVerificationCell: {
      fontSize: ScaleManager.moderateScale(30),
      textAlign: "center",
      color: COLORS.mainColor,
      fontFamily: FONTS.interRegular,
    },
    codeFieldContainer: {
      marginHorizontal: ScaleManager.PADDING_SIZE,
      marginBottom: ScaleManager.PADDING_SIZE,
    },
    titleText: {
      ...THEMES.commonMediumText,
      color: COLORS.defaultTextColor,
      paddingLeft: ScaleManager.PADDING_SIZE,
      marginTop: ScaleManager.PADDING_SIZE,
      marginBottom: ScaleManager.PADDING_SIZE / 2,
      fontSize: ScaleManager.moderateScale(15),
    },
    nextButtonContainer: {
      ...THEMES.commonButtonStyle(COLORS.mainColor),
    },
    nextText: {
      ...THEMES.commonMediumTextStyle(COLORS.white),
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
    cellWrapperStyle: (focused: boolean) => {
      return {
        ...this._styles.cellWrapper,
        borderColor: focused ? COLORS.mainColor : COLORS.grayLight,
      };
    },
  };
}

export default ActivationCodeScreenStyles.styles;
