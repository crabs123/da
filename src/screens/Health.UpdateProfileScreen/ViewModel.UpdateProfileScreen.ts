import PHONE_CODES_AND_LINKS, { INation } from "@src/assets/phone_code_and_links";
import React from "react";
import { useSelector, useTranslate } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import HelperManager from "@src/helper/HelperManager";
import { DateManager } from "@helper/DateManager";
import { ETime, IPersonalField } from "../Auth.PersonalDetailsScreen/Model.PersonalDetailScreen";
import { IPatientProfile } from "../../models/AuthenticationServicesModel";
import moment from "moment";

const ViewModel = () => {
  const { userProfile } = useSelector((state) => state.auth);
  const conditionalValue = React.useCallback(
    (key: keyof IPatientProfile) => {
      if (HelperManager.checkInvalidity(userProfile[key])) {
        return "";
      }
      return userProfile[key] as string;
    },
    [userProfile],
  );

  const translate = useTranslate();
  const [firstName, setFirstName] = React.useState(conditionalValue("firstName"));
  const [middleName, setMiddleName] = React.useState(conditionalValue("middleName"));
  const [lastName, setLastName] = React.useState(conditionalValue("lastName"));
  const [email, setEmail] = React.useState(conditionalValue("email"));
  const [phoneNumber, setPhoneNumber] = React.useState(conditionalValue("phoneNumber"));
  const [dateOfBirthError, setDateOfBirthError] = React.useState("");
  const [canSubmit, setCanSubmit] = React.useState(true);
  const [hasUserOpenedModal, setHasUserOpenedModal] = React.useState(true);
  const [country, setCountry] = React.useState<INation>(
    PHONE_CODES_AND_LINKS.find((p) => parseInt(p.dial_code) === userProfile.dialCode ?? 84) as INation,
  );
  const [selectDropdownFocus, setSelectDropdownFocus] = React.useState(false);
  const [state, setState] = React.useState(conditionalValue("state"));
  const [city, setCity] = React.useState(conditionalValue("city"));
  const [district, setDistrict] = React.useState(conditionalValue("district"));
  const [ward, setWard] = React.useState(conditionalValue("ward"));
  const [address, setAddress] = React.useState(conditionalValue("address"));
  const [clinicAddress, setClinicAddress] = React.useState("ABC Clinic, 9 X Street, Bronx, NY 10200, U.S");

  const dayRange = React.useMemo(
    () => [...Array.from({ length: 31 }, (_, i) => i + 1).map((s) => (s < 10 ? `0${s}` : `${s}`))],
    [],
  );
  const monthRange = React.useMemo(() => [...Array.from({ length: 12 }, (_, i) => i + 1).map((s) => `${s}`)], []);
  const yearRange = React.useMemo(
    () => [...Array.from({ length: new Date().getFullYear() + 1 - 1900 }, (_, i) => i + 1900).map((s) => `${s}`)],
    [],
  );
  const [dayIndex, setDayIndex] = React.useState(
    dayRange.findIndex((d) => moment(userProfile.dateOfBirth).format("DD") === d),
  );
  const [monthIndex, setMonthIndex] = React.useState(
    monthRange.findIndex((d) => moment(userProfile.dateOfBirth).format("M") === d),
  );
  const [yearIndex, setYearIndex] = React.useState(
    yearRange.findIndex((d) => moment(userProfile.dateOfBirth).format("YYYY") === d),
  );

  const [modalVisible, setModalVisible] = React.useState(false);

  const [errorPhone, setErrorPhone] = React.useState(false);
  const _handleOpenModalPicker = React.useCallback(() => {
    setModalVisible(true);
  }, []);

  const _onRequestClose = React.useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const _handleOnTimeChange = React.useCallback(
    (type: ETime) => (index: number) => {
      switch (type) {
        case ETime.day:
          if (index >= 0) {
            setDayIndex(index);
          }
          break;

        case ETime.month:
          if (index >= 0) {
            setMonthIndex(index);
          }
          break;

        default:
          if (index >= 0) {
            setYearIndex(index);
          }
          break;
      }
    },
    [],
  );

  const timeArr = React.useMemo(
    () => [
      {
        id: "1",
        value: dayIndex,
        setValue: _handleOnTimeChange(ETime.day),
        options: dayRange,
        key: "day",
      },
      {
        id: "2",
        value: monthIndex,
        setValue: _handleOnTimeChange(ETime.month),
        options: monthRange,
        key: "month",
      },
      {
        id: "3",
        value: yearIndex,
        setValue: _handleOnTimeChange(ETime.year),
        options: yearRange,
        key: "year",
      },
    ],
    [_handleOnTimeChange, dayIndex, dayRange, monthIndex, monthRange, yearIndex, yearRange],
  );

  const personalFields: IPersonalField[] = React.useMemo(
    () => [
      {
        id: "1",
        label: translate(ELanguageOptions.first_name),
        value: firstName ?? "",
        setValue: setFirstName,
        errorMessage: "Invalid name",
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
      },
      {
        id: "2",
        label: translate(ELanguageOptions.middle_name),
        value: middleName,
        setValue: setMiddleName,
        errorMessage: "",
        keyboardType: "default",
        onBlur: () => () => {},
      },
      {
        id: "3",
        label: translate(ELanguageOptions.last_name),
        value: lastName,
        setValue: setLastName,
        errorMessage: "Invalid name",
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
      },
      {
        id: "4",
        label: translate(ELanguageOptions.email),
        value: email,
        setValue: setEmail,
        errorMessage: "Invalid email",
        keyboardType: "default",
        onBlur: (trueCallBack, falseCallback) => (e) => {
          const { text } = e.nativeEvent;
          if (!HelperManager.validateEmail(text)) {
            falseCallback();
          } else {
            trueCallBack();
          }
        },
      },
    ],
    [email, firstName, lastName, middleName, translate],
  );

  const personalAddressList: IPersonalField[] = React.useMemo(
    () => [
      {
        id: "1",
        label: "State",
        value: state,
        setValue: setState,
        errorMessage: "Invalid state",
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
      },
      {
        id: "2",
        label: "City",
        value: city,
        setValue: setCity,
        errorMessage: "Invalid city",
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
      },
      {
        id: "3",
        label: "Ward",
        value: ward,
        setValue: setWard,
        errorMessage: "Invalid ward",
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
      },
      {
        id: "4",
        label: "District",
        value: district,
        setValue: setDistrict,
        errorMessage: "Invalid district",
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
      },
      {
        id: "5",
        label: "Address",
        value: address,
        setValue: setAddress,
        errorMessage: "Invalid address",
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
      },
    ],
    [address, city, district, state, ward],
  );

  const _onFocus = React.useCallback(() => {
    setSelectDropdownFocus(true);
  }, []);

  const _onBlur = React.useCallback(() => {
    setSelectDropdownFocus(false);
  }, []);

  const timeTexts = React.useMemo(() => {
    const dayValue = dayRange.find((_, i) => i === dayIndex) as string;
    const monthValue = monthRange.find((_, i) => i === monthIndex) as string;
    const yearValue = yearRange.find((_, i) => i === yearIndex) as string;
    const dayText = parseInt(dayValue) < 10 ? `0${dayValue}` : `${dayValue}`;
    const monthText = parseInt(monthValue) < 10 ? `0${monthValue}` : `${monthValue}`;
    return {
      day: {
        value: dayValue,
        text: dayText,
      },
      month: {
        value: monthValue,
        text: monthText,
      },
      year: {
        value: yearValue,
        text: yearValue,
      },
    };
  }, [dayIndex, dayRange, monthIndex, monthRange, yearIndex, yearRange]);

  const dateOfBirthValue = React.useMemo(() => {
    if (!!timeTexts.day.value && !!timeTexts.month.value && !!timeTexts.year.value && hasUserOpenedModal) {
      return `${timeTexts.day.text.replace("00", "0")}\\${timeTexts.month.text}\\${timeTexts.year.text}`;
    }

    return "";
  }, [timeTexts, hasUserOpenedModal]);

  const _onShow = React.useCallback(() => {
    setHasUserOpenedModal(true);
  }, []);

  const _checkIsValueDate = React.useCallback(() => {
    if (
      (parseInt(timeTexts.day.value) === new Date().getDate() &&
        parseInt(timeTexts.month.value) === new Date().getMonth() + 1 &&
        parseInt(timeTexts.year.value) === new Date().getFullYear()) ||
      (DateManager.checkIsLeapYear(parseInt(timeTexts.year.value)) &&
        parseInt(timeTexts.month.value) === 2 &&
        parseInt(timeTexts.day.value) >= 29) ||
      new Date(`${timeTexts.year.text}-${timeTexts.month.text}-${timeTexts.day.text}`).getTime() -
        new Date().getTime() >=
        0
    ) {
      return false;
    }
    return true;
  }, [timeTexts]);

  const _handleConfirmDateOfBirth = React.useCallback(() => {
    if (!_checkIsValueDate()) {
      setDateOfBirthError("Invalid Date of Birth");
    } else {
      setDateOfBirthError("");
      setModalVisible(false);
    }
  }, [_checkIsValueDate]);

  const _closeModal = React.useCallback(() => {
    if (!_checkIsValueDate()) {
      setDateOfBirthError("Invalid Date of Birth");
    }
    setModalVisible(false);
  }, [_checkIsValueDate]);

  React.useEffect(() => {
    if (
      [
        firstName,
        lastName,
        phoneNumber,
        email,
        _checkIsValueDate(),
        hasUserOpenedModal,
        state,
        city,
        district,
        ward,
        address,
      ].some((v) => HelperManager.checkInvalidity(v)) ||
      !HelperManager.validateEmail(email)
    ) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
  }, [
    hasUserOpenedModal,
    firstName,
    lastName,
    phoneNumber,
    email,
    _checkIsValueDate,
    state,
    city,
    district,
    ward,
    address,
  ]);

  const _handleUpdateProfile = React.useCallback(async () => {
    try {
      // const response = await
    } catch (error) {
      console.log("📢 [ViewModel.UpdateProfileScreen.ts:397]", error);
    }
  }, []);

  return {
    address,
    _onShow,
    _onBlur,
    timeArr,
    country,
    _onFocus,
    canSubmit,
    translate,
    setAddress,
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
  };
};

export default ViewModel;
