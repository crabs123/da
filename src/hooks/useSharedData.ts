import useColorScheme from "./useColorTheme";
import useTranslate from "./useTranslate";
import _socketIO from "socket.io-client";
const socketIO = _socketIO("ws://35.240.205.226:5000").connect();

const useSharedData = () => {
  const translate = useTranslate();
  const colorUpdate = useColorScheme();
  return {
    socketIO,
    translate,
    colorUpdate,
  };
};

export default useSharedData;
