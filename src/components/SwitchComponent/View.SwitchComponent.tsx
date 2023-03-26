import ScaleManager from "@src/assets/ScaleManager";
import React from "react";
import { Pressable, ViewStyle } from "react-native";
import { Animated, I18nManager, Text, View } from "react-native";
import { ISwitchComponentProps } from "./Model.SwitchComponent";
import styles from "./Styles.SwitchComponent";

const SwitchComponent: React.FC<ISwitchComponentProps> = React.memo(
  ({
    isOn = false,
    onColor = "#4cd137",
    offColor = "#ecf0f1",
    labelStyle = {},
    labelPosition = "left",
    thumbOnStyle = {},
    thumbOffStyle = {},
    trackOnStyle = {},
    trackOffStyle = {},
    icon = null,
    onToggle,
    hitSlop,
    disabled = false,
    animationSpeed = 300,
    useNativeDriver = true,
    circleColor = "white",
    label = "",
    ...props
  }) => {
    const dimensions = React.useMemo(() => {
      return {
        width: ScaleManager.scaleSizeWidth(44),
        padding: ScaleManager.scaleSizeWidth(12),
        circleWidth: ScaleManager.scaleSizeWidth(20),
        circleHeight: ScaleManager.scaleSizeWidth(20),
        translateX: ScaleManager.scaleSizeWidth(26),
      };
    }, []);

    const offsetX = React.useRef(new Animated.Value(0)).current;

    const _createSwitchComponentStyle = React.useCallback(
      () =>
        [
          {
            justifyContent: "center",
            width: dimensions.width,
            borderRadius: 20,
            padding: dimensions.padding,
            backgroundColor: isOn ? onColor : offColor,
          },
          isOn ? trackOnStyle : trackOffStyle,
        ] as ViewStyle,
      [dimensions.padding, dimensions.width, isOn, offColor, onColor, trackOffStyle, trackOnStyle],
    );

    const _createInsideCircleStyle = React.useCallback(
      () =>
        [
          {
            alignItems: "center",
            justifyContent: "center",
            margin: 4,
            left: 0,
            position: "absolute",
            backgroundColor: circleColor,
            transform: [{ translateX: offsetX }],
            width: dimensions.circleWidth,
            height: dimensions.circleHeight,
            borderRadius: dimensions.circleWidth / 2,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2.5,
            elevation: 1.5,
          },
          isOn ? thumbOnStyle : thumbOffStyle,
        ] as ViewStyle,
      [circleColor, dimensions, isOn, offsetX, thumbOffStyle, thumbOnStyle],
    );

    let toValue;
    if (!I18nManager.isRTL && isOn) {
      toValue = dimensions.width - dimensions.translateX;
    } else if (I18nManager.isRTL && isOn) {
      toValue = -dimensions.width + dimensions.translateX;
    } else {
      toValue = -1;
    }

    Animated.timing(offsetX, {
      toValue,
      duration: animationSpeed,
      useNativeDriver: useNativeDriver,
    }).start();

    const _handleSwitch = React.useCallback(() => (disabled ? null : onToggle(!isOn)), [disabled, isOn, onToggle]);

    return (
      <View style={styles.container} {...props}>
        {label && labelPosition === "left" ? <Text style={[styles.labelStyle, labelStyle]}>{label}</Text> : null}
        <Pressable style={_createSwitchComponentStyle()} hitSlop={hitSlop} onPress={_handleSwitch}>
          <Animated.View style={_createInsideCircleStyle()}>{icon}</Animated.View>
        </Pressable>
        {label && labelPosition === "right" ? <Text style={[styles.labelStyle, labelStyle]}>{label}</Text> : null}
      </View>
    );
  },
);

SwitchComponent.displayName = "SwitchComponent";
export default SwitchComponent;
