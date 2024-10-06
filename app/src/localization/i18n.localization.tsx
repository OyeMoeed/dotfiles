/**
 * i18n is a library for internationalization (i18n) in JavaScript applications.
 */
import constants from '@app/constants/constants';
import { translations } from '@app/localization/translations.localization';
import { CallbackProps } from '@app/network/services/localization/localization-channels/localization-channels.interface';
import getLocalizationChannels from '@app/network/services/localization/localization-channels/localization-channels.service';
import LOCALIZATION_URLS from '@app/network/services/localization/localization.urls';
import { LanguageCode } from '@app/utilities';
import i18n from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import i18nextResourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

const languageUrl = LOCALIZATION_URLS.getLocalizationChannelsUrl;

class CustomBackend extends HttpBackend {
  // Override the fetch method to clean and parse the response
  read(language: string, namespace: string, callback: CallbackProps) {
    const loadPath = this?.options?.loadPath || languageUrl;
    const url = (loadPath as string)?.replace('{{lng}}', language);

    if (constants.MOCK_API_RESPONSE) {
      callback(new Error(), false);
      return;
    }

    getLocalizationChannels({
      url,
      language,
      callback,
      namespace,
    });
  }
}

i18n
  .use(ChainedBackend)
  .use(initReactI18next)
  .init({
    /**
     * Use compatibilityJSON for i18next v3.
     */
    compatibilityJSON: 'v3',
    /**
     * Use to check the missing keys.
     */
    // resources,
    debug: false,
    fallbackLng: 'en', // Fallback language
    lng: 'en', // Default language
    fallbackNS: 'en', // Default fallback namespace
    backend: {
      backends: [
        CustomBackend,
        i18nextResourcesToBackend((lng: string, ns: string, callback: CallbackProps) => {
          // Load local translations (from local file)
          const language = lng as
            | LanguageCode.AR
            | LanguageCode.BN
            | LanguageCode.EN
            | LanguageCode.HI
            | LanguageCode.NE
            | LanguageCode.TL
            | LanguageCode.UR;
          const resource = translations[language];
          callback(null, resource);
        }),
      ],
      backendOptions: [
        // API endpoint
        { loadPath: languageUrl },
        {},
      ],
    },
    interpolation: {
      /**
       * Disable escaping of values since React already escapes values.
       */ escapeValue: false,
    },
    react: {
      useSuspense: false, // Disable suspense for React Native
    },
  });

export default i18n;
