import { IVideoCallDetail } from "@src/models/MediaServiceModel";
import MediaActionTypes from "./media.types";

class MediaActions {
  public static _setMediaAction(input: string) {
    return { type: MediaActionTypes.SET_MEDIA_ROOM, payload: input };
  }

  public static _setVideoCallDetailsAction(input: IVideoCallDetail) {
    return { type: MediaActionTypes.SET_VIDEO_CALL_DETAILS, payload: input };
  }
}

export default MediaActions;
