import { IPatientProfile } from "@src/models/AuthenticationServicesModel";
import AuthActionTypes from "./auth.types";

export interface ISignUpParam {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IToken {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  session_state: string;
  token_type: string;
}

export interface IAuthReducer {
  userProfile: IPatientProfile;
  token: IToken;
  loginMarkTime: Date;
  isLoggedIn: boolean;
}

export interface ILoginProps {
  username: string;
  password: string;
}

export enum EGrantTypes {
  password = "password",
  refresh_token = "refresh_token",
}

export interface ILoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: IToken;
}

export interface ISetLogoutAction {
  type: AuthActionTypes.SET_LOG_OUT;
  payload: void;
}

export interface ISetLoginMarkTimeAction {
  type: AuthActionTypes.SET_LOGIN_MARK_TIME;
  payload: Date;
}

export interface ISetPatientProfileAction {
  type: AuthActionTypes.SET_PATIENT_PROFILE;
  payload: IPatientProfile;
}

export type IActionAuth = ILoginSuccessAction | ISetLogoutAction | ISetLoginMarkTimeAction | ISetPatientProfileAction;
