/**
 * Object containing translations for different languages.
 */
import ArabicTranslations from '@app/localization/arabic-translations.json';
import EnglishTranslations from '@app/localization/english-translations.json';

export const translations = {
  en: {
    translation: EnglishTranslations,
  },
  ar: {
    translation: ArabicTranslations,
  },
} as const;

export const appText = translations;



type TranslationType = typeof translations['en']['translation'];

export type LocalizationKeys = keyof typeof translations;
export type LocalizationText = TranslationType;
