import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { INewUser } from "@src/models/EntitiesModel";
import { EGuestScreenList } from "@src/models/RouterNamesModel";
import {
  ActivationCodeScreen,
  ActivationQuestionScreen,
  CreateNewPwScreen,
  ForgotPwScreen,
  LoginScreen,
  PersonalAddressScreen,
  PersonalDetailsScreen,
  SelectClinicScreen,
  SuccessScreen,
  TermsConditionsScreen,
  VerificationScreen,
} from "@src/screens";
import React from "react";

export type TGuestStackParam = {
  [EGuestScreenList.LOGIN_SCREEN]: undefined;
  [EGuestScreenList.FORGOT_PASSWORD_SCREEN]: undefined;
  [EGuestScreenList.VERIFICATION_SCREEN]: {
    emailValue: string;
  };
  [EGuestScreenList.CREATE_NEW_PASSWORD_SCREEN]: {
    email: string;
    code: string;
  };
  [EGuestScreenList.ACTIVATION_CODE_SCREEN]: undefined;
  [EGuestScreenList.ACTIVATION_QUESTION_SCREEN]: undefined;
  [EGuestScreenList.PERSONAL_ADDRESS_SCREEN]: undefined;
  [EGuestScreenList.PERSONAL_DETAILS_SCREEN]: undefined;
  [EGuestScreenList.TERMS_CONDITIONS_SCREEN]: undefined;
  [EGuestScreenList.SUCCESS_SCREEN]: {
    title?: string;
    message: string;
  };
  [EGuestScreenList.SELECT_CLINIC_SCREEN]: {
    newUser: INewUser;
    activationCode: string;
  };
};

const GuestNavigation = React.memo(() => {
  const Stack = createStackNavigator<TGuestStackParam>();

  return (
    <Stack.Navigator
      initialRouteName={EGuestScreenList.LOGIN_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={EGuestScreenList.LOGIN_SCREEN}
        options={{ ...TransitionPresets.ModalPresentationIOS }}
        component={LoginScreen}
      />
      <Stack.Screen
        name={EGuestScreenList.ACTIVATION_QUESTION_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={ActivationQuestionScreen}
      />
      <Stack.Screen
        name={EGuestScreenList.ACTIVATION_CODE_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={ActivationCodeScreen}
      />
      <Stack.Screen
        name={EGuestScreenList.PERSONAL_DETAILS_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={PersonalDetailsScreen}
      />
      <Stack.Screen
        name={EGuestScreenList.PERSONAL_ADDRESS_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={PersonalAddressScreen}
      />
      <Stack.Screen
        name={EGuestScreenList.SELECT_CLINIC_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={SelectClinicScreen}
      />
      <Stack.Screen
        name={EGuestScreenList.TERMS_CONDITIONS_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={TermsConditionsScreen}
      />
      <Stack.Screen
        name={EGuestScreenList.VERIFICATION_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={VerificationScreen}
      />
      <Stack.Screen
        name={EGuestScreenList.FORGOT_PASSWORD_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={ForgotPwScreen}
      />
      <Stack.Screen
        name={EGuestScreenList.CREATE_NEW_PASSWORD_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={CreateNewPwScreen}
      />
      <Stack.Screen
        name={EGuestScreenList.SUCCESS_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={SuccessScreen}
      />
    </Stack.Navigator>
  );
});

GuestNavigation.displayName = "GuestNavigation";
export default GuestNavigation;
