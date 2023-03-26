import { COLORS, ICONS, THEMES } from "@src/assets";
import { BackgroundHeaderComponent, HeaderComponent } from "@src/components";
import { useSharedData } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./Styles.AppointmentBookSuccessScreen";
import NavigationManager from "@helper/NavigationManager";
import moment from "moment";
import { EAppointmentScreenList } from "../../models/RouterNamesModel";

const AppointmentBookSuccessScreen = React.memo(() => {
  const { translate } = useSharedData();
  const _handleGoToNextScreen = React.useCallback(() => {
    const param = {};
    NavigationManager.navigate(EAppointmentScreenList.APPOINTMENT_DETAIL_SCREEN, param);
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundHeaderComponent>
        <HeaderComponent
          mainTitle={translate(ELanguageOptions.appointments)}
          transparentBackground={true}
          showBackButton={true}
          customBackFunction={NavigationManager.popToTop}
        />
      </BackgroundHeaderComponent>

      <View style={styles.bodyContainer}>
        <View style={styles.iconWrapper}>{ICONS.SuccessIcon()}</View>
        <Text style={styles.message}>{translate(ELanguageOptions.thank_you)}</Text>
        <Text style={styles.message}>{translate(ELanguageOptions.your_appointment_is_confirmed)}</Text>
      </View>

      <View style={styles.wrapper}>
        <View>
          <Text style={styles.timeTextStyle}>{moment(new Date()).format("dddd, Do MMM YYYY, HH:mm A")}</Text>
          <View style={styles.rowText}>
            <Text style={styles.title}>{translate(ELanguageOptions.short_appointment_type)}</Text>
            <Text style={styles.value}>{"Routine check-up"}</Text>
          </View>

          <View style={styles.rowText}>
            <Text style={styles.title}>{translate(ELanguageOptions.clinic)}</Text>
            <Text style={styles.value}>{"No.1 Clinic"}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={_handleGoToNextScreen} style={styles.buttonContainer}>
          <Text style={THEMES.commonRegularTextStyle(COLORS.primaryOrange)}>
            {translate(ELanguageOptions.view_details)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

AppointmentBookSuccessScreen.displayName = "AppointmentBookSuccessScreen";
export default AppointmentBookSuccessScreen;
