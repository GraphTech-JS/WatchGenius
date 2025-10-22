import ua from "./locales/ua/translation.json";

export type Locale = "ua";

const translations = {
  ua,
} as const;

let currentLocale: Locale = "ua";

export const setLocale = (locale: Locale) => {
  currentLocale = locale;
};

interface TranslationTree {
  [key: string]: string | TranslationTree;
}

function getNestedTranslation(
  obj: TranslationTree,
  path: string[]
): string | undefined {
  return path.reduce<string | TranslationTree | undefined>((acc, key) => {
    if (typeof acc === "object" && acc !== null && key in acc) {
      return acc[key] as string | TranslationTree;
    }
    return undefined;
  }, obj) as string | undefined;
}

export function t<K extends string>(key: K): string {
  const localeData = translations[currentLocale] as unknown as TranslationTree;
  const value = getNestedTranslation(localeData, key.split("."));
  return typeof value === "string" ? value : key;
}
