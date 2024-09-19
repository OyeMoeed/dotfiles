import { typography as constants } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { Platform } from 'react-native';
import { scaleFont } from './mixins';

/**
 * Font weights.
 */
const FONT_WEIGHT_THIN = '100';
const FONT_WEIGHT_EXTRA_LIGHT = '200';
const FONT_WEIGHT_LIGHT = '300';
const FONT_WEIGHT_NORMAL = '400';
const FONT_WEIGHT_MEDIUM = '500';
const FONT_WEIGHT_SEMI_BOLD = '600';
const FONT_WEIGHT_BOLD = '700';
const FONT_WEIGHT_EXTRA_BOLD = '800';

/**
 * Create a custom font scale.
 * @param {number} value - The value to scale.
 * @returns {number} - The scaled value.
 */
const createCustomFontScale = (value: number): number =>
  // Function to scale font size
  scaleFont(value);
/**
 * Font sizes.
 */
const FONT_SIZE_60 = scaleFont(60);
const FONT_SIZE_50 = scaleFont(50);
const FONT_SIZE_40 = scaleFont(40);
const FONT_SIZE_36 = scaleFont(36);
const FONT_SIZE_34 = scaleFont(34);
const FONT_SIZE_33 = scaleFont(33);
const FONT_SIZE_30 = scaleFont(30);
const FONT_SIZE_26 = scaleFont(26);
const FONT_SIZE_24 = scaleFont(24);
const FONT_SIZE_22 = scaleFont(22);
const FONT_SIZE_20 = scaleFont(20);
const FONT_SIZE_18 = scaleFont(18);
const FONT_SIZE_17 = scaleFont(17);
const FONT_SIZE_16 = scaleFont(16);
const FONT_SIZE_15 = scaleFont(15);
const FONT_SIZE_14 = scaleFont(14);
const FONT_SIZE_13 = scaleFont(13);
const FONT_SIZE_12 = scaleFont(12);
const FONT_SIZE_11 = scaleFont(11);
const FONT_SIZE_10 = scaleFont(10);
const FONT_SIZE_8 = scaleFont(8);

/**
 * Fonts constants for font family.
 */
const fonts = {
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

const regex = {
  NUMBERS_ONLY: /^\d*$/,
  AMOUNT: /^(\d+(?:\.\d{0,2})?)?$/,
};

/**
 * Typography constants and functions.
 */
const typography = {
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
  FONT_SIZE_36,
  FONT_SIZE_33,
  FONT_SIZE_34,
  FONT_SIZE_30,
  FONT_SIZE_26,
  FONT_SIZE_24,
  FONT_SIZE_22,
  FONT_SIZE_20,
  FONT_SIZE_18,
  FONT_SIZE_16,
  FONT_SIZE_15,
  FONT_SIZE_14,
  FONT_SIZE_13,
  FONT_SIZE_12,
  FONT_SIZE_11,
  FONT_SIZE_10,
  FONT_SIZE_8,

  // Custom font scaling
  CUSTOME_FONT_SIZE: createCustomFontScale,

  BOLD_TEXT_STYLES: {
    fontWeight: FONT_WEIGHT_BOLD,
    letterSpacing: constants?.FONT_VARIANTS?.TITLE_LARGE?.LETTER_SPACING,
  },
  REGULAR_TEXT_STYLES: {
    fontWeight: FONT_WEIGHT_NORMAL,
    letterSpacing: constants?.FONT_VARIANTS?.TITLE_LARGE?.LETTER_SPACING,
  },
};

export {
  FONT_SIZE_10,
  FONT_SIZE_11,
  FONT_SIZE_12,
  FONT_SIZE_13,
  FONT_SIZE_14,
  FONT_SIZE_15,
  FONT_SIZE_16,
  FONT_SIZE_17,
  FONT_SIZE_18,
  FONT_SIZE_20,
  FONT_SIZE_22,
  FONT_SIZE_24,
  FONT_SIZE_26,
  FONT_SIZE_30,
  FONT_SIZE_33,
  FONT_SIZE_34,
  FONT_SIZE_36,
  FONT_SIZE_40,
  FONT_SIZE_50,
  FONT_SIZE_60,
  FONT_SIZE_8,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_EXTRA_BOLD,
  FONT_WEIGHT_EXTRA_LIGHT,
  FONT_WEIGHT_LIGHT,
  FONT_WEIGHT_MEDIUM,
  FONT_WEIGHT_NORMAL,
  FONT_WEIGHT_SEMI_BOLD,
  FONT_WEIGHT_THIN,
  fonts,
  regex,
  typography,
};
