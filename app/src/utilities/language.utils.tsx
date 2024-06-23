import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
import React from 'react';
import { NativeModules, Platform } from 'react-native';
import { LanguageCode } from './enums.util';

// Define a mapping of language codes to their corresponding full names
const languageNames: Record<LanguageCode, string> = {
  [LanguageCode.AR]: 'عربي',
  [LanguageCode.EN]: 'English',
  [LanguageCode.UR]: 'اردو',
  [LanguageCode.HI]: 'भारतीय',
  [LanguageCode.TL]: 'Tagalog',
  [LanguageCode.NE]: 'नेपाल',
  [LanguageCode.BN]: 'বাংলা',
};

export const getLocalization = (): LanguageCode => {
  if (Platform.OS === 'ios') {
    const deviceLanguage: string =
      NativeModules.SettingsManager.settings?.AppleLocale || NativeModules.SettingsManager.settings?.AppleLanguages[0];
    return (deviceLanguage.substr(0, 2) as LanguageCode) || LanguageCode.EN;
  } else if (Platform.OS === 'android') {
    const localeIdentifier: string =
      (NativeModules.I18nManager.localeIdentifier.substr(0, 2) as LanguageCode) || LanguageCode.EN;
    return localeIdentifier as LanguageCode;
  } else {
    return LanguageCode.EN; // Default to English for other platforms
  }
};
// Define flag components for each language code
const languageFlags: Record<LanguageCode, React.ComponentType<any>> = {
  [LanguageCode.AR]: () => <IpayFlagIcon country="ar_s" />, // Saudi Arabia
  [LanguageCode.EN]: () => <IpayFlagIcon country="en_s" />, // United States flag
  [LanguageCode.UR]: () => <IpayFlagIcon country="ur_s" />, // Pakistan flag
  [LanguageCode.HI]: () => <IpayFlagIcon country="hi_s" />, // India flag
  [LanguageCode.TL]: () => <IpayFlagIcon country="tl_s" />, // Philippines flag
  [LanguageCode.NE]: () => <IpayFlagIcon country="ne_s" />, // Nepal flag
  [LanguageCode.BN]: () => <IpayFlagIcon country="bn_s" />, // Bangladesh flag
};

export const getFlagComponent = (selectedLanguage: LanguageCode): React.ReactElement => {
  const FlagComponent = languageFlags[selectedLanguage];
  return FlagComponent ? <FlagComponent /> : <></>;
};

export const getSelectedLanguage = (selectedLanguage: LanguageCode): string => {
  const selectedLanguageName = languageNames[selectedLanguage];
  return selectedLanguageName || ''; // Ensure a default value is returned if selectedLanguageName is null or undefined
};
