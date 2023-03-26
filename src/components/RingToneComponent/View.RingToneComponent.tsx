import { COLORS, THEMES } from "@src/assets";
import { useAuth, useSelector, useSharedData, useVideoCall } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import styles from "./Styles.RingToneComponent";
import { EWebsocketMediaStatus } from "@src/models/MediaServiceModel";

const ACTION_DURATION = 300;

const RingToneComponent = React.memo(() => {
  const { _handleAnswerCall, _offRing, _ring, _handleRejectCalling } = useVideoCall();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const videoCallDetail = useSelector((state) => state.media.videoCallDetail);
  const token = useSelector((state) => state.auth.token.access_token);
  const { userId } = useAuth();
  const { translate } = useSharedData();

  const containerStyle = React.useMemo(
    () => ({
      ...styles.container,
      opacity,
      transform: [
        {
          translateY: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [-20, 0],
          }),
        },
      ],
    }),
    [opacity],
  );

  React.useEffect(() => {
    if (
      videoCallDetail.callerInfo.callerId &&
      !!token &&
      videoCallDetail.callerInfo.callerId !== userId &&
      videoCallDetail.status === EWebsocketMediaStatus.calling
    ) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: ACTION_DURATION,
        useNativeDriver: true,
      }).start(() => {
        _ring();
      });
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: ACTION_DURATION,
        useNativeDriver: true,
      }).start(() => {
        _offRing();
      });
    }
  }, [_offRing, _ring, opacity, token, userId, videoCallDetail.callerInfo.callerId, videoCallDetail.status]);

  if (
    videoCallDetail.status === EWebsocketMediaStatus.cancel ||
    videoCallDetail.status === EWebsocketMediaStatus.away ||
    videoCallDetail.status === EWebsocketMediaStatus.reject ||
    !token
  )
    return null;

  return (
    <Animated.View style={containerStyle}>
      <Text style={styles.callingText}>{videoCallDetail.callerInfo.callerName} is calling you</Text>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={_handleAnswerCall} style={styles.buttonContainerStyle(true)}>
          <Text style={THEMES.commonRegularTextStyle(COLORS.white)}>{translate(ELanguageOptions.answer)}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={_handleRejectCalling} style={styles.buttonContainerStyle(false)}>
          <Text style={THEMES.commonRegularTextStyle(COLORS.white)}>{translate(ELanguageOptions.reject)}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
});

RingToneComponent.displayName = "RingToneComponent";
export default RingToneComponent;
