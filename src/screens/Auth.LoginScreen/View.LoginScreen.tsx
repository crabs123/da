import { Animated, ImageBackground, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";

import { COLORS, IMAGES } from "@src/assets";
import ICONS from "@src/assets/icons";
import ViewModel from "./ViewModel.LoginScreen";
import { ETInput } from "./Model.LoginScreen";
import styles from "./Styles.LoginScreen";
import { EAvailableLanguages } from "@src/languages/LanguagesManager";
import ScaleManager from "@assets/ScaleManager";
import { DismissKeyboardComponent } from "@src/components";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import HelperManager from "@src/helper/HelperManager";
import { useSharedData } from "@src/hooks";

const LoginScreen = React.memo(() => {
  const {
    scale,
    language,
    translate,
    translateY,
    emailValue,
    bounceValue,
    hidePassword,
    passwordValue,
    _handleSignIn,
    transformLogo,
    emailInputRef,
    passwordInputRef,
    _closeShowLanguage,
    _handleOnchangeText,
    _handleShowLanguage,
    _handleGoToRegister,
    _handleShowPassword,
    _handleChangeLanguage,
    _handleForgotPassword,
  } = ViewModel();
  const { colorUpdate } = useSharedData();

  const _renderLanguageOption = React.useCallback(() => {
    return (
      <Animated.View style={colorUpdate(styles.languageOptionContainerStyle(scale))}>
        <TouchableOpacity
          style={colorUpdate(styles.changeLanguageButtonContainer)}
          onPress={_handleChangeLanguage(EAvailableLanguages.en)}
        >
          <Text style={colorUpdate(styles.languageText)}>English</Text>
          {language === EAvailableLanguages.en && (
            <View style={colorUpdate(styles.chosenIcon)}>{ICONS.ChooseIcon()}</View>
          )}
        </TouchableOpacity>
        <View style={colorUpdate(styles.separatorContainer)}>
          <View style={colorUpdate(styles.leftSeparator)} />
          <View style={colorUpdate(styles.separator)} />
          <View style={colorUpdate(styles.rightSeparator)} />
        </View>
        <TouchableOpacity
          style={colorUpdate(styles.changeLanguageButtonContainer)}
          onPress={_handleChangeLanguage(EAvailableLanguages.vn)}
        >
          <Text style={colorUpdate(styles.languageText)}>Tiếng Việt</Text>
          {language !== EAvailableLanguages.en && (
            <View style={colorUpdate(styles.chosenIcon)}>{ICONS.ChooseIcon()}</View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  }, [_handleChangeLanguage, language, scale, colorUpdate]);

  return (
    <DismissKeyboardComponent>
      <ImageBackground source={IMAGES.loginBackground} style={colorUpdate(styles.imageBackground)}>
        <View style={colorUpdate(styles.container)}>
          <View style={colorUpdate(styles.buttonLanguageContainer)}>
            <TouchableOpacity style={colorUpdate(styles.buttonWrapper)} onPress={_handleShowLanguage}>
              <Text style={colorUpdate(styles.changeLanguageText)}>
                {language === EAvailableLanguages.en ? "🇬🇧" : "🇻🇳"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {_renderLanguageOption()}
        <Animated.View style={styles.logoBouncyStyle(transformLogo)}>
          <View style={colorUpdate(styles.logoContainer)}>{ICONS.LogoIcon()}</View>
        </Animated.View>
        <Animated.View style={colorUpdate(styles.logoBouncyStyle(bounceValue))}>
          <Animated.View style={colorUpdate(styles.bodyContainerStyle(translateY))}>
            <View style={styles.marginTop} />
            <Text style={colorUpdate(styles.titleText)}>{translate(ELanguageOptions.email)}</Text>
            <View style={colorUpdate(styles.textInputContainer)}>
              <TextInput
                ref={emailInputRef}
                value={emailValue}
                onChangeText={_handleOnchangeText(ETInput.email)}
                style={colorUpdate(styles.bigTextInput)}
                placeholderTextColor={Object.values(colorUpdate({ color: COLORS.darkFourColor }))[0]}
                placeholder={translate(ELanguageOptions.your_email)}
                onPressIn={_closeShowLanguage}
                autoCapitalize="none"
              />
            </View>
            <Text style={colorUpdate(styles.titleText)}>{translate(ELanguageOptions.password)}</Text>
            <View style={colorUpdate(styles.textInputContainer)}>
              <TextInput
                ref={passwordInputRef}
                value={passwordValue}
                onChangeText={_handleOnchangeText(ETInput.password)}
                style={[colorUpdate(styles.bigTextInput), { paddingRight: ScaleManager.scaleSizeWidth(55) }]}
                placeholderTextColor={Object.values(colorUpdate({ color: COLORS.darkFourColor }))[0]}
                placeholder={translate(ELanguageOptions.your_password)}
                secureTextEntry={hidePassword}
                onPressIn={_closeShowLanguage}
              />
              <Pressable style={colorUpdate(styles.showHidePasswordButton)} onPress={_handleShowPassword}>
                {ICONS.ShowHidePasswordIcon({ show: !hidePassword })}
              </Pressable>
            </View>

            <View style={colorUpdate(styles.forgotPasswordContainer)}>
              <Text onPress={_handleForgotPassword} style={colorUpdate(styles.forgotPasswordText)}>
                {translate(ELanguageOptions.forgot_password)}
              </Text>
            </View>

            <TouchableOpacity onPress={_handleSignIn} style={colorUpdate(styles.confirmButton)}>
              <Text style={colorUpdate(styles.confirmSignInText)}>{translate(ELanguageOptions.sign_in)}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={_handleGoToRegister} style={colorUpdate(styles.termOfUseContainer)}>
              <Text style={colorUpdate(styles.createAnAccountText)}>
                {translate(ELanguageOptions.create_an_account)}
              </Text>
            </TouchableOpacity>
            <View>
              <Text style={colorUpdate(styles.versionCodeText)}>
                {HelperManager.updateVersionString() + " 17:00 21st March"}
              </Text>
            </View>
          </Animated.View>

          <Animated.View style={colorUpdate(styles.bottomBackgroundStyle(translateY))} />
        </Animated.View>
      </ImageBackground>
    </DismissKeyboardComponent>
  );
});

LoginScreen.displayName = "LoginScreen";
export default LoginScreen;
