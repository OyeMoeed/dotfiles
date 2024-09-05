import { LanguageCode } from '@app/utilities/enums.util';

export interface Language {
  language: string;
  isRTL: boolean;
  code: LanguageCode;
}

export const languagesAll: Language[] = [
  { language: 'عربي', isRTL: true, code: LanguageCode.AR },
  { language: 'English', isRTL: false, code: LanguageCode.EN },
  { language: 'اردو', isRTL: true, code: LanguageCode.UR },
  { language: 'भारतीय', isRTL: false, code: LanguageCode.HI },
  { language: 'Tagalog', isRTL: false, code: LanguageCode.HI },
  { language: 'नेपाल', isRTL: false, code: LanguageCode.NE },
  { language: 'বাংলা', isRTL: false, code: LanguageCode.BN },
];
