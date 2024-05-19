import { Platform } from 'react-native';

import { scaleFont } from './mixins';

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
 * Typography constants and functions.
 */
export const typography = {
  /**
   * The primary font. Used in most places.
   */
  primary: 'Gilroy',

  /**
   * Bold variant of the primary font.
   */
  primaryBold: 'Hanson-Bold',

  /**
   * Medium variant of the primary font.
   */
  primaryMedium: 'Gilroy-Medium',

  /**
   * An alternate font used for titles.
   */
  secondary: 'Gilroy-Bold',

  /**
   * Font for code snippets.
   */
  code: Platform.select({ ios: 'Courier', android: 'monospace' }),

  // FONT WEIGHT
  FONT_WEIGHT_THIN,
  FONT_WEIGHT_EXTRA_LIGHT,
  FONT_WEIGHT_LIGHT,
  FONT_WEIGHT_NORMAL,
  FONT_WEIGHT_MEDIUM,
  FONT_WEIGHT_SEMI_BOLD,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_EXTRA_BOLD,

  // FONT SIZE
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
   */
  CUSTOME_FONT_SIZE: createCustomFontScale
};
