import axios, { AxiosError } from "axios";
import LoggerManager from "@src/helper/LoggerManager";
import ResponseStatusCode from "@src/helper/ResponseStatusCode";
import store, { TRootState } from "@src/globalState/ReduxManager";
import EAuthActionTypes from "@src/globalState/authState/auth.types";
import HelperManager from "./HelperManager";
import { CurlHelper } from "./CurlManager";
import AuthenticationServices from "../services/Authentication.services";
import AuthActions from "@src/globalState/authState/auth.actions";

export class ServicesManager {
  //NOTE: set min res time to avoid unwanted quick response => ugly UI
  private static readonly MIN_RESPONSE_TIME = 500;

  public static COMMUNICATION_URL = "https://video.fsdhp.com/";

  public static DEFAULT_URL = "https://api.fsdhp.com/";

  public static MEDIA_URL = "https://api.fsdhp.com/media-service/";

  baseUrl!: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getAxiosInstance = (showCurl = false, formData = false) => {
    const instance = axios.create({
      baseURL: this.baseUrl,
      timeout: 1000 * 100,
    });
    instance.interceptors.request.use(
      async (config) => {
        const { auth } = store.getState() as TRootState;
        const { token } = auth;

        const cloneConfig = { ...config };

        if (token.access_token && cloneConfig.headers) {
          cloneConfig.headers["Content-Type"] = `application/json`;
          if (formData) {
            cloneConfig.headers["Content-Type"] = `multipart/form-data`;
          }

          cloneConfig.headers.Authorization = `Bearer ${JSON.parse(JSON.stringify(token.access_token.trim()))}`;
          cloneConfig.headers.requeststarttime = new Date().getTime();
          cloneConfig.headers.request_id = HelperManager.idGenerator();
        }

        if (showCurl) {
          console.log(new CurlHelper(cloneConfig).generateCommand());
        }

        const condition =
          token.access_token &&
          new Date().getTime() > new Date(auth.loginMarkTime).getTime() + (token.expires_in * 1000) / 1.2;

        if (condition) {
          try {
            const newToken = await AuthenticationServices.regainAccessTokenApi(token.refresh_token);
            store.dispatch(AuthActions._loginSuccessAction(newToken));
            store.dispatch(AuthActions._setLoginMarkTimeAction(new Date()));
            return cloneConfig;
          } catch (error) {
            console.log("📢 [ServicesManager.ts:54]", error);
            return cloneConfig;
          }
        }
        return cloneConfig;
      },
      (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(
      async (response) => {
        await ServicesManager._checkMinimumResponseTime(parseInt(response.request._headers.requeststarttime));
        LoggerManager.describeSuccessResponse(response);
        return response;
      },
      (error: AxiosError) => ServicesManager._responseErrorHandler(error),
    );
    return instance;
  };

  private static _responseErrorHandler = async (error: AxiosError) => {
    if (error?.response?.status === ResponseStatusCode.clientError.unauthorized) {
      setTimeout(() => {
        store.dispatch({ type: EAuthActionTypes.LOG_OUT });
      }, 500);
    }
    await this._checkMinimumResponseTime(parseInt(error.request._headers.requeststarttime));
    LoggerManager.describeErrorResponse(error);
    return Promise.reject(error.response);
  };

  private static _checkMinimumResponseTime = (startTime: number) => {
    const totalFetchTime = new Date().getTime() - startTime;
    const isTooFast = totalFetchTime < ServicesManager.MIN_RESPONSE_TIME;
    return new Promise((resolve) => {
      setTimeout(
        () => {
          resolve(true);
        },
        isTooFast ? ServicesManager.MIN_RESPONSE_TIME - totalFetchTime : 0,
      );
    });
  };
}

export default ServicesManager;
