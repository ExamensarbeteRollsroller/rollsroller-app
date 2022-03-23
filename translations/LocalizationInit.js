import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import * as Localization from "expo-localization"
// Needed for a bug on android
import "intl-pluralrules"

// Langauges
import en from "./en/common.json"
import sv from "./sv-SE/common.json"

const LANGUAGES = {
    en,
    sv,
}

i18n.use(initReactI18next).init({
    resources: LANGUAGES,
    lng: Localization.locale,
    react: {
        useSuspense: false,
    },
    interpolation: {
        escapeValue: false,
    },
    defaultNS: "common",
})
