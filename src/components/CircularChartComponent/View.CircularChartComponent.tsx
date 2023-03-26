import React from "react";
import { Animated, Easing, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

import { Path, Svg } from "react-native-svg";
import { Square } from "./utils/shape";
import { Arc, ArcParams, ViewBox } from "./utils/svg";
import { LinearInterpolation } from "./utils/math";
import styles from "./Styles.CircularChartComponent";
import { ChartPieceItem, ICircularChartProps } from "./Model.CircularChartComponent";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CircularChartComponent = ({
  data,
  containerWidth,
  containerHeight,
  radius,
  startAngle = -125,
  endAngle = startAngle * -1,
  strokeWidth = 10,
  type = "round",
  animationType = "slide",
  labelWrapperStyle,
  labelValueStyle,
  labelTitleStyle,
  containerStyle,
}: ICircularChartProps) => {
  const donutItemListeners: any = [];
  const viewBox = new ViewBox({
    width: containerWidth,
    height: containerHeight,
  });
  const squareInCircle = new Square({ diameter: radius * 2 });

  const animateOpacity = React.useRef(new Animated.Value(0)).current;
  const animateContainerOpacity = React.useRef(new Animated.Value(0)).current;
  const animatedStrokeWidths = React.useRef(data.map(() => new Animated.Value(strokeWidth))).current;
  const pathRefs = React.useRef<(typeof AnimatedPath)[]>([]);
  const animatedPaths = React.useRef<Array<Animated.Value>>([]).current;

  const [displayValue, setDisplayValue] = React.useState<ChartPieceItem>(data[0]);

  const [rotationPaths, setRotationPath] = React.useState<Array<{ from: number; to: number }>>([]);

  const defaultInterpolateConfig = React.useCallback(
    (): {
      inputRange: [number, number];
      outputRange: [number, number];
    } => ({ inputRange: [0, 100], outputRange: [startAngle, endAngle] }),
    [endAngle, startAngle],
  );

  const sumFnc = React.useCallback((arrays: Array<number>): number => {
    if (arrays.length == 0) {
      return 0;
    }
    return arrays.reduce((total, prev) => (total += prev));
  }, []);

  const sumOfDonutItemValue = React.useMemo(
    (): number => data.map((d) => d.value).reduce((total: number, prev: number) => total + prev),
    [data],
  );

  const donutItemValueToPercentage = React.useMemo(
    () => data.map((d) => (d.value / sumOfDonutItemValue) * 100),
    [sumOfDonutItemValue, data],
  );

  React.useMemo(() => {
    const rotationRange: Array<{ from: number; to: number }> = [];

    data.forEach((_, idx) => {
      const fromValues = sumFnc(donutItemValueToPercentage.slice(0, idx));
      const toValues = sumFnc(donutItemValueToPercentage.slice(0, idx + 1));

      animatedPaths.push(
        new Animated.Value(
          LinearInterpolation({
            value: fromValues,
            ...defaultInterpolateConfig(),
          }),
        ),
      );

      rotationRange[idx] = {
        from: LinearInterpolation({
          value: fromValues,
          ...defaultInterpolateConfig(),
        }),
        to: LinearInterpolation({
          value: toValues,
          ...defaultInterpolateConfig(),
        }),
      };
    });

    setRotationPath(rotationRange);
  }, [animatedPaths, data, defaultInterpolateConfig, donutItemValueToPercentage, sumFnc]);

  const slideAnimation = () => {
    const animations: Animated.CompositeAnimation[] = data.map((_, i) => {
      const ani = Animated.timing(animatedPaths[i], {
        toValue: rotationPaths[i].to,
        duration: 3000,
        easing: Easing.bezier(0.075, 0.82, 0.165, 1),
        useNativeDriver: true,
      });

      return ani;
    });
    Animated.parallel(animations).start();
  };

  const fadeAnimation = () => {
    Animated.timing(animateContainerOpacity, {
      toValue: 1,
      duration: 5000,
      easing: Easing.bezier(0.075, 0.82, 0.165, 1),
      useNativeDriver: true,
    }).start();
  };

  const addListener = ({
    element,
    animatedValue,
    startValue,
  }: {
    element: any;
    animatedValue: Animated.Value;
    startValue: number;
  }) => {
    animatedValue.addListener((angle) => {
      const arcParams: ArcParams = {
        coordX: viewBox.getCenterCoord().x,
        coordY: viewBox.getCenterCoord().y,
        radius: radius,
        startAngle: startValue,
        endAngle: angle.value,
      };
      const drawPath = new Arc(arcParams).getDrawPath();

      if (element) {
        element.setNativeProps({ d: drawPath });
      }
    });
  };

  const onUpdateDisplayValue = (value: ChartPieceItem) => {
    setDisplayValue(value);
    animateOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(animateOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const _onPressIn = (value: ChartPieceItem, index: number) => {
    Animated.timing(animatedStrokeWidths[index], {
      toValue: strokeWidth + 2,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.bezier(0.075, 0.82, 0.165, 1),
    }).start();
  };

  const _onPressOut = (index: number) => {
    Animated.timing(animatedStrokeWidths[index], {
      toValue: strokeWidth,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.bezier(0.075, 0.82, 0.165, 1),
    }).start();
  };

  const _getContainerStyle = (): StyleProp<ViewStyle> => [
    styles.defaultContainer,
    containerStyle,
    { width: containerWidth, height: containerHeight },
  ];

  const _getLabelValueStyle = (color: string): StyleProp<TextStyle> => [
    styles.defaultLabelValue,
    { color },
    labelValueStyle,
  ];

  const _getLabelTitleStyle = (color: string): StyleProp<TextStyle> => [
    styles.defaultLabelTitle,
    { color },
    labelTitleStyle,
  ];

  const _getLabelWrapperStyle = (): Animated.WithAnimatedArray<any> => [
    styles.defaultLabelWrapper,
    {
      width: squareInCircle.getCorner() - strokeWidth,
      height: squareInCircle.getCorner() - strokeWidth,
      opacity: animateOpacity,
    },
    labelWrapperStyle,
  ];

  React.useEffect(() => {
    if (animationType === "slide") {
      animateContainerOpacity.setValue(1);
      slideAnimation();
    } else {
      fadeAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    data.forEach((_, i) => {
      const element = pathRefs.current[i];
      donutItemListeners[i] = addListener({
        element,
        animatedValue: animatedPaths[i],
        startValue: rotationPaths[i].from,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    return () => {
      if (animationType === "slide") {
        data.forEach((_, i) => {
          if (donutItemListeners?.[i] && donutItemListeners?.[i].removeAllListeners) {
            donutItemListeners?.[i].removeAllListeners?.();
          }
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    animateOpacity.setValue(0);
    Animated.timing(animateOpacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.bezier(0.075, 0.82, 0.165, 1),
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <View style={_getContainerStyle()}>
        <Svg width={viewBox.width} height={viewBox.height}>
          {rotationPaths.map((d, i) => {
            const arcParams: ArcParams = {
              coordX: viewBox.getCenterCoord().x,
              coordY: viewBox.getCenterCoord().y,
              radius: radius,
              startAngle: d.from,
              endAngle: d.to,
            };
            const drawPath = new Arc(arcParams).getDrawPath();

            return (
              <AnimatedPath
                key={`item-${i}}`}
                ref={(el: any) => (pathRefs.current[i] = el)}
                onPress={() => onUpdateDisplayValue(data[i])}
                onPressIn={() => _onPressIn(data[i], i)}
                onPressOut={() => _onPressOut(i)}
                strokeLinecap={type}
                d={drawPath}
                opacity={animateContainerOpacity}
                fill="none"
                stroke={data[i].color}
                strokeWidth={animatedStrokeWidths[i]}
              />
            );
          })}
        </Svg>
        <Animated.View style={_getLabelWrapperStyle()}>
          <Text style={_getLabelValueStyle(displayValue?.color)}>{displayValue?.value}</Text>
          <Text style={_getLabelTitleStyle(displayValue?.color)}>{displayValue?.name}</Text>
        </Animated.View>
      </View>
    </React.Fragment>
  );
};

export default CircularChartComponent;
