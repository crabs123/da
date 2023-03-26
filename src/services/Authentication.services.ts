import { EGrantTypes, ILoginProps, IToken } from "../globalState/authState/auth.model";
import { IResponse } from "@src/models/CommonModel";
import {
  IForgotPasswordParams,
  IPushTokenDeviceApi,
  IRegisterApiParams,
  IRegisterSuccessResponse,
  IResetPasswordParams,
  IUserDevice,
  IVerifyOtpParams,
} from "@src/models/AuthenticationServicesModel";
import ServicesManager from "@src/helper/ServicesManager";
import axios from "axios";
import { IPatientProfile } from "../models/AuthenticationServicesModel";

class AuthenticationServices {
  private static axiosInstance = new ServicesManager(ServicesManager.DEFAULT_URL).getAxiosInstance(false);
  private static keyCloakApi = "https://keycloak.fsdhp.com/realms/master/protocol/openid-connect/token";

  private static client_secret = "Kqaa1dRmIk5YIHnviexQO3NsRrREClNi";

  public static loginApi = (params: ILoginProps): Promise<IToken> => {
    return axios
      .post(
        this.keyCloakApi,
        {
          ...params,
          grant_type: EGrantTypes.password,
          client_secret: this.client_secret,
          client_id: "dhp",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
      .then((res) => res.data);
  };

  public static regainAccessTokenApi = (refresh_token: string): Promise<IToken> => {
    return axios
      .post(
        this.keyCloakApi,
        {
          refresh_token,
          grant_type: EGrantTypes.refresh_token,
          client_secret: this.client_secret,
          client_id: "dhp",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
      .then((res) => res.data);
  };

  public static registerNewDeviceApi = (
    params: IUserDevice,
  ): Promise<{ deviceId: string; deviceName: string; status: boolean }> => {
    return this.axiosInstance.post(`mobile-device/`, params).then((res) => res.data);
  };

  public static pushTokenDeviceApi = (params: IPushTokenDeviceApi): Promise<IPushTokenDeviceApi> => {
    return this.axiosInstance.post(`mobile-device/token/`, params).then((res) => res.data);
  };

  public static registerApi = (params: IRegisterApiParams): Promise<IResponse<IRegisterSuccessResponse>> => {
    return this.axiosInstance.post(`auth/signup`, params).then((res) => res.data);
  };

  public static getProfileApi = (): Promise<IResponse<IPatientProfile>> => {
    return this.axiosInstance.get(`auth/me`).then((res) => res.data);
  };

  public static updateProfileApi = (): Promise<IResponse<IPatientProfile>> => {
    return this.axiosInstance.put(`auth/me`).then((res) => res.data);
  };

  public static forgotPasswordApi = (params: IForgotPasswordParams): Promise<IResponse<null>> => {
    return this.axiosInstance.post(`auth/forgot-password`, params).then((res) => res.data);
  };

  public static resetPasswordApi = (params: IResetPasswordParams): Promise<IResponse<null>> => {
    return this.axiosInstance.post(`auth/reset-password`, params).then((res) => res.data);
  };

  public static verifyOtpApi = (params: IVerifyOtpParams): Promise<IResponse<{ data: boolean }>> => {
    return this.axiosInstance.post(`auth/verify-otp`, params).then((res) => res.data);
  };

  public static checkUsernameExistApi = (username: string) => {
    return this.axiosInstance.get(`auth/user-availability?username=${username}`).then((res) => res.data);
  };

  public static deleteAccountApi = () => {
    return this.axiosInstance.delete(`auth/me`).then((res) => res.data);
  };
}

export default AuthenticationServices;
