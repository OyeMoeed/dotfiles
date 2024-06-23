import colors from '@app/styles/colors.const';
import { variants } from '@app/utilities/enums.util';

export const getBackgroundColor = (variant: variants, themeColors: typeof colors): string => {
  const variantColors: { [key in variants]: string } = {
    [variants.WARNING]: themeColors.critical.critical25,
    [variants.NEUTRAL]: themeColors.natural.natural100,
    [variants.SUCCESS]: themeColors.success.success25,
    [variants.SEVERE]: themeColors.secondary.secondary100,
  };
  return variantColors[variant] || variantColors[variants.NEUTRAL]; // Fallback to default color
};

export const getForegroundColor = (variant: variants, themeColors: typeof colors): string => {
  const variantColors: { [key in variants]: string } = {
    [variants.WARNING]: themeColors.critical.critical800,
    [variants.NEUTRAL]: themeColors.natural.natural700,
    [variants.SUCCESS]: themeColors.success.success500,
    [variants.SEVERE]: themeColors.secondary.secondary500,
  };
  return variantColors[variant] || variantColors[variants.NEUTRAL]; // Fallback to default color
};