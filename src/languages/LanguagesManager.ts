import I18n from "i18n-js";
import en from "@src/languages/en.json";
import vn from "@src/languages/vn.json";

export enum EAvailableLanguages {
  "vn" = "vn",
  "en" = "en",
}

export default class LanguagesManager {
  public configuredI18 = I18n;

  constructor() {
    this.configuredI18.fallbacks = true;
    this.configuredI18.defaultLocale = EAvailableLanguages.en;
    this.configuredI18.translations = { en, vn };
  }
}
