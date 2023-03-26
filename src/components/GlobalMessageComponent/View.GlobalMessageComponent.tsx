import React from "react";
import { styles } from "./Styles.GlobalMessageComponent";
import { Animated, Text, View } from "react-native";
import { EMessageTypes, EObject, IMessageProps, IObject, TShowGlobalMessage } from "./Model.GlobalMessageComponent";
import { COLORS } from "@src/assets";
import useEmitter, { EDeviceEmitter, emitter } from "@src/hooks/useEmitter";
import HelperManager from "@src/helper/HelperManager";
import ICONS from "@src/assets/icons";
import ScaleManager from "@src/assets/ScaleManager";

export const ACTION_DURATION = 500;
export const DEFAULT_MESSAGE_DURATION = 2000;
export const DEFAULT_MESSAGE_VALUE = {
  type: EMessageTypes.success,
  message: "",
  duration: DEFAULT_MESSAGE_DURATION,
  randomId: HelperManager.idGenerator(),
};

export const show: TShowGlobalMessage = (
  message,
  type = EMessageTypes.success,
  duration = DEFAULT_MESSAGE_DURATION,
) => {
  const param = {
    message,
    type,
    duration,
  };
  if (type === EMessageTypes.failed || EMessageTypes.warning) {
    param.duration = 3500;
  }
  emitter(EDeviceEmitter.SHOW_MESSAGE, param);
};

interface IExtendedMessageProps extends IMessageProps {
  randomId: string;
}

const GlobalMessageComponent: React.FC = React.memo(() => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const [messageProps, setMessageProps] = React.useState<IExtendedMessageProps>(DEFAULT_MESSAGE_VALUE);

  const whichData = React.useCallback(
    (type: EObject) => {
      const object: IObject = {
        icon: ICONS.GreenChooseIcon({ stroke: COLORS.successColor }),
        backgroundColor: COLORS.infoColor,
        top: ScaleManager.MESSAGE_MARGIN_TOP - ScaleManager.scaleSizeHeight(20),
        minWidth: ScaleManager.scaleSizeWidth(100),
      };
      switch (messageProps.type) {
        case EMessageTypes.success:
          object.backgroundColor = COLORS.successColor;
          object.icon = ICONS.GreenChooseIcon({ stroke: COLORS.successColor });
          break;

        case EMessageTypes.back:
          object.top = "82%" as any;
          object.icon = null as any;
          object.backgroundColor = COLORS.modalColor;
          object.minWidth = ScaleManager.WIDTH_SCREEN_MINUS_PADDING;
          break;

        case EMessageTypes.failed:
          object.backgroundColor = COLORS.errorColor;
          object.icon = ICONS.ExclamationMarkIcon({ stroke: COLORS.errorColor });
          break;

        default:
          object.icon = ICONS.ExclamationMarkIcon({ stroke: COLORS.successColor });
          break;
      }
      return object[type];
    },
    [messageProps.type],
  );

  const containerStyle = React.useMemo(
    () => ({
      ...styles.container,
      backgroundColor: whichData(EObject.backgroundColor),
      opacity,
      transform: [
        {
          translateY: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [-20, 0],
          }),
        },
      ],
      top: whichData(EObject.top),
      minWidth: whichData(EObject.minWidth),
    }),
    [opacity, whichData],
  );

  const updateMessage = React.useCallback((params: IMessageProps) => {
    setMessageProps({ ...params, randomId: HelperManager.idGenerator() });
  }, []);

  useEmitter(EDeviceEmitter.SHOW_MESSAGE, updateMessage);

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: ACTION_DURATION,
        useNativeDriver: true,
      }),
      Animated.delay(messageProps.duration - ACTION_DURATION),
      Animated.timing(opacity, {
        toValue: 0,
        duration: ACTION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMessageProps(Object.assign({}, { ...DEFAULT_MESSAGE_VALUE, message: "" }));
    });
  }, [opacity, messageProps.message, messageProps.duration, messageProps.randomId]);

  if (HelperManager.checkInvalidity(messageProps.message)) return null;

  return (
    <Animated.View style={containerStyle}>
      <View style={styles.wrapper}>
        {messageProps.type === EMessageTypes.back && null}
        {messageProps.type !== EMessageTypes.back && <View style={styles.iconWrapper}>{whichData(EObject.icon)}</View>}
        <Text style={styles.messageText}>{messageProps.message}</Text>
      </View>
    </Animated.View>
  );
});

GlobalMessageComponent.displayName = "GlobalMessageComponent";
export default GlobalMessageComponent;
