import { COLORS, THEMES } from "@src/assets";
import FONTS from "@src/assets/fonts";
import { Platform, StyleSheet } from "react-native";
import ScaleManager from "@assets/ScaleManager";

class UpdateProfileScreenStyles {
  private static _styles = StyleSheet.create({
    wrapperContainer: {
      backgroundColor: COLORS.white,
      flex: 1,
    },
    container: {
      backgroundColor: COLORS.white,
      flex: 1,
    },
    sectionText: {
      color: COLORS.darkBlue20,
      fontSize: ScaleManager.moderateScale(18),
      fontFamily: FONTS.interSemiBold,
      marginTop: ScaleManager.PADDING_SIZE,
      paddingHorizontal: ScaleManager.PADDING_SIZE,
    },
    updateAccountTitle: {
      color: COLORS.defaultTextColor,
      fontSize: ScaleManager.moderateScale(28),
      fontFamily: FONTS.interSemiBold,
      marginBottom: ScaleManager.scaleSizeHeight(16) * 2,
      marginTop: ScaleManager.PADDING_SIZE * 2,
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      alignSelf: "center",
    },
    forgotPasswordText: {
      fontFamily: FONTS.interRegular,
      color: COLORS.darkOneColor,
      fontSize: ScaleManager.moderateScale(32),
      paddingBottom: ScaleManager.scaleSizeHeight(16),
      alignSelf: "center",
    },
    detailText: {
      fontFamily: FONTS.interRegular,
      color: COLORS.darkOneColor,
      fontSize: ScaleManager.moderateScale(15),
      alignSelf: "center",
      marginHorizontal: ScaleManager.PADDING_SIZE,
      textAlign: "center",
    },
    bigTextInput: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      height: ScaleManager.BUTTON_HEIGHT,
      borderRadius: 8,
      backgroundColor: COLORS.lightFourColor,
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      fontFamily: FONTS.interRegular,
      color: COLORS.darkOneColor,
      marginVertical: ScaleManager.scaleSizeHeight(32),
      alignSelf: "center",
    },
    confirmButton: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      height: ScaleManager.BUTTON_HEIGHT,
      alignSelf: "center",
      backgroundColor: COLORS.mainColor,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: ScaleManager.PADDING_SIZE,
    },
    confirmSignInText: {
      fontFamily: FONTS.interSemiBold,
      fontSize: ScaleManager.moderateScale(17),
      color: COLORS.white,
    },
    patientNameContainer: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: COLORS.white,
    },
    smallTextInput: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING / 2 - ScaleManager.scaleSizeHeight(16),
      alignSelf: "center",
      borderRadius: 8,
      backgroundColor: COLORS.lightFourColor,
      height: ScaleManager.scaleSizeHeight(56),
      color: COLORS.darkOneColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(15),
    },
    separator: {
      width: "100%",
      height: ScaleManager.PADDING_SIZE,
    },
    footerContainer: {
      flexDirection: "row",
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
      alignItems: "center",
      marginTop: ScaleManager.scaleSizeHeight(15),
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    acceptText: {
      color: COLORS.darkOneColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
    },
    termOfUseText: {
      color: COLORS.mainColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
    },
    textInput: {
      ...THEMES.bigInput,
    },
    textInputTitle: {
      ...THEMES.title,
    },
    containerDropdown: {
      height: ScaleManager.scaleSizeHeight(298),
      borderRadius: 8,
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
    itemDropdown: {
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      justifyContent: "space-between",
      flexDirection: "row",
      width: "100%",
      height: ScaleManager.scaleSizeHeight(300 / 5),
      alignItems: "center",
      backgroundColor: COLORS.white,
    },
    dialCodeText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      paddingRight: 8,
    },
    rightIconDropdown: {
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      height: "100%",
      justifyContent: "center",
    },
    phoneNumberContainer: {
      alignItems: "center",
      width: "100%",
    },
    dropdownContainer: {
      width: ScaleManager.scaleSizeWidth(150),
      backgroundColor: "transparent",
      height: ScaleManager.TEXT_INPUT_HEIGHT + 1,
      color: COLORS.darkOneColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      position: "absolute",
      zIndex: 1,
      left: ScaleManager.scaleSizeWidth(30),
    },
    phoneNumberInput: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      backgroundColor: COLORS.white,
      color: COLORS.darkOneColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      paddingLeft: ScaleManager.scaleSizeWidth(150),
      borderWidth: 1,
      borderColor: COLORS.grayLighter,
      alignSelf: "center",
    },
    checkIconContainer: {
      width: "15%",
    },
    dialCodeTextContainer: {
      width: "85%",
    },
    nextButtonContainer: {
      ...THEMES.commonButtonStyle(COLORS.mainColor),
      marginTop: ScaleManager.scaleSizeHeight(80),
    },
    nextText: {
      ...THEMES.commonMediumTextStyle(COLORS.white),
    },
    customRightIconContainer: {
      height: ScaleManager.TEXT_INPUT_HEIGHT + 1,
      aspectRatio: 1,
      position: "absolute",
      top: -0.5,
      right: -0.5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.mainColor,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    rangeTimePickerContainer: {
      height: ScaleManager.scaleSizeHeight(450),
      width: "100%",
      backgroundColor: COLORS.white,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    closeIconContainer: {},
    modalContentContainer: {
      flex: 1,
      backgroundColor: COLORS.modalColor,
    },
    timeWrapper: {
      flexDirection: "row",
      backgroundColor: COLORS.white,
      flex: 1,
      width: "100%",
      borderTopLeftRadius: ScaleManager.BUTTON_HEIGHT / 2,
      borderTopRightRadius: ScaleManager.BUTTON_HEIGHT / 2,
      marginTop: ScaleManager.scaleSizeHeight(20),
    },
    wheelContainer: {
      width: ScaleManager.WINDOW_WIDTH / 3,
      backgroundColor: COLORS.white,
      alignSelf: "center",
    },
    timeTextStyle: {
      ...THEMES.commonRegularTextStyle(COLORS.defaultTextColor),
      fontSize: ScaleManager.moderateScale(15),
    },
    headerContainer: {
      width: "100%",
      flexDirection: "row",
      position: "absolute",
      top: ScaleManager.scaleSizeHeight(30),
      height: ScaleManager.scaleSizeHeight(40),
      left: 0,
      right: 0,
      zIndex: 10000,
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center",
      paddingHorizontal: ScaleManager.PADDING_SIZE,
    },
    subHeaderContainer: {
      width: ScaleManager.WINDOW_WIDTH,
      flexDirection: "row",
      position: "absolute",
      top: ScaleManager.scaleSizeHeight(90),
      height: ScaleManager.scaleSizeHeight(30),
      left: 0,
      right: 0,
      zIndex: 10000,
      justifyContent: "space-around",
      alignItems: "center",
      alignSelf: "center",
    },
    dateUnitText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      flex: 1,
      textAlign: "center",
    },
    birthOfDateContainer: {
      height: ScaleManager.TEXT_INPUT_HEIGHT,
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
    },
    birthOfDateWrapper: {
      flex: 1,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      overflow: "hidden",
    },
    birthOfDateText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      paddingLeft: ScaleManager.scaleSizeWidth(5),
    },
    errorText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(11),
      color: COLORS.errorColor,
      paddingLeft: ScaleManager.PADDING_SIZE,
    },
    innerTextContainer: {
      position: "absolute",
      bottom: ScaleManager.scaleSizeHeight(30),
      width: "100%",
    },
    innerErrorText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(11),
      color: COLORS.errorColor,
      alignSelf: "center",
    },
    confirmContainer: {
      height: ScaleManager.scaleSizeHeight(35),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.cyan,
      borderRadius: 8,
    },
    confirmText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      color: COLORS.white,
      paddingHorizontal: ScaleManager.scaleSizeWidth(8),
    },
  });

  public static styles = {
    ...this._styles,
    rightIconDropdownStyle: (active: boolean) => {
      return {
        ...this._styles.rightIconDropdown,
        transform: [{ rotate: !active ? "180deg" : "0deg" }],
      };
    },
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
    dropdownContainerStyle: (boolean: boolean) => {
      return {
        ...this._styles.dropdownContainer,
        borderColor: boolean ? COLORS.errorColor : COLORS.grayLighter,
      };
    },
    birthOfDateWrapperStyle: (dateText: string) => {
      return {
        ...this._styles.birthOfDateWrapper,
        borderColor: !!dateText ? COLORS.errorColor : COLORS.grayLighter,
      };
    },
    birthOfDateTextStyle: (dateText: string): any => {
      if (!!dateText) {
        return {
          fontFamily: FONTS.interRegular,
          fontSize: ScaleManager.moderateScale(13),
          paddingLeft: ScaleManager.scaleSizeWidth(5),
          color: COLORS.defaultTextColor,
        };
      }
      return {
        color: COLORS.grayLight,
        fontStyle: "italic",
        paddingLeft: ScaleManager.scaleSizeWidth(5),
      };
    },
  };
}

export default UpdateProfileScreenStyles.styles;
