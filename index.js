/**
 * @format
 */

import { AppRegistry, DeviceEventEmitter, Platform, Text } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import FONTS from "@src/assets/fonts";
import { COLORS } from "@src/assets";
import Orientation from "react-native-orientation-locker";

if (!Text.defaultProps) {
  Text.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.style = { fontFamily: FONTS.interRegular, color: COLORS.defaultTextColor };
import NotificationManager from "@src/helper/NotificationManager";
import messaging from "@react-native-firebase/messaging";
import IncomingCall from "react-native-incoming-call";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("📢 [index.js:22]", remoteMessage);
  const username = remoteMessage.notification.body.split(" ")[0];
  const avatar = remoteMessage.notification.body.split(" ")[1];
  if (Platform.OS === "android") {
    IncomingCall.display(
      remoteMessage.messageId,
      "Dr. " + username,
      avatar ??
        "https://img.freepik.com/free-photo/smiling-pretty-doctor-standing-hospital-office-with-paper-folder_1098-18884.jpg?w=2000&t=st=1676797270~exp=1676797870~hmac=3022b588043c6a78c81af26cdb5724f6d4c0c50d850e5fbda9fcb0c59934b3ce",
      `Dr. ${username} is calling`,
      20000,
    );
  }
  DeviceEventEmitter.addListener("endCall", () => {
    console.log("📢 [index.js:37]", "end call");
    // End call action here
  });
  DeviceEventEmitter.addListener("answerCall", () => {
    IncomingCall.openAppFromHeadlessMode(remoteMessage.notification.body);
  });
});

Orientation.lockToPortrait();
NotificationManager.pushNotificationConfig();
AppRegistry.registerComponent(appName, () => App);
