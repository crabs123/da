import { COLORS, THEMES } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";
import { Platform, StyleSheet } from "react-native";

class AppointmentVideoCallScreenStyles {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
    },
    lottieView: {
      flex: 1,
    },
    callingLoadingWrapper: {
      flex: 1,
      backgroundColor: "black",
    },
    cancelCallButton: {
      ...THEMES.commonButton,
      position: "absolute",
      bottom: ScaleManager.PADDING_SIZE,
      backgroundColor: COLORS.errorColor,
    },
    maskLocalVideo: {
      flex: 1,
      backgroundColor: COLORS.darkOneColor,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    localVideoContainer: {
      ...Platform.select({
        ios: {
          top: ScaleManager.scaleSizeHeight(80),
          right: ScaleManager.PADDING_SIZE,
          width: ScaleManager.scaleSizeHeight(100),
          height: ScaleManager.scaleSizeHeight(150),
          borderRadius: ScaleManager.scaleSizeHeight(10),
          overflow: "hidden",
          position: "absolute",
          zIndex: 111,
        },
        android: {
          left: ScaleManager.PADDING_SIZE / 2,
          bottom: ScaleManager.PADDING_SIZE / 2,
          height: (ScaleManager.WINDOW_HEIGHT * 1) / 3 - ScaleManager.PADDING_SIZE,
          aspectRatio: 1,
          overflow: "hidden",
          position: "absolute",
          zIndex: 111,
          borderRadius: ScaleManager.scaleSizeHeight(10),
        },
      }),
    },
    localVideo: {
      borderRadius: ScaleManager.scaleSizeHeight(10),
      ...Platform.select({
        ios: {
          width: ScaleManager.scaleSizeHeight(100),
          height: ScaleManager.scaleSizeHeight(150),
        },
        android: {
          left: 0,
          bottom: 0,
          height: (ScaleManager.WINDOW_HEIGHT * 1) / 3,
          aspectRatio: 1,
        },
      }),
    },
    participantVideoContainer: {
      flex: 1,
      position: "absolute",
      zIndex: 1000,
    },
    remoteVideoContainer: {
      width: ScaleManager.WINDOW_WIDTH,
      height: (ScaleManager.WINDOW_HEIGHT * 2) / 3,
      overflow: "hidden",
      position: "absolute",
      top: 0,
      left: 0,
    },
    remoteVideo: {
      ...Platform.select({
        android: {
          width: ScaleManager.WINDOW_WIDTH,
          height: (ScaleManager.WINDOW_HEIGHT * 2) / 3,
          borderRadius: ScaleManager.scaleSizeHeight(10),
          position: "absolute",
          top: 0,
          left: 0,
        },
        ios: {
          flex: 1,
        },
      }),
    },
    footerContainer: {
      height: ScaleManager.scaleSizeHeight(80),
      flexDirection: "row",
      position: "absolute",
      bottom: ScaleManager.scaleSizeHeight(50),
      width: "100%",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    standardButton: {
      height: ScaleManager.scaleSizeHeight(50),
      aspectRatio: 1,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#336CFB",
    },
    callIcon: {
      height: ScaleManager.scaleSizeHeight(75),
      aspectRatio: 1,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.danger,
    },
    subButtonContainer: {
      bottom: ScaleManager.scaleSizeHeight(300),
      right: ScaleManager.PADDING_SIZE,
      position: "absolute",
      justifyContent: "space-evenly",
      width: ScaleManager.scaleSizeWidth(120),
      flexDirection: "row",
    },
    flipCamera: {
      height: ScaleManager.scaleSizeHeight(50),
      aspectRatio: 1,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#336CFB",
    },
    baseButton: {
      height: ScaleManager.scaleSizeHeight(50),
      aspectRatio: 1,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#336CFB",
      position: "absolute",
    },
    buttonWrapper: {
      position: "absolute",
      bottom: 0,
      right: 0,
    },
  });

  public static styles = {
    ...this._styles,
    standardButtonAndroidStyle: (right: number, bottom: number, name: string) => {
      if (name === "call") {
        return {
          ...this._styles.callIcon,
          position: "absolute",
          right,
          bottom,
        };
      }
      return {
        ...this._styles.standardButton,
        position: "absolute",
        right,
        bottom,
      };
    },
  };
}

export default AppointmentVideoCallScreenStyles.styles;
