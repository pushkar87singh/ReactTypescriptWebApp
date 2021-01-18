import { useContext } from "react";
import { LocaleContext } from "../components/locale-context-provider";
import { ILocaleContextValue } from "../components/locale-context-provider/LocaleContextProvider";

const useLocaleContext = (): ILocaleContextValue => {
  return useContext(LocaleContext);
};

export default useLocaleContext;
