export interface IAuthBase {
  dialCode: number;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  dateOfBirth: string | Date;
  state: null | string;
  city: null | string;
  district: null | string;
  ward: null | string;
  address: null | string;
  country: string;
}
export interface IRegisterApiParams extends IAuthBase {
  password: string;
  type: "Patient";
  language: string;
}

export interface IPatientProfile extends IAuthBase {
  id: string;
  username: string;
  active: boolean;
  name: string;
  type: null | string;
  gender: null;
  language: string;
  avatar?: string;
}

export interface IUpdateProfileApi extends IPatientProfile {
  language: string;
  middleName: string;
}

export interface IRegisterSuccessResponse {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  name: null | string;
  phoneNumber: null | string;
}

export interface IDevice {
  deviceType: string;
  deviceToken: string;
}

export interface IPushTokenDeviceApi {
  userId: string;
  deviceId: string;
  deviceToken: string;
}

export interface IUserDevice extends IDevice {
  deviceName: string;
  userId: string;
}

export interface IForgotPasswordParams {
  username: string;
}

export interface IResetPasswordParams extends IVerifyOtpParams {
  newPassword: string;
  code: string;
}

export interface IVerifyOtpParams {
  username: string;
  code: string;
}
