import { COLORS, THEMES } from "@src/assets";
import FONTS from "@src/assets/fonts";
import { Platform, StyleSheet } from "react-native";
import ScaleManager from "@assets/ScaleManager";
import themes from "@src/assets/themes";

class PersonalAddressScreenStyle {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      justifyContent: "space-between",
    },
    forgotPasswordText: {
      fontFamily: FONTS.interRegular,
      color: COLORS.darkOneColor,
      fontSize: ScaleManager.moderateScale(32),
      paddingBottom: ScaleManager.scaleSizeHeight(16),
      alignSelf: "center",
    },
    spacer: {
      height: ScaleManager.scaleSizeHeight(50),
      width: "100%",
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
      color: "white",
    },
    patientNameContainer: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "white",
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
      ...themes.bigInput,
    },
    textInputTitle: {
      fontSize: ScaleManager.moderateScale(15),
      fontFamily: FONTS.interSemiBold,
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      marginVertical: ScaleManager.scaleSizeHeight(8),
      lineHeight: ScaleManager.scaleSizeHeight(20),
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
      backgroundColor: "white",
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
    phoneNumberInput: {
      width: ScaleManager.WINDOW_WIDTH - ScaleManager.WIDTH_SCREEN_MINUS_PADDING / 2.5 - ScaleManager.PADDING_SIZE * 2,
      alignSelf: "flex-start",
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      backgroundColor: COLORS.lightFourColor,
      color: COLORS.darkOneColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(15),
      paddingLeft: 5,
    },
    checkIconContainer: {
      width: "15%",
    },
    dialCodeTextContainer: {
      width: "85%",
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
  };
}

export default PersonalAddressScreenStyle.styles;
