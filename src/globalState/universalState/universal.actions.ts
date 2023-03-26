import { ICustomizedCalendar } from "@src/components/CalendarComponent/Model.CalendarComponent";
import { EAvailableLanguages } from "@src/languages/LanguagesManager";
import EUniversalActionTypes from "./universal.types";

class UniversalActions {
  public static _showLoadingAction() {
    return { type: EUniversalActionTypes.SHOW_LOADING, payload: true };
  }

  public static _closeLoadingAction() {
    return { type: EUniversalActionTypes.CLOSE_LOADING, payload: false };
  }

  public static _switchLanguageAction(payload: EAvailableLanguages) {
    return { type: EUniversalActionTypes.SWITCH_LANGUAGE, payload };
  }

  public static _setKeyboardHeightAction(payload: number) {
    return { type: EUniversalActionTypes.SET_KEYBOARD_HEIGHT, payload };
  }

  public static _updateMonthNameAction(payload: string) {
    return { type: EUniversalActionTypes.UPDATE_MONTH_NAME, payload };
  }

  public static _updateCustomDateAction = (input: ICustomizedCalendar) => {
    return {
      type: EUniversalActionTypes.UPDATE_CUSTOM_DATES,
      payload: input,
    };
  };
}

export default UniversalActions;
