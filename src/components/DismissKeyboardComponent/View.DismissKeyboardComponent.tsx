import React from "react";
import { useKeyboard } from "@src/hooks";
import { IDismissKeyboardComponent } from "./Model.DismissKeyboardComponent";
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { EDeviceEmitter, emitter } from "@src/hooks/useEmitter";

export const dismissKeyboard = () => {
  emitter(EDeviceEmitter.DISMISS_KEYBOARD);
  Keyboard.dismiss();
};

const DismissKeyboardComponent = ({ children }: IDismissKeyboardComponent) => {
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export const KeyboardComponent = () => {
  const { isKeyboardVisible } = useKeyboard();
  if (isKeyboardVisible)
    return (
      <TouchableOpacity
        onPress={dismissKeyboard}
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: isKeyboardVisible ? 999999 : 1,
        }}
      />
    );
  return null;
};

export default React.memo(DismissKeyboardComponent);
