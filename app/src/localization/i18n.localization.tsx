/**
 * i18n is a library for internationalization (i18n) in JavaScript applications.
 */
import { translations } from '@app/localization/translations.localization';
import i18n from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import i18nextResourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

const resources = translations;
const languageUrl = 'https://uat.alinmapay.com.sa/v2/alinmapay/localization/channels/PAYC/labels/i18n?locale={{lng}}';
class CustomBackend extends HttpBackend {
  // Override the fetch method to clean and parse the response
  read(language, namespace, callback) {
    const loadPath = this.options.loadPath || languageUrl;
    const url = loadPath?.replace('{{lng}}', language);

    fetch(url)
      .then((response) => response.text()) // Get the response as text
      .then((data) => {
        let parsedData;
        try {
          parsedData = JSON.parse(data)?.[language]; // Parse the cleaned JSON
        } catch (error) {
          callback(error, false); // Handle JSON parsing errors
        }

        callback(null, parsedData); // Pass parsed data to i18next
      })
      .catch((err) => callback(err, false)); // Handle fetch errors
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
     * Resources for translation.
     */
    // resources,
    debug: true,
    fallbackLng: 'en', // Fallback language
    lng: 'en', // Default language
    fallbackNS: 'en', // Default fallback namespace
    backend: {
      backends: [
        CustomBackend,
        i18nextResourcesToBackend((lng, ns, callback) => {
          // Load local translations (from local file)
          const resource = resources[lng].translation;
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
