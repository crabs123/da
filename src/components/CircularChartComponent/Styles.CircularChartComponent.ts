import { StyleSheet } from "react-native";

class CircularChartComponentStyles {
  private static _styles = StyleSheet.create({
    defaultContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    defaultLabelWrapper: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
    },
    defaultLabelValue: {
      fontSize: 32,
      fontWeight: "bold",
    },
    defaultLabelTitle: {
      fontSize: 16,
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default CircularChartComponentStyles.styles;
