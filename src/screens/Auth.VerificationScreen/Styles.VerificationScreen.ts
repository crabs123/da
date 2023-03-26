import { COLORS } from "@src/assets";
import FONTS from "@src/assets/fonts";
import { StyleSheet } from "react-native";
import ScaleManager from "@assets/ScaleManager";

class VerificationScreenStyles {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    statusBar: {
      height: ScaleManager.STATUSBAR_HEIGHT,
      width: "100%",
      backgroundColor: COLORS.white,
    },
    bodyContainer: {
      marginTop: ScaleManager.scaleSizeHeight(37),
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
      textAlign: "center",
    },
    textWrapper: {
      marginHorizontal: ScaleManager.PADDING_SIZE * 2.5,
    },
    codeFieldRoot: {
      marginTop: 20,
    },
    cellWrapper: {
      width: ScaleManager.scaleSizeHeight(40),
      height: ScaleManager.scaleSizeHeight(50),
      borderBottomWidth: 1,
      justifyContent: "flex-end",
    },
    textVerificationCell: {
      fontSize: ScaleManager.moderateScale(30),
      textAlign: "center",
      color: COLORS.mainColor,
      fontFamily: FONTS.interRegular,
    },
    codeFieldContainer: {
      marginHorizontal: ScaleManager.PADDING_SIZE,
      marginTop: ScaleManager.scaleSizeHeight(52),
    },
    footerContainer: {
      marginVertical: ScaleManager.scaleSizeHeight(24),
      justifyContent: "center",
      alignItems: "center",
    },
    notReceiveCodeText: {
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
    },
    resendButton: {
      marginTop: ScaleManager.scaleSizeHeight(5),
    },
    resendText: {
      fontFamily: FONTS.interSemiBold,
      fontSize: ScaleManager.moderateScale(15),
      color: COLORS.mainColor,
    },
  });

  public static styles = {
    ...this._styles,
    cellWrapperStyle: (focused: boolean) => {
      return {
        ...this._styles.cellWrapper,
        borderColor: focused ? COLORS.mainColor : COLORS.grayLight,
      };
    },
  };
}

export default VerificationScreenStyles.styles;
