import { constants } from '@app/utilities';
import useTheme from '@styles/theming/theme.hook';
import { Platform } from 'react-native';
import { scaleFont } from './mixins';

// const FONT_FAMILY = helper.getFonts();

/**
 * Font weights.
 */
export const FONT_WEIGHT_THIN = '100';
export const FONT_WEIGHT_EXTRA_LIGHT = '200';
export const FONT_WEIGHT_LIGHT = '300';
export const FONT_WEIGHT_NORMAL = '400';
export const FONT_WEIGHT_MEDIUM = '500';
export const FONT_WEIGHT_SEMI_BOLD = '600';
export const FONT_WEIGHT_BOLD = '700';
export const FONT_WEIGHT_EXTRA_BOLD = '800';

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
 * Font sizes.
 */
export const FONT_SIZE_60 = scaleFont(60);
export const FONT_SIZE_50 = scaleFont(50);
export const FONT_SIZE_40 = scaleFont(40);
export const FONT_SIZE_36 = scaleFont(36);
export const FONT_SIZE_33 = scaleFont(33);
export const FONT_SIZE_30 = scaleFont(30);
export const FONT_SIZE_26 = scaleFont(26);
export const FONT_SIZE_24 = scaleFont(24);
export const FONT_SIZE_22 = scaleFont(22);
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);
export const FONT_SIZE_10 = scaleFont(10);
export const FONT_SIZE_8 = scaleFont(8);

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

/**
 * Typography constants and functions.
 */
export const typography = {
  /**
   * Font for code snippets.
   */
  code: Platform.select({ ios: 'Courier', android: 'monospace' }),

  // Font weights
  FONT_WEIGHT_THIN,
  FONT_WEIGHT_EXTRA_LIGHT,
  FONT_WEIGHT_LIGHT,
  FONT_WEIGHT_NORMAL,
  FONT_WEIGHT_MEDIUM,
  FONT_WEIGHT_SEMI_BOLD,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_EXTRA_BOLD,

  // Font sizes
  FONT_SIZE_60,
  FONT_SIZE_50,
  FONT_SIZE_40,
  FONT_SIZE_33,
  FONT_SIZE_36,
  FONT_SIZE_30,
  FONT_SIZE_26,
  FONT_SIZE_24,
  FONT_SIZE_22,
  FONT_SIZE_20,
  FONT_SIZE_18,
  FONT_SIZE_16,
  FONT_SIZE_14,
  FONT_SIZE_12,
  FONT_SIZE_10,
  FONT_SIZE_8,
  /**
   * Create a custom font size.
   * @param {number} value - The value to scale.
   * @returns {number} - The scaled value.
   */
  CUSTOME_FONT_SIZE: createCustomFontScale,

  BOLD_TEXT_STYLES: { fontWeight: FONT_WEIGHT_BOLD, letterSpacing: constants.FONT_VARIANTS.TITLE_LARGE.LETTER_SPACING },
  REGULAR_TEXT_STYLES: {
    fontWeight: FONT_WEIGHT_NORMAL,
    letterSpacing: constants.FONT_VARIANTS.TITLE_LARGE.LETTER_SPACING
  }
};
