import { COLORS, THEMES } from "@src/assets";
import FONTS from "@src/assets/fonts";
import { StyleSheet } from "react-native";
import ScaleManager from "@assets/ScaleManager";

class ForgotPasswordScreenStyles {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    bodyContainer: {
      marginTop: ScaleManager.scaleSizeHeight(50),
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
      ...THEMES.bigInput,
      marginVertical: ScaleManager.scaleSizeHeight(32),
    },
    confirmButton: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      height: ScaleManager.BUTTON_HEIGHT,
      alignSelf: "center",
      backgroundColor: COLORS.mainColor,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    confirmSignInText: {
      fontFamily: FONTS.interSemiBold,
      fontSize: ScaleManager.moderateScale(17),
      color: "white",
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default ForgotPasswordScreenStyles.styles;
