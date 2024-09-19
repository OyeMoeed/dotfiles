/**
 * Custom hook to retrieve fonts based on the selected language.
 * @module useFonts
 */

import { fonts } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import Languages from '@localization/languages.localization';
import { useTypedSelector } from '@store/store';

/**
 * Retrieves the appropriate fonts based on the selected language.
 * @param {string} languageFlag - The flag indicating the selected language.
 * @returns {Object} The fonts object corresponding to the selected language.
 */
const getFonts = (languageFlag: string) => {
  switch (languageFlag) {
    case Languages.EN:
      return fonts; // Default font for English language
    case Languages.AR:
      return fonts; // Default font for Arabic language
    default:
      return fonts; // Default font for other languages
  }
};

/**
 * Custom hook to retrieve fonts based on the selected language.
 * @returns {Object} The fonts object corresponding to the selected language.
 */
const useFonts = () => {
  // Retrieves the localization flag from the Redux store
  const { selectedLanguage } = useTypedSelector((state) => state.languageReducer);

  // Retrieves the selected fonts based on the localization flag
  const selectedFonts = getFonts(selectedLanguage);

  return selectedFonts;
};

export default useFonts;
