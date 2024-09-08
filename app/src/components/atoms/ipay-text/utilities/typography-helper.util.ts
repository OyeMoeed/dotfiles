import { Platform } from 'react-native';

import { scaleFont } from '@app/styles/mixins';
import { moderateScale } from 'react-native-size-matters';
import { constants } from '../constants.text';

// const FONT_FAMILY = helper.getFonts();

/**
 * Create a custom font scale.
 * @param {number} value - The value to scale.
 * @returns {number} - The scaled value.
 */
const createCustomFontScale = (value: number): number =>
  // Function to scale font size
  scaleFont(value);

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
  BLACK: 'Inter-Black',
};

const FONT_VARIANTS = {
  TITLE_LARGE: {
    FONT_SIZE: createCustomFontScale(34),
    LINE_HEIGHT: moderateScale(41),
    LETTER_SPACING: moderateScale(-0.4),
  },
  TITLE1: {
    FONT_SIZE: createCustomFontScale(28),
    LINE_HEIGHT: moderateScale(34),
    LETTER_SPACING: moderateScale(-0.4),
  },
  TITLE2: {
    FONT_SIZE: createCustomFontScale(22),
    LINE_HEIGHT: moderateScale(28),
    LETTER_SPACING: moderateScale(-0.4),
  },
  TITLE3: {
    FONT_SIZE: createCustomFontScale(20),
    LINE_HEIGHT: moderateScale(25),
    LETTER_SPACING: moderateScale(-0.4),
  },
  HEADLINE: {
    FONT_SIZE: createCustomFontScale(17),
    LINE_HEIGHT: moderateScale(22),
    LETTER_SPACING: moderateScale(-0.4),
  },
  BODY: {
    FONT_SIZE: createCustomFontScale(17),
    LINE_HEIGHT: moderateScale(22),
    LETTER_SPACING: moderateScale(-0.4),
  },
  SUB_HEADLINE: {
    FONT_SIZE: createCustomFontScale(15),
    LINE_HEIGHT: moderateScale(20),
    LETTER_SPACING: moderateScale(-0.4),
  },
  FOOTNOTE: {
    FONT_SIZE: createCustomFontScale(13),
    LINE_HEIGHT: moderateScale(18),
    LETTER_SPACING: moderateScale(-0.4),
  },
  CAPTION1: {
    FONT_SIZE: createCustomFontScale(12),
    LINE_HEIGHT: moderateScale(16),
    LETTER_SPACING: moderateScale(-0.4),
  },
  CAPTION2: {
    FONT_SIZE: createCustomFontScale(11),
    LINE_HEIGHT: moderateScale(13),
    LETTER_SPACING: moderateScale(-0.4),
  },
};

const FONT_FAMILY = {
  BOLD: 'BOLD',
  REGULAR: 'REGULAR',
};

/**
 * Typography constants and functions.
 */
export const typography = {
  /**
   * Font for code snippets.
   */
  code: Platform.select({ ios: 'Courier', android: 'monospace' }),

  FONT_VARIANTS,
  FONT_FAMILY,
  /**
   * Create a custom font size.
   * @param {number} value - The value to scale.
   * @returns {number} - The scaled value.
   */
  CUSTOM_FONT_SIZE: createCustomFontScale,

  BOLD_TEXT_STYLES: {
    fontWeight: constants.FONT_WEIGHT_BOLD,
    letterSpacing: FONT_VARIANTS.TITLE_LARGE.LETTER_SPACING,
  },
  REGULAR_TEXT_STYLES: {
    fontWeight: constants.FONT_WEIGHT_NORMAL,
    letterSpacing: FONT_VARIANTS.TITLE_LARGE.LETTER_SPACING,
  },
};
