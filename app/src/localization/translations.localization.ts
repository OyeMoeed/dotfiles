/**
 * Object containing translations for different languages.
 */
import ArabicTranslations from '@app/localization/arabic-translations.json';
import EnglishTranslations from '@app/localization/english-tanslations.json';

export const translations: Record<string, { translation: Record<string, string> }> = {
  en: {
    translation: EnglishTranslations,
  },
  ar: {
    translation: ArabicTranslations,
  },
};

export const appText = translations;