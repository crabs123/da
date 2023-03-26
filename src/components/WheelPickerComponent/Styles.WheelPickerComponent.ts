import { StyleSheet } from "react-native";

class WheelPickerComponentStyle {
  private static _styles = StyleSheet.create({
    container: {
      position: "relative",
    },
    selectedIndicator: {
      position: "absolute",
      width: "100%",
      backgroundColor: "hsl(200, 8%, 94%)",
      borderRadius: 5,
      top: "50%",
    },
    scrollView: {
      overflow: "hidden",
      flex: 1,
    },
    option: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
      zIndex: 100,
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default WheelPickerComponentStyle.styles;
