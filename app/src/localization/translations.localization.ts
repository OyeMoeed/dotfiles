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
  [LanguageCode.EN]: {
    translation: EnglishTranslations,
  },
  [LanguageCode.AR]: {
    translation: ArabicTranslations,
  },
  [LanguageCode.UR]:{
    translation: UrduTranslations
  },
  [LanguageCode.BN]:{
    translation: BengaliTranslations
  },
  [LanguageCode.HI]:{
    translation: HindiTranslations
  },
  [LanguageCode.TL]:{
    translation: TagalogTranslations
  },
  [LanguageCode.NE]:{
    translation: NepaliTranslations
  }
} as const;

export const appText = translations;



type TranslationType = typeof translations[LanguageCode.EN]['translation'];

export type LocalizationKeys = keyof typeof translations;
export type LocalizationText = TranslationType;
