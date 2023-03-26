import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnyAction, CombinedState, combineReducers, legacy_createStore as createStore } from "redux";
import UniversalReducer from "./universalState/universal.reducer";
import AuthReducer from "./authState/auth.reducer";
import MediaReducer from "./mediaState/media.reducer";

type TGetReducerState<T> = {
  // eslint-disable-next-line no-unused-vars
  [P in keyof T]: T[P] extends (...args: any[]) => infer Q ? Q : never;
};

export type TRootState = TGetReducerState<typeof ReduxManager.rootReducer>;

class ReduxManager {
  public static rootReducer = {
    universal: UniversalReducer,
    auth: AuthReducer,
    media: MediaReducer,
  };

  private static persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["common", "auth"],
  };

  private static _resettableAppReducer = (state: CombinedState<any>, action: AnyAction) => {
    if (action.type === "LOG_OUT_ACTION") {
      state = {} as TRootState;
    }
    return combineReducers(ReduxManager.rootReducer)(state, action as any);
  };

  public static store = createStore(persistReducer(ReduxManager.persistConfig, ReduxManager._resettableAppReducer));
}

export default ReduxManager.store;
