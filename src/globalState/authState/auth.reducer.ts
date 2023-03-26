import EAuthActionTypes from "./auth.types";
import persistReducer from "redux-persist/lib/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IActionAuth, IAuthReducer } from "./auth.model";
import { IMAGES } from "@src/assets";

export const defaultState: IAuthReducer = {
  userProfile: {
    language: "",
    country: "",
    middleName: "",
    dialCode: 0,
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: new Date(),
    state: "",
    city: "",
    district: "",
    ward: "",
    address: "",
    id: "",
    active: true,
    name: "",
    username: "",
    type: "Patient",
    gender: null,
    avatar: IMAGES.defaultImage,
  },
  token: {
    access_token: "",
    refresh_expires_in: 0,
    expires_in: 0,
    scope: "",
    session_state: "",
    token_type: "",
    refresh_token: "",
  },
  loginMarkTime: new Date(),
  isLoggedIn: false,
};

const AuthReducer = (state = defaultState, action: IActionAuth) => {
  switch (action.type) {
    case EAuthActionTypes.LOGIN_SUCCESS: {
      return { ...state, token: action.payload, isLoggedIn: true };
    }

    case EAuthActionTypes.SET_LOG_OUT: {
      return { ...defaultState };
    }

    case EAuthActionTypes.SET_PATIENT_PROFILE: {
      return { ...state, userProfile: action.payload };
    }

    case EAuthActionTypes.SET_LOGIN_MARK_TIME: {
      return { ...state, loginMarkTime: action.payload };
    }

    default:
      return state;
  }
};

const authPersistConfig = {
  key: "AuthReducer",
  storage: AsyncStorage,
  whitelist: ["userProfile", "token", "loginMarkTime"],
};

export default persistReducer(authPersistConfig, AuthReducer);
