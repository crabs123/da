import HelperManager from "@src/helper/HelperManager";
import { IMessageAudioProps } from "@src/models/ChatMessagesModel";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Video, { OnLoadData, OnProgressData } from "react-native-video";
import { insets, messageAudioContainerStyle, messageAudioStyle } from "../Styles.ChatRoomScreen";
import DoubleTapMessage from "./DoubleTapMessage";
import { ICONS } from "@src/assets";

const MessageAudio = React.memo(
  ({ messageId, uri, position, onLongPressAudio, onDoubleTap, isLike }: IMessageAudioProps) => {
    const videoRef = React.useRef<Video>();
    const source = React.useMemo(() => ({ uri }), [uri]);
    const [state, setState] = React.useState<{
      duration: number;
      timeLeft: number;
      playing: boolean;
      canPlay: boolean;
    }>({
      duration: 0,
      timeLeft: 0,
      playing: false,
      canPlay: false,
    });
    const ViewCantPlay = React.useMemo(
      () =>
        !state.canPlay ? (
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              backgroundColor: "transparent",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              borderRadius: 12,
            }}
          />
        ) : null,
      [state.canPlay],
    );

    const onLoad = React.useCallback((data: OnLoadData) => {
      setState((prev) => ({ ...prev, timeLeft: data.duration, duration: data.duration, canPlay: true }));
    }, []);

    const onProgress = React.useCallback((data: OnProgressData) => {
      setState((prev) => ({
        ...prev,
        timeLeft: prev.duration - data.currentTime > 0 ? prev.duration - data.currentTime : 0,
        canPlay: true,
      }));
    }, []);

    const onEnd = React.useCallback(() => {
      videoRef.current?.seek(0);
      setState((prev) => ({ ...prev, timeLeft: prev.duration, playing: false }));
    }, []);
    const onError = React.useCallback((error: any) => {
      console.log(error);
    }, []);

    const RenderDuration = React.useMemo(
      () =>
        !state.canPlay ? (
          <ActivityIndicator color="#606060" size={18} />
        ) : (
          <Text style={messageAudioStyle[position]}>{HelperManager.formatMMSS(state.timeLeft)}</Text>
        ),
      [position, state.canPlay, state.timeLeft],
    );

    const playOrPause = React.useCallback(() => {
      setState((prev) => ({ ...prev, playing: !prev.playing }));
    }, []);

    const onLongPress = React.useCallback(() => {
      onLongPressAudio(messageId, isLike)();
    }, [isLike, messageId, onLongPressAudio]);

    const IconPlayMessageChat = React.useMemo(
      () => (
        <TouchableOpacity hitSlop={insets} onPress={playOrPause}>
          {!state.playing ? (
            <React.Fragment>{ICONS.HalfStarIcon({ size: 15 })}</React.Fragment>
          ) : (
            <React.Fragment>{ICONS.FullStarIcon({ size: 15 })}</React.Fragment>
          )}
        </TouchableOpacity>
      ),
      [playOrPause, state.playing],
    );

    const finalStyle = React.useMemo(() => messageAudioContainerStyle[position], [position]);

    return (
      <DoubleTapMessage onLongPress={onLongPress} onDoubleTap={onDoubleTap}>
        <Video
          ref={videoRef as any}
          source={source}
          rate={1}
          volume={1}
          repeat={true}
          playWhenInactive={true}
          playInBackground={true}
          ignoreSilentSwitch={"ignore"}
          resizeMode={"contain"}
          onProgress={onProgress}
          onLoad={onLoad}
          onEnd={onEnd}
          onError={onError}
          maxBitRate={500000}
          paused={!state.playing}
        />
        <View style={finalStyle}>
          {ViewCantPlay}
          {IconPlayMessageChat}
          {RenderDuration}
        </View>
      </DoubleTapMessage>
    );
  },
);

export default MessageAudio;
