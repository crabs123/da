import { ICustomizedCalendar } from "@src/components/CalendarComponent/Model.CalendarComponent";
import { EAvailableLanguages } from "@src/languages/LanguagesManager";
import EUniversalActionTypes from "./universal.types";

export interface IUniversalReducer {
  loading: boolean;
  language: string;
  keyboard_height: number;
  selectedDates: ICustomizedCalendar;
  selectedMonth: string;
}

export interface IShowLoadingAction {
  type: EUniversalActionTypes.SHOW_LOADING;
  payload: boolean;
}

export interface ICloseLoadingAction {
  type: EUniversalActionTypes.CLOSE_LOADING;
  payload: boolean;
}

export interface ISwitchLanguageAction {
  type: EUniversalActionTypes.SWITCH_LANGUAGE;
  payload: EAvailableLanguages;
}

export interface ISetKeyboardHeightAction {
  type: EUniversalActionTypes.SET_KEYBOARD_HEIGHT;
  payload: number;
}

export interface IUpdateCustomDateAction {
  type: EUniversalActionTypes.UPDATE_CUSTOM_DATES;
  payload: ICustomizedCalendar;
}

export interface ISetSelectMonthAction {
  type: EUniversalActionTypes.UPDATE_MONTH_NAME;
  payload: string;
}

export type TUniversalActions =
  | ICloseLoadingAction
  | IShowLoadingAction
  | IUpdateCustomDateAction
  | ISwitchLanguageAction
  | ISetSelectMonthAction
  | ISetKeyboardHeightAction;
