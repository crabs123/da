import { IVideoCallDetail } from "@src/models/MediaServiceModel";
import EMediaActionTypes from "./media.types";

export interface IMediaReducer {
  roomVideoCallId: string;
  videoCallDetail: IVideoCallDetail;
}

export interface ISetMediaAction {
  type: EMediaActionTypes.SET_MEDIA_ROOM;
  payload: string;
}

export interface ISetVideoCallDetailsAction {
  type: EMediaActionTypes.SET_VIDEO_CALL_DETAILS;
  payload: IVideoCallDetail;
}

export type TMediaActions = ISetMediaAction | ISetVideoCallDetailsAction;
