import { TOnBlur } from "@src/components/InputComponent/Model.InputComponent";
import { IRoute } from "@src/models/CommonModel";
import { KeyboardTypeOptions } from "react-native";

export interface IPersonalAddressScreenProps {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  activationCode: string;
  dialCode: string;
  country: string;
}

export type TPersonalAddressScreenProps = IRoute<IPersonalAddressScreenProps>;

export interface IAddress {
  label: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export interface IPersonalAddress {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  keyboardType: KeyboardTypeOptions;
  id: string;
  onBlur: TOnBlur;
}
