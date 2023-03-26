import { BackgroundHeaderComponent } from "@src/components";
import React from "react";
import { Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import styles from "./Styles.UpComingPreviousAppointmentsScreen";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { COLORS, THEMES } from "@src/assets";
import UpcomingRoute from "./components/View.UpcomingRoute";
import PreviousRoute from "./components/View.PreviousRoute";
import { IRenderLabelProps } from "./Model.UpComingPreviousAppointmentsScreen";
import NavigationManager from "@src/helper/NavigationManager";
import { EAppointmentScreenList } from "../../models/RouterNamesModel";
import { useSharedData } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";

const UpComingPreviousAppointmentsScreen = React.memo(() => {
  const [index, setIndex] = React.useState(0);
  const { translate } = useSharedData();
  const layout = useWindowDimensions();
  const renderScene = SceneMap({
    upcoming: UpcomingRoute,
    previous: PreviousRoute,
  });

  const renderLabel = React.useCallback(({ route, focused }: IRenderLabelProps) => {
    return (
      <View style={styles.titleTabContainer}>
        <Text style={styles.titleTextStyle(focused)}>{route.title}</Text>
      </View>
    );
  }, []);

  const _handleGoToStepOne = React.useCallback(() => {
    NavigationManager.navigate(EAppointmentScreenList.STEP_ONE_APPOINTMENT_SCREEN);
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundHeaderComponent>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{translate(ELanguageOptions.appointments)}</Text>
        </View>
      </BackgroundHeaderComponent>
      <TouchableOpacity onPress={_handleGoToStepOne} style={styles.bookAppointmentButton}>
        <Text style={THEMES.commonMediumTextStyle(COLORS.white)}>
          {translate(ELanguageOptions.book_an_appointment)}
        </Text>
      </TouchableOpacity>

      <TabView
        navigationState={{
          index,
          routes: [
            { key: "upcoming", title: translate(ELanguageOptions.upcoming_appointment) },
            { key: "previous", title: translate(ELanguageOptions.previous_appointment) },
          ],
        }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            pressColor="transparent"
            style={styles.tabContainer}
            indicatorStyle={styles.tabIndicator}
            renderLabel={renderLabel}
          />
        )}
      />
    </View>
  );
});

UpComingPreviousAppointmentsScreen.displayName = "UpComingPreviousAppointmentsScreen";
export default UpComingPreviousAppointmentsScreen;
