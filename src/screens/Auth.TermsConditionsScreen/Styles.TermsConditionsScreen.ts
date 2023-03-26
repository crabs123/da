import { COLORS, THEMES } from "@src/assets";
import { StyleSheet } from "react-native";
import ScaleManager from "@src/assets/ScaleManager";
import FONTS from "@src/assets/fonts";
class TermsConditionsScreenStyles {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    lottie: {
      height: ScaleManager.scaleSizeHeight(200),
      width: ScaleManager.scaleSizeHeight(200),
      alignSelf: "center",
      marginTop: ScaleManager.scaleSizeHeight(10),
    },
    bottomSheetContainer: {
      height: ScaleManager.WINDOW_HEIGHT - ScaleManager.scaleSizeHeight(100),
      width: ScaleManager.WINDOW_HEIGHT - ScaleManager.scaleSizeHeight(100),
      backgroundColor: "red",
    },
    checkboxContainer: {
      flexDirection: "row",
      marginTop: ScaleManager.scaleSizeHeight(20),
      width: ScaleManager.WINDOW_WIDTH,
      alignItems: "center",
      alignSelf: "center",
      marginLeft: ScaleManager.scaleSizeWidth(ScaleManager.WINDOW_WIDTH / 2),
    },
    acceptText: {
      color: COLORS.darkOneColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(15),
    },
    termOfUseText: {
      color: COLORS.mainColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      textDecorationLine: "underline",
    },
    bodyContainer: {
      width: "100%",
      marginTop: ScaleManager.moderateScale(20),
    },
    handleStyle: {
      backgroundColor: COLORS.darkTwoColor,
    },
    modalStyle: {
      zIndex: 5,
      marginTop: "auto",
      backgroundColor: "#fff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: "black",
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 10,
    },
    contentContainer: { flex: 1, alignItems: "center" },
    headerText: { ...THEMES.commonBoldTextStyle(COLORS.defaultTextColor), padding: ScaleManager.scaleSizeHeight(20) },
    contentText: {
      ...THEMES.commonRegularTextStyle(COLORS.defaultTextColor),
      paddingHorizontal: ScaleManager.scaleSizeHeight(20),
      paddingTop: ScaleManager.scaleSizeHeight(10),
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
        backgroundColor: canNext ? COLORS.primaryOrange : COLORS.grayLight,
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

export default TermsConditionsScreenStyles.styles;
