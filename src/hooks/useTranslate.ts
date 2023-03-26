import LanguagesManager from "@src/languages/LanguagesManager";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import useSelector from "./useSelector";

const useTranslate = () => {
  const languageInstance = new LanguagesManager();
  const { language } = useSelector((state) => state.universal);
  languageInstance.configuredI18.locale = language;
  const translate = (
    scope: ELanguageOptions,
    options: I18n.TranslateOptions = {
      defaultValue: "ERROR TRANSLATION",
    },
  ) => languageInstance.configuredI18.t(scope, options);

  return translate;
};

export default useTranslate;
