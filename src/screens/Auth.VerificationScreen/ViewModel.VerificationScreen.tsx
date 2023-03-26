import { NavigationProp } from "@react-navigation/native";
import { useNavigation, useTranslate } from "@src/hooks";
import { TGuestStackParam } from "@src/navigation/GuestNavigation";
import React from "react";
import { useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { show } from "@src/components/GlobalMessageComponent/View.GlobalMessageComponent";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import { EMessageTypes } from "@src/components/GlobalMessageComponent/Model.GlobalMessageComponent";
import { EGuestScreenList } from "@src/models/RouterNamesModel";
import NavigationManager from "@helper/NavigationManager";
import { INewUser } from "@models/EntitiesModel";
import { AuthenticationServices } from "@src/services";

const ViewModel = (email: string) => {
  const [value, setValue] = React.useState("");
  const navigation = useNavigation<NavigationProp<TGuestStackParam>>();

  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const translate = useTranslate();

  const _handleOnChangeText = React.useCallback(
    (text: string) => {
      if (!/[^a-zA-Z]/.test(text)) {
        show(translate(ELanguageOptions.incorrect_verification_code), EMessageTypes.failed);
      }
      setValue(text);
    },
    [translate],
  );

  const _checkVerificationCode = React.useCallback(async () => {
    try {
      const response = await AuthenticationServices.verifyOtpApi({
        username: email,
        code: value,
      });
      if (!response.data) {
        show(translate(ELanguageOptions.invalid_otp), EMessageTypes.failed);
        return;
      }
      const params: INewUser = {
        activationCode: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email,
        phoneNumber: "",
        dateOfBirth: "",
        state: "",
        city: "",
        district: "",
        ward: "",
        address: "",
        clinicId: "",
        dialCode: "",
        country: "",
      };
      NavigationManager.navigate(EGuestScreenList.CREATE_NEW_PASSWORD_SCREEN, params);
    } catch (error) {
      console.log("📢 [ViewModel.VerificationScreen.tsx:38]", error);
    }
  }, [translate, email, value]);

  React.useEffect(() => {
    if (value.length === 6) {
      _checkVerificationCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, navigation, value]);

  const _handleResendCode = React.useCallback(async () => {
    show(translate(ELanguageOptions.verification_successful_response_mess), EMessageTypes.success);
  }, [translate]);

  return {
    ref,
    value,
    props,
    translate,
    _handleResendCode,
    _handleOnChangeText,
    getCellOnLayoutHandler,
  };
};

export default ViewModel;
