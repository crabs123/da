import { IToken } from "./auth.model";
import EAuthActionTypes from "./auth.types";
import { IPatientProfile } from "../../models/AuthenticationServicesModel";

class AuthActions {
  public static _loginSuccessAction = (input: IToken) => {
    return { type: EAuthActionTypes.LOGIN_SUCCESS, payload: input };
  };

  public static _logoutAction = () => {
    return { type: EAuthActionTypes.SET_LOG_OUT };
  };

  public static _setLoginMarkTimeAction = (input: Date) => {
    return { type: EAuthActionTypes.SET_LOGIN_MARK_TIME, payload: input };
  };

  public static _setPatientProfileAction = (input: IPatientProfile) => {
    return { type: EAuthActionTypes.SET_PATIENT_PROFILE, payload: input };
  };
}

export default AuthActions;
