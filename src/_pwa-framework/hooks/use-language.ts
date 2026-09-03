import { I18nContext } from "../components/contexts/i18context";
import { useContext } from "react";
export const useLanguage = () => {
  return useContext(I18nContext);
};
