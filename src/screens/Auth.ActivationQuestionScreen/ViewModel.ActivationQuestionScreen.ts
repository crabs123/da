import { EGuestScreenList } from "@src/models/RouterNamesModel";
import React from "react";
import NavigationManager from "@helper/NavigationManager";

const ViewModel = () => {
  const _handleGoToActivationCodeScreen = React.useCallback(() => {
    NavigationManager.navigate(EGuestScreenList.ACTIVATION_CODE_SCREEN);
  }, []);

  const _handleGoToRegisterScreen = React.useCallback(() => {
    NavigationManager.navigate(EGuestScreenList.PERSONAL_DETAILS_SCREEN, {
      activationCode: "",
      lastName: "",
    });
  }, []);

  return {
    _handleGoToRegisterScreen,
    _handleGoToActivationCodeScreen,
  };
};

export default ViewModel;
