import { StyleSheet } from "react-native";

class SegmentControlComponentStyles {
  private static _styles = StyleSheet.create({
    defaultSegmentedControlWrapper: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 8,
      backgroundColor: "#f3f4f6",
    },
    touchableContainer: {
      flex: 1,
      elevation: 9,
      paddingVertical: 12,
    },
    textWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    movingSegmentStyle: {
      top: 0,
      marginVertical: 2,
      marginHorizontal: 2,
      borderRadius: 6,
      backgroundColor: "#FFFFFF",
    },
    defaultBadgeContainerStyle: {
      alignItems: "center",
      justifyContent: "center",
      height: 16,
      width: 16,
      borderRadius: 9999,
      alignContent: "flex-end",
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default SegmentControlComponentStyles.styles;
