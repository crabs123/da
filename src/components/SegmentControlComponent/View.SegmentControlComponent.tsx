import React from "react";
import { Animated, Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Dimensions, PixelRatio } from "react-native";
import { SegmentedControlProps } from "./Model.SegmentControlComponent";
import styles from "./Styles.SegmentControlComponent";

const screenWidth = Dimensions.get("window").width;

const widthPercentageToDP = (widthPercent: string | number) => {
  const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const defaultShadowStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowOpacity: 0.025,
  shadowRadius: 1,

  elevation: 1,
};

const SegmentedControlComponent: React.FC<SegmentedControlProps> = ({
  segments,
  currentIndex,
  onChange,
  badgeValues = [],
  isRTL = false,
  containerMargin = 0,
  activeTextStyle,
  inactiveTextStyle,
  segmentedControlWrapper,
  pressableWrapper,
  tileStyle,
  activeBadgeStyle,
  inactiveBadgeStyle,
  badgeTextStyle,
}: SegmentedControlProps) => {
  const width = widthPercentageToDP("100%") - containerMargin * 2;
  const translateValue = width / segments.length;
  const tabTranslateValue = React.useRef(new Animated.Value(0)).current;

  const memoizedTabPressCallback = React.useCallback(
    (index: number) => {
      onChange(index);
    },
    [onChange],
  );

  React.useEffect(() => {
    const transitionMultiplier = isRTL ? -1 : 1;

    Animated.spring(tabTranslateValue, {
      toValue: currentIndex * (translateValue * transitionMultiplier),
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const finalizedActiveTextStyle: TextStyle = {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    color: "#111827",
    ...activeTextStyle,
  };

  const finalizedInActiveTextStyle: TextStyle = {
    fontSize: 15,
    textAlign: "center",
    color: "#4b5563",
    ...inactiveTextStyle,
  };

  const finalizedActiveBadgeStyle: ViewStyle = {
    backgroundColor: "#27272a",
    marginLeft: 4,
    alignItems: "center",
    justifyContent: "center",
    ...activeBadgeStyle,
  };

  const finalizedInActiveBadgeStyle: ViewStyle = {
    backgroundColor: "#6b7280",
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
    ...inactiveBadgeStyle,
  };

  const finalizedBadgeTextStyle: TextStyle = {
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFFFFF",
    ...badgeTextStyle,
  };

  return (
    <Animated.View style={[styles.defaultSegmentedControlWrapper, segmentedControlWrapper]}>
      <Animated.View
        style={[
          styles.movingSegmentStyle,
          defaultShadowStyle,
          tileStyle,
          StyleSheet.absoluteFill,
          {
            width: width / segments.length - 4,
            transform: [{ translateX: tabTranslateValue }],
          },
        ]}
      />
      {segments.map((segment, index) => {
        return (
          <Pressable
            onPress={() => memoizedTabPressCallback(index)}
            key={index}
            style={[styles.touchableContainer, pressableWrapper]}
          >
            <View style={styles.textWrapper}>
              <Text style={[currentIndex === index ? finalizedActiveTextStyle : finalizedInActiveTextStyle]}>
                {segment}
              </Text>
              {badgeValues[index] && (
                <View
                  style={[
                    styles.defaultBadgeContainerStyle,
                    currentIndex === index ? finalizedActiveBadgeStyle : finalizedInActiveBadgeStyle,
                  ]}
                >
                  <Text style={finalizedBadgeTextStyle}>{badgeValues[index]}</Text>
                </View>
              )}
            </View>
          </Pressable>
        );
      })}
    </Animated.View>
  );
};

export default SegmentedControlComponent;
