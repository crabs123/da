import { ICONS } from "@src/assets";
import React from "react";
import { Platform } from "react-native";

import { TwilioVideo } from "react-native-twilio-video-webrtc";
import HardwarePermissionsManager from "@helper/HardwarePermissionsManager";
import NavigationManager from "@src/helper/NavigationManager";
import styles from "./Styles.AppointmentVideoCallScreen";
import { useAuth, useDispatch, useSelector } from "@src/hooks";
import MediaActions from "@src/globalState/mediaState/media.actions";
import { EDeviceEmitter, emitter } from "@src/hooks/useEmitter";
import { EWebsocketMediaStatus } from "@src/models/MediaServiceModel";
import HelperManager from "@src/helper/HelperManager";
import { EAppScreenList } from "@src/models/RouterNamesModel";

const ViewModel = () => {
  const dispatch = useDispatch();
  const [videoTracks, setVideoTracks] = React.useState(new Map());
  const twilioVideo = React.useRef<TwilioVideo>() as React.RefObject<TwilioVideo>;
  const { videoCallDetail } = useSelector((state) => state.media);
  const { userId } = useAuth();

  const _onConnectButtonPress = React.useCallback(async () => {
    if (Platform.OS === "android") {
      await HardwarePermissionsManager.checkAndRequestAndroidCameraPermissions("video");
    }

    emitter(EDeviceEmitter.TURN_OFF_SOUND_RINGING);

    try {
      const videoAccessToken =
        videoCallDetail.callerInfo.callerId === userId
          ? videoCallDetail.callerInfo.callerSocketId
          : videoCallDetail.receiverInfo.receiverSocketId;
      twilioVideo?.current?.connect({
        accessToken: videoAccessToken,
        roomName: videoCallDetail.roomName,
      });

      dispatch(MediaActions._setMediaAction(videoAccessToken));
    } catch (error) {
      console.log("📢 [ViewModel.AppointmentVideoCallScreen.ts:44]", error);
    }
  }, [
    dispatch,
    userId,
    videoCallDetail.callerInfo.callerId,
    videoCallDetail.callerInfo.callerSocketId,
    videoCallDetail.receiverInfo.receiverSocketId,
    videoCallDetail.roomName,
  ]);

  const _onRoomDidConnect = () => {
    console.log("📢 connected");
  };

  const _onRoomDidDisconnect = ({ error }: any) => {
    console.log("📢 [ViewModel.AppointmentVideoCallScreen.ts:54]", error);
  };

  const _onRoomDidFailToConnect = (error: any) => {
    console.log("📢 fail disconnected", error);
  };

  const _onParticipantAddedVideoTrack = ({ participant, track }: any) => {
    console.log("onParticipantAddedVideoTrack: ", participant, track);
    setVideoTracks(
      new Map([...videoTracks, [track.trackSid, { participantSid: participant.sid, videoTrackSid: track.trackSid }]]),
    );
  };

  const [muteParticipant, setMuteParticipant] = React.useState(false);
  const [muteUser, setMuteUser] = React.useState(false);
  const [publishCamera, setPublishCamera] = React.useState(true);
  const [isParticipantDominantCamera, setIsParticipantDominantCamera] = React.useState(true);

  const _handleOpenChat = React.useCallback(() => {}, []);
  const _handleMute = React.useCallback(() => {
    twilioVideo?.current?.setRemoteAudioEnabled(!muteParticipant);
    setMuteParticipant((prev) => {
      return !prev;
    });
  }, [muteParticipant]);

  const _handleCancelCalling = React.useCallback(() => {
    NavigationManager.popToTop();
    emitter(EDeviceEmitter.CANCEL_CURRENT_CALL);
  }, []);

  const _handleHangup = React.useCallback(() => {
    NavigationManager.goBack();

    emitter(EDeviceEmitter.CANCEL_CURRENT_CALL);
    twilioVideo?.current?.disconnect();
  }, []);

  const _handleOffMic = React.useCallback(() => {
    setMuteUser((prev) => !prev);
    if (muteUser) {
      twilioVideo?.current?.unpublishLocalAudio();
      return;
    }
    twilioVideo?.current?.publishLocalAudio();
  }, [muteUser]);

  const _handleNoCamera = React.useCallback(() => {
    setPublishCamera((prev) => !prev);
    if (publishCamera) {
      twilioVideo?.current?.unpublishLocalVideo();
      return;
    }
    twilioVideo?.current?.publishLocalVideo();
  }, [publishCamera]);

  const _handleDominantVideo = React.useCallback(() => {
    setIsParticipantDominantCamera((prev) => !prev);
  }, []);

  const _handleFlipCamera = React.useCallback(() => {
    twilioVideo?.current?.flipCamera();
  }, []);

  const buttonArr = React.useMemo(
    () => [
      {
        name: "chat",
        iconOn: ICONS.ChatV2Icon,
        iconOff: ICONS.ChatV2Icon,
        function: _handleOpenChat,
        state: false,
        style: styles.standardButton,
        right: 0,
        bottom: 0,
      },
      {
        name: "sound",
        iconOn: ICONS.SoundOnIcon,
        iconOff: ICONS.SoundOffIcon,
        function: _handleMute,
        state: muteParticipant,
        style: styles.standardButton,
        right: 55,
        bottom: 15,
      },
      {
        name: "call",
        iconOn: ICONS.CallIcon,
        iconOff: ICONS.CallIcon,
        function: _handleHangup,
        state: false,
        style: styles.callIcon,
        right: 0,
        bottom: 80,
      },
      {
        name: "mic",
        iconOn: ICONS.MiceOnIcon,
        iconOff: ICONS.MiceOffIcon,
        function: _handleOffMic,
        state: muteUser,
        style: styles.standardButton,
        right: 90,
        bottom: 60,
      },
      {
        name: "camera",
        iconOn: ICONS.CameraCaptureIcon,
        iconOff: ICONS.CameraCaptureIcon,
        function: _handleNoCamera,
        state: publishCamera,
        style: styles.standardButton,
        right: 90,
        bottom: 120,
      },
    ],
    [
      _handleHangup,
      _handleMute,
      _handleNoCamera,
      _handleOffMic,
      _handleOpenChat,
      muteParticipant,
      muteUser,
      publishCamera,
    ],
  );

  const _onParticipantRemovedVideoTrack = ({ track }: any) => {
    const newVideoTracks = new Map(videoTracks);
    newVideoTracks.delete(track.trackSid);

    setVideoTracks(newVideoTracks);
  };

  const _onNetworkLevelChanged = ({ participant, isLocalUser, quality }: any) => {
    console.log("Participant", participant, "isLocalUser", isLocalUser, "quality", quality);
  };

  const _onDominantSpeakerDidChange = ({ roomName, roomSid, participant }: any) => {
    console.log(
      "onDominantSpeakerDidChange",
      `roomName: ${roomName}`,
      `roomSid: ${roomSid}`,
      "participant:",
      participant,
    );
  };

  React.useEffect(() => {
    if (
      videoCallDetail.status === EWebsocketMediaStatus.reject &&
      HelperManager.checkInvalidity(videoCallDetail.callerInfo.callerId)
    ) {
      NavigationManager.reset(EAppScreenList.CALENDAR_STACK_SCREEN);
      emitter(EDeviceEmitter.TURN_OFF_SOUND_RINGING);
    }

    if (videoCallDetail.status === EWebsocketMediaStatus.in_call) {
      _onConnectButtonPress();
    }
  }, [videoCallDetail.callerInfo.callerId, videoCallDetail.status, _onConnectButtonPress]);

  return {
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
  };
};

export default ViewModel;
