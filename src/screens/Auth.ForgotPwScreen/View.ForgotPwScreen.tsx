import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "@src/assets";
import styles from "./Styles.ForgotPwScreen";
import ViewModel from "./ViewModel.ForgotPwScreen";
import { IForgotPwScreenProps } from "./Model.ForgotPwScreen";
import { BackgroundHeaderComponent, DismissKeyboardComponent, HeaderComponent } from "@src/components";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";

const ForgotPwScreen: React.FC<IForgotPwScreenProps> = React.memo(() => {
  const { emailValue, translate, _handleOnchangeText, _handleVerify } = ViewModel();

  return (
    <DismissKeyboardComponent>
      <View style={styles.container}>
        <BackgroundHeaderComponent>
          <HeaderComponent transparentBackground={true} />
        </BackgroundHeaderComponent>
        <View style={styles.bodyContainer}>
          <Text style={styles.forgotPasswordText}>{translate(ELanguageOptions.forgot_your_password)} ?</Text>
          <Text style={styles.detailText}>{translate(ELanguageOptions.please_enter_your_email)}</Text>
          <TextInput
            value={emailValue}
            onChangeText={_handleOnchangeText}
            style={styles.bigTextInput}
            placeholderTextColor={COLORS.darkFourColor}
            autoCapitalize="none"
            placeholder={translate(ELanguageOptions.your_email)}
          />
        </View>
        <TouchableOpacity onPress={_handleVerify} style={styles.confirmButton}>
          <Text style={styles.confirmSignInText}>{translate(ELanguageOptions.verify)}</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboardComponent>
  );
});

ForgotPwScreen.displayName = "ForgotPwScreen";
export default ForgotPwScreen as React.ComponentType;
