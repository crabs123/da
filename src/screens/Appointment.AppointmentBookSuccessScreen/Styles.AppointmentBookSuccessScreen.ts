import { COLORS, THEMES } from "@src/assets";
import { Platform, StyleSheet } from "react-native";
import ScaleManager from "@src/assets/ScaleManager";
import themes from "@src/assets/themes";
import FONTS from "@src/assets/fonts";

class AppointmentBookSuccessScreen {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    bodyContainer: {
      marginTop: ScaleManager.scaleSizeHeight(50),
    },
    iconWrapper: {
      height: ScaleManager.scaleSizeHeight(160),
      aspectRatio: 1,
      borderRadius: 1000,
      borderWidth: 1.5,
      borderColor: COLORS.atlanticGreen,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: ScaleManager.scaleSizeHeight(20),
    },
    message: {
      fontSize: ScaleManager.moderateScale(18),
      fontFamily: FONTS.interSemiBold,
      color: COLORS.darkCyan20,
      alignSelf: "center",
    },
    title: {
      ...THEMES.commonRegularText,
      color: COLORS.atlanticGreen,
      fontSize: ScaleManager.moderateScale(14),
      paddingRight: ScaleManager.scaleSizeWidth(8),
      minWidth: ScaleManager.scaleSizeWidth(120),
    },
    value: {
      ...THEMES.commonRegularText,
    },
    wrapper: {
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: "#1C82AD",
      height: ScaleManager.scaleSizeHeight(Platform.OS === "ios" ? 180 : 200),
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
      marginTop: ScaleManager.scaleSizeHeight(50),
      backgroundColor: COLORS.lightAtlanticGreen,
      justifyContent: "space-between",
    },
    timeTextStyle: {
      fontSize: ScaleManager.moderateScale(16),
      fontFamily: FONTS.interSemiBold,
      color: COLORS.darkCyan20,
      paddingHorizontal: ScaleManager.scaleSizeWidth(16),
      paddingVertical: ScaleManager.scaleSizeWidth(16),
    },
    rowText: {
      flexDirection: "row",
      paddingHorizontal: ScaleManager.scaleSizeWidth(16),
      marginTop: ScaleManager.scaleSizeHeight(4),
    },
    buttonContainer: {
      ...THEMES.commonButtonStyle("transparent"),
      borderColor: COLORS.primaryOrange,
      borderWidth: 1,
      width: ScaleManager.WINDOW_WIDTH - ScaleManager.PADDING_SIZE * 4,
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default AppointmentBookSuccessScreen.styles;
