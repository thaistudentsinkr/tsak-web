import en from "./en.json";
import th from "./th.json";

export const dictionaries = {
  en,
  th,
};

export type Locale = keyof typeof dictionaries;

export function getDictionary(locale: string) {
  return dictionaries[locale as Locale] ?? dictionaries.en;
}
