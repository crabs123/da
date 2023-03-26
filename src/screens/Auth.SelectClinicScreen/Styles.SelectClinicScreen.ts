import { COLORS, THEMES } from "@src/assets";
import { StyleSheet } from "react-native";
import ScaleManager from "@assets/ScaleManager";
import FONTS from "@src/assets/fonts";

class RegisterScreenStyles {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    searchContainer: {},
    inputWrapper: {
      marginTop: ScaleManager.scaleSizeHeight(10),
      opacity: 1,
      justifyContent: "flex-start",
    },
    searchIconWrapper: {
      height: ScaleManager.BUTTON_HEIGHT,
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      alignSelf: "center",
      right: ScaleManager.PADDING_SIZE,
      borderColor: COLORS.grayLighter,
      borderLeftColor: COLORS.white,
      borderRadius: 8,
      top: ScaleManager.TEXT_INPUT_HEIGHT / 2,
    },
    textInputContainer: {
      ...THEMES.bigInput,
      paddingLeft: ScaleManager.scaleSizeWidth(8),
      marginTop: ScaleManager.scaleSizeHeight(20),
    },
    maskViewContainer: {
      position: "absolute",
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      height: ScaleManager.BUTTON_HEIGHT,
      alignSelf: "center",
      backgroundColor: "transparent",
      justifyContent: "center",
      top: ScaleManager.TEXT_INPUT_HEIGHT / 2,
    },
    placeHolderText: {
      fontStyle: "italic",
      paddingLeft: ScaleManager.scaleSizeWidth(8),
      color: COLORS.grayLight,
    },
    nextButtonContainer: {
      ...THEMES.commonButtonStyle(COLORS.mainColor),
    },
    nextText: {
      ...THEMES.commonMediumTextStyle(COLORS.white),
    },
    pictureStyle: {
      width: "100%",
      height: ScaleManager.scaleSizeHeight(150),
    },
    addressContainer: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      backgroundColor: COLORS.lightCyan20,
    },
    addressWrapper: {
      paddingVertical: ScaleManager.scaleSizeHeight(20),
    },
    addressText: {
      paddingRight: ScaleManager.scaleSizeWidth(60),
      paddingLeft: ScaleManager.scaleSizeWidth(10),
    },
    flatListContainer: {
      flex: 1,
      marginBottom: ScaleManager.scaleSizeHeight(10),
      alignSelf: "center",
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
    },
    iconWrapper: {
      height: "100%",
      width: ScaleManager.scaleSizeWidth(60),
      backgroundColor: COLORS.lightCyan20,
      position: "absolute",
      right: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    foundText: {
      ...THEMES.commonMediumText,
    },
    itemContainer: {
      marginBottom: ScaleManager.scaleSizeWidth(5),
      borderColor: COLORS.darkGreen,
    },
    wrapper: {
      flex: 1,
      backgroundColor: "white",
    },
    clinicNameText: {
      position: "absolute",
      bottom: ScaleManager.scaleSizeHeight(5),
      marginHorizontal: ScaleManager.PADDING_SIZE,
      color: COLORS.white,
      fontFamily: FONTS.interSemiBold,
      fontSize: ScaleManager.moderateScale(20),
    },
    clinicTextResultContainer: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      marginTop: ScaleManager.scaleSizeHeight(30),
      alignSelf: "center",
    },
  });

  public static styles = {
    ...this._styles,
    nextButtonContainerStyle: (canNext: boolean) => {
      return {
        ...this._styles.nextButtonContainer,
        backgroundColor: canNext ? COLORS.cornFlowerBlue : COLORS.grayLight,
      };
    },
    nextTextStyle: (canNext: boolean) => {
      return {
        ...this._styles.nextText,
        color: canNext ? COLORS.white : COLORS.grayDark,
      };
    },
    itemContainerStyle: (selected: boolean) => {
      return {
        ...this._styles.itemContainer,
        borderWidth: 2,
        borderColor: selected ? COLORS.darkGreen : "transparent",
      };
    },
  };
}

export default RegisterScreenStyles.styles;
