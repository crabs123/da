import { COLORS } from "@src/assets";
import FONTS from "@src/assets/fonts";
import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";

class HeaderComponentStyles {
  private static _styles = StyleSheet.create({
    container: {
      alignSelf: "center",
      height: ScaleManager.HEADER_COMPONENT_HEIGHT,
      backgroundColor: "transparent",
      width: "100%",
    },
    wrapper1: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      flexDirection: "row",
      flex: 1,
      alignSelf: "center",
    },
    wrapper2: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      flexDirection: "row",
      flex: 1,
      alignSelf: "center",
    },
    leftButtonWrapper1: {
      flex: 1,
      height: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    leftButtonWrapper2: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginTop: ScaleManager.scaleSizeHeight(30),
      height: ScaleManager.scaleSizeHeight(80),
    },
    leftButton: {
      height: "100%",
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "flex-start",
      flex: 1,
    },
    middleContainer1: {
      height: "100%",
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      flex: 2.5,
    },
    middleContainer2: {
      flexDirection: "row",
      flex: 2.5,
      marginTop: ScaleManager.scaleSizeHeight(30),
      height: ScaleManager.scaleSizeHeight(80),
      justifyContent: "center",
      alignItems: "center",
    },
    rightButtonWrapper1: {
      flex: 1,
      height: "100%",
      justifyContent: "center",
    },
    rightButtonWrapper2: {
      flex: 1,
      justifyContent: "center",
      marginTop: ScaleManager.scaleSizeHeight(30),
      height: ScaleManager.scaleSizeHeight(80),
    },
    rightButton: {
      justifyContent: "center",
      alignItems: "flex-end",
    },
    mainTitleText: {
      color: COLORS.darkOneColor,
      fontFamily: FONTS.interSemiBold,
      fontSize: ScaleManager.moderateScale(17),
    },
    notificationText: {
      fontSize: ScaleManager.moderateScale(13),
      color: COLORS.darkThreeColor,
      fontFamily: FONTS.interRegular,
    },
    viewShadow: {
      height: 4,
      width: "100%",
    },
    editIcon: {
      paddingLeft: ScaleManager.scaleSizeWidth(5),
    },
  });

  public static styles = {
    ...this._styles,
    wrapperStyle: (transparentBackground: boolean) => {
      if (!transparentBackground) {
        return {
          ...this._styles.wrapper1,
        };
      }
      return {
        ...this._styles.wrapper2,
      };
    },
    leftButtonWrapperStyle: (transparentBackground: boolean) => {
      if (!transparentBackground) {
        return {
          ...this._styles.leftButtonWrapper1,
        };
      }
      return {
        ...this._styles.leftButtonWrapper2,
      };
    },
    middleContainerStyle: (transparentBackground: boolean) => {
      if (!transparentBackground) {
        return {
          ...this._styles.middleContainer1,
        };
      }
      return {
        ...this._styles.middleContainer2,
      };
    },
    rightButtonWrapperStyle: (transparentBackground: boolean) => {
      if (!transparentBackground) {
        return {
          ...this._styles.rightButtonWrapper1,
        };
      }
      return {
        ...this._styles.rightButtonWrapper2,
      };
    },
  };
}

export default HeaderComponentStyles.styles;
