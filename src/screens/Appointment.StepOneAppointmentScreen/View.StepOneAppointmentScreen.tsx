import { COLORS, ICONS } from "@src/assets";
import { BackgroundHeaderComponent, DropdownComponent, FastImageComponent, HeaderComponent } from "@src/components";
import { useSharedData } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import React from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./Styles.StepOneAppointmentScreen";
import ScaleManager from "@src/assets/ScaleManager";
import { EFocusTypes, FAKE_APPOINTMENT_TYPES, IAppointmentType } from "./Model.StepOneAppointmentScreen";
import HelperManager from "@src/helper/HelperManager";
import { IRenderItemProps } from "@src/models/CommonModel";
import ViewModel from "./ViewModel.StepOneAppointmentScreen";
import { IDoctor, ISpecialty } from "@src/models/AppointmentServicesModel";

const StepOneAppointmentScreen = React.memo(() => {
  const {
    _onBlur,
    canNext,
    _onFocus,
    doctorList,
    specialtyList,
    selectedDoctor,
    selectedSpecialty,
    _handleSelectDoctor,
    _handleGoToNextStep,
    setSelectedSpecialty,
    selectFocusSpecialty,
    selectFocusAppointment,
    selectedAppointmentType,
    setSelectedAppointmentType,
  } = ViewModel();
  const { translate, colorUpdate } = useSharedData();

  const _renderRightIcon = React.useCallback(
    ({ active }: { active: boolean }) =>
      () =>
        <View style={styles.rightIconDropdownStyle(active)}>{ICONS.DropdownIcon({ active: false })}</View>,
    [],
  );

  const _renderSpecialty = React.useCallback(
    (item: ISpecialty) => {
      const isChecked = item.code === selectedSpecialty.code;
      return (
        <View key={HelperManager.idGenerator()} style={styles.itemDropdown}>
          <Text style={styles.placeholderDropdown}>{item.display}</Text>

          <View style={styles.checkIcon}>
            {ICONS.CheckedIcon({ size: ScaleManager.scaleSizeHeight(24), isChecked })}
          </View>
        </View>
      );
    },
    [selectedSpecialty],
  );

  const _renderAppointmentOption = React.useCallback(
    (item: IAppointmentType) => {
      const isChecked = item.id === selectedAppointmentType.id;
      return (
        <View key={HelperManager.idGenerator()} style={styles.itemDropdown}>
          <Text style={styles.placeholderDropdown}>{item.label}</Text>

          <View style={styles.checkIcon}>
            {ICONS.CheckedIcon({ size: ScaleManager.scaleSizeHeight(24), isChecked })}
          </View>
        </View>
      );
    },
    [selectedAppointmentType],
  );

  const _renderSpecialtyOptions = React.useCallback(() => {
    return (
      <DropdownComponent
        style={styles.textInput}
        containerStyle={styles.containerDropdown}
        data={specialtyList}
        maxHeight={ScaleManager.scaleSizeHeight(300)}
        labelField="display"
        valueField="code"
        placeholderStyle={styles.placeholderText}
        placeholder={translate(ELanguageOptions.select_specialty)}
        value={selectedSpecialty}
        onChange={(item) => {
          setSelectedSpecialty(item);
        }}
        renderRightIcon={_renderRightIcon({ active: selectFocusSpecialty })}
        renderItem={_renderSpecialty}
        onFocus={_onFocus(EFocusTypes.specialty)}
        onBlur={_onBlur}
        showsVerticalScrollIndicator={false}
      />
    );
  }, [
    specialtyList,
    translate,
    selectedSpecialty,
    _renderRightIcon,
    selectFocusSpecialty,
    _renderSpecialty,
    _onFocus,
    _onBlur,
    setSelectedSpecialty,
  ]);

  const _renderAppointmentTypes = React.useCallback(() => {
    return (
      <DropdownComponent
        style={styles.textInput}
        containerStyle={styles.containerDropdown}
        data={FAKE_APPOINTMENT_TYPES}
        maxHeight={ScaleManager.scaleSizeHeight(300)}
        labelField="label"
        valueField="value"
        placeholderStyle={styles.placeholderText}
        placeholder={translate(ELanguageOptions.select_appointment_type)}
        value={selectedAppointmentType}
        onChange={(item) => {
          setSelectedAppointmentType(item);
        }}
        renderRightIcon={_renderRightIcon({ active: selectFocusAppointment })}
        renderItem={_renderAppointmentOption}
        onFocus={_onFocus(EFocusTypes.appointment)}
        onBlur={_onBlur}
        showsVerticalScrollIndicator={false}
      />
    );
  }, [
    translate,
    selectedAppointmentType,
    _renderRightIcon,
    selectFocusAppointment,
    _renderAppointmentOption,
    _onFocus,
    _onBlur,
    setSelectedAppointmentType,
  ]);

  const _renderDoctor = React.useCallback(
    ({ item }: IRenderItemProps<IDoctor>) => {
      const isSelected = item.id === selectedDoctor;
      return (
        <View style={styles.doctorItemContainer}>
          <View style={styles.doctorContentContainer}>
            <FastImageComponent
              uri={
                "https://img.freepik.com/free-photo/smiling-pretty-doctor-standing-hospital-office-with-paper-folder_1098-18884.jpg?w=2000&t=st=1676797270~exp=1676797870~hmac=3022b588043c6a78c81af26cdb5724f6d4c0c50d850e5fbda9fcb0c59934b3ce"
              }
              pictureStyle={styles.avatarImage}
            />
            <View>
              <Text style={styles.doctorNameText}>{item.doctorName}</Text>
              {/* <Text style={styles.doctorSpecialtyText}>• {item.service}</Text> */}
              {/* <Text style={styles.doctorSpecialtyText}>• {item.title}</Text> */}
              <Text style={styles.doctorSpecialtyText}>
                • {item.yearOfExperience}{" "}
                {translate(
                  item.yearOfExperience < 2
                    ? ELanguageOptions.year_of_experience
                    : ELanguageOptions.years_of_experience,
                )}
              </Text>
            </View>
          </View>

          <View style={styles.footerButton}>
            <TouchableOpacity style={styles.callOrEditButtonStyle(true)}>
              <Text style={styles.callOrEditTextStyle(true)}>{translate(ELanguageOptions.view_profile)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={_handleSelectDoctor(item.id)}
              style={{
                ...styles.callOrEditButtonStyle(false),
                backgroundColor: isSelected ? COLORS.successColor : COLORS.white,
                borderColor: !isSelected ? COLORS.mainColor : COLORS.successColor,
              }}
            >
              <Text style={styles.callOrEditTextStyle(isSelected)}>
                {isSelected ? translate(ELanguageOptions.selected) : translate(ELanguageOptions.select)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [_handleSelectDoctor, selectedDoctor, translate],
  );

  const _renderHeaderComponent = React.useCallback(() => {
    return (
      <View>
        <View style={styles.stepsContainer}>
          <View style={styles.leftStepContainer}>
            <View style={styles.activeStepNumberContainer}>
              <Text style={styles.activeStepNumberText}>1</Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.activeStepGuideText}>{translate(ELanguageOptions.select_doctor_and_service)}</Text>
            </View>
          </View>

          <View style={styles.chevBackwardIcon}>{ICONS.ChevBackWardIcon()}</View>

          <View style={styles.rightStepContainer}>
            <View style={styles.inactiveStepNumberContainer}>
              <Text style={styles.inactiveStepNumberText}>2</Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.inactiveStepGuideText}>{translate(ELanguageOptions.select_date_and_time)}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.selectTitle}>{translate(ELanguageOptions.appointment_type)}</Text>
        {_renderAppointmentTypes()}
      </View>
    );
  }, [_renderAppointmentTypes, translate]);

  const _renderFooterComponent = React.useCallback(() => {
    return (
      <View>
        <Text style={styles.selectTitle}>{translate(ELanguageOptions.select_specialty)}</Text>
        {_renderSpecialtyOptions()}
      </View>
    );
  }, [_renderSpecialtyOptions, translate]);

  const _renderDoctorList = React.useCallback(() => {
    return (
      <FlatList<IDoctor>
        data={selectedSpecialty.code !== "-1" ? doctorList : []}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={_renderDoctor}
        style={styles.flatlist}
      />
    );
  }, [selectedSpecialty.code, doctorList, _renderDoctor]);

  return (
    <View style={styles.container}>
      <BackgroundHeaderComponent>
        <HeaderComponent
          mainTitle={translate(ELanguageOptions.book_appointment)}
          transparentBackground={true}
          showBackButton={true}
        />
      </BackgroundHeaderComponent>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.bodyContainer}>
        <View style={styles.subBodyContainer}>
          {_renderHeaderComponent()}
          {_renderFooterComponent()}
          <View style={styles.container}>{_renderDoctorList()}</View>
        </View>
      </ScrollView>

      <TouchableOpacity
        disabled={!canNext}
        style={colorUpdate(styles.nextButtonContainerStyle(canNext))}
        onPress={_handleGoToNextStep}
      >
        <Text style={colorUpdate(styles.nextTextStyle(canNext))}>{translate(ELanguageOptions.next)}</Text>
      </TouchableOpacity>
    </View>
  );
});

StepOneAppointmentScreen.displayName = "StepOneAppointmentScreen";
export default StepOneAppointmentScreen;
