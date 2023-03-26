import { ICONS } from "@src/assets";
import { BackgroundHeaderComponent, CalendarComponent, HeaderComponent } from "@src/components";
import { useSharedData } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./Styles.StepTwoAppointmentScreen";
import ViewModel from "./ViewModel.StepTwoAppointmentScreen";

const StepTwoAppointmentScreen = React.memo(() => {
  const { canNext, _handleGoToNextStep, calendarComponentRef, CalendarComponentProps } = ViewModel();
  const { translate } = useSharedData();

  return (
    <View style={styles.container}>
      <BackgroundHeaderComponent>
        <HeaderComponent
          mainTitle={translate(ELanguageOptions.book_appointment)}
          transparentBackground={true}
          showBackButton={true}
        />
      </BackgroundHeaderComponent>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.stepsContainer}>
          <View style={styles.leftStepContainer}>
            <View style={styles.activeStepNumberContainer}>
              <Text style={styles.activeStepNumberText}>2</Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.activeStepGuideText}>{translate(ELanguageOptions.select_date_and_time)}</Text>
            </View>
          </View>

          <View style={styles.chevBackwardIcon}>{ICONS.ChevBackWardIcon()}</View>

          <View style={styles.rightStepContainer}>
            <View style={styles.inactiveStepNumberContainer}>
              <Text style={styles.inactiveStepNumberText}>3</Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.inactiveStepGuideText}>{translate(ELanguageOptions.verify)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.calendarContainer}>
          <Text style={styles.title}>{translate(ELanguageOptions.select_date)}</Text>
          <CalendarComponent {...CalendarComponentProps} ref={calendarComponentRef} />
        </View>
        <Text style={styles.calendarPickNotice}>
          {translate(ELanguageOptions.you_can_only_view_appointment_3_months)}
        </Text>
        <Text style={styles.title}>{translate(ELanguageOptions.select_time)}</Text>
        <Text style={styles.calendarPickNotice}>{translate(ELanguageOptions.duration)}: 60 minutes</Text>
      </ScrollView>
      <TouchableOpacity
        disabled={!canNext}
        style={styles.nextButtonContainerStyle(canNext)}
        onPress={_handleGoToNextStep}
      >
        <Text style={styles.nextTextStyle(canNext)}>{translate(ELanguageOptions.next)}</Text>
      </TouchableOpacity>
    </View>
  );
});

StepTwoAppointmentScreen.displayName = "StepTwoAppointmentScreen";
export default StepTwoAppointmentScreen;
