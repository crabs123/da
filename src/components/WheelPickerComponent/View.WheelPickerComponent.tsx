import React from "react";
import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { IWheelPickerComponentProps } from "./Model.WheelPickerComponent";
import styles from "./Styles.WheelPickerComponent";
import WheelPickerItem from "./WheelPickerItem";

const WheelPickerComponent: React.FC<IWheelPickerComponentProps> = ({
  selectedIndex,
  options,
  onChange,
  selectedIndicatorStyle = {},
  containerStyle = {},
  itemStyle = {},
  itemTextStyle = {},
  itemHeight = 40,
  rotationFunction = (x: number) => 1 - Math.pow(1 / 2, x),
  opacityFunction = (x: number) => Math.pow(1 / 3, x),
  visibleRest = 2,
  decelerationRate = "fast",
  containerProps = {},
  flatListProps = {},
  keyProps = "",
}) => {
  const flatListRef = React.useRef<FlatList>(null);
  const [scrollY] = React.useState(new Animated.Value(0));

  const containerHeight = (1 + visibleRest * 2) * itemHeight;
  const paddedOptions = React.useMemo(() => {
    const array: (string | null)[] = [...options];
    for (let i = 0; i < visibleRest; i++) {
      array.unshift(null);
      array.push(null);
    }
    return array;
  }, [options, visibleRest]);

  const offsets = React.useMemo(
    () => [...Array(paddedOptions.length)].map((x, i) => i * itemHeight),
    [paddedOptions, itemHeight],
  );

  const currentScrollIndex = React.useMemo(
    () => Animated.add(Animated.divide(scrollY, itemHeight), visibleRest),
    [visibleRest, scrollY, itemHeight],
  );

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    let index = Math.floor(Math.floor(offsetY) / itemHeight);
    const last = Math.floor(offsetY % itemHeight);
    if (last > itemHeight / 2) index++;

    if (index !== selectedIndex) {
      onChange(index);
    }
  };

  React.useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: selectedIndex,
      animated: false,
    });
  }, [selectedIndex]);

  return (
    <View style={[styles.container, { height: containerHeight }, containerStyle]} {...containerProps}>
      <View
        style={[
          styles.selectedIndicator,
          selectedIndicatorStyle,
          {
            transform: [{ translateY: -itemHeight / 2 }],
            height: itemHeight,
          },
        ]}
      />
      <Animated.FlatList<string | null>
        {...flatListProps}
        ref={flatListRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToOffsets={offsets}
        decelerationRate={decelerationRate}
        initialScrollIndex={selectedIndex}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        data={paddedOptions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: option, index }) => (
          <WheelPickerItem
            key={`${index}-${keyProps}`}
            index={index}
            option={option}
            style={itemStyle}
            textStyle={itemTextStyle}
            height={itemHeight}
            currentScrollIndex={currentScrollIndex}
            rotationFunction={rotationFunction}
            opacityFunction={opacityFunction}
            visibleRest={visibleRest}
          />
        )}
      />
    </View>
  );
};

export default React.memo(WheelPickerComponent);
