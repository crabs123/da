import { COLORS, ICONS } from "@src/assets";
import React from "react";
import { Animated, Text } from "react-native";
import ScaleManager from "@assets/ScaleManager";
import { IAmountLikeMsgProps } from "@src/models/ChatMessagesModel";

export const AmountLikeMsg = React.memo(({ position, likedBy }: IAmountLikeMsgProps) => {
  const ani = React.useRef(new Animated.Value(0)).current;
  const firstLike = React.useRef(likedBy.length || 0);
  React.useEffect(() => {
    if (firstLike.current) {
      return;
    }
    Animated.timing(ani, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [ani, likedBy]);

  const stylePosition: any = React.useMemo(() => {
    const common = {
      position: "absolute",
      zIndex: 1,
      minWidth: ScaleManager.scaleSizeHeight(18),
      padding: ScaleManager.scaleSizeHeight(2),
      backgroundColor: COLORS.lightOneColor,
      borderRadius: ScaleManager.scaleSizeHeight(18),
      borderWidth: ScaleManager.scaleSizeHeight(2),
      borderColor: "white",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      transform: [
        {
          scale: ani.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, ScaleManager.scaleSizeHeight(1.2), 1],
            extrapolate: "clamp",
          }),
        },
        {
          rotate: ani.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["0deg", "-30deg", "0deg"],
            extrapolate: "clamp",
          }),
        },
      ],
    };
    const right = {
      ...common,
      bottom: -8,
      right: 4,
    };
    const left = {
      ...common,
      bottom: -8,
      left: -4,
    };
    return position === "right" ? right : left;
  }, [ani, position]);

  return likedBy.length ? (
    <Animated.View style={stylePosition}>
      {ICONS.ChooseIcon()}
      {likedBy.length > 1 && <Text style={{ fontSize: 10 }}>{likedBy.length}</Text>}
    </Animated.View>
  ) : null;
});

AmountLikeMsg.displayName = "AmountLikeMsg";
