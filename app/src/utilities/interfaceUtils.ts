import { variants } from '@app/utilities/enums.util';

export const getBackgroundColor = (variant: variants, colors: any): string => {
  const variantColors: { [key in variants]: string } = {
    [variants.WARNING]: colors.yellowPalette.yellow25,
    [variants.NEUTRAL]: colors.natural.natural100,
    [variants.SUCCESS]: colors.greenPalette.green25,
    [variants.SEVERE]: colors.secondary.secondary100,
  };
  return variantColors[variant] || variantColors[variants.NEUTRAL]; // Fallback to default color
};
