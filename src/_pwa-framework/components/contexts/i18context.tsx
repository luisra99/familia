import { createContext } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n";

export const I18nContext = createContext<any>({
  t: null,
  language: null,
  changeLanguage: null,
});

export const LanguageProvider = ({ children }: any) => {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation();
  return (
    <I18nContext.Provider value={{ t, language, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};
