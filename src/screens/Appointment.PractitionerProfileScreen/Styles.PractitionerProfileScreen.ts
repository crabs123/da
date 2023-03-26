import { COLORS } from "@src/assets";
import { StyleSheet } from "react-native";

class PractitionerProfileScreenStyles {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default PractitionerProfileScreenStyles.styles;
