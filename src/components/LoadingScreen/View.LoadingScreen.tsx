import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { useSelector } from "@src/hooks";
import { ANIMATIONS } from "@src/assets";
import styles from "./Styles.LoadingScreen";

const LoadingScreen: React.FC = React.memo(
  () => {
    const { loading } = useSelector((state) => state.universal);
    if (loading) {
      return (
        <View style={styles.containLoading}>
          <LottieView style={styles.lottieView} source={ANIMATIONS.loading} autoPlay loop duration={2000} />
        </View>
      );
    }

    return null;
  },
  () => true,
);

LoadingScreen.displayName = "LoadingScreen";
export default React.memo(LoadingScreen);
