import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { EChatScreenList } from "@src/models/RouterNamesModel";
import ChatScreen from "../Chat.ChatScreen/View.ChatScreen";
import ChatDetailScreen from "../Chat.ChatRoomScreen/View.ChatRoomScreen";

export type TChatStack = {
  [EChatScreenList.CHAT_SCREEN]: undefined;
  [EChatScreenList.CHAT_ROOM_SCREEN]: undefined;
};

const ChatStackScreen = React.memo(() => {
  const Stack = createStackNavigator<TChatStack>();
  return (
    <Stack.Navigator
      initialRouteName={EChatScreenList.CHAT_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={EChatScreenList.CHAT_SCREEN}
        options={{ ...TransitionPresets.BottomSheetAndroid }}
        component={ChatScreen}
      />
      <Stack.Screen
        name={EChatScreenList.CHAT_ROOM_SCREEN}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        component={ChatDetailScreen}
      />
    </Stack.Navigator>
  );
});

ChatStackScreen.displayName = "ChatStackScreen";
export default ChatStackScreen;
