import { COLORS, ICONS } from "@src/assets";
import PHONE_CODES_AND_LINKS, { INation } from "@src/assets/phone_code_and_links";
import ScaleManager from "@src/assets/ScaleManager";
import {
  BackgroundHeaderComponent,
  DismissKeyboardComponent,
  DropdownComponent,
  HeaderComponent,
  InputComponent,
  WheelPickerComponent,
} from "@src/components";
import HelperManager from "@src/helper/HelperManager";
import { useSharedData } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import { CountryCode } from "libphonenumber-js";
import React from "react";
import { Animated, Modal, ScrollView, Text, TextInputProps, TouchableOpacity, View } from "react-native";
import styles from "./Styles.UpdateProfileScreen";
import ViewModel from "./ViewModel.UpdateProfileScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const UpdateProfileScreen = React.memo(() => {
  const {
    _onShow,
    _onBlur,
    timeArr,
    country,
    _onFocus,
    canSubmit,
    translate,
    setCountry,
    errorPhone,
    phoneNumber,
    _closeModal,
    modalVisible,
    clinicAddress,
    setErrorPhone,
    personalFields,
    setPhoneNumber,
    _onRequestClose,
    setClinicAddress,
    dateOfBirthValue,
    dateOfBirthError,
    selectDropdownFocus,
    personalAddressList,
    _handleUpdateProfile,
    _handleOpenModalPicker,
    _handleConfirmDateOfBirth,
  } = ViewModel();
  const { colorUpdate } = useSharedData();

  const _renderPhoneDialItem = React.useCallback(
    (item: INation) => {
      const isChecked = country.code === item.code;

      return (
        <React.Fragment>
          <View key={item.code} style={colorUpdate(styles.itemDropdown)}>
            <View style={colorUpdate(styles.dialCodeTextContainer)}>
              <Text style={colorUpdate(styles.dialCodeText)}>
                {item.emoji} {item.dial_code}
              </Text>
            </View>

            <View style={colorUpdate(styles.checkIconContainer)}>{ICONS.CheckedIcon({ isChecked })}</View>
          </View>
        </React.Fragment>
      );
    },
    [colorUpdate, country.code],
  );

  const _renderPhoneNumberOptions = React.useCallback(() => {
    return (
      <View style={styles.phoneNumberContainer}>
        <DropdownComponent
          style={colorUpdate(styles.dropdownContainerStyle(errorPhone))}
          containerStyle={[colorUpdate(styles.containerDropdown), { height: ScaleManager.scaleSizeHeight(300) }]}
          data={PHONE_CODES_AND_LINKS}
          maxHeight={ScaleManager.scaleSizeHeight(300)}
          placeholder={`${country.emoji} +${country.dial_code}`}
          labelField="label"
          valueField="dial_code"
          value={country}
          onChange={(item: INation) => {
            setCountry(Object.assign({}, item));
          }}
          renderItem={_renderPhoneDialItem}
          onFocus={_onFocus}
          onBlur={_onBlur}
          showsVerticalScrollIndicator={false}
          renderRightIcon={() => (
            <View style={colorUpdate(styles.rightIconDropdownStyle(true))}>
              {ICONS.DropdownIcon({ active: selectDropdownFocus })}
            </View>
          )}
        />

        <InputComponent
          {...{
            keyboardType: "number-pad",
            customTextInputStyle: colorUpdate(styles.phoneNumberInput) as Pick<TextInputProps, "style">,
            value: phoneNumber,
            setValue: setPhoneNumber,
            maxLength: 11,
            customerErrorTextStyle: {
              transform: [{ translateX: -ScaleManager.PADDING_SIZE }],
            },
            errorMessageText: "Invalid Phone number",
            onBlur: (trueCallBack, falseCallback) => (e) => {
              const { text } = e.nativeEvent;
              const passConditions = [] as RegExp[];
              if (
                !HelperManager.isValid(text, passConditions) ||
                !HelperManager.isValidPhoneNumber(text, country.code as CountryCode)
              ) {
                falseCallback();
                setErrorPhone(true);
              } else {
                trueCallBack();
                setErrorPhone(false);
              }
            },
          }}
        />
      </View>
    );
  }, [
    colorUpdate,
    errorPhone,
    country,
    _renderPhoneDialItem,
    _onFocus,
    _onBlur,
    phoneNumber,
    setPhoneNumber,
    setCountry,
    selectDropdownFocus,
    setErrorPhone,
  ]);

  const _rangeTimePicker = React.useCallback(() => {
    return (
      <Modal
        onShow={_onShow}
        transparent={true}
        onRequestClose={_onRequestClose}
        visible={modalVisible}
        animationType="slide"
      >
        <View style={styles.modalContentContainer}>
          <Animated.View style={styles.rangeTimePickerContainer}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={_handleConfirmDateOfBirth} style={styles.confirmContainer}>
                <Text style={styles.confirmText}>{translate(ELanguageOptions.confirm)}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={_closeModal} style={styles.closeIconContainer}>
                {ICONS.CloseMarkIcon()}
              </TouchableOpacity>
            </View>
            <View style={styles.subHeaderContainer}>
              <Text style={styles.dateUnitText}>{translate(ELanguageOptions.day)}</Text>
              <Text style={styles.dateUnitText}>{translate(ELanguageOptions.month)}</Text>
              <Text style={styles.dateUnitText}>{translate(ELanguageOptions.year)}</Text>
            </View>
            <View style={styles.modalContentContainer}>
              <View style={styles.timeWrapper}>
                {timeArr.map((t) => (
                  <WheelPickerComponent
                    key={t.id}
                    containerStyle={styles.wheelContainer}
                    keyProps={t.key}
                    itemHeight={ScaleManager.scaleSizeHeight(50)}
                    itemStyle={{
                      backgroundColor: COLORS.lightCornFlowerBlue10,
                    }}
                    itemTextStyle={styles.timeTextStyle}
                    onChange={t.setValue}
                    selectedIndex={t.value}
                    options={t.options}
                  />
                ))}
              </View>
            </View>
          </Animated.View>
        </View>
        {!!dateOfBirthError && (
          <View style={styles.innerTextContainer}>
            <Text style={styles.innerErrorText}>{dateOfBirthError}</Text>
          </View>
        )}
      </Modal>
    );
  }, [
    _onShow,
    _onRequestClose,
    modalVisible,
    _handleConfirmDateOfBirth,
    translate,
    _closeModal,
    timeArr,
    dateOfBirthError,
  ]);

  const _renderFields = React.useCallback(() => {
    const output: JSX.Element[] = [];

    for (const field of personalFields) {
      output.push(
        <React.Fragment key={field.id}>
          <Text style={colorUpdate(styles.textInputTitle)}>{field.label}</Text>
          <InputComponent
            {...{
              value: field.value,
              setValue: field.setValue,
              keyboardType: field.keyboardType,
              onBlur: field.onBlur,
              errorMessageText: field.errorMessage,
            }}
          />
        </React.Fragment>,
      );
    }

    return output;
  }, [personalFields, colorUpdate]);

  const _renderAddressFields = React.useCallback(() => {
    const output: JSX.Element[] = [];

    for (const field of personalAddressList) {
      output.push(
        <React.Fragment key={field.id}>
          <Text style={colorUpdate(styles.textInputTitle)}>{field.label}</Text>
          <InputComponent
            {...{
              value: field.value,
              setValue: field.setValue,
              keyboardType: field.keyboardType,
              onBlur: field.onBlur,
              errorMessageText: field.errorMessage,
            }}
          />
        </React.Fragment>,
      );
    }

    return output;
  }, [personalAddressList, colorUpdate]);

  return (
    <DismissKeyboardComponent>
      <View style={colorUpdate(styles.wrapperContainer)}>
        <BackgroundHeaderComponent>
          <HeaderComponent
            showFullMiddleTitle={true}
            mainTitle={translate(ELanguageOptions.user_profile)}
            transparentBackground={true}
          />
        </BackgroundHeaderComponent>
        <ScrollView showsVerticalScrollIndicator={false} style={colorUpdate(styles.container)}>
          <Text style={styles.updateAccountTitle}>{translate(ELanguageOptions.update_account_details)}</Text>
          <KeyboardAwareScrollView
            extraScrollHeight={-ScaleManager.scaleSizeHeight(120)}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionText}>{translate(ELanguageOptions.personal_info)}</Text>
            {_renderFields()}
            <Text style={colorUpdate(styles.textInputTitle)}>{translate(ELanguageOptions.phone_number)}</Text>
            {_renderPhoneNumberOptions()}

            <Text style={colorUpdate(styles.textInputTitle)}>{translate(ELanguageOptions.date_of_birth)}</Text>

            <TouchableOpacity onPress={_handleOpenModalPicker} style={styles.birthOfDateContainer}>
              <View style={colorUpdate(styles.birthOfDateWrapperStyle(dateOfBirthError))}>
                <Text style={colorUpdate(styles.birthOfDateTextStyle(dateOfBirthValue))}>
                  {!!dateOfBirthValue ? dateOfBirthValue : `dd\\mm\\yyyy`}
                </Text>
              </View>
              <View style={colorUpdate(styles.customRightIconContainer)}>{ICONS.CalendarIcon()}</View>
            </TouchableOpacity>
            {!!dateOfBirthError && <Text style={styles.errorText}>{dateOfBirthError}</Text>}

            <Text style={styles.sectionText}>{translate(ELanguageOptions.personal_address)}</Text>
            {_renderAddressFields()}

            <Text style={styles.sectionText}>{translate(ELanguageOptions.clinic)}</Text>
            <Text style={colorUpdate(styles.textInputTitle)}>{translate(ELanguageOptions.clinic_address)}</Text>
            <InputComponent
              {...{
                value: clinicAddress,
                setValue: setClinicAddress,
                keyboardType: "default",
                onBlur: (trueCallBack, falseCallback) => (e) => {
                  const { text } = e.nativeEvent;
                  const passConditions = [] as RegExp[];
                  if (!HelperManager.isValid(text, passConditions)) {
                    falseCallback();
                  } else {
                    trueCallBack();
                  }
                },
                errorMessageText: "Invalid address",
                editable: false,
                selectTextOnFocus: false,
              }}
            />
            <View style={styles.separator} />
          </KeyboardAwareScrollView>
          <TouchableOpacity
            disabled={!canSubmit}
            onPress={_handleUpdateProfile}
            style={colorUpdate(styles.nextButtonContainerStyle(canSubmit))}
          >
            <Text style={colorUpdate(styles.nextTextStyle(canSubmit))}>
              {translate(ELanguageOptions.update_information)}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {_rangeTimePicker()}
    </DismissKeyboardComponent>
  );
});

UpdateProfileScreen.displayName = "UpdateProfileScreen";
export default UpdateProfileScreen;
