import { COLORS, ICONS, IMAGES, THEMES } from "@src/assets";
import { BackgroundHeaderComponent, HeaderComponent } from "@src/components";
import { useSharedData } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import styles from "./Styles.ActivationQuestionScreen";
import ViewModel from "./ViewModel.ActivationQuestionScreen";

const ActivationQuestionScreen = React.memo(() => {
  const { _handleGoToRegisterScreen, _handleGoToActivationCodeScreen } = ViewModel();
  const { colorUpdate, translate } = useSharedData();

  return (
    // <View style={colorUpdate(styles.container)}>
    <ImageBackground source={IMAGES.loginBackground} style={colorUpdate(styles.imageBackground)}>
      <View style={colorUpdate(styles.bodyContainer)}>
        <HeaderComponent transparentBackground={true} />

        <View style={colorUpdate(styles.contentContainer)}>
          <View style={colorUpdate(styles.logoContainer)}>{ICONS.LogoIcon()}</View>
          <Text style={colorUpdate(styles.activationCodeText)}>{translate(ELanguageOptions.activationCode)}</Text>
          <Text style={colorUpdate(styles.activationQuestionText)}>
            {translate(ELanguageOptions.do_you_have_activation_code)}
          </Text>
        </View>

        <View style={colorUpdate(styles.separator)} />
        <TouchableOpacity
          style={colorUpdate(THEMES.commonButtonStyle(COLORS.mainColor))}
          onPress={_handleGoToActivationCodeScreen}
        >
          <Text style={colorUpdate(THEMES.commonMediumTextStyle(COLORS.white))}>{translate(ELanguageOptions.yes)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={colorUpdate(THEMES.commonButtonStyle(COLORS.white))}
          onPress={_handleGoToRegisterScreen}
        >
          <Text style={colorUpdate(styles.noText)}>{translate(ELanguageOptions.no)}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    // </View>
  );
});

ActivationQuestionScreen.displayName = "ActivationQuestionScreen";
export default ActivationQuestionScreen;
