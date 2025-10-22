export const languages = ["ua"] as const;
export type Locale = (typeof languages)[number];
export const defaultLocale: Locale = "ua";
