import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import JSON files - using require for better build compatibility
const en = require("./locales/en/common.json");
const vi = require("./locales/vi/common.json");
const ja = require("./locales/ja/common.json");

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      vi: { common: vi },
      ja: { common: ja },
    },
    lng: "vi",           // default language
    fallbackLng: "en",   // fallback
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
