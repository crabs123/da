import React from "react";
import FONTS from "@src/assets/fonts";
import { COLORS, ICONS } from "@src/assets";
import ScaleManager from "@assets/ScaleManager";
import { Platform, ViewStyle } from "react-native";
import { EAppointmentScreenList, EAppScreenList, EChatScreenList } from "@src/models/RouterNamesModel";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HealthStackScreen, MoreStackScreen } from "@src/screens";
import ChatStackScreen from "@src/screens/Chat.ChatStackScreen";
import { EHealthScreenList } from "@models/RouterNamesModel";
import AppointmentStackScreen from "@src/screens/Appointment.AppointmentStackScreen";
import { useSharedData, useSocket } from "@src/hooks";
import { ELanguageOptions } from "../../models/LanguageOptionsModel";

const NOT_SHOW_BOTTOM_TAB_SCREEN_LIST: string[] = [
  EChatScreenList.CHAT_ROOM_SCREEN,
  EChatScreenList.VIDEO_CALL_SCREEN,
  EAppScreenList.CHAT_STACK_SCREEN,
  EHealthScreenList.USER_PROFILE_SCREEN,
  EHealthScreenList.UPDATE_PROFILE_SCREEN,
  EAppointmentScreenList.STEP_ONE_APPOINTMENT_SCREEN,
  EAppointmentScreenList.STEP_TWO_APPOINTMENT_SCREEN,
  EAppointmentScreenList.STEP_THREE_APPOINTMENT_SCREEN,
  EAppointmentScreenList.APPOINTMENT_BOOK_SUCCESS_SCREEN,
  EAppointmentScreenList.APPOINTMENT_DETAIL_SCREEN,
  EAppointmentScreenList.APPOINTMENT_VIDEO_CALL_SCREEN,
];

export type AppStackParam = {
  HOME_SCREEN: undefined;
};

const Tab = createBottomTabNavigator();

const AppNavigation = React.memo(() => {
  const { translate } = useSharedData();
  useSocket();

  const defaultTabBarStyle: ViewStyle = React.useMemo(
    () => ({
      height: ScaleManager.BOTTOM_TAB_HEIGHT,
      flexDirection: "row",
      backgroundColor: COLORS.white,
      ...Platform.select({
        android: {
          elevation: 9,
          borderTopColor: "#F6F6F7",
          borderTopWidth: 2,
        },
        ios: {
          shadowColor: COLORS.modalColor,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
        },
      }),
    }),
    [],
  );

  const tabBarList = React.useMemo(
    () => [
      {
        name: EAppScreenList.HEALTH_STACK_SCREEN,
        component: HealthStackScreen,
        tabBarLabel: translate(ELanguageOptions.vital_signs),
        tabBarIcon: ICONS.HealthStatIcon,
      },
      {
        name: EAppScreenList.CALENDAR_STACK_SCREEN,
        component: AppointmentStackScreen,
        tabBarLabel: translate(ELanguageOptions.schedules),
        tabBarIcon: ICONS.CalendarStackIcon,
      },
      {
        name: EAppScreenList.CHAT_STACK_SCREEN,
        component: ChatStackScreen,
        tabBarLabel: translate(ELanguageOptions.chat),
        tabBarIcon: ICONS.ChatIcon,
      },
      {
        name: EAppScreenList.MORE_STACK_SCREEN,
        component: MoreStackScreen,
        tabBarLabel: translate(ELanguageOptions.more),
        tabBarIcon: ICONS.StackIcon,
      },
    ],
    [translate],
  );

  const screenOption: BottomTabNavigationOptions = React.useMemo(
    () => ({
      headerShown: false,
      tabBarActiveTintColor: COLORS.mainColor,
      tabBarItemStyle: {
        flex: 1,
        alignItems: "center",
        paddingBottom: ScaleManager.scaleSizeWidth(8),
      },
      tabBarLabelStyle: {
        fontSize: ScaleManager.scaleSizeWidth(12),
        textAlign: "center",
        fontFamily: FONTS.interRegular,
      },
    }),
    [],
  );

  return (
    <Tab.Navigator screenOptions={screenOption}>
      {tabBarList.map(({ name, component, tabBarLabel, tabBarIcon }) => {
        return (
          <Tab.Screen
            key={`${name}`}
            name={name}
            component={component}
            options={({ route }) => ({
              tabBarStyle: ((route) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? "";
                if (NOT_SHOW_BOTTOM_TAB_SCREEN_LIST.includes(routeName)) {
                  return {
                    display: "none",
                  };
                }
                return defaultTabBarStyle;
              })(route),
              tabBarLabel: tabBarLabel,
              tabBarIcon: tabBarIcon,
            })}
          />
        );
      })}
    </Tab.Navigator>
  );
});

AppNavigation.displayName = "AppNavigation";
export default AppNavigation;
