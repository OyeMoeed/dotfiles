/**
 * Custom hook to retrieve fonts based on the selected language.
 * @module useFonts
 */

import { languages } from '@app/utilities/enums';
import { useTypedSelector } from '@store/store';
import { fonts } from '../typography';

/**
 * Retrieves the appropriate fonts based on the selected language.
 * @param {string} languageFlag - The flag indicating the selected language.
 * @returns {Object} The fonts object corresponding to the selected language.
 */
const getFonts = (languageFlag: string) => {
  switch (languageFlag) {
    case languages.EN:
      return fonts; // Default font for English language
    case languages.AR:
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
  const { localizationFlag } = useTypedSelector((state) => state.localizationReducer);

  // Retrieves the selected fonts based on the localization flag
  const selectedFonts = getFonts(localizationFlag);

  return selectedFonts;
};

export default useFonts;
