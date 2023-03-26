export interface ILinearCircularProps {
  arcDirection?: string;
  backgroundColor: string;
  btnColor: string;
  btnRadius: number;
  decimalPlaces?: number;
  endGradient: string;
  flex: number;
  maxValue: number;
  onPressInnerCircle?: (value: number) => void;
  onPressOuterCircle?: (value: number) => void;
  onValueChange?: (value: number) => void;
  sliderRadius: number;
  sliderWidth: number;
  startDegree?: number;
  startGradient: string;
  textColor?: string;
  textSize?: number;
  value?: number;
  hideThumb?: boolean;
  disablePress?: boolean;
}

export interface ICartesian {
  x: number;
  y: number;
}

export interface IAngle {
  angle: number;
  relativeAngle: number;
}

export interface Point {
  angle: number;
  x: number;
  y: number;
}

export interface ILinearCircularState {
  angle: number;
  circleCenter: ICartesian;
  measuredBox: Array<Point> | null;
  origin: ICartesian;
  relativeAngle: number;
  xCenter: number;
  yCenter: number;
}
