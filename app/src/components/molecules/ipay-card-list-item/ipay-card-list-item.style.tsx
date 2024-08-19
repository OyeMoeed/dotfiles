import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';

import { moderateScale, verticalScale } from 'react-native-size-matters';

const ipayCardListItemStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.natural.natural0,
      paddingVertical: verticalScale(12),
      paddingHorizontal: moderateScale(18),
      borderRadius: scaleSize(16),
    },
    iconContainer: {
      height: scaleSize(24),
      width: scaleSize(24),
      borderRadius: scaleSize(4),
      borderWidth: 0.3,
      borderColor: colors.primary.primary150,
      padding: scaleSize(2),
    },
    icon: {
      height: '100%',
      width: '100%',
    },
    contentView: {
      flex: 1,
      marginLeft: moderateScale(16),
      marginRight: moderateScale(10),
    },
    moreButton: {
      height: scaleSize(18),
      width: scaleSize(18),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default ipayCardListItemStyles;
