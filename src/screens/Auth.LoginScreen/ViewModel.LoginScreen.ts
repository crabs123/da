import React from "react";
import { Animated, Dimensions, TextInput } from "react-native";
import { ETInput } from "./Model.LoginScreen";
import { useDispatch, useKeyboard, useNavigation, useSelector, useTranslate } from "@src/hooks";
import { NavigationProp } from "@react-navigation/native";
import { TGuestStackParam } from "@src/navigation/GuestNavigation";
import { EGuestScreenList } from "@src/models/RouterNamesModel";
import { EAvailableLanguages } from "@src/languages/LanguagesManager";
import UniversalActions from "@src/globalState/universalState/universal.actions";
import { dismissKeyboard } from "@src/components/DismissKeyboardComponent/View.DismissKeyboardComponent";
import HelperManager from "@src/helper/HelperManager";
import { show } from "@src/components/GlobalMessageComponent/View.GlobalMessageComponent";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import { EMessageTypes } from "@src/components/GlobalMessageComponent/Model.GlobalMessageComponent";
import ScaleManager from "@assets/ScaleManager";
import AuthActions from "@globalState/authState/auth.actions";
import RegOptions from "@src/models/RegModel";
import { AuthenticationServices } from "@src/services";

const ViewModel = () => {
  const dispatch = useDispatch();
  const translate = useTranslate();
  const navigation = useNavigation<NavigationProp<TGuestStackParam>>();
  const { language, keyboard_height } = useSelector((state) => state.universal);
  const passwordInputRef = React.createRef<TextInput>();
  const emailInputRef = React.createRef<TextInput>();
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [hidePassword, setHidePassword] = React.useState(true);
  const [showLanguage, setShowLanguage] = React.useState(false);
  const bounceValue = React.useRef(new Animated.Value(2000)).current;
  const transformLogo = React.useRef(new Animated.Value(500)).current;
  const scale = React.useRef(new Animated.Value(0)).current;

  const _handleGoToRegister = React.useCallback(() => {
    navigation.navigate(EGuestScreenList.ACTIVATION_QUESTION_SCREEN);
  }, [navigation]);

  const _handleOnchangeText = React.useCallback(
    (type: ETInput) => (evt: string) => {
      if (type === ETInput.email) {
        setEmailValue(evt);
        return;
      }
      setPasswordValue(evt);
    },
    [],
  );

  const _handleShowLanguage = React.useCallback(() => {
    setShowLanguage((prev) => !prev);
  }, []);

  const _closeShowLanguage = React.useCallback(() => {
    setShowLanguage(false);
  }, []);

  const _handleShowPassword = React.useCallback(() => {
    setHidePassword(!hidePassword);
  }, [hidePassword]);

  const _handleChangeLanguage = React.useCallback(
    (selectedLanguage: EAvailableLanguages) => () => {
      dispatch(UniversalActions._switchLanguageAction(selectedLanguage));
      _closeShowLanguage();
    },
    [dispatch, _closeShowLanguage],
  );

  const _handleForgotPassword = React.useCallback(() => {
    navigation.navigate(EGuestScreenList.FORGOT_PASSWORD_SCREEN);
  }, [navigation]);

  const translateY = React.useRef(new Animated.Value(0)).current;

  const { isKeyboardVisible } = useKeyboard();

  const _handleSignIn = React.useCallback(async () => {
    emailInputRef.current?.blur();
    passwordInputRef.current?.blur();
    dismissKeyboard();
    _closeShowLanguage();
    if (HelperManager.checkInvalidity(HelperManager.validateEmail(emailValue))) {
      show(translate(ELanguageOptions.incorrect_email_or_pw), EMessageTypes.failed);
      return;
    }
    const passConditions = [RegOptions.password] as RegExp[];

    if (!HelperManager.isValid(passwordValue, passConditions)) {
      show(translate(ELanguageOptions.valid_pw_string), EMessageTypes.warning);
      return;
    }

    dispatch(UniversalActions._showLoadingAction());
    try {
      const res = await AuthenticationServices.loginApi({
        username: emailValue,
        password: passwordValue,
      });
      dispatch(AuthActions._loginSuccessAction(res));
      dispatch(AuthActions._setLoginMarkTimeAction(new Date()));
    } catch (error) {
      show(translate(ELanguageOptions.incorrect_email_or_pw), EMessageTypes.failed);
      console.log("📢 [ViewModel.LoginScreen.tsx:96]", error);
    } finally {
      dispatch(UniversalActions._closeLoadingAction());
    }
  }, [_closeShowLanguage, dispatch, emailInputRef, emailValue, passwordInputRef, passwordValue, translate]);

  const _showLoginForm = React.useCallback(() => {
    const toValue = Dimensions.get("screen").height - 180;
    Animated.spring(bounceValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();

    Animated.spring(transformLogo, {
      toValue: 0,
      velocity: 10,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [bounceValue, transformLogo]);

  React.useEffect(() => {
    if (isKeyboardVisible) {
      Animated.timing(translateY, {
        toValue: -keyboard_height / 2,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isKeyboardVisible]);

  React.useEffect(() => {
    if (keyboard_height !== ScaleManager.scaleSizeHeight(180)) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (showLanguage) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scale, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [showLanguage, scale]);

  React.useEffect(() => {
    dispatch(UniversalActions._closeLoadingAction());
    _showLoginForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
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
  };
};

export default ViewModel;
