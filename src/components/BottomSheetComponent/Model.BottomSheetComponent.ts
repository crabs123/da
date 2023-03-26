import ViewStyle, { Animated } from "react-native";
import React, { ReactNode } from "react";

export interface IBottomTabComponentRef {
  show(): void;
  close(): void;
}

export interface IBottomSheetComponentProps {
  children: React.ReactNode;
  position?: EBottomSheetPosition;
  height?: number;
  swipeArea?: number;
  swipeToClose?: boolean;
  onClosed?: Function;
}

export enum EBottomSheetPosition {
  top = "top",
  center = "center",
  bottom = "bottom",
}

export interface IModalBoxComponentProps {
  isOpen: boolean;
  isDisabled: boolean;
  startOpen: boolean;
  backdropPressToClose: boolean;
  swipeToClose: boolean;
  swipeThreshold: number;
  swipeArea: number;
  position: string;
  entry: string;
  backdrop: boolean;
  backdropOpacity: number;
  backdropColor: string;
  backdropContent: ReactNode;
  animationDuration: number;
  backButtonClose: boolean;
  easing: (value: number) => number;
  coverScreen: boolean;
  keyboardTopOffset: number;
  onClosed(): void;
  onOpened(): void;
  onClosingState: (value: boolean) => void;
  onLayout?: (event: ViewStyle.LayoutChangeEvent) => void;
  style?: any;
  children: React.ReactNode;
}

export interface IModalBoxComponentState {
  position: Animated.Value;
  backdropOpacity: Animated.Value;
  isOpen: boolean;
  isAnimateClose: boolean;
  isAnimateOpen: boolean;
  swipeToClose: boolean;
  height: number;
  width: number;
  containerHeight: number;
  containerWidth: number;
  isInitialized: boolean;
  keyboardOffset: number;
  pan: ViewStyle.PanResponderInstance;
  isAnimateBackdrop?: boolean;
  animBackdrop?: any;
  animOpen?: any;
  positionDest?: number;
  animClose?: any;
}
