import { StyleSheet } from "react-native";

class SwitchComponentStyles {
  private static _styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    labelStyle: {
      marginHorizontal: 10,
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default SwitchComponentStyles.styles;
