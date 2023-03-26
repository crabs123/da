import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ANIMATIONS, COLORS, ICONS, THEMES } from "@src/assets";
import LottieView from "lottie-react-native";
import HelperManager from "@src/helper/HelperManager";
import ScaleManager from "@src/assets/ScaleManager";
import { SwitchComponent } from "@src/components";
import { EDeviceEmitter, emitter } from "@src/hooks/useEmitter";
import NotificationManager from "@src/helper/NotificationManager";

const SettingScreen = React.memo(() => {
  const animationRef = React.useRef<LottieView>(null);

  const [drunkCups, setDrunkCups] = React.useState(0);

  const _handleDrinkMore = React.useCallback(async () => {
    animationRef.current?.play();
    setDrunkCups((prev) => prev + 1);
    await HelperManager.delayer(1900);
    animationRef.current?.reset();
  }, []);

  const [switchOff, setSwitchOff] = React.useState(false);

  const _handleSwitch = React.useCallback(() => {
    setSwitchOff((prev) => {
      return !prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={THEMES.container}>
      <View>
        <View style={{ flexDirection: "row", marginTop: 100 }}>
          <TouchableOpacity
            onPress={_handleDrinkMore}
            style={{
              height: ScaleManager.BUTTON_HEIGHT,
              width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
              borderRadius: 8,
              backgroundColor: COLORS.successColor,
              ...THEMES.commonShadow,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              position: "absolute",
              zIndex: 4,
            }}
          >
            <Text style={THEMES.commonMediumTextStyle("white")}>Drink +1 cup {drunkCups}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            margin: 50,
          }}
        >
          <LottieView
            style={{
              height: 200,
              width: 200,
              alignSelf: "center",
              position: "relative",
            }}
            ref={animationRef}
            source={ANIMATIONS.drinkWater}
            duration={2000}
          />
          <View
            style={{
              position: "absolute",
              borderRadius: 200,
              width: 200,
              height: 200,
              borderWidth: 2,
              borderColor: COLORS.infoColor,
              alignSelf: "center",
            }}
          />
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          paddingBottom: 20,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Text style={THEMES.commonRegularText}>Turn off Reminder</Text>

        <SwitchComponent
          isOn={switchOff}
          onColor={COLORS.mainColor}
          offColor={COLORS.lightTwoColor}
          onToggle={_handleSwitch}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            NotificationManager.pushLocalNotification({
              title: "Test Notification",
              body: "Drink more water",
            });

            emitter(EDeviceEmitter.RING_NOTIFICATION_ICON);
          }}
          style={{
            height: ScaleManager.BUTTON_HEIGHT,
            width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
            borderRadius: 8,
            backgroundColor: COLORS.successColor,
            ...THEMES.commonShadow,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text style={THEMES.commonMediumTextStyle("white")}>Test Notification</Text>
        </TouchableOpacity>
        <View
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          {ICONS.NotificationNewIcon({ focused: true })}
        </View>
      </View>
    </View>
  );
});

SettingScreen.displayName = "SettingScreen";
export default SettingScreen;
