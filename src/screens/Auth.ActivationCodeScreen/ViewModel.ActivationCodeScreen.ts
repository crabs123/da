import { EGuestScreenList } from "@src/models/RouterNamesModel";
import React from "react";
import NavigationManager from "@helper/NavigationManager";
import { useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { useTranslate } from "@src/hooks";
import { show } from "@src/components/GlobalMessageComponent/View.GlobalMessageComponent";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import { EMessageTypes } from "@src/components/GlobalMessageComponent/Model.GlobalMessageComponent";

const ViewModel = () => {
  const [activationCode, setActivationCode] = React.useState("");
  const translate = useTranslate();
  const [lastName, setLastName] = React.useState("");

  const _handleGoToTermsAndConditions = React.useCallback(() => {
    NavigationManager.navigate(EGuestScreenList.TERMS_CONDITIONS_SCREEN, {
      lastName,
      activationCode,
    });
  }, [activationCode, lastName]);

  const ref = useBlurOnFulfill({ value: activationCode, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: activationCode,
    setValue: setActivationCode,
  });

  const canNext = React.useMemo(() => activationCode.length === 6 && !!lastName, [lastName, activationCode]);

  const _handleOnChangeText = React.useCallback(
    (text: string) => {
      if (!/[^a-zA-Z]/.test(text)) {
        show(translate(ELanguageOptions.incorrect_verification_code), EMessageTypes.failed);
      }
      setActivationCode(text);
    },
    [translate],
  );

  return {
    ref,
    props,
    canNext,
    lastName,
    setLastName,
    activationCode,
    _handleOnChangeText,
    getCellOnLayoutHandler,
    _handleGoToTermsAndConditions,
  };
};

export default ViewModel;
