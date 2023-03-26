import React from "react";
import { Text, View } from "react-native";
import { COLORS, THEMES } from "@src/assets";
import styles from "./Styles.InternetStatusComponent";
import ViewModel from "./ViewModel.InternetStatusComponent";

const InternetStatusComponent: React.FC = React.memo(
  () => {
    const { isConnected, showBackOnline } = ViewModel();

    return (
      <View style={styles.container}>
        {!isConnected && (
          <View style={styles.subContainer}>
            <Text style={THEMES.commonMediumTextStyle(COLORS.white)}>No connection</Text>
          </View>
        )}
        {showBackOnline && (
          <View style={{ ...styles.subContainer, backgroundColor: COLORS.successColor }}>
            <Text style={THEMES.commonMediumTextStyle(COLORS.white)}>Back to online</Text>
          </View>
        )}
      </View>
    );
  },
  () => true,
);

InternetStatusComponent.displayName = "InternetStatusComponent";
export default InternetStatusComponent;
