import React from "react";
import Sound from "react-native-sound";
import { useDispatch, useEmitter, useSelector, useSharedData } from "@src/hooks";
import MediaActions from "@src/globalState/mediaState/media.actions";
import { EWebsocketMediaEvents, EWebsocketMediaStatus, IVideoCallDetail } from "@src/models/MediaServiceModel";
import { EDeviceEmitter } from "./useEmitter";
import NavigationManager from "../helper/NavigationManager";
import { EAppointmentScreenList, EAppScreenList } from "../models/RouterNamesModel";
Sound.setCategory("Playback");

const useVideoCall = () => {
  const dialingSoundManager = React.useRef<Sound>();
  const { socketIO } = useSharedData();
  const dispatch = useDispatch();
  const videoCallDetail = useSelector((state) => state.media.videoCallDetail);

  const _ring = React.useCallback(() => {
    setTimeout(() => {
      (dialingSoundManager as any).current.setNumberOfLoops(-1);
      (dialingSoundManager as any).current.setSpeakerphoneOn(true);
      (dialingSoundManager as any).current.setVolume(1);
      (dialingSoundManager as any).current.play();
    }, 500);
  }, []);

  const _offRing = React.useCallback(() => {
    (dialingSoundManager as any).current.stop();
  }, []);

  const _handleRejectCalling = React.useCallback(() => {
    _offRing();
    const param: IVideoCallDetail = {
      callerInfo: {
        callerId: "",
        callerName: "",
        callerSocketId: "",
      },
      receiverInfo: {
        receiverId: "",
        receiverSocketId: "",
        receiverName: "",
      },
      roomName: "",
      status: EWebsocketMediaStatus.reject,
    };
    dispatch(MediaActions._setVideoCallDetailsAction(param));

    socketIO.emit(EWebsocketMediaEvents.calling_status, param);
  }, [_offRing, dispatch, socketIO]);

  useEmitter(EDeviceEmitter.CANCEL_CURRENT_CALL, () => {
    _handleRejectCalling();
  });

  useEmitter(EDeviceEmitter.TURN_OFF_SOUND_RINGING, () => {
    _offRing();
  });

  const _handleAnswerCall = React.useCallback(() => {
    const param: IVideoCallDetail = {
      ...videoCallDetail,
      status: EWebsocketMediaStatus.in_call,
    };
    dispatch(MediaActions._setVideoCallDetailsAction(param));

    socketIO.emit(EWebsocketMediaEvents.calling_status, param);
    NavigationManager.navigate(EAppScreenList.CALENDAR_STACK_SCREEN, {
      screen: EAppointmentScreenList.APPOINTMENT_VIDEO_CALL_SCREEN,
    });
  }, [dispatch, socketIO, videoCallDetail]);

  React.useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    dialingSoundManager.current = new Sound(require("../assets/sound/calling_sound.mp3"));
  }, []);

  return {
    _ring,
    _offRing,
    _handleAnswerCall,
    dialingSoundManager,
    _handleRejectCalling,
  };
};

export default useVideoCall;
