import HelperManager from "@src/helper/HelperManager";
import React from "react";
import useInterval from "./useInterval";

const useInternetSpeed = () => {
  const internetSpeed = React.useRef("");

  useInterval(async () => {
    HelperManager.measureConnectionSpeed().then((networkSpeed) => {
      internetSpeed.current = networkSpeed;
    });
  }, 3000);

  return internetSpeed.current;
};

export default useInternetSpeed;
