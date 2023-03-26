import { ICONS } from "@src/assets";
import { useSharedData } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./Styles.SuccessScreen";
import { ISuccessScreenProps } from "./Model.SuccessScreen";
import NavigationManager from "@src/helper/NavigationManager";
import { BackgroundHeaderComponent } from "@src/components";

const SuccessScreen: React.FC<ISuccessScreenProps> = React.memo(
  (props) => {
    const { translate } = useSharedData();
    return (
      <View style={styles.container}>
        <BackgroundHeaderComponent>
          <View />
        </BackgroundHeaderComponent>
        <View style={styles.bodyContainer}>
          <View style={styles.iconWrapper}>{ICONS.SuccessIcon()}</View>
          <Text style={styles.message}>{props?.route?.params?.title}</Text>
          <Text style={styles.message}>{props?.route?.params?.message}</Text>
        </View>
        <TouchableOpacity style={styles.nextButtonContainerStyle(true)} onPress={NavigationManager.popToTop}>
          <Text style={styles.nextTextStyle(true)}>{translate(ELanguageOptions.done)}</Text>
        </TouchableOpacity>
      </View>
    );
  },
  () => false,
);

SuccessScreen.displayName = "SuccessScreen";
export default SuccessScreen as React.ComponentType;
