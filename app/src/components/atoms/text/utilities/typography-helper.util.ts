import { Platform } from 'react-native';

import useTheme from '@app/styles/hooks/theme.hook';
import { scaleFont } from '@app/styles/mixins';
import { constants } from '../constants.text';

// const FONT_FAMILY = helper.getFonts();

/**
 * Create a custom font scale.
 * @param {number} value - The value to scale.
 * @returns {number} - The scaled value.
 */
const createCustomFontScale = (value: number): number => {
  // Function to scale font size
  return scaleFont(value);
};

/**
 * Fonts constants for font family.
 */
export const fonts = {
  // Font families
  THIN: 'Inter-Thin',
  EXTRA_LIGHT: 'Inter-ExtraLight',
  LIGHT: 'Inter-Light',
  REGULAR: 'Inter-Regular',
  SEMI_BOLD: 'Inter-SemiBold',
  MEDIUM: 'Inter-Medium',
  BOLD: 'Inter-Bold',
  EXTRA_BOLD: 'Inter-ExtraBold',
  BLACK: 'Inter-Black'
};

/**
 * Creates a text style object with the provided parameters.
 * @param {number} fontSize - The font size of the text.
 * @param {number} lineHeight - The line height of the text.
 * @param {number} letterSpacing - The letter spacing of the text.
 * @param {string} fontFamily - The font family of the text.
 * @param {string} [color] - Optional. The color of the text. Defaults to a predefined color if not provided.
 * @param {string} [textDecorationLine] - Optional. The text decoration line of the text (e.g., 'underline', 'line-through').
 * @param {string} [textTransform] - Optional. The text transformation (e.g., 'uppercase', 'lowercase', 'capitalize').
 * @returns {Function} A function that accepts a custom color and returns the text style object.
 */
export const createTextStyle = (
  fontSize: number,
  lineHeight: number,
  letterSpacing: number,
  fontFamily: string,
  fontWeight?: string,
  color?: string,
  textDecorationLine?: string,
  textTransform?: string
) => {
  const { colors } = useTheme();
  return (customColor?: string) => {
    return {
      fontSize: scaleFont(fontSize),
      lineHeight: Platform.OS === 'android' ? scaleFont(lineHeight) : undefined,
      letterSpacing: scaleFont(letterSpacing),
      fontFamily,
      fontWeight: fontWeight,
      color: customColor || color || colors.natural.natural900,
      ...(textDecorationLine && { textDecorationLine }),
      ...(textTransform && { textTransform })
    };
  };
};

const FONT_VARIANTS = {
  TITLE_LARGE: { FONT_SIZE: createCustomFontScale(34), LINE_HEIGHT: 41, LETTER_SPACING: -0.4 },
  TITLE1: { FONT_SIZE: createCustomFontScale(28), LINE_HEIGHT: 34, LETTER_SPACING: -0.4 },
  TITLE2: { FONT_SIZE: createCustomFontScale(22), LINE_HEIGHT: 28, LETTER_SPACING: -0.4 },
  TITLE3: { FONT_SIZE: createCustomFontScale(20), LINE_HEIGHT: 25, LETTER_SPACING: -0.4 },
  HEADLINE: { FONT_SIZE: createCustomFontScale(17), LINE_HEIGHT: 22, LETTER_SPACING: -0.4 },
  BODY: { FONT_SIZE: createCustomFontScale(17), LINE_HEIGHT: 22, LETTER_SPACING: -0.4 },
  SUB_HEADLINE: { FONT_SIZE: createCustomFontScale(15), LINE_HEIGHT: 20, LETTER_SPACING: -0.4 },
  FOOTNOTE: { FONT_SIZE: createCustomFontScale(13), LINE_HEIGHT: 18, LETTER_SPACING: -0.4 },
  CAPTION1: { FONT_SIZE: createCustomFontScale(12), LINE_HEIGHT: 16, LETTER_SPACING: -0.4 },
  CAPTION2: { FONT_SIZE: createCustomFontScale(11), LINE_HEIGHT: 13, LETTER_SPACING: -0.4 }
};

const FONT_FAMILY = {
  BOLD: 'BOLD',
  REGULAR: 'REGULAR'
};

/**
 * Typography constants and functions.
 */
export const typography = {
  /**
   * Font for code snippets.
   */
  code: Platform.select({ ios: 'Courier', android: 'monospace' }),

  FONT_VARIANTS: FONT_VARIANTS,
  FONT_FAMILY: FONT_FAMILY,
  /**
   * Create a custom font size.
   * @param {number} value - The value to scale.
   * @returns {number} - The scaled value.
   */
  CUSTOM_FONT_SIZE: createCustomFontScale,

  BOLD_TEXT_STYLES: {
    fontWeight: constants.FONT_WEIGHT_BOLD,
    letterSpacing: FONT_VARIANTS.TITLE_LARGE.LETTER_SPACING
  },
  REGULAR_TEXT_STYLES: {
    fontWeight: constants.FONT_WEIGHT_NORMAL,
    letterSpacing: FONT_VARIANTS.TITLE_LARGE.LETTER_SPACING
  }
};
