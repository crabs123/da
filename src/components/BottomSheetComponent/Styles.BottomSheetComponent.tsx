import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";

class BottomSheetComponentStyle {
  private static _styles = StyleSheet.create({
    container: {
      width: "100%",
      borderTopLeftRadius: ScaleManager.scaleSizeWidth(20),
      borderTopRightRadius: ScaleManager.scaleSizeWidth(20),
      marginTop: "5%",
      minHeight: ScaleManager.scaleSizeHeight(250),
    },
    handle: {
      backgroundColor: "grey",
      paddingBottom: ScaleManager.scaleSizeWidth(5),
      width: ScaleManager.scaleSizeWidth(52),
      alignSelf: "center",
      marginTop: ScaleManager.scaleSizeHeight(10),
      marginBottom: ScaleManager.scaleSizeHeight(2),
      borderRadius: 100,
    },
    wrapper: {
      backgroundColor: "white",
    },
    transparent: {
      zIndex: 2,
      backgroundColor: "rgba(0,0,0,0)",
    },
    absolute: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

  public static styles = {
    ...this._styles,
    containerStyle: (height: number) => {
      return {
        ...this._styles.container,
        height,
      };
    },
  };
}

export default BottomSheetComponentStyle.styles;
