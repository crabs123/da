import { StyleSheet } from "react-native";

class ChatScreenStyles {
  private static _styles = StyleSheet.create({
    timerContainer: {
      justifyContent: "center",
      alignItems: "flex-end",
      flexDirection: "row",
    },
    time: {
      color: "white",
      fontSize: 35,
      fontWeight: "300",
    },
    span: {
      marginLeft: 10,
    },
    text: {
      color: "white",
      fontSize: 15,
      fontWeight: "300",
      marginBottom: 5,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0D0D0D",
    },
    bedtimeText: {
      color: "#ff9800",
      marginLeft: 3,
      fontSize: 16,
    },
    wakeText: {
      color: "#ffcf00",
      marginLeft: 3,
      fontSize: 16,
    },
    timeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    timeHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
    timeValue: {
      color: "white",
      fontSize: 35,
      fontWeight: "300",
    },
    sleepTimeContainer: {
      flex: 1,
      justifyContent: "center",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default ChatScreenStyles.styles;
