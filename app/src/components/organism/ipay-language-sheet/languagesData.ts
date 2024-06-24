
import { IpayFlagIcon } from '@app/components/molecules';

export interface Language {
  language: string;
  flag: React.FC<{ country: string }>; // Corrected type for flag component
  isRTL: boolean;
  code: string;
}

export const languagesAll: Language[] = [
  { language: 'عربي', flag: IpayFlagIcon, isRTL: true, code: 'ar' }, // Corrected flag usage
  { language: 'English', flag: IpayFlagIcon, isRTL: false, code: 'en' }, // Corrected flag usage
  { language: 'اردو', flag: IpayFlagIcon, isRTL: true, code: 'ur' }, // Corrected flag usage
  { language: 'भारतीय', flag: IpayFlagIcon, isRTL: false, code: 'hi' }, // Corrected flag usage
  { language: 'Tagalog', flag: IpayFlagIcon, isRTL: false, code: 'tl' }, // Corrected flag usage
  { language: 'नेपाल', flag: IpayFlagIcon, isRTL: false, code: 'ne' }, // Corrected flag usage
  { language: 'বাংলা', flag: IpayFlagIcon, isRTL: false, code: 'bn' }, // Corrected flag usage
];

