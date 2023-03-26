import { TOnBlur } from "@src/components/InputComponent/Model.InputComponent";
import { IRoute } from "@src/models/CommonModel";
import { INewUser } from "@src/models/EntitiesModel";
import { KeyboardTypeOptions } from "react-native";

export type TCreateNewPwScreenProps = IRoute<INewUser>;

export interface ITextInputField {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  keyboardType: KeyboardTypeOptions;
  id: string;
  onBlur: TOnBlur;
  onHidePasswordIcon: any;
  hidePassword: boolean;
}
