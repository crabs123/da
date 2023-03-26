import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMediaReducer, TMediaActions } from "./media.model";
import EMediaActionTypes from "./media.types";
import persistReducer from "redux-persist/lib/persistReducer";
import { EWebsocketMediaStatus } from "@src/models/MediaServiceModel";

export const defaultState: IMediaReducer = {
  roomVideoCallId: "",
  videoCallDetail: {
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
    status: EWebsocketMediaStatus.reject,
    roomName: "",
  },
};

const MediaReducer = (state = defaultState, action: TMediaActions) => {
  switch (action.type) {
    case EMediaActionTypes.SET_MEDIA_ROOM: {
      return { ...state, roomVideoCallId: action.payload };
    }

    case EMediaActionTypes.SET_VIDEO_CALL_DETAILS: {
      return {
        ...state,
        videoCallDetail: {
          ...action.payload,
        },
      };
    }

    default:
      return state;
  }
};

const mediaPersistConfig = {
  key: "MediaReducer",
  storage: AsyncStorage,
  whitelist: ["roomVideoCallId", "videoCallDetail"],
};

const PersistedMediaReducer = persistReducer(mediaPersistConfig, MediaReducer);
export default PersistedMediaReducer;
