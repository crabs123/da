import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { EMoreScreenList } from "@src/models/RouterNamesModel";
import MoreScreen from "../More.MoreScreen/View.MoreScreen";
import SettingScreen from "../More.SettingScreen/View.SettingScreen";

export type TMoreStackScreen = {
  [EMoreScreenList.MORE_SCREEN]: undefined;
  [EMoreScreenList.PATIENT_PROFILE_SCREEN]: undefined;
  [EMoreScreenList.SETTING_SCREEN]: undefined;
};

const MoreStackScreen = React.memo(() => {
  const Stack = createStackNavigator<TMoreStackScreen>();
  return (
    <Stack.Navigator
      initialRouteName={EMoreScreenList.MORE_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={EMoreScreenList.MORE_SCREEN}
        options={{ ...TransitionPresets.BottomSheetAndroid }}
        component={MoreScreen}
      />
      <Stack.Screen
        name={EMoreScreenList.SETTING_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={SettingScreen}
      />
    </Stack.Navigator>
  );
});

MoreStackScreen.displayName = "MoreStackScreen";
export default MoreStackScreen;
