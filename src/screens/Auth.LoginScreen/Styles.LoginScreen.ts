import { COLORS, THEMES } from "@src/assets";
import FONTS from "@src/assets/fonts";
import { Animated, Platform, StyleSheet } from "react-native";
import ScaleManager from "@assets/ScaleManager";

class LoginScreenStyles {
  private static _styles = StyleSheet.create({
    imageBackground: {
      height: ScaleManager.WINDOW_HEIGHT,
      width: ScaleManager.WINDOW_WIDTH,
      backgroundColor: "white",
    },
    container: {
      width: "100%",
      marginTop: ScaleManager.MESSAGE_MARGIN_TOP,
    },
    bodyContainer: {
      width: "100%",
      backgroundColor: "white",
      borderTopLeftRadius: ScaleManager.BUTTON_HEIGHT / 2,
      borderTopRightRadius: ScaleManager.BUTTON_HEIGHT / 2,
      position: "absolute",
      right: 0,
      left: 0,
      bottom: 0,
      height: ScaleManager.scaleSizeHeight(600),
    },
    buttonLanguageContainer: {
      width: "100%",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    buttonWrapper: {
      height: ScaleManager.scaleSizeHeight(50),
      width: ScaleManager.scaleSizeWidth(100),
    },
    changeLanguageText: {
      textAlign: "right",
      paddingRight: ScaleManager.scaleSizeWidth(20),
      fontFamily: FONTS.interSemiBold,
      color: "white",
      fontSize: ScaleManager.moderateScale(30),
    },
    logoContainer: {
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    languageOptionContainer: {
      height: ScaleManager.scaleSizeHeight(129),
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      borderRadius: 8,
      backgroundColor: "white",
      alignSelf: "center",
      position: "absolute",
      zIndex: 100,
      top: ScaleManager.scaleSizeHeight(Platform.OS === "android" ? 55 : 45) + ScaleManager.STATUSBAR_HEIGHT,
      justifyContent: "center",
    },
    separatorContainer: { flexDirection: "row" },
    changeLanguageButtonContainer: {
      flex: 1,
      justifyContent: "space-between",
      marginLeft: ScaleManager.PADDING_SIZE,
      flexDirection: "row",
      alignItems: "center",
    },
    leftSeparator: {
      height: 20,
      width: ScaleManager.PADDING_SIZE,
      backgroundColor: "white",
      position: "absolute",
      alignSelf: "center",
      left: 0,
      zIndex: 1000,
    },
    rightSeparator: {
      height: 20,
      width: ScaleManager.PADDING_SIZE,
      backgroundColor: "white",
      position: "absolute",
      alignSelf: "center",
      right: 0,
      zIndex: 1000,
    },
    separator: {
      backgroundColor: COLORS.lightOneColor,
      height: ScaleManager.scaleSizeHeight(1),
      alignSelf: "center",
      width: "100%",
    },
    signInText: {
      fontSize: ScaleManager.moderateScale(32),
      fontFamily: FONTS.interRegular,
      alignSelf: "center",
      paddingTop: ScaleManager.PADDING_SIZE,
      paddingBottom: ScaleManager.scaleSizeHeight(32),
    },
    bigTextInput: {
      ...THEMES.bigInput,
    },
    titleText: {
      fontSize: ScaleManager.moderateScale(13),
      fontFamily: FONTS.interMedium,
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      lineHeight: ScaleManager.scaleSizeHeight(20),
      marginTop: ScaleManager.scaleSizeHeight(15),
      marginBottom: 0,
    },
    termOfUseContainer: {
      flexDirection: "row",
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
      marginVertical: ScaleManager.scaleSizeHeight(27.5),
      alignItems: "center",
      justifyContent: "center",
    },
    createAnAccountText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      color: COLORS.cyan,
      textDecorationLine: "underline",
    },
    termOfUseText: {
      color: COLORS.mainColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      textAlign: "center",
    },
    confirmButton: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      height: ScaleManager.BUTTON_HEIGHT,
      alignSelf: "center",
      backgroundColor: COLORS.mainColor,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    confirmModalButton: {
      height: ScaleManager.BUTTON_HEIGHT,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.mainColor,
      margin: ScaleManager.PADDING_SIZE,
    },
    confirmSignInText: {
      fontFamily: FONTS.interSemiBold,
      fontSize: ScaleManager.moderateScale(17),
      color: COLORS.white,
    },
    textInputContainer: {
      marginTop: ScaleManager.scaleSizeHeight(10),
      alignItems: "center",
      opacity: 1,
    },
    forgotPasswordContainer: {
      width: "100%",
      marginTop: ScaleManager.scaleSizeHeight(25),
      marginBottom: ScaleManager.scaleSizeHeight(36),
      alignItems: "flex-start",
    },
    forgotPasswordText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      color: COLORS.cyan,
      textAlign: "right",
      marginLeft: ScaleManager.PADDING_SIZE,
      textDecorationLine: "underline",
    },
    showHidePasswordButton: {
      height: "100%",
      width: ScaleManager.scaleSizeWidth(50),
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: ScaleManager.PADDING_SIZE,
      backgroundColor: COLORS.white,
      borderTopWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: COLORS.grayLighter,
      borderLeftColor: COLORS.white,
      borderRadius: 8,
    },
    bottomBackground: {
      height: ScaleManager.scaleSizeHeight(180),
      width: "100%",
      position: "absolute",
      right: 0,
      left: 0,
      bottom: -ScaleManager.scaleSizeHeight(179),
      backgroundColor: "white",
    },
    languageText: {
      fontSize: ScaleManager.moderateScale(15),
      fontFamily: FONTS.interSemiBold,
    },
    modalContainer: {
      backgroundColor: COLORS.modalColor,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      zIndex: 99999,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    mainModalContainer: {
      backgroundColor: "white",
      height: ScaleManager.scaleSizeHeight(350),
      width: ScaleManager.scaleSizeWidth(366),
      borderRadius: 4,
    },
    closeModalButton: {
      position: "absolute",
      top: ScaleManager.PADDING_SIZE,
      right: ScaleManager.PADDING_SIZE,
    },
    modalBodyContainer: {
      marginTop: ScaleManager.scaleSizeHeight(42),
      justifyContent: "center",
      alignItems: "center",
    },
    inactiveText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(24),
      color: COLORS.darkOneColor,
    },
    detailText: {
      fontFamily: FONTS.interRegular,
      color: COLORS.darkOneColor,
      fontSize: ScaleManager.moderateScale(13),
      alignSelf: "center",
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      textAlign: "center",
    },
    infoText: {
      fontFamily: FONTS.interSemiBold,
      color: COLORS.darkOneColor,
      fontSize: ScaleManager.moderateScale(13),
      alignSelf: "center",
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      textAlign: "center",
    },
    versionCodeText: {
      position: "absolute",
      alignSelf: "center",
      fontSize: ScaleManager.moderateScale(10),
      fontStyle: "italic",
    },
    inactiveModalContainer: {
      height: ScaleManager.WINDOW_HEIGHT,
      width: ScaleManager.WINDOW_WIDTH,
      backgroundColor: COLORS.modalColor,
      justifyContent: "center",
      alignItems: "center",
    },
    inactiveModalAniWrapper: {
      height: ScaleManager.scaleSizeHeight(270),
      width: ScaleManager.scaleSizeWidth(350),
      backgroundColor: "white",
      borderRadius: 4,
      justifyContent: "space-between",
    },
    contactText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      color: COLORS.darkOneColor,
      marginTop: ScaleManager.scaleSizeHeight(10),
    },
    confirmInactiveButton: {
      width: ScaleManager.scaleSizeWidth(350) - ScaleManager.scaleSizeWidth(16 * 2),
      height: ScaleManager.BUTTON_HEIGHT,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.mainColor,
      marginTop: ScaleManager.scaleSizeHeight(22),
    },
    modalWrapper: {
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    cancelButton: {
      position: "absolute",
      top: ScaleManager.scaleSizeHeight(16),
      right: ScaleManager.scaleSizeHeight(16),
      zIndex: 999,
    },
    chosenIcon: {
      paddingHorizontal: ScaleManager.PADDING_SIZE,
    },
    sixCharacters: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(11),
      color: COLORS.darkFourColor,
      paddingTop: 4,
      paddingHorizontal: ScaleManager.PADDING_SIZE,
    },
    marginTop: {
      marginTop: ScaleManager.scaleSizeHeight(20),
    },
  });

  public static styles = {
    ...this._styles,
    bodyContainerStyle: (translateY: Animated.Value) => {
      return {
        ...this._styles.bodyContainer,
        transform: [{ translateY }],
      };
    },
    bottomBackgroundStyle: (translateY: Animated.Value) => {
      return {
        ...this._styles.bottomBackground,
        transform: [{ translateY }],
      };
    },
    logoBouncyStyle: (translateY: Animated.Value) => {
      return {
        transform: [{ translateY }],
      };
    },
    languageOptionContainerStyle: (scale: Animated.Value) => {
      return {
        ...this._styles.languageOptionContainer,
        transform: [{ scale }],
      };
    },
  };
}

export default LoginScreenStyles.styles;
