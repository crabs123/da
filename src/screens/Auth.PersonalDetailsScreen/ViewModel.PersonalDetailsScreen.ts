import PHONE_CODES_AND_LINKS, { INation } from "@src/assets/phone_code_and_links";
import React from "react";
import { useDispatch, useTranslate } from "@src/hooks";
import NavigationManager from "@helper/NavigationManager";
import { EGuestScreenList } from "@src/models/RouterNamesModel";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import { ETime, IPersonalField } from "./Model.PersonalDetailScreen";
import HelperManager from "@src/helper/HelperManager";
import { DateManager } from "@helper/DateManager";
import { EMessageTypes } from "../../components/GlobalMessageComponent/Model.GlobalMessageComponent";
import { show } from "@src/components/GlobalMessageComponent/View.GlobalMessageComponent";
import AuthenticationServices from "../../services/Authentication.services";
import UniversalActions from "@src/globalState/universalState/universal.actions";

const ViewModel = (activationCode: string, _lastName: string) => {
  const dispatch = useDispatch();
  const translate = useTranslate();
  const [firstName, setFirstName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [lastName, setLastName] = React.useState(_lastName);
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [dateOfBirthError, setDateOfBirthError] = React.useState("");
  const [canNext, setCanNext] = React.useState(true);
  const [hasUserOpenedModal, setHasUserOpenedModal] = React.useState(false);
  const [country, setCountry] = React.useState<INation>(PHONE_CODES_AND_LINKS[0]);
  const [selectDropdownFocus, setSelectDropdownFocus] = React.useState(false);

  const dayRange = React.useMemo(
    () => [...Array.from({ length: 31 }, (_, i) => i + 1).map((s) => (s < 10 ? `0${s}` : `${s}`))],
    [],
  );
  const monthRange = React.useMemo(() => [...Array.from({ length: 12 }, (_, i) => i + 1).map((s) => `${s}`)], []);
  const yearRange = React.useMemo(
    () => [...Array.from({ length: new Date().getFullYear() + 1 - 1900 }, (_, i) => i + 1900).map((s) => `${s}`)],
    [],
  );

  const [dayIndex, setDayIndex] = React.useState(dayRange.findIndex((d) => parseInt(d) === new Date().getDate()));
  const [monthIndex, setMonthIndex] = React.useState(
    monthRange.findIndex((d) => parseInt(d) === new Date().getMonth() + 1),
  );
  const [yearIndex, setYearIndex] = React.useState(
    yearRange.findIndex((d) => parseInt(d) === new Date().getFullYear() - 10),
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
        value: firstName,
        setValue: setFirstName,
        errorMessage: translate(ELanguageOptions.invalid_name),
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
        errorMessage: translate(ELanguageOptions.invalid_name),
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
        errorMessage: translate(ELanguageOptions.invalid_email),
        keyboardType: "email-address",
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
      setDateOfBirthError(translate(ELanguageOptions.invalid_date_of_birth));
    } else {
      setDateOfBirthError("");
      setModalVisible(false);
    }
  }, [_checkIsValueDate, translate]);

  const _closeModal = React.useCallback(() => {
    if (!_checkIsValueDate()) {
      setDateOfBirthError(translate(ELanguageOptions.invalid_date_of_birth));
    }
    setModalVisible(false);
  }, [_checkIsValueDate, translate]);

  React.useEffect(() => {
    if (
      [firstName, lastName, phoneNumber, email, _checkIsValueDate(), hasUserOpenedModal].some((v) =>
        HelperManager.checkInvalidity(v),
      ) ||
      !HelperManager.validateEmail(email)
    ) {
      setCanNext(false);
    } else {
      setCanNext(true);
    }
  }, [hasUserOpenedModal, firstName, lastName, phoneNumber, email, _checkIsValueDate]);

  const _handleGoToPersonalAddressScreen = React.useCallback(async () => {
    dispatch(UniversalActions._showLoadingAction());
    try {
      const res = await AuthenticationServices.checkUsernameExistApi(email);
      if (!!res.data) {
        NavigationManager.navigate(EGuestScreenList.PERSONAL_ADDRESS_SCREEN, {
          firstName,
          middleName,
          lastName,
          email,
          phoneNumber,
          dateOfBirth: new Date(`${timeTexts.year.value}-${timeTexts.month.value}-${timeTexts.day.value}`),
          activationCode,
          dialCode: country.dial_code,
          country: country.name,
        });
      } else {
        show(translate(ELanguageOptions.invalid_email), EMessageTypes.failed);
      }
    } catch (error: any) {
      show(error.data.meta.message, EMessageTypes.failed);
      console.log("📢 [ViewModel.PersonalDetailsScreen.ts:262]", error);
    } finally {
      dispatch(UniversalActions._closeLoadingAction());
    }
  }, [country, dispatch, email, firstName, middleName, lastName, phoneNumber, timeTexts, activationCode, translate]);

  return {
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
  };
};

export default ViewModel;
