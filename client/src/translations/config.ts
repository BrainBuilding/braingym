import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { localStore } from "utils";
import en from "./en/index.json";
import hy from "./hy/index.json";

i18next.use(initReactI18next).init({
  lng: localStore.getData("language") || "hy",
  debug: true,
  resources: {
    en: {
      translation: en,
    },
    hy: {
      translation: hy,
    },
  },
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
});
