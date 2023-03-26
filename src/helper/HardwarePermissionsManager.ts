import {
  check,
  checkMultiple,
  openSettings,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
import { Alert, PermissionsAndroid, Platform } from "react-native";

class HardwarePermissionsManager {
  public static checkPermissionWriteExternalStorage = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        "",
        "The app would like to access the Camera.",
        [
          {
            text: "OK",
            onPress: () => {
              openSettings().catch(() => console.warn("Error opening the setting"));
            },
          },
        ],
        { cancelable: false },
      );
    } catch (err) {
      Alert.alert(
        "Save image",
        "Error: " + (err as any).message,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      );
    }
  };

  private static _checkIosCameraPermission = async (onCancel: any, onResult: any) => {
    const result = await check(PERMISSIONS.IOS.CAMERA);
    if (result === RESULTS.GRANTED) {
      onResult(true);
    } else if (result === RESULTS.DENIED || result === RESULTS.LIMITED) {
      request(PERMISSIONS.IOS.CAMERA).then((requestResult) => {
        if (requestResult !== RESULTS.GRANTED) {
          onCancel();
        } else {
          onResult(requestResult === RESULTS.GRANTED);
        }
      });
    } else if (result === RESULTS.BLOCKED) {
      Alert.alert("", "The app would like to access the Camera.", [
        {
          text: "Cancel",
          onPress: () => {
            onCancel();
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            openSettings().catch(() => console.warn("cannot open settings"));
          },
        },
      ]);
      return false;
    }
  };

  private static _checkAndroidCameraPermission = async (onCancel: any, onResult: any) => {
    const result = await check(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.GRANTED) {
      onResult(true);
    } else {
      request(PERMISSIONS.ANDROID.CAMERA).then((requestResult) => {
        if (requestResult === RESULTS.GRANTED) {
          onResult(true);
        } else {
          Alert.alert("", "The app would like to access the Camera.", [
            {
              text: "Cancel",
              onPress: () => {
                onCancel();
              },
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                openSettings().catch(() => console.warn("cannot open settings"));
              },
            },
          ]);
          return false;
        }
      });
    }
  };

  private static _checkAndRequestIOSCameraPermission = async (mediaType: any) => {
    let permissionsToCheck: any = [];
    if (mediaType === "video") {
      permissionsToCheck = [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE];
    } else if (mediaType === "photo") {
      permissionsToCheck = [PERMISSIONS.IOS.CAMERA];
    }

    const checkResults = await checkMultiple(permissionsToCheck);

    const checkResultsValues = Object.values(checkResults);
    const allGranted = !checkResultsValues?.find((item) => item !== RESULTS.GRANTED);

    if (allGranted) {
      return checkResults;
    }
    const cannotProcess = checkResultsValues?.find((item) => ![RESULTS.GRANTED, RESULTS.DENIED].includes(item as any));

    if (cannotProcess) {
      return checkResults;
    }

    // request permissions
    const permissionsToRequest = [];
    if (checkResults[PERMISSIONS.IOS.CAMERA] === RESULTS.DENIED) {
      permissionsToRequest.push(PERMISSIONS.IOS.CAMERA);
    }

    if (checkResults[PERMISSIONS.IOS.MICROPHONE] === RESULTS.DENIED) {
      permissionsToRequest.push(PERMISSIONS.IOS.MICROPHONE);
    }

    const requestResults = await requestMultiple(permissionsToRequest as any);

    return requestResults;
  };

  public static checkAndRequestAndroidCameraPermissions = async (mediaType: any) => {
    let permissionsToCheck: any = [];
    if (mediaType === "video") {
      permissionsToCheck = [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO];
    } else if (mediaType === "photo") {
      permissionsToCheck = [PERMISSIONS.ANDROID.CAMERA];
    }

    const checkResults = await checkMultiple(permissionsToCheck);

    const checkResultsValues = Object.values(checkResults);
    const allGranted = !checkResultsValues?.find((item) => item !== RESULTS.GRANTED);

    if (allGranted) {
      return checkResults;
    }

    const cannotProcess = checkResultsValues?.find((item) => ![RESULTS.GRANTED, RESULTS.DENIED].includes(item as any));

    if (cannotProcess) {
      return checkResults;
    }

    // request permissions
    const permissionsToRequest = [];
    if (checkResults[PERMISSIONS.ANDROID.CAMERA] === RESULTS.DENIED) {
      permissionsToRequest.push(PERMISSIONS.ANDROID.CAMERA);
    }

    if (checkResults[PERMISSIONS.ANDROID.RECORD_AUDIO] === RESULTS.DENIED) {
      permissionsToRequest.push(PERMISSIONS.ANDROID.RECORD_AUDIO);
    }

    const requestResults = await requestMultiple(permissionsToRequest as any);

    return requestResults;
  };

  public static checkCameraPermission = async ({ onCancel, onResult }: any) => {
    if (Platform.OS === "ios") {
      this._checkIosCameraPermission(onCancel, onResult);
    } else {
      this._checkAndroidCameraPermission(onCancel, onResult);
    }
  };

  public static checkAndRequestCameraPermissions = async (mediaType: any) => {
    if (Platform.OS === "android") {
      return HardwarePermissionsManager.checkAndRequestAndroidCameraPermissions(mediaType);
    } else if (Platform.OS === "ios") {
      return this._checkAndRequestIOSCameraPermission(mediaType);
    } else {
      throw new Error("This platform is not supported");
    }
  };
}

export default HardwarePermissionsManager;
