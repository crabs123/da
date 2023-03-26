import PushNotification, { Importance, PushNotificationScheduleObject } from "react-native-push-notification";
import { Platform } from "react-native";
import { EDeviceEmitter, emitter } from "@src/hooks/useEmitter";
import { INotification } from "@src/models/CommonModel";
import messaging from "@react-native-firebase/messaging";
import DeviceInfo from "react-native-device-info";
import firebase from "@react-native-firebase/app";
class NotificationManager {
  private static NOTIFICATION_CHANEL_ID = "Patient-app";

  public static pushNotificationConfig = () => {
    PushNotification.configure({
      onRegister: function () {
        // console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("📢 [Notification.ts:22]", notification);
      },
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
      },
      onRegistrationError: function (err: any) {
        console.error(err.message, err);
      },
      requestPermissions: Platform.OS === "ios",
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
    });
  };

  public static checkPermissionFCM = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        const getTokenFCM = async () => {
          const defaultMess = firebase.messaging();
          return defaultMess.getToken();
        };
        const getDeviceId = async () => {
          return DeviceInfo.getUniqueId();
        };

        const getDeviceName = async () => {
          return DeviceInfo.getDeviceName();
        };

        const deviceToken = await getTokenFCM();
        const currentDeviceId = await getDeviceId();
        const deviceName = await getDeviceName();

        return {
          deviceName,
          deviceToken,
          currentDeviceId,
        };
      }
    } catch (error) {
      // console.log('📢 [checkPermissionFCM]', error);
    }
  };

  public static pushLocalNotification = (notification: INotification) => {
    emitter(EDeviceEmitter.RING_NOTIFICATION_ICON);

    const param = {
      channelId: NotificationManager.NOTIFICATION_CHANEL_ID,
      allowWhileIdle: true,
      soundName: "default",
      playSound: true,
      title: notification.title,
      message: notification.body,
      visibility: "private",
      priority: "high",
      ignoreInForeground: false,
      vibration: 300,
      onlyAlertOnce: false,
      invokeApp: true,
      vibrate: true,
    } as PushNotificationScheduleObject;
    if (notification.title === "Incoming Call") return;
    console.log("📢 [NotificationManager.ts:52]", param);
    PushNotification.localNotification(param);
  };

  public static createChannelPushNotification = () => {
    PushNotification.createChannel(
      {
        channelId: NotificationManager.NOTIFICATION_CHANEL_ID,
        channelName: NotificationManager.NOTIFICATION_CHANEL_ID,
        playSound: true,
        soundName: "default",
        importance: Importance.HIGH,
        vibrate: true,
      },
      (create) => {
        console.log("📢 [Notification.ts:118]", create);
      },
    );
  };
}

export default NotificationManager;
