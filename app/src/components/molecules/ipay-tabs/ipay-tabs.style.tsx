
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { TabBase } from '@app/utilities/enums.util';
import { FlexAlignType, TextStyle, ViewStyle } from 'react-native';
import { IPayTabsStyles } from './ipay-tabs.interface';

export const generateStyles = (variant: TabBase, colors: any): IPayTabsStyles => {
  const containerStyles = {
    container: variant === TabBase.Natural ? tabStyles(colors).containerNatural : tabStyles(colors).containerColored,
    scrollContainer: tabStyles(colors).scrollContainer,
    tab: tabStyles(colors).tab,
    flexTab: tabStyles(colors).flexTab,
  };

  const textColors = {
    selected: {
      color: variant === TabBase.Natural ? colors.natural.natural0 : colors.primary.primary500,
    } as TextStyle,
    unselected: {
      color: variant === TabBase.Natural ? colors.natural.natural500 : colors.natural.natural0,
    } as TextStyle,
  };

  const tabColors = {
    selectedTab: {
      backgroundColor: variant === TabBase.Natural ? colors.primary.primary500 : colors.natural.natural0,
    } as ViewStyle,
    unSelectedTab: {
      backgroundColor: variant === TabBase.Natural ? colors.natural.natural0 : colors.primaryOverlay,
    } as ViewStyle,
  };

  return createStyleSheet({
    ...containerStyles,
    ...textColors,
    ...tabColors,
  });
};

const tabStyles = (colors: any) =>
  createStyleSheet({
    containerNatural: {
      backgroundColor: colors.natural.natural100,
    } as ViewStyle,
    containerColored: {
      backgroundColor: colors.primary.primary500,
    } as ViewStyle,
    scrollContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start' as FlexAlignType,
      gap: scaleSize(8),
      paddingHorizontal: scaleSize(20),
      paddingVertical: scaleSize(8),
    } as ViewStyle,
    tab: {
      height: scaleSize(28),
      paddingHorizontal: scaleSize(12),
      borderRadius: scaleSize(8),
      justifyContent: 'center',
      alignItems: 'center' as FlexAlignType,
    } as ViewStyle,
    flexTab: {
      flex: 1,
    } as ViewStyle,
  });

export default { tabStyles, generateStyles };

