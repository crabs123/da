import { Platform, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FastImageComponent } from "@src/components";
import { COLORS, THEMES } from "@src/assets";
import NavigationManager from "@src/helper/NavigationManager";
import { EChatScreenList } from "@models/RouterNamesModel";
import ScaleManager from "@src/assets/ScaleManager";
import CommunicationServices from "@src/services/Communication.services";
import { useSelector } from "@src/hooks";
import HelperManager from "@src/helper/HelperManager";
import NotificationManager from "@src/helper/NotificationManager";
import { AuthenticationServices } from "@src/services";

const ChatScreen = React.memo(() => {
  const { token, isLoggedIn } = useSelector((state) => state.auth);

  const _cloudMessage = async () => {
    NavigationManager.navigate(EChatScreenList.CHAT_ROOM_SCREEN);
  };

  return (
    <View
      style={{
        ...THEMES.container,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={_cloudMessage}
        style={{
          width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
          height: ScaleManager.BUTTON_HEIGHT,
          borderRadius: 8,
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
          backgroundColor: COLORS.mainColor,
          flexDirection: "row",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <FastImageComponent
          uri={
            "https://img.freepik.com/free-photo/smiling-pretty-doctor-standing-hospital-office-with-paper-folder_1098-18884.jpg?w=2000&t=st=1676797270~exp=1676797870~hmac=3022b588043c6a78c81af26cdb5724f6d4c0c50d850e5fbda9fcb0c59934b3ce"
          }
          pictureStyle={{
            height: 40,
            width: 40,
            borderRadius: 100,
          }}
        />
        <Text style={[THEMES.commonRegularText, { color: "white", paddingLeft: 20, fontSize: 14 }]}>
          {" "}
          Chat with Clinic Assistant
        </Text>
      </TouchableOpacity>
    </View>
  );
});

ChatScreen.displayName = "ChatScreen";
export default ChatScreen;
