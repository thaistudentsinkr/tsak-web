import en from "./en.json";
import th from "./th.json";
import messagesEn from "../../messages/en.json";
import messagesTh from "../../messages/th.json";
import aboutEn from "../../messages/about/en.json";
import aboutTh from "../../messages/about/th.json";

// Merge translations from all sources
export const dictionaries = {
  en: { ...en, ...messagesEn, about: aboutEn },
  th: { ...th, ...messagesTh, about: aboutTh },
};

export type Locale = keyof typeof dictionaries;

export function getDictionary(locale: string) {
  return dictionaries[locale as Locale] ?? dictionaries.en;
}
