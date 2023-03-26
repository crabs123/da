import persistReducer from "redux-persist/lib/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUniversalReducer, TUniversalActions } from "./universal.model";
import EUniversalActionTypes from "./universal.types";
import { EAvailableLanguages } from "@src/languages/LanguagesManager";
import ScaleManager from "@assets/ScaleManager";
import moment from "moment";
import { DEFAULT_SELECTED_DATES } from "@src/components/CalendarComponent/View.CalendarComponent";
import { DateManager } from "@src/helper/DateManager";

export const defaultState: IUniversalReducer = {
  loading: false,
  language: EAvailableLanguages.en,
  keyboard_height: ScaleManager.scaleSizeHeight(180),
  selectedMonth: moment(new Date().getTime()).format(DateManager.MONTH_NAME),
  selectedDates: DEFAULT_SELECTED_DATES,
};

const UniversalReducer = (state = defaultState, action: TUniversalActions) => {
  switch (action.type) {
    case EUniversalActionTypes.SHOW_LOADING: {
      return { ...state, loading: action.payload };
    }

    case EUniversalActionTypes.SET_KEYBOARD_HEIGHT: {
      return { ...state, keyboard_height: action.payload };
    }

    case EUniversalActionTypes.CLOSE_LOADING: {
      return { ...state, loading: action.payload };
    }

    case EUniversalActionTypes.SWITCH_LANGUAGE: {
      return { ...state, language: action.payload };
    }

    case EUniversalActionTypes.UPDATE_MONTH_NAME: {
      return { ...state, selectedMonth: action.payload };
    }

    case EUniversalActionTypes.UPDATE_CUSTOM_DATES: {
      return { ...state, selectedDates: action.payload };
    }

    default:
      return state;
  }
};

const universalPersistConfig = {
  key: "UniversalReducer",
  storage: AsyncStorage,
  whitelist: ["loading", "language", "selectedDates", "selectedMonth"],
};

const PersistedUniversalReducer = persistReducer(universalPersistConfig, UniversalReducer);
export default PersistedUniversalReducer;
