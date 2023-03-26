import React from "react";
import { StatusBar, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./Styles.BackgroundHeaderComponent";
import ScaleManager from "@assets/ScaleManager";
import { COLORS } from "@src/assets";

interface IBackgroundHeaderComponentProps {
  children: React.ReactNode;
}

const BackgroundHeaderComponent: React.FC<IBackgroundHeaderComponentProps> = React.memo(({ children }) => {
  return (
    <View
      style={{
        height: ScaleManager.BACKGROUND_HEADER_HEIGHT,
        width: "100%",
      }}
    >
      <StatusBar barStyle={"light-content"} translucent={true} backgroundColor="transparent" />
      <LinearGradient colors={[COLORS.mainLighterColor, COLORS.mainColor]} style={styles.linearGradient}>
        {children}
      </LinearGradient>
    </View>
  );
});

BackgroundHeaderComponent.displayName = "BackgroundHeaderComponent";
export default BackgroundHeaderComponent;
