import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { EHealthScreenList } from "@src/models/RouterNamesModel";
import { HomeScreen, UpdateProfileScreen, UserProfileScreen } from "@src/screens";

export type THealthStack = {
  [EHealthScreenList.HEALTH_STATS_OVERVIEW_SCREEN]: undefined;
  [EHealthScreenList.HEALTH_STATS_DETAIL_SCREEN]: {
    test: string;
  };
  [EHealthScreenList.HEALTH_SINGLE_STAT_DETAIL_SCREEN]: undefined;
  [EHealthScreenList.USER_PROFILE_SCREEN]: undefined;
  [EHealthScreenList.UPDATE_PROFILE_SCREEN]: undefined;
};

const HealthStackScreen = React.memo(() => {
  const Stack = createStackNavigator<THealthStack>();
  return (
    <Stack.Navigator
      initialRouteName={EHealthScreenList.HEALTH_STATS_OVERVIEW_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={EHealthScreenList.HEALTH_STATS_OVERVIEW_SCREEN}
        options={{ ...TransitionPresets.BottomSheetAndroid }}
        component={HomeScreen}
      />
      <Stack.Screen
        name={EHealthScreenList.USER_PROFILE_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={UserProfileScreen}
      />
      <Stack.Screen
        name={EHealthScreenList.UPDATE_PROFILE_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={UpdateProfileScreen}
      />
    </Stack.Navigator>
  );
});

HealthStackScreen.displayName = "HealthStackScreen";
export default HealthStackScreen;
