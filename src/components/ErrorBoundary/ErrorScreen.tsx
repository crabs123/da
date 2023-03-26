import React from "react";
import styles from "./Styles.ErrorBoundaryComponent";
import ICONS from "@src/assets/icons";
import ScaleManager from "@src/assets/ScaleManager";
import { GestureResponderEvent, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export interface IErrorScreenProps {
  error: Error;
  resetError: (event: GestureResponderEvent) => void;
}

const ErrorScreen: React.FC<IErrorScreenProps> = React.memo(({ error, resetError }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>{ICONS.SurpriseIcon({ size: ScaleManager.scaleSizeWidth(200) })}</View>
      <View style={styles.content}>
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.subtitle}>{"There's an error"}</Text>
        <Text style={styles.note}>{"Developer logger only, kindly report to dev to fix"}</Text>
        <Text style={styles.error}>{error.toString()}</Text>
        <TouchableOpacity style={styles.button} onPress={resetError}>
          <Text style={styles.buttonText}>Try again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

ErrorScreen.displayName = "ErrorScreen";
export default ErrorScreen;
