import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
import en from "@/language/en.json";
import hi from "@/language/hi.json";
import ar from "@/language/ar.json";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  ar: { translation: ar },
};

export const RTL_LANGS = ["ar"];

const fallback = { languageTag: "en", isRTL: false };
const { languageTag } = fallback;

if (RTL_LANGS.includes(languageTag) && !I18nManager.isRTL) {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
}

i18n.use(initReactI18next).init({
  lng: languageTag,
  fallbackLng: languageTag,
  resources,
  interpolation: { escapeValue: false },
});

export default i18n;
