import { ANIMATIONS, COLORS, ICONS, THEMES } from "@src/assets";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

import { TwilioVideo, TwilioVideoLocalView, TwilioVideoParticipantView } from "react-native-twilio-video-webrtc";
import styles from "./Styles.AppointmentVideoCallScreen";
import ViewModel from "./ViewModel.AppointmentVideoCallScreen";
import LottieView from "lottie-react-native";
import { useSharedData } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import { EWebsocketMediaStatus } from "../../models/MediaServiceModel";

const AppointmentVideoCallScreen = React.memo(() => {
  const {
    buttonArr,
    videoTracks,
    twilioVideo,
    publishCamera,
    videoCallDetail,
    _onRoomDidConnect,
    _handleFlipCamera,
    _handleCancelCalling,
    _handleDominantVideo,
    _onRoomDidDisconnect,
    _onNetworkLevelChanged,
    _onRoomDidFailToConnect,
    _onDominantSpeakerDidChange,
    _onParticipantAddedVideoTrack,
    _onParticipantRemovedVideoTrack,
  } = ViewModel();

  const { translate } = useSharedData();

  const _renderFooter = React.useCallback(() => {
    const output: JSX.Element[] = [];

    for (const button of buttonArr) {
      output.push(
        <TouchableOpacity key={button.name} onPress={button.function} style={button.style}>
          {button.state ? button.iconOn() : button.iconOff()}
        </TouchableOpacity>,
      );
    }
    return <View style={styles.footerContainer}>{output}</View>;
  }, [buttonArr]);

  const _renderCircleButtonList = React.useCallback(() => {
    const _buttonArr = [...buttonArr];
    _buttonArr.push({
      name: "flipCameraIcon",
      iconOff: ICONS.FlipCameraIcon,
      iconOn: ICONS.FlipCameraIcon,
      state: true,
      style: styles.standardButton,
      function: _handleFlipCamera,
      right: 55,
      bottom: 165,
    });
    _buttonArr.push({
      name: "dominantIcon",
      iconOff: ICONS.DominantCameraIcon,
      iconOn: ICONS.DominantCameraIcon,
      state: true,
      style: styles.standardButton,
      function: _handleDominantVideo,
      right: 0,
      bottom: 180,
    });
    const output: JSX.Element[] = [];

    for (const element of _buttonArr) {
      const button = element;
      output.push(
        <TouchableOpacity
          key={button.name}
          onPress={button.function}
          style={styles.standardButtonAndroidStyle(button.right, button.bottom, button.name) as any}
        >
          {button.state ? button.iconOn() : button.iconOff()}
        </TouchableOpacity>,
      );
    }

    return <View style={styles.buttonWrapper}>{output}</View>;
  }, [_handleDominantVideo, _handleFlipCamera, buttonArr]);

  if (videoCallDetail.status === EWebsocketMediaStatus.calling) {
    return (
      <View style={styles.callingLoadingWrapper}>
        <LottieView style={styles.lottieView} source={ANIMATIONS.calling_loading} autoPlay loop duration={2000} />
        <TouchableOpacity onPress={_handleCancelCalling} style={styles.cancelCallButton}>
          <Text style={THEMES.commonMediumTextStyle(COLORS.white)}>{translate(ELanguageOptions.cancel)}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (Platform.OS === "ios") {
    return (
      <View style={styles.container}>
        <View style={styles.localVideoContainer}>
          <TwilioVideoLocalView enabled={true} style={styles.localVideo} />
          {!publishCamera && <View style={styles.maskLocalVideo} />}
        </View>
        {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
          return (
            <TwilioVideoParticipantView style={styles.remoteVideo} key={trackSid} trackIdentifier={trackIdentifier} />
          );
        })}

        <View style={styles.subButtonContainer}>
          <TouchableOpacity onPress={_handleFlipCamera} style={styles.standardButton}>
            {ICONS.FlipCameraIcon()}
          </TouchableOpacity>

          <TouchableOpacity onPress={_handleDominantVideo} style={styles.standardButton}>
            {ICONS.DominantCameraIcon()}
          </TouchableOpacity>
        </View>

        {_renderFooter()}

        <TwilioVideo
          ref={twilioVideo}
          onRoomDidConnect={_onRoomDidConnect}
          onRoomDidDisconnect={_onRoomDidDisconnect}
          onRoomDidFailToConnect={_onRoomDidFailToConnect}
          onNetworkQualityLevelsChanged={_onNetworkLevelChanged}
          onDominantSpeakerDidChange={_onDominantSpeakerDidChange}
          onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
          onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.localVideoContainer}>
        <TwilioVideoLocalView enabled={true} style={styles.localVideo} />
        {!publishCamera && <View style={styles.maskLocalVideo} />}
      </View>
      {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
        return (
          <TwilioVideoParticipantView style={styles.remoteVideo} key={trackSid} trackIdentifier={trackIdentifier} />
        );
      })}

      {_renderCircleButtonList()}

      <TwilioVideo
        ref={twilioVideo}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={_onRoomDidDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
        onNetworkQualityLevelsChanged={_onNetworkLevelChanged}
        onDominantSpeakerDidChange={_onDominantSpeakerDidChange}
        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
      />
    </View>
  );
});

AppointmentVideoCallScreen.displayName = "AppointmentVideoCallScreen";
export default AppointmentVideoCallScreen;
