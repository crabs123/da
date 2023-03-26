import { COLORS, THEMES } from "@src/assets";
import { StyleSheet } from "react-native";
import ScaleManager from "@src/assets/ScaleManager";

class StepTwoAppointmentScreen {
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
      backgroundColor: "#336CFB",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: ScaleManager.PADDING_SIZE,
      marginRight: ScaleManager.scaleSizeWidth(8),
    },
    activeStepNumberText: {
      ...THEMES.commonRegularTextStyle(COLORS.white),
    },
    activeStepGuideText: {
      ...THEMES.commonRegularTextStyle("#336CFB"),
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
      backgroundColor: COLORS.grayLight,
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
    calendarContainer: {
      alignItems: "center",
      marginTop: ScaleManager.scaleSizeHeight(10),
    },
    title: {
      ...THEMES.title,
      alignSelf: "center",
    },
    calendarPickNotice: {
      ...THEMES.commonRegularTextStyle(COLORS.grayLight),
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      paddingVertical: ScaleManager.scaleSizeHeight(16),
    },
  });

  public static styles = {
    ...this._styles,
    nextButtonContainerStyle: (canNext: boolean) => {
      return {
        ...THEMES.commonButtonStyle(COLORS.mainColor),
        backgroundColor: canNext ? COLORS.mainColor : COLORS.grayLight,
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

export default StepTwoAppointmentScreen.styles;
