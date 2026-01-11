import en from "./en.json";
import th from "./th.json";
import messagesEn from "../../messages/en.json";
import messagesTh from "../../messages/th.json";

// Merge translations from both sources
export const dictionaries = {
  en: { ...en, ...messagesEn },
  th: { ...th, ...messagesTh },
};

export type Locale = keyof typeof dictionaries;

export function getDictionary(locale: string) {
  return dictionaries[locale as Locale] ?? dictionaries.en;
}
