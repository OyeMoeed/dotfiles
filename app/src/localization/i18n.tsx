/**
 * i18n is a library for internationalization (i18n) in JavaScript applications.
 */
import { translations } from '@app/localization/translations';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * Resources containing translations for different languages.
 */
const resources = translations;

/**
 * Initialize i18n with React.
 */
i18n.use(initReactI18next).init({
  /**
   * Use compatibilityJSON for i18next v3.
   */
  compatibilityJSON: 'v3',
  /**
   * Resources for translation.
   */
  resources,
  /**
   * Default language.
   */
  lng: 'en',
  /**
   * Fallback language in case translation is not available.
   */
  // fallbackLng: languages.EN,
  /**
   * Enable debug mode for logging.
   */
  debug: true,
  /**
   * Interpolation configuration.
   */
  interpolation: {
    /**
     * Disable escaping of values since React already escapes values.
     */
    escapeValue: false
  }
});

export default i18n;
