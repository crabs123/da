import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { Platform, StatusBar } from "react-native";
import AppNavigation from "./AppNavigation";
import { navigationRef } from "@helper/NavigationManager";
import useSelector from "@src/hooks/useSelector";
import GuestNavigation from "./GuestNavigation";
import FastImage from "react-native-fast-image";
import { IMAGES } from "@src/assets";
import { GlobalMessageComponent, InternetStatusComponent, LoadingScreen, RingToneComponent } from "@src/components";
import { useDispatch } from "@src/hooks";
import UniversalActions from "@src/globalState/universalState/universal.actions";
import { ROUTES } from "@src/models/RouterNamesModel";
import codePush from "react-native-code-push";
import SplashScreen from "react-native-splash-screen";
import KeepAwake from "react-native-keep-awake";
import NotificationManager from "@src/helper/NotificationManager";
import { AuthenticationServices } from "@src/services";
import { ViewImageScreen } from "@src/components";
import HelperManager from "../helper/HelperManager";
import AuthActions from "@src/globalState/authState/auth.actions";

const Stack = createStackNavigator();

const RootNavigation = React.memo(() => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.universal);
  const { token, isLoggedIn, loginMarkTime } = useSelector((state) => state.auth);

  const whichNavigation = React.useMemo(() => {
    if (isLoggedIn)
      return <Stack.Screen name={ROUTES.APP_NAVIGATION} component={gestureHandlerRootHOC(AppNavigation)} />;
    return <Stack.Screen name={ROUTES.GUEST_NAVIGATION} component={gestureHandlerRootHOC(GuestNavigation)} />;
  }, [isLoggedIn]);

  React.useEffect(() => {
    FastImage.clearDiskCache().then(() => {
      console.log("📢 [RootNavigator.tsx]", "Clear cached images");
      FastImage.preload([
        {
          uri: "https://img.freepik.com/free-photo/smiling-pretty-doctor-standing-hospital-office-with-paper-folder_1098-18884.jpg?w=2000&t=st=1676797270~exp=1676797870~hmac=3022b588043c6a78c81af26cdb5724f6d4c0c50d850e5fbda9fcb0c59934b3ce",
        },
        { uri: IMAGES.defaultImage },
      ]);
    });

    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE,
    });

    SplashScreen.hide();
    if (loading) {
      dispatch(UniversalActions._closeLoadingAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const shouldGetNewTokenWhenOpenApp = async () => {
      if (!token.access_token) return;
      const condition =
        token.access_token &&
        new Date().getTime() > new Date(loginMarkTime).getTime() + (token.expires_in * 1000) / 1.2;
      if (condition) {
        try {
          const newToken = await AuthenticationServices.regainAccessTokenApi(token.refresh_token);
          dispatch(AuthActions._loginSuccessAction(newToken));
          dispatch(AuthActions._setLoginMarkTimeAction(new Date()));
        } catch (error) {
          console.log("📢 [ServicesManager.ts:54]", error);
        }
      }
    };

    shouldGetNewTokenWhenOpenApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const _cloudMessage = async () => {
      const data = await NotificationManager.checkPermissionFCM();
      const deviceToken = data as {
        deviceName: string;
        deviceToken: string;
        currentDeviceId: string;
      };

      if (!!deviceToken && !!token.access_token) {
        const result = await AuthenticationServices.registerNewDeviceApi({
          userId: HelperManager.getUserId(token.access_token),
          deviceName: data?.deviceName as string,
          deviceType: Platform.OS,
          deviceToken: data?.deviceToken as string,
        });
        if (!!result) {
          await AuthenticationServices.pushTokenDeviceApi({
            userId: HelperManager.getUserId(token.access_token),
            deviceId: result.deviceId,
            deviceToken: deviceToken.deviceToken,
          });
        }
      }
    };

    _cloudMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"dark-content"} translucent={true} backgroundColor="transparent" />
      <GlobalMessageComponent />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>{whichNavigation}</Stack.Navigator>
      </NavigationContainer>
      <LoadingScreen />
      <KeepAwake />
      <ViewImageScreen />
      <InternetStatusComponent />
      <RingToneComponent />
    </SafeAreaProvider>
  );
});

RootNavigation.displayName = "RootNavigation";
export default RootNavigation;
