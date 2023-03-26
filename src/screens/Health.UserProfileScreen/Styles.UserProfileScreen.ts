import { COLORS, THEMES } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";
import FONTS from "../../../android/app/src/main/assets/custom/index";

class UserProfileScreenStyles {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    avatarImage: {
      height: ScaleManager.scaleSizeHeight(96),
      aspectRatio: 1,
      borderRadius: 1000,
      alignSelf: "center",
      borderWidth: 1,
      borderColor: COLORS.shadowGreen,
      marginTop: ScaleManager.scaleSizeHeight(32),
      marginBottom: ScaleManager.scaleSizeHeight(8),
    },
    editIconContainer: {
      position: "absolute",
      bottom: ScaleManager.scaleSizeHeight(8),
      right: ScaleManager.WINDOW_WIDTH / 2 - ScaleManager.scaleSizeHeight(96) / 2 + ScaleManager.scaleSizeHeight(4),
    },
    sectionContainer: {
      marginTop: ScaleManager.scaleSizeHeight(24),
      marginHorizontal: ScaleManager.PADDING_SIZE,
    },
    title: {
      color: COLORS.defaultTextColor,
      fontFamily: FONTS.interSemiBold,
      fontSize: ScaleManager.moderateScale(15),
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
    buttonContainer: {
      ...THEMES.commonButtonStyle(COLORS.mainColor),
      borderWidth: 1.5,
    },
    buttonText: {
      ...THEMES.commonMediumTextStyle(COLORS.white),
    },
    bottomWrapper: {
      marginTop: ScaleManager.scaleSizeHeight(48),
    },
    bodyBottomSheetContainer: {
      height: ScaleManager.scaleSizeHeight(250),
      width: "100%",
    },
    titleLogoutText: {
      textAlign: "center",
      fontFamily: FONTS.interSemiBold,
      fontSize: ScaleManager.moderateScale(17),
      paddingTop: ScaleManager.scaleSizeHeight(24),
    },
    areYouSureText: {
      textAlign: "center",
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(15),
      paddingVertical: ScaleManager.scaleSizeHeight(32),
    },
    bottomSheetButtonWrapper: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      alignSelf: "center",
    },
    cancelButton: {
      justifyContent: "center",
      alignItems: "center",
      height: ScaleManager.BUTTON_HEIGHT,
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING / 2 - ScaleManager.scaleSizeWidth(8),
      borderWidth: 1,
      borderColor: COLORS.mainColor,
      borderRadius: 12,
    },
    cancelText: {
      fontFamily: FONTS.interSemiBold,
      color: COLORS.mainColor,
      fontSize: ScaleManager.moderateScale(17),
    },
    logoutText: {
      fontFamily: FONTS.interSemiBold,
      color: "white",
      fontSize: ScaleManager.moderateScale(17),
    },
    logoutButton: {
      justifyContent: "center",
      alignItems: "center",
      height: ScaleManager.BUTTON_HEIGHT,
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING / 2 - ScaleManager.scaleSizeWidth(8),
      backgroundColor: COLORS.mainColor,
      borderRadius: 12,
    },
  });

  public static styles = {
    ...this._styles,
    buttonContainerStyle: (standout: boolean) => {
      return {
        ...this._styles.buttonContainer,
        backgroundColor: standout ? COLORS.mainColor : COLORS.white,
        borderColor: COLORS.mainColor,
      };
    },
    buttonTextStyle: (standout: boolean) => {
      return {
        ...this._styles.buttonText,
        color: standout ? COLORS.white : COLORS.mainColor,
      };
    },
  };
}

export default UserProfileScreenStyles.styles;
