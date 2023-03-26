import { StyleSheet, ViewStyle } from "react-native";
import ScaleManager from "@src/assets/ScaleManager";
import { COLORS } from "@src/assets";
import FONTS from "@src/assets/fonts";
export const insets = { top: 20, bottom: 20, left: 20, right: 20 };

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  messagesContainerStyle: {},
  rowFlexEnd: { flexDirection: "row", alignItems: "flex-end", position: "relative" },
  messageImageContainerStyle: {
    backgroundColor: "white",
    borderColor: COLORS.backgroundColor,
    borderRadius: ScaleManager.scaleSizeHeight(12),
  },
  inputToolbarContainerStyle: {
    backgroundColor: "transparent",
    paddingHorizontal: ScaleManager.scaleSizeHeight(24),
    height: ScaleManager.scaleSizeHeight(80),
    borderTopWidth: 0,
  },
  inputToolbarPrimaryStyle: {
    backgroundColor: "white",
    borderRadius: ScaleManager.scaleSizeHeight(20),
    borderColor: COLORS.lightOneColor,
    borderWidth: ScaleManager.scaleSizeHeight(1),
    minHeight: ScaleManager.scaleSizeHeight(80 - 12 - 20),
    maxHeight: ScaleManager.scaleSizeHeight(80),
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
    paddingLeft: 10,
  },
  containerRenderSend: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // height: ScaleManager.scaleSizeHeight(80 - 12 - 20),
  },
  containerCameraAction: {
    height: ScaleManager.scaleSizeHeight(80 - 12 - 20 - 6),
    width: ScaleManager.scaleSizeHeight(80 - 12 - 20 - 6),
    backgroundColor: "#2ab9f4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ScaleManager.scaleSizeHeight(23),
    marginLeft: ScaleManager.scaleSizeHeight(3),
  },
  sendContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: ScaleManager.scaleSizeHeight(10),
  },
  composerTextInputStyle: {
    color: "#606060",
    height: ScaleManager.scaleSizeHeight(80 - 12 - 20),
    // textAlignVertical: "center",
    fontSize: ScaleManager.scaleSizeHeight(13),
    // lineHeight: ScaleManager.scaleSizeHeight(80 - 12 - 20) / 2,
  },
  containerVideoMessage: {
    position: "relative",
    width: ScaleManager.scaleSizeHeight(120),
    height: ScaleManager.scaleSizeHeight(160),
    borderRadius: ScaleManager.scaleSizeHeight(6),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  viewPlayVideoIcon: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    elevation: 2,
  },
  containerAcceptMessage: {
    backgroundColor: "#fbfbfb",
    height: ScaleManager.scaleSizeHeight(60 + 60 + 18 * 4),
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    width: "100%",
  },
  containerViewBlockMe: {
    backgroundColor: "#fbfbfb",
    height: ScaleManager.scaleSizeHeight(80),
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    width: "100%",
  },
  viewNoticeAccept: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: ScaleManager.scaleSizeHeight(36),
    borderTopWidth: ScaleManager.scaleSizeHeight(0.5),
    borderTopColor: "#e5e5e5",
  },
  headerNotice: {
    color: COLORS.darkTwoColor,
    fontSize: ScaleManager.scaleSizeHeight(16),
    lineHeight: ScaleManager.scaleSizeHeight(60),
    height: ScaleManager.scaleSizeHeight(60),
    textAlign: "center",
  },
  msgNotice: {
    color: "#8b8a8a",
    fontSize: ScaleManager.scaleSizeHeight(11),
    lineHeight: ScaleManager.scaleSizeHeight(18),
    height: ScaleManager.scaleSizeHeight(18 * 4),
    textAlign: "center",
  },
  headerNoticeBlock: {
    color: COLORS.darkTwoColor,
    fontSize: ScaleManager.scaleSizeHeight(16),
    lineHeight: ScaleManager.scaleSizeHeight(60),
    height: ScaleManager.scaleSizeHeight(48),
    textAlign: "center",
  },
  msgNoticeBlock: {
    color: "#8b8a8a",
    fontSize: ScaleManager.scaleSizeHeight(11),
    lineHeight: ScaleManager.scaleSizeHeight(18),
    height: ScaleManager.scaleSizeHeight(18),
    textAlign: "center",
  },
  wrapperBtnAccept: { flexDirection: "row", height: ScaleManager.scaleSizeHeight(60) },
  viewBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: ScaleManager.scaleSizeHeight(0.25),
    borderColor: "#e5e5e5",
  },
  textRed: { color: COLORS.errorColor, fontSize: ScaleManager.scaleSizeHeight(13), fontFamily: FONTS.interSemiBold },
  textDark: { color: COLORS.darkTwoColor, fontSize: ScaleManager.scaleSizeHeight(13), fontFamily: FONTS.interSemiBold },
  tickPending: {
    width: ScaleManager.scaleSizeHeight(10),
    height: ScaleManager.scaleSizeHeight(10),
    borderRadius: ScaleManager.scaleSizeHeight(10),
    borderColor: COLORS.backgroundColor,
    borderWidth: 1,
  },
  hiddenTick: {
    opacity: 0,
  },
  wrapperSeenUser: {
    height: ScaleManager.scaleSizeHeight(15),
    flexDirection: "row",
  },
  avtSeenUser: {
    width: ScaleManager.scaleSizeHeight(15),
    height: ScaleManager.scaleSizeHeight(15),
    borderRadius: ScaleManager.scaleSizeHeight(15),
    margin: ScaleManager.scaleSizeHeight(3),
  },
});

export const timeTextStyle = {
  left: {
    fontSize: ScaleManager.scaleSizeHeight(12),
    lineHeight: ScaleManager.scaleSizeHeight(14),
    color: COLORS.darkThreeColor,
  },
  right: {
    fontSize: ScaleManager.scaleSizeHeight(12),
    lineHeight: ScaleManager.scaleSizeHeight(14),
    color: COLORS.darkThreeColor,
  },
};

export const messageTextStyle = {
  left: {
    color: "#606060",
    fontSize: ScaleManager.scaleSizeHeight(13),
  },
  right: {
    color: "#606060",
    fontSize: ScaleManager.scaleSizeHeight(13),
  },
};

export const messageTextContainerStyle = {
  left: {
    backgroundColor: "white",
    borderWidth: ScaleManager.scaleSizeHeight(0.5),
    borderColor: COLORS.backgroundColor,
    paddingVertical: ScaleManager.scaleSizeHeight(4),
    paddingHorizontal: ScaleManager.scaleSizeHeight(12),
  },
  right: {
    backgroundColor: "#efefef",
    paddingVertical: ScaleManager.scaleSizeHeight(4),
    paddingHorizontal: ScaleManager.scaleSizeHeight(12),
  },
};

export const messageAudioStyle = {
  left: {
    color: "#606060",
    fontSize: ScaleManager.scaleSizeHeight(13),
  },
  right: {
    color: "#606060",
    fontSize: ScaleManager.scaleSizeHeight(13),
  },
};

export const messageAudioContainerStyle: { left: ViewStyle; right: ViewStyle } = {
  left: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: ScaleManager.scaleSizeHeight(120),
    borderWidth: ScaleManager.scaleSizeHeight(0.5),
    borderColor: COLORS.backgroundColor,
    borderRadius: ScaleManager.scaleSizeHeight(12),
    paddingHorizontal: ScaleManager.scaleSizeHeight(12),
    paddingVertical: ScaleManager.scaleSizeHeight(8),
  },
  right: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: ScaleManager.scaleSizeHeight(120),
    borderRadius: ScaleManager.scaleSizeHeight(12),
    backgroundColor: "#efefef",
    paddingHorizontal: ScaleManager.scaleSizeHeight(12),
    paddingVertical: ScaleManager.scaleSizeHeight(8),
  },
};
