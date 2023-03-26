export interface ISliderComponentProps {
  value?: number;
  disabled?: boolean;
  min: number;
  max: number;
  onChange: (value: number) => void;
  onComplete?: (value: number) => void;
  width: number;
  height: number;
  borderRadius?: number;
  maximumTrackTintColor?: string;
  minimumTrackTintColor?: string;
  showBallIndicator?: boolean;
  step?: number;
  ballIndicatorColor?: string;
  ballIndicatorWidth?: number;
  ballIndicatorHeight?: number;
  ballIndicatorPosition?: number;
  ballIndicatorTextColor?: string;
}
