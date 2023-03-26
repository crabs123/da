import { COLORS } from "@src/assets";
import FONTS from "@src/assets/fonts";
import { StyleSheet } from "react-native";
import ScaleManager from "@src/assets/ScaleManager";

class ShowMoreComponentStyles {
  private static _styles = StyleSheet.create({
    container: {
      position: "absolute",
      width: "100%",
      opacity: 0,
    },
    descriptionContainer: {
      marginTop: ScaleManager.PADDING_SIZE,
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    descriptionText: {
      color: COLORS.darkOneColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      textAlign: "justify",
    },
    showMoreText: {
      color: COLORS.mainColor,
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(11),
      marginLeft: 100,
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default ShowMoreComponentStyles.styles;
