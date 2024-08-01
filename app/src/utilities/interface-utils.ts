import colors from '@app/styles/colors.const';
import { States } from '@app/utilities/enums.util';

export const getBackgroundColor = (variant: States, themeColors: typeof colors): string => {
  const variantColors: { [key in States]: string } = {
    [States.WARNING]: themeColors.critical.critical25,
    [States.NEUTRAL]: themeColors.natural.natural100,
    [States.SUCCESS]: themeColors.success.success25,
    [States.SEVERE]: themeColors.secondary.secondary100,
    [States.PRIMARY]: themeColors.natural.natural0,
    [States.ERROR]: themeColors.error.error25,
  };
  return variantColors[variant] || variantColors[States.NEUTRAL]; // Fallback to default color
};

export const getForegroundColor = (variant: States, themeColors: typeof colors): string => {
  const variantColors: { [key in States]: string } = {
    [States.WARNING]: themeColors.critical.critical800,
    [States.NEUTRAL]: themeColors.natural.natural700,
    [States.SUCCESS]: themeColors.success.success500,
    [States.SEVERE]: themeColors.secondary.secondary500,
    [States.PRIMARY]: themeColors.primary.primary500,
    [States.ERROR]: themeColors.error.error500,
  };
  return variantColors[variant] || variantColors[States.NEUTRAL]; // Fallback to default color
};
