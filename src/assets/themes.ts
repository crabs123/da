import { StyleSheet } from "react-native";
import COLORS from "./colors";
import FONTS from "./fonts";
import ScaleManager from "./ScaleManager";

class Themes {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: ScaleManager.STATUSBAR_HEIGHT,
    },
    commonButton: {
      height: ScaleManager.BUTTON_HEIGHT,
      backgroundColor: COLORS.errorColor,
      marginBottom: ScaleManager.PADDING_SIZE,
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    commonRegularText: {
      fontSize: ScaleManager.moderateScale(13),
      fontFamily: FONTS.interRegular,
    },
    commonMediumText: {
      fontSize: ScaleManager.moderateScale(16),
      fontFamily: FONTS.interMedium,
    },
    commonBoldText: {
      fontSize: ScaleManager.moderateScale(28),
      fontFamily: FONTS.interSemiBold,
    },
    commonShadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
    bigInput: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
      borderRadius: 8,
      backgroundColor: COLORS.white,
      height: ScaleManager.TEXT_INPUT_HEIGHT,
      paddingLeft: ScaleManager.PADDING_SIZE / 2,
      color: COLORS.darkOneColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      borderWidth: 1,
      borderColor: COLORS.grayLighter,
    },
    title: {
      fontSize: ScaleManager.moderateScale(15),
      fontFamily: FONTS.interSemiBold,
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      marginTop: ScaleManager.scaleSizeHeight(16),
      marginBottom: ScaleManager.scaleSizeHeight(8),
      lineHeight: ScaleManager.scaleSizeHeight(20),
      color: COLORS.titleColor,
    },
  });

  public static styles = {
    ...this._styles,
    commonButtonStyle: (color: string) => {
      return {
        ...this._styles.commonButton,
        backgroundColor: color,
      };
    },
    commonRegularTextStyle: (color: string) => {
      return {
        ...this._styles.commonRegularText,
        color,
      };
    },
    commonMediumTextStyle: (color: string) => {
      return {
        ...this._styles.commonMediumText,
        color,
      };
    },
    commonBoldTextStyle: (color: string) => {
      return {
        ...this._styles.commonBoldText,
        color,
      };
    },
  };
}

export default Themes.styles;
