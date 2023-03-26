import React from "react";
import { useTranslate } from "@src/hooks";
import { IPersonalAddress, IPersonalAddressScreenProps } from "./Model.PersonalAddressScreen";
import HelperManager from "@src/helper/HelperManager";
import NavigationManager from "@src/helper/NavigationManager";
import { EGuestScreenList } from "@src/models/RouterNamesModel";

const ViewModel = (input: IPersonalAddressScreenProps) => {
  const { firstName, middleName, lastName, email, phoneNumber, dateOfBirth, activationCode, dialCode, country } = input;
  const translate = useTranslate();
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [ward, setWard] = React.useState("");
  const [address, setAddress] = React.useState("");

  const personalAddressData: IPersonalAddress[] = [
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
  ];

  const canNext = React.useMemo(() => {
    return [state, city, district, address].every((s) => !HelperManager.checkInvalidity(s));
  }, [address, city, district, state]);

  const _handleGoToNextScreen = React.useCallback(() => {
    NavigationManager.navigate(
      !!activationCode ? EGuestScreenList.CREATE_NEW_PASSWORD_SCREEN : EGuestScreenList.SELECT_CLINIC_SCREEN,
      {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth,
        activationCode,
        state,
        city,
        district,
        ward,
        address,
        clinicId: "",
        dialCode,
        country,
      },
    );
  }, [
    dialCode,
    activationCode,
    address,
    city,
    dateOfBirth,
    district,
    email,
    country,
    firstName,
    lastName,
    middleName,
    phoneNumber,
    state,
    ward,
  ]);

  return {
    canNext,
    translate,
    personalAddressData,
    _handleGoToNextScreen,
  };
};

export default ViewModel;
