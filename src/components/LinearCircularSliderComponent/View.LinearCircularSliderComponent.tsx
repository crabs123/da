import * as React from "react";
import { PanResponder, PanResponderInstance, View } from "react-native";

import { Circle, Defs, G, LinearGradient, Path, Stop, Svg } from "react-native-svg";
import {
  IAngle,
  ICartesian,
  ILinearCircularProps,
  ILinearCircularState,
  Point,
} from "./Model.LinearCircularSliderComponent";

export const CLOCKWISE = "CW";

export default class LinearCircularSlider extends React.Component<ILinearCircularProps, ILinearCircularState> {
  static defaultProps = {
    arcDirection: "CW",
    backgroundColor: "white",
    btnColor: "yellow",
    btnRadius: 13,
    decimalPlaces: 0,
    endGradient: "#A6FFCB",
    flex: 1,
    maxValue: 360,
    onPressInnerCircle: (value: number) => value,
    onPressOuterCircle: (value: number) => value,
    onValueChange: (value: number) => value,
    sliderRadius: 130,
    sliderWidth: 25,
    startDegree: 0,
    startGradient: "#12D8FA",
    textColor: "white",
    textSize: 50,
    value: 0,
    hideThumb: false,
    disablePress: false,
  };

  panResponder: PanResponderInstance;

  constructor(props: ILinearCircularProps) {
    super(props);
    this.setRef = this.setRef.bind(this);

    this.state = {
      angle: this.relativeToAbsoluteAngle(
        ((this.props.value !== undefined ? this.props.value : 0) * 360) / this.props.maxValue,
      ),
      relativeAngle: ((this.props.value !== undefined ? this.props.value : 0) * 360) / this.props.maxValue,
      xCenter: Number.NEGATIVE_INFINITY,
      yCenter: Number.NEGATIVE_INFINITY,
      origin: { x: 0, y: 0 },
      circleCenter: { x: 0, y: 0 },
      measuredBox: null,
    };

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (_, gs) => {
        const angles = this.getOnPressAngle(gs.moveX, gs.moveY);
        this.setState({ angle: angles.angle, relativeAngle: angles.relativeAngle }, () => {
          this.onValueChanged(this.getCurrentValue());
        });
      },
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps: ILinearCircularProps) {
    if (this.props.value !== nextProps.value) {
      this.setValue(nextProps.value !== undefined ? nextProps.value : 0);
    }
  }

  polarToCartesian = (angle: number): ICartesian => {
    const r = this.props.sliderRadius;
    const hC = this.props.sliderWidth / 2 + this.props.sliderRadius;
    const a = ((angle - 90) * Math.PI) / 180.0;

    const x = hC + r * Math.cos(a);
    const y = hC + r * Math.sin(a);
    return { x, y };
  };

  cartesianToPolar = (x: number, y: number): number => {
    const hC = this.props.sliderWidth / 2 + this.props.sliderRadius;
    if (x === 0) {
      return y > hC ? 0 : 180;
    } else if (y === 0) {
      return x > hC ? 90 : 270;
    } else {
      const part1 = (Math.atan((y - hC) / (x - hC)) * 180) / Math.PI;
      const part2 = x > hC ? 90 : 270;
      return Math.round(part1 + part2);
    }
  };

  handleMeasure = (ox: number, oy: number, width: number, height: number, px: number, py: number): void => {
    const center = (this.props.sliderWidth + this.props.sliderRadius * 2) / 2;
    this.setState(
      {
        xCenter: px + (this.props.sliderRadius + this.props.btnRadius),
        yCenter: py + (this.props.sliderRadius + this.props.btnRadius),
        measuredBox: this.getBoxBounds(),
        circleCenter: { x: center, y: center },
      },
      () => {
        if (this.props.onValueChange) {
          this.props.onValueChange(this.props.startDegree ? this.props.startDegree : 0);
        }
      },
    );
  };

  measureLocation = (): void => {
    (this.setRef as any).measure(this.handleMeasure);
  };

  getOnPressAngle = (x: number, y: number): IAngle => {
    const xOrigin = this.state.xCenter - (this.props.sliderRadius + this.props.btnRadius);
    const yOrigin = this.state.yCenter - (this.props.sliderRadius + this.props.btnRadius);
    const a = this.cartesianToPolar(x - xOrigin, y - yOrigin);
    const relativeAngle = this.getRelativeAngle(a);

    this.setState({ origin: { x: xOrigin, y: yOrigin } });
    return { angle: a, relativeAngle };
  };

  getRelativeAngle = (angle: number): number => {
    const start = this.props.startDegree !== undefined ? this.props.startDegree : 0;
    if (angle < start) {
      return this.props.arcDirection === CLOCKWISE ? (Math.abs(360 - start) + angle) % 360 : start - angle;
    }
    return this.props.arcDirection === CLOCKWISE ? angle - start : (start + (360 - angle)) % 360;
  };

  relativeToAbsoluteAngle = (relativeAngle: number): number => {
    const start = this.props.startDegree !== undefined ? this.props.startDegree : 0;
    const relative = (this.props.arcDirection === CLOCKWISE ? 1 : -1) * relativeAngle;
    return start + (relative % 360);
  };

  getCurrentValue = (): number => {
    return parseFloat(((this.state.relativeAngle / 360) * this.props.maxValue).toFixed(this.props.decimalPlaces));
  };

  setValue = (value: number) => {
    const rel = ((value * 360) / this.props.maxValue) % 360;
    const a = this.relativeToAbsoluteAngle(rel) % 360;
    this.setState({ angle: a, relativeAngle: rel });
  };

  onValueChanged = (value: number): void => {
    if (this.props.onValueChange !== undefined) {
      this.props.onValueChange(value);
    }
  };

  innerCirclePressed = (value: number): void => {
    if (this.props.onPressInnerCircle !== undefined) {
      this.props.onPressInnerCircle(value);
    }
  };

  outerCirclePressed = (value: number): void => {
    if (this.props.onPressOuterCircle !== undefined) {
      this.props.onPressOuterCircle(value);
    }
  };

  getBoxBounds = (): Array<Point> => {
    let degree = 45;
    if (this.props.startDegree) {
      degree += this.props.startDegree;
    }
    const arr = [];
    for (let i = 0; i < 4; i++) {
      arr.push((degree + 90 * i) % 360);
    }
    const pointArray: Array<Point> = [];
    arr.forEach((angle) => {
      const x =
        (this.props.sliderRadius - this.props.sliderWidth / 2) * Math.cos(this.degreeToRadian(angle)) +
        this.state.circleCenter.x;
      const y =
        (this.props.sliderRadius - this.props.sliderWidth / 2) * Math.sin(this.degreeToRadian(angle)) +
        this.state.circleCenter.y;
      const newPoint: Point = {
        angle: this.relativeToAbsoluteAngle(angle),
        x: x,
        y: y,
      };
      pointArray.push(newPoint);
    });
    return pointArray;
  };

  degreeToRadian = (angle: number): number => {
    return angle * 0.0174533;
  };

  radianToDegree = (radian: number): number => {
    return radian * 57.2958;
  };

  setRef(ref: any) {
    this.setRef = ref;
  }

  render() {
    const width = this.props.sliderWidth + this.props.sliderRadius * 2;
    const bR = this.props.btnRadius;
    const dR = this.props.sliderRadius;
    const startCoord = this.polarToCartesian(this.props.startDegree !== undefined ? this.props.startDegree : 0);
    const endCoord = this.polarToCartesian(this.state.angle);

    const radiusX = dR;
    const radiusY = dR;
    const xAxisRotation = 0;
    const largeArc = this.state.relativeAngle >= 180 ? 1 : 0;
    const sweepFlag = this.props.arcDirection === CLOCKWISE ? 1 : 0;

    return (
      <View style={{ flex: this.props.flex ? this.props.flex : 1 }}>
        <Svg onLayout={this.measureLocation} ref={this.setRef} width={width} height={width}>
          <Defs>
            <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={this.props.startGradient} />
              <Stop offset="100%" stopColor={this.props.endGradient} />
            </LinearGradient>
          </Defs>

          <Circle
            r={dR}
            cx={width / 2}
            cy={width / 2}
            stroke={this.props.backgroundColor}
            strokeWidth={this.props.sliderWidth}
            fill="none"
          />

          <Path
            stroke={"url(#gradient1)"}
            strokeWidth={this.props.sliderWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={`M${startCoord.x} ${startCoord.y} A ${radiusX} ${radiusY} ${xAxisRotation} ${largeArc} ${sweepFlag} ${endCoord.x} ${endCoord.y}`}
            onPressIn={(e: any) => {
              const p = e.nativeEvent;
              const angles = this.getOnPressAngle(p.locationX, p.locationY);
              this.setState({ angle: angles.angle, relativeAngle: angles.relativeAngle }, () => {
                const currentValue = this.getCurrentValue();
                this.outerCirclePressed(currentValue);
                this.onValueChanged(currentValue);
              });
            }}
          />

          <Circle
            r={dR + (dR * 25) / 100}
            cx={width / 2}
            cy={width / 2}
            stroke="none"
            fill="none"
            onPressIn={(e: any) => {
              if (!!this.props.disablePress) return;
              const p = e.nativeEvent;
              const angles = this.getOnPressAngle(p.pageX, p.pageY);
              this.setState({ angle: angles.angle, relativeAngle: angles.relativeAngle }, () => {
                const currentValue = this.getCurrentValue();
                this.outerCirclePressed(currentValue);
                this.onValueChanged(currentValue);
              });
            }}
          />

          {!!this.props.hideThumb && (
            <G x={endCoord.x - bR} y={endCoord.y - bR}>
              <Circle r={bR} cx={bR} cy={bR} fill={this.props.btnColor} {...this.panResponder.panHandlers} />
            </G>
          )}
        </Svg>
      </View>
    );
  }
}
