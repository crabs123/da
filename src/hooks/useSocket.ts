import MediaActions from "@src/globalState/mediaState/media.actions";
import { EWebsocketMediaEvents, IVideoCallDetail } from "@src/models/MediaServiceModel";
import React from "react";
import _socketIO from "socket.io-client";
import useDispatch from "./useDispatch";
const socketIO = _socketIO("ws://35.240.205.226:5000").connect();

const useSocket = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    socketIO.on(EWebsocketMediaEvents.user_status, (input: any) => {
      console.log("📢 [View.UpcomingRoute.tsx:38]", input);
    });

    socketIO.on(EWebsocketMediaEvents.calling_status, (input: IVideoCallDetail) => {
      console.log("📢 [useSocket.ts:16]", input);
      dispatch(MediaActions._setVideoCallDetailsAction(input));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {};
};

export default useSocket;
