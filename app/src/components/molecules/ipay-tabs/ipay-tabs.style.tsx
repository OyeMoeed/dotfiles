import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { TabBase } from '@app/utilities/enums.util';
import { IPayTabsStyles } from './ipay-tabs.interface';

const tabStyles = (colors: any) =>
  createStyleSheet({
    containerNatural: {
      backgroundColor: colors.backgrounds.transparent,
    },
    containerColored: {
      backgroundColor: colors.primary.primary500,
    },
    scrollContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: scaleSize(8),
      paddingVertical: scaleSize(8),
    },
    tab: {
      height: scaleSize(28),
      paddingHorizontal: scaleSize(12),
      borderRadius: scaleSize(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    flexTab: {
      flex: 1,
    },
  });

const generateStyles = (variant: TabBase, colors: any): IPayTabsStyles => {
  const containerStyles = {
    container: variant === TabBase.Natural ? tabStyles(colors).containerNatural : tabStyles(colors).containerColored,
    scrollContainer: tabStyles(colors).scrollContainer,
    tab: tabStyles(colors).tab,
    flexTab: tabStyles(colors).flexTab,
  };

  const textColors = {
    selected: {
      color: variant === TabBase.Natural ? colors.natural.natural0 : colors.primary.primary500,
    },
    unselected: {
      color: variant === TabBase.Natural ? colors.natural.natural500 : colors.natural.natural0,
    },
  };

  const tabColors = {
    selectedTab: {
      backgroundColor: variant === TabBase.Natural ? colors.primary.primary500 : colors.natural.natural0,
    },
    unSelectedTab: {
      backgroundColor: variant === TabBase.Natural ? colors.natural.natural0 : colors.primaryOverlay,
    },
  };

  return createStyleSheet({
    ...containerStyles,
    ...textColors,
    ...tabColors,
  });
};

export { generateStyles, tabStyles };
