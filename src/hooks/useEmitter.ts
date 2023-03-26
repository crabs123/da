import React from "react";
import { DeviceEventEmitter } from "react-native";

export enum EDeviceEmitter {
  LOG_OUT = "LOG_OUT",
  SHOW_IMAGES = "SHOW_IMAGES",
  SHOW_MESSAGE = "SHOW_MESSAGE",
  DISMISS_KEYBOARD = "DISMISS_KEYBOARD",
  CANCEL_CURRENT_CALL = "CANCEL_CURRENT_CALL",
  TURN_ON_SOUND_RINGING = "TURN_ON_SOUND_RINGING",
  RING_NOTIFICATION_ICON = "RING_NOTIFICATION_ICON",
  TURN_OFF_SOUND_RINGING = "TURN_OFF_SOUND_RINGING",
}

export const emitter = <T>(type: EDeviceEmitter, param?: T) => {
  DeviceEventEmitter.emit(type, param);
};

const useEmitter = <G>(type: EDeviceEmitter, callback?: (data: G) => void) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const savedCallback = React.useRef((_data: G) => {});
  if (callback) {
    savedCallback.current = callback;
  }

  React.useEffect(() => {
    DeviceEventEmitter.addListener(type, savedCallback.current);
    return () => {
      DeviceEventEmitter.removeAllListeners(type);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback]);
};

export default useEmitter;
