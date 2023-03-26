import { useEmitter } from "@src/hooks";
import { EDeviceEmitter } from "@src/hooks/useEmitter";
import React from "react";
import { IViewImage } from "./Model.ViewImageScreen";

const ViewModel = () => {
  const [images, setImages] = React.useState<IViewImage[]>([]);
  const [visible, setIsVisible] = React.useState(false);

  const _handleShowImage = React.useCallback(({ imageList }: { imageList: IViewImage[] }) => {
    setImages([...imageList]);
    setIsVisible(true);
  }, []);

  useEmitter(EDeviceEmitter.SHOW_IMAGES, _handleShowImage);

  const _onRequestClose = React.useCallback(() => {
    setIsVisible(false);
    setImages([]);
  }, []);

  return {
    images,
    visible,
    _onRequestClose,
  };
};

export default ViewModel;
