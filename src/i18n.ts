import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./_pwa-framework/locale/en";
import es from "./_pwa-framework/locale/es";
import ru from "./_pwa-framework/locale/ru";
import another from "./locale/specific.json";
i18n.use(initReactI18next).init({
  resources: {
    gb: { translation: { ...en } },
    es: { translation: { ...es } },
    ru: { translation: { ...ru } },
    ...another,
  },
  fallbackLng: "es",
  lng: "es",
});
