import { COLORS, THEMES } from "@src/assets";
import FONTS from "@src/assets/fonts";
import { StyleSheet } from "react-native";
import ScaleManager from "@assets/ScaleManager";

class MoreScreenStyles {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    buttonContainer: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      height: ScaleManager.scaleSizeHeight(96),
      backgroundColor: COLORS.mainLighterColor,
      alignItems: "center",
      alignSelf: "center",
      borderRadius: 8,
      borderWidth: 1,
      marginBottom: ScaleManager.PADDING_SIZE,
    },
    buttonBodyWrapper: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING - ScaleManager.PADDING_SIZE,
      alignSelf: "center",
      alignItems: "center",
      flexDirection: "row",
      height: "100%",
      borderBottomColor: COLORS.lightOneColor,
    },
    iconWrapper: {
      height: ScaleManager.scaleSizeHeight(70),
      borderRadius: 100,
      borderWidth: 1,
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.white,
    },
    leftButtonContainer: {
      flex: 8,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      height: "100%",
    },
    rightButtonContainer: {
      transform: [{ rotate: "180deg" }],
      flex: 2,
      height: "100%",
      justifyContent: "center",
    },
    textWrapper: {
      paddingLeft: ScaleManager.scaleSizeWidth(10.5),
    },
    iconText: {
      color: COLORS.white,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(15),
      lineHeight: ScaleManager.scaleSizeHeight(19.5),
    },
    title: {
      ...THEMES.title,
      marginTop: ScaleManager.PADDING_SIZE * 2,
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default MoreScreenStyles.styles;
