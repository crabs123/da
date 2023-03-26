import React from "react";
import { styles } from "./Styles.FastImageComponent";
import { ActivityIndicator, Animated } from "react-native";
import FastImage from "react-native-fast-image";
import { COLORS } from "@src/assets";
import { IFastImageComponentProps } from "./Model.FastImageComponent";

const FastImageComponent: React.FC<IFastImageComponentProps> = ({ children, uri, pictureStyle, loadingStyleProps }) => {
  const opacity = React.useRef(new Animated.Value(1)).current;

  const loadingStyle = React.useMemo(
    () => ({
      ...styles.loadingStyle,
      ...loadingStyleProps,
      opacity,
    }),
    [opacity, loadingStyleProps],
  );

  const _handleFinishLoading = React.useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <FastImage source={{ uri }} style={pictureStyle} onLoadEnd={_handleFinishLoading}>
      {children}
      <Animated.View style={loadingStyle}>
        <ActivityIndicator size={"small"} color={COLORS.primaryOrange} />
      </Animated.View>
    </FastImage>
  );
};

export default React.memo(FastImageComponent);
