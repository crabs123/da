import { IRoute } from "@src/models/CommonModel";
import { KeyboardTypeOptions } from "react-native";
import { TOnBlur } from "@components/InputComponent/Model.InputComponent";

export type TPersonalDetailsScreenProps = IRoute<{
  activationCode: string;
  lastName: string;
}>;

export interface IPersonalField {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  keyboardType: KeyboardTypeOptions;
  id: string;
  onBlur: TOnBlur;
}

export enum ETime {
  day,
  month,
  year,
}
