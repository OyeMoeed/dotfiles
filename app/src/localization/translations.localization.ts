/**
 * Object containing translations for different languages.
 */
import { LanguageCode } from '@app/utilities/enums.util';
import ArabicTranslations from '@app/localization/arabic-translations.json';
import EnglishTranslations from '@app/localization/english-translations.json';
import UrduTranslations from '@app/localization/urdu-translations.json';
import BengaliTranslations from '@app/localization/bengali-translations.json';
import HindiTranslations from '@app/localization/hindi-translations.json';
import NepaliTranslations from '@app/localization/nepali-translations.json';
import TagalogTranslations from '@app/localization/tagalog-translations.json';

export const translations = {
  [LanguageCode.EN]: EnglishTranslations,
  [LanguageCode.AR]: ArabicTranslations,
  [LanguageCode.UR]: UrduTranslations,
  [LanguageCode.BN]: BengaliTranslations,
  [LanguageCode.HI]: HindiTranslations,
  [LanguageCode.TL]: TagalogTranslations,
  [LanguageCode.NE]: NepaliTranslations,
} as const;

export const appText = translations;

export type LocalizationKeys = keyof typeof translations;
