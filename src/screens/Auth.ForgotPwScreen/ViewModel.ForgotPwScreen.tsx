import { NavigationProp } from "@react-navigation/native";
import { EMessageTypes } from "@src/components/GlobalMessageComponent/Model.GlobalMessageComponent";
import { show } from "@src/components/GlobalMessageComponent/View.GlobalMessageComponent";
import HelperManager from "@src/helper/HelperManager";
import { useNavigation, useTranslate } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import { EGuestScreenList } from "@src/models/RouterNamesModel";
import { TGuestStackParam } from "@src/navigation/GuestNavigation";
import { AuthenticationServices } from "@src/services";

import React from "react";

const ViewModel = () => {
  const translate = useTranslate();
  const [emailValue, setEmailValue] = React.useState("");
  const navigation = useNavigation<NavigationProp<TGuestStackParam>>();

  const _handleOnchangeText = React.useCallback((evt: string) => {
    setEmailValue(evt);
  }, []);

  const _handleVerify = React.useCallback(async () => {
    if (emailValue.length === 0) {
      show(translate(ELanguageOptions.an_email_address_is_required), EMessageTypes.failed);
      return;
    }

    if (HelperManager.checkInvalidity(HelperManager.validateEmail(emailValue))) {
      show(translate(ELanguageOptions.invalid_email_address), EMessageTypes.failed);
      return;
    }

    try {
      const response = await AuthenticationServices.forgotPasswordApi({ username: emailValue.toLowerCase() });
      if (!response) return;
      show(translate(ELanguageOptions.an_email_containing_pw), EMessageTypes.success);
      navigation.navigate(EGuestScreenList.VERIFICATION_SCREEN, {
        emailValue,
      });
    } catch (error: any) {
      show(error.data.meta.message, EMessageTypes.failed);
      console.log("📢 [ViewModel.ForgotPwScreen.tsx:32]", error);
    }
  }, [emailValue, navigation, translate]);

  return {
    emailValue,
    translate,
    _handleOnchangeText,
    _handleVerify,
  };
};

export default ViewModel;
