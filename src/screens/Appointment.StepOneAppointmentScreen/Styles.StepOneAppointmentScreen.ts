import { COLORS, THEMES } from "@src/assets";
import { Platform, StyleSheet } from "react-native";
import ScaleManager from "@src/assets/ScaleManager";
import FONTS from "@src/assets/fonts";
import themes from "@src/assets/themes";

class StepOneAppointmentScreen {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    stepsContainer: {
      flexDirection: "row",
      marginTop: ScaleManager.PADDING_SIZE,
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
    textWrapper: {
      flex: 1,
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
    bodyContainer: {
      flex: 1,
      backgroundColor: "transparent",
    },
    nextButtonContainer: {
      ...THEMES.commonButtonStyle(COLORS.mainColor),
    },
    nextText: {
      ...THEMES.commonMediumTextStyle(COLORS.white),
    },
    subBodyContainer: {
      flex: 1,
    },
    selectTitle: {
      ...THEMES.title,
    },
    placeholderText: {
      fontSize: ScaleManager.moderateScale(13),
      paddingHorizontal: ScaleManager.scaleSizeWidth(8),
      fontStyle: "italic",
      color: COLORS.grayLight,
    },
    mockTextInputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: ScaleManager.TEXT_INPUT_HEIGHT,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.cornFlowerBlue,
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
    },
    rightIcon: {
      paddingHorizontal: ScaleManager.scaleSizeWidth(8),
    },
    dropdownContainer: {
      width: "100%",
      backgroundColor: "red",
      height: ScaleManager.TEXT_INPUT_HEIGHT + 1,
      color: COLORS.darkOneColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
    },
    containerDropdown: {
      height: ScaleManager.scaleSizeHeight(200),
      borderRadius: 8,
      backgroundColor: COLORS.white,
      ...Platform.select({
        android: {
          elevation: 9,
          borderTopColor: "#F6F6F7",
          borderTopWidth: 2,
        },
        ios: {
          shadowColor: "#rgba(176, 182, 193, 0.09)",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
        },
      }),
    },
    rightIconDropdown: {
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      height: "100%",
      justifyContent: "center",
    },
    textInput: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
      borderRadius: 12,
      backgroundColor: COLORS.white,
      height: ScaleManager.scaleSizeHeight(56),
      paddingLeft: ScaleManager.PADDING_SIZE / 2,
      color: COLORS.darkOneColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(15),
      borderWidth: 1.5,
      borderColor: "#336CFB",
    },
    textInputTitle: {
      fontSize: ScaleManager.moderateScale(15),
      fontFamily: FONTS.interSemiBold,
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      marginTop: ScaleManager.PADDING_SIZE,
      marginBottom: ScaleManager.scaleSizeHeight(8),
      lineHeight: ScaleManager.scaleSizeHeight(20),
    },
    itemDropdown: {
      width: "100%",
      height: ScaleManager.scaleSizeHeight(50),
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 1,
      marginTop: ScaleManager.scaleSizeHeight(8),
      borderRadius: 8,
      flexDirection: "row",
      borderColor: COLORS.grayLighter,
    },
    placeholderDropdown: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(15),
      width: ScaleManager.WINDOW_WIDTH - ScaleManager.scaleSizeWidth(100),
      paddingLeft: ScaleManager.PADDING_SIZE / 2,
    },
    inputSearchText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(15),
    },
    checkIcon: {
      width: ScaleManager.scaleSizeWidth(50),
    },
    avatarImage: {
      height: ScaleManager.scaleSizeHeight(80),
      width: ScaleManager.scaleSizeWidth(60),
      borderRadius: 8,
      marginRight: ScaleManager.scaleSizeHeight(16),
    },
    callOrEditButton: {
      ...THEMES.commonButton,
      width: ScaleManager.scaleSizeWidth(140),
      borderWidth: 1,
      borderColor: COLORS.mainColor,
    },
    callOrEditText: {
      ...THEMES.commonRegularText,
      fontSize: ScaleManager.moderateScale(16),
    },
    footerButton: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    doctorItemContainer: {
      minHeight: Platform.OS === "ios" ? ScaleManager.scaleSizeHeight(170) : ScaleManager.scaleSizeHeight(180),
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      borderRadius: 8,
      alignSelf: "center",
      backgroundColor: COLORS.white,
      justifyContent: "space-between",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
      marginVertical: ScaleManager.scaleSizeHeight(16),
    },
    doctorContentContainer: {
      flexDirection: "row",
      flex: 1,
      marginHorizontal: ScaleManager.scaleSizeWidth(16),
      marginTop: ScaleManager.scaleSizeHeight(16),
    },
    doctorNameText: {
      ...themes.commonMediumTextStyle("#336CFB"),
      paddingBottom: ScaleManager.scaleSizeHeight(5),
    },
    doctorSpecialtyText: {
      ...themes.commonRegularText,
      marginRight: ScaleManager.PADDING_SIZE / 2,
      width: ScaleManager.WINDOW_WIDTH / 1.8,
    },
    doctorLocationText: {},
    doctorExperience: {},
    flatlist: {
      marginBottom: ScaleManager.scaleSizeHeight(10),
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
    mockTextInputContainerStyle: (selected: boolean) => {
      return {
        ...this._styles.mockTextInputContainer,
        borderColor: selected ? COLORS.cornFlowerBlue : COLORS.grayLighter,
      };
    },
    rightIconDropdownStyle: (active: boolean) => {
      return {
        ...this._styles.rightIconDropdown,
        transform: [{ rotate: !active ? "180deg" : "0deg" }],
      };
    },
    callOrEditButtonStyle: (isCall: boolean) => {
      return {
        ...this._styles.callOrEditButton,
        backgroundColor: isCall ? COLORS.mainColor : COLORS.white,
      };
    },
    callOrEditTextStyle: (isCall: boolean) => {
      return {
        ...this._styles.callOrEditText,
        color: isCall ? COLORS.white : COLORS.mainColor,
      };
    },
  };
}

export default StepOneAppointmentScreen.styles;
