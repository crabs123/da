import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { EAppointmentScreenList } from "@src/models/RouterNamesModel";
import {
  AppointmentBookSuccessScreen,
  AppointmentDetailScreen,
  AppointmentVideoCallScreen,
  StepOneAppointmentScreen,
  StepThreeAppointmentScreen,
  StepTwoAppointmentScreen,
  UpComingPreviousAppointmentsScreen,
} from "..";

export type TAppointmentStack = {
  [EAppointmentScreenList.UPCOMING_PREVIOUS_APPOINTMENT_SCREEN]: undefined;
  [EAppointmentScreenList.STEP_ONE_APPOINTMENT_SCREEN]: undefined;
  [EAppointmentScreenList.STEP_TWO_APPOINTMENT_SCREEN]: undefined;
  [EAppointmentScreenList.STEP_THREE_APPOINTMENT_SCREEN]: undefined;
  [EAppointmentScreenList.APPOINTMENT_VIDEO_CALL_SCREEN]: undefined;
  [EAppointmentScreenList.APPOINTMENT_BOOK_SUCCESS_SCREEN]: undefined;
  [EAppointmentScreenList.APPOINTMENT_DETAIL_SCREEN]: undefined;
};

const AppointmentStackScreen = React.memo(() => {
  const Stack = createStackNavigator<TAppointmentStack>();
  return (
    <Stack.Navigator
      initialRouteName={EAppointmentScreenList.UPCOMING_PREVIOUS_APPOINTMENT_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={EAppointmentScreenList.UPCOMING_PREVIOUS_APPOINTMENT_SCREEN}
        options={{ ...TransitionPresets.BottomSheetAndroid }}
        component={UpComingPreviousAppointmentsScreen}
      />

      <Stack.Screen
        name={EAppointmentScreenList.STEP_ONE_APPOINTMENT_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={StepOneAppointmentScreen}
      />

      <Stack.Screen
        name={EAppointmentScreenList.STEP_TWO_APPOINTMENT_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={StepTwoAppointmentScreen}
      />

      <Stack.Screen
        name={EAppointmentScreenList.STEP_THREE_APPOINTMENT_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={StepThreeAppointmentScreen}
      />

      <Stack.Screen
        name={EAppointmentScreenList.APPOINTMENT_BOOK_SUCCESS_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={AppointmentBookSuccessScreen}
      />

      <Stack.Screen
        name={EAppointmentScreenList.APPOINTMENT_VIDEO_CALL_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={AppointmentVideoCallScreen}
      />

      <Stack.Screen
        name={EAppointmentScreenList.APPOINTMENT_DETAIL_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={AppointmentDetailScreen}
      />
    </Stack.Navigator>
  );
});

AppointmentStackScreen.displayName = "AppointmentStackScreen";
export default AppointmentStackScreen;
