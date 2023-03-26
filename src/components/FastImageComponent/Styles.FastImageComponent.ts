import ScaleManager from "@src/assets/ScaleManager";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loadingStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
  },
  lottieView: {
    height: ScaleManager.scaleSizeHeight(100),
    width: ScaleManager.scaleSizeWidth(100),
  },
});
