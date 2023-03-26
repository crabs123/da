import { useDispatch, useSelector, useTranslate } from "@src/hooks";
import React from "react";
import NavigationManager from "@src/helper/NavigationManager";
import { EGuestScreenList } from "@src/models/RouterNamesModel";
import HelperManager from "@src/helper/HelperManager";
import RegOptions from "@src/models/RegModel";
import { ITextInputField } from "./Model.CreateNewPwScreen";
import { INewUser } from "@src/models/EntitiesModel";
import { IRegisterApiParams, IResetPasswordParams } from "@src/models/AuthenticationServicesModel";
import { AuthenticationServices } from "@src/services";
import UniversalActions from "@src/globalState/universalState/universal.actions";
import { show } from "@src/components/GlobalMessageComponent/View.GlobalMessageComponent";
import { EMessageTypes } from "@src/components/GlobalMessageComponent/Model.GlobalMessageComponent";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";

const ViewModel = (input: INewUser) => {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.universal);
  const [passwordValue1, setPasswordValue1] = React.useState("");
  const [passwordValue2, setPasswordValue2] = React.useState("");
  const [hidePassword1, setHidePassword1] = React.useState(true);
  const [hidePassword2, setHidePassword2] = React.useState(true);
  const translate = useTranslate();

  const _handleShowPassword = React.useCallback(
    (top: boolean) => () => {
      if (top) {
        setHidePassword1((prev) => !prev);
        return;
      }
      setHidePassword2((prev) => !prev);
    },
    [],
  );

  const passwordFields: ITextInputField[] = React.useMemo(
    () => [
      {
        id: "1",
        label: "Password",
        value: passwordValue1,
        setValue: setPasswordValue1,
        errorMessage: translate(ELanguageOptions.valid_pw_string),
        hidePassword: hidePassword1,
        onHidePasswordIcon: _handleShowPassword(true),
        keyboardType: "default",
        onBlur: (trueCallBack, falseCallback) => (e) => {
          const { text } = e.nativeEvent;
          const passConditions = [RegOptions.password] as RegExp[];
          if (!HelperManager.isValid(text, passConditions) || (text !== passwordValue2 && !!passwordValue2)) {
            falseCallback();
          } else {
            trueCallBack();
          }
        },
      },
      {
        id: "2",
        label: "Confirm password",
        value: passwordValue2,
        setValue: setPasswordValue2,
        hidePassword: hidePassword2,
        onHidePasswordIcon: _handleShowPassword(false),
        errorMessage: translate(ELanguageOptions.valid_pw_string),
        keyboardType: "default",
        onBlur: (trueCallBack, falseCallback) => (e) => {
          const { text } = e.nativeEvent;
          const passConditions = [RegOptions.password] as RegExp[];
          if (!HelperManager.isValid(text, passConditions) || (text !== passwordValue1 && !!passwordValue1)) {
            falseCallback();
          } else {
            trueCallBack();
          }
        },
      },
    ],
    [_handleShowPassword, hidePassword1, hidePassword2, passwordValue1, passwordValue2, translate],
  );

  const _handleForgotPassword = React.useCallback(() => {
    NavigationManager.navigate(EGuestScreenList.FORGOT_PASSWORD_SCREEN);
  }, []);

  const _handleVerify = React.useCallback(async () => {
    dispatch(UniversalActions._showLoadingAction());
    const messageParam = {
      title: translate(ELanguageOptions.thank_you),
      message: translate(ELanguageOptions.your_registration_is_successful),
    };
    if (!!input.firstName) {
      const registerParams: IRegisterApiParams = {
        email: input.email.toLowerCase(),
        password: passwordValue1 ?? passwordValue2,
        firstName: input.firstName,
        lastName: input.lastName,
        middleName: input.middleName,
        phoneNumber: input.phoneNumber,
        dateOfBirth: input.dateOfBirth,
        state: input.state,
        city: input.city,
        district: input.district,
        ward: input.ward,
        address: input.address,
        type: "Patient",
        language,
        dialCode: parseInt(input.dialCode),
        country: input.country,
      };

      try {
        const response = await AuthenticationServices.registerApi(registerParams);
        if (!!response) {
          NavigationManager.navigate(EGuestScreenList.SUCCESS_SCREEN, messageParam);
        }
      } catch (_error) {
        console.log("📢 [ViewModel.CreateNewPwScreen.tsx:110]", _error);
      } finally {
        dispatch(UniversalActions._closeLoadingAction());
      }
    } else {
      if (HelperManager.checkInvalidity(input.firstName)) {
        messageParam.title = "";
        messageParam.message = translate(ELanguageOptions.your_password_has_been_updated);
        try {
          const resetPasswordParams: IResetPasswordParams = {
            username: input.email.toLowerCase(),
            code: "111111",
            newPassword: passwordValue1,
          };
          const response = await AuthenticationServices.resetPasswordApi(resetPasswordParams);
          if (!!response) {
            NavigationManager.navigate(EGuestScreenList.SUCCESS_SCREEN, messageParam);
          }
        } catch (error: any) {
          show(error.data.meta.message, EMessageTypes.failed);
          console.log("📢 [ViewModel.CreateNewPwScreen.tsx:121]", error);
        } finally {
          dispatch(UniversalActions._closeLoadingAction());
        }
      }
    }
  }, [translate, input, passwordValue1, passwordValue2, dispatch, language]);

  const canNext = React.useMemo(() => {
    const passConditions = [RegOptions.password] as RegExp[];

    if (
      !HelperManager.isValid(passwordValue1, passConditions) ||
      (passwordValue1 !== passwordValue2 &&
        !!passwordValue2 &&
        !HelperManager.isValid(passwordValue2, passConditions)) ||
      (passwordValue2 !== passwordValue1 && !!passwordValue1)
    ) {
      return false;
    }
    return true;
  }, [passwordValue1, passwordValue2]);

  return {
    canNext,
    translate,
    _handleVerify,
    passwordFields,
    _handleShowPassword,
    _handleForgotPassword,
  };
};

export default ViewModel;
