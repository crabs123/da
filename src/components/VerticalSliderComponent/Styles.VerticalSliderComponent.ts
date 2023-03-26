import { StyleSheet } from "react-native";

class VerticalSliderComponentStyles {
  private static _styles = StyleSheet.create({
    ball: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "gray",
    },
    ballText: {
      fontWeight: "900",
    },
    container: {
      overflow: "hidden",
    },
    slider: {
      position: "absolute",
      bottom: 0,
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default VerticalSliderComponentStyles.styles;
