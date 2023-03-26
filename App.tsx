import React from "react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import RootNavigator from "@src/navigation/RootNavigation";
import store from "@src/globalState/ReduxManager";
import { ErrorBoundary, LoadingScreen } from "@src/components";
import codePush from "react-native-code-push";
import { LogBox, Platform } from "react-native";
import NotificationManager from "@src/helper/NotificationManager";
import messaging from "@react-native-firebase/messaging";
import { INotification, IRemoteMessage } from "@src/models/CommonModel";
import IncomingCall from "react-native-incoming-call";
import NavigationManager from "./src/helper/NavigationManager";
import { EAppointmentScreenList } from "./src/models/RouterNamesModel";

const App: React.FC = (): JSX.Element => {
  React.useEffect(() => {
    LogBox.ignoreAllLogs();
    NotificationManager.createChannelPushNotification();

    const _unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const notification = (remoteMessage as IRemoteMessage).notification as INotification;
      NotificationManager.pushLocalNotification(notification);
    });

    return _unsubscribe;
  }, []);

  const _handleCall = async () => {
    if (Platform.OS === "android") {
      const payload = await IncomingCall.getExtrasFromHeadlessMode();
      if (payload) {
        NavigationManager.navigate(EAppointmentScreenList.APPOINTMENT_VIDEO_CALL_SCREEN, payload);
      }
    }
  };

  React.useEffect(() => {
    _handleCall();

    return () => {
      _handleCall();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)} loading={<LoadingScreen />}>
        <ErrorBoundary>
          <RootNavigator />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

export default codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_START })(App);
