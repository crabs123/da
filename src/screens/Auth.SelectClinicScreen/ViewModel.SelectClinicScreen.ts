import React from "react";
import { INewUser } from "@src/models/EntitiesModel";
import { TextInput } from "react-native";
import { EGuestScreenList } from "@src/models/RouterNamesModel";
import NavigationManager from "@src/helper/NavigationManager";

const ViewModel = (input: INewUser) => {
  const [searchValue, setSearchValue] = React.useState("");
  const inputRef = React.createRef<TextInput>();
  const [isFocus, setIsFocus] = React.useState(false);
  const [selectedClinic, setSelectedClinic] = React.useState("-1");
  const {
    ward,
    city,
    email,
    state,
    address,
    district,
    lastName,
    dialCode,
    firstName,
    middleName,
    phoneNumber,
    dateOfBirth,
    activationCode,
  } = input;

  const _handleGoToNextScreen = React.useCallback(() => {
    NavigationManager.navigate(EGuestScreenList.CREATE_NEW_PASSWORD_SCREEN, {
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
      clinicId: selectedClinic,
      dialCode,
    });
  }, [
    activationCode,
    address,
    city,
    dateOfBirth,
    district,
    email,
    firstName,
    lastName,
    middleName,
    phoneNumber,
    selectedClinic,
    state,
    ward,
    dialCode,
  ]);

  const _handleOnChangeText = React.useCallback((text: string) => {
    setSearchValue(text);
  }, []);

  const _handleOnBlur = React.useCallback(() => {
    setIsFocus(false);
  }, []);

  const _handlePressOnMask = React.useCallback(() => {
    inputRef?.current?.focus();
    setIsFocus(true);
  }, [inputRef]);

  const _handleSelectClinic = React.useCallback(
    (id: string) => () => {
      setSelectedClinic(id);
    },
    [],
  );

  return {
    isFocus,
    inputRef,
    searchValue,
    _handleOnBlur,
    selectedClinic,
    _handlePressOnMask,
    _handleOnChangeText,
    _handleSelectClinic,
    _handleGoToNextScreen,
  };
};

export default ViewModel;
