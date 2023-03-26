import { COLORS, THEMES } from "@src/assets";
import FONTS from "@src/assets/fonts";
import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";

class AppointmentDetailScreenStyles {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    stepsContainer: {
      flexDirection: "row",
      marginTop: ScaleManager.PADDING_SIZE,
    },
    textWrapper: {
      flex: 1,
    },
    leftStepContainer: {
      flex: 1,
      flexDirection: "row",
    },
    activeStepNumberContainer: {
      height: ScaleManager.scaleSizeHeight(20),
      aspectRatio: 1,
      borderRadius: 100,
      backgroundColor: COLORS.grayLight,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: ScaleManager.PADDING_SIZE,
      marginRight: ScaleManager.scaleSizeWidth(8),
    },
    activeStepNumberText: {
      ...THEMES.commonRegularTextStyle(COLORS.white),
    },
    activeStepGuideText: {
      ...THEMES.commonRegularTextStyle(COLORS.grayLight),
      fontSize: ScaleManager.moderateScale(15),
    },
    rightStepContainer: {
      flex: 1,
      flexDirection: "row",
      marginRight: ScaleManager.PADDING_SIZE,
    },
    inactiveStepNumberContainer: {
      height: ScaleManager.scaleSizeHeight(20),
      aspectRatio: 1,
      borderRadius: 100,
      backgroundColor: "#336CFB",
      justifyContent: "center",
      alignItems: "center",
      marginRight: ScaleManager.scaleSizeWidth(8),
    },
    inactiveStepNumberText: {
      ...THEMES.commonRegularTextStyle(COLORS.white),
    },
    inactiveStepGuideText: {
      ...THEMES.commonRegularTextStyle(COLORS.grayLight),
      fontSize: ScaleManager.moderateScale(15),
    },
    chevBackwardIcon: {
      justifyContent: "flex-end",
      alignItems: "center",
      transform: [
        {
          rotate: "180deg",
        },
        {
          translateY: ScaleManager.scaleSizeHeight(2),
        },
      ],
      paddingHorizontal: ScaleManager.scaleSizeWidth(16),
    },
    title: {
      ...THEMES.title,
      alignSelf: "center",
      fontSize: ScaleManager.moderateScale(18),
      color: "#6E7176",
    },
    rowContainer: {
      flexDirection: "row",
      marginTop: ScaleManager.scaleSizeHeight(16),
    },
    keyText: {
      color: COLORS.baliHai,
      fontFamily: FONTS.interSemiBold,
      fontSize: ScaleManager.moderateScale(13),
      flex: 3.5,
    },
    valueText: {
      color: COLORS.defaultTextColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      flex: 6.5,
    },
    sectionContainer: {
      marginTop: ScaleManager.scaleSizeHeight(24),
      marginHorizontal: ScaleManager.PADDING_SIZE,
    },
    noText: {
      ...THEMES.commonMediumTextStyle("#336CFB"),
      textDecorationLine: "underline",
    },
    footerWrapper: {
      flex: 1,
      justifyContent: "space-between",
    },
  });

  public static styles = {
    ...this._styles,
    nextButtonContainerStyle: (canNext: boolean) => {
      return {
        ...THEMES.commonButtonStyle(COLORS.mainColor),
        backgroundColor: canNext ? COLORS.primaryOrange : COLORS.grayLight,
      };
    },
    nextTextStyle: (canNext: boolean) => {
      return {
        ...THEMES.commonMediumTextStyle(COLORS.white),
        color: canNext ? COLORS.white : COLORS.grayDark,
      };
    },
  };
}

export default AppointmentDetailScreenStyles.styles;
