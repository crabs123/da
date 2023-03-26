import {
  BackgroundHeaderComponent,
  DismissKeyboardComponent,
  DropdownComponent,
  HeaderComponent,
  InputComponent,
  WheelPickerComponent,
} from "@src/components";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import React from "react";
import { Animated, Modal, ScrollView, Text, TextInputProps, TouchableOpacity, View } from "react-native";
import styles from "./Styles.PersonalDetailsScreen";
import { COLORS, ICONS } from "@src/assets";
import PHONE_CODES_AND_LINKS, { INation } from "@src/assets/phone_code_and_links";
import ScaleManager from "@assets/ScaleManager";
import ViewModel from "./ViewModel.PersonalDetailsScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSharedData } from "@src/hooks";
import HelperManager from "@src/helper/HelperManager";
import { TPersonalDetailsScreenProps } from "./Model.PersonalDetailScreen";
import { CountryCode } from "libphonenumber-js";

const PersonalDetailsScreen: React.FC<TPersonalDetailsScreenProps> = React.memo(({ route }) => {
  const { activationCode, lastName } = route?.params;

  const {
    _onShow,
    canNext,
    _onBlur,
    timeArr,
    country,
    _onFocus,
    translate,
    setCountry,
    errorPhone,
    phoneNumber,
    _closeModal,
    modalVisible,
    setErrorPhone,
    personalFields,
    setPhoneNumber,
    _onRequestClose,
    dateOfBirthValue,
    dateOfBirthError,
    selectDropdownFocus,
    _handleOpenModalPicker,
    _handleConfirmDateOfBirth,
    _handleGoToPersonalAddressScreen,
  } = ViewModel(activationCode, lastName);
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
            errorMessageText: translate(ELanguageOptions.invalid_phone_number),
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
    translate,
    setCountry,
    selectDropdownFocus,
    setErrorPhone,
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

  return (
    <DismissKeyboardComponent>
      <View style={colorUpdate(styles.wrapperContainer)}>
        <ScrollView showsVerticalScrollIndicator={false} style={colorUpdate(styles.container)}>
          <BackgroundHeaderComponent>
            <HeaderComponent mainTitle={translate(ELanguageOptions.personal_details)} transparentBackground={true} />
          </BackgroundHeaderComponent>
          <KeyboardAwareScrollView
            extraScrollHeight={-ScaleManager.scaleSizeHeight(150)}
            showsVerticalScrollIndicator={false}
          >
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
          </KeyboardAwareScrollView>
        </ScrollView>
        <TouchableOpacity
          disabled={!canNext}
          onPress={_handleGoToPersonalAddressScreen}
          style={colorUpdate(styles.nextButtonContainerStyle(canNext))}
        >
          <Text style={colorUpdate(styles.nextTextStyle(canNext))}>{translate(ELanguageOptions.next)}</Text>
        </TouchableOpacity>
      </View>
      {_rangeTimePicker()}
    </DismissKeyboardComponent>
  );
});

PersonalDetailsScreen.displayName = "PersonalDetailsScreen";
export default PersonalDetailsScreen as React.ComponentType;
