import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const merchantStyles = (theme: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    searchInputStyle: {
      height: verticalScale(36),
      marginTop: scaleFont(10),
      borderRadius: scaleFont(12),
      backgroundColor: theme.natural.natural0,
    },
    contentContainer: {
      marginHorizontal: moderateScale(24),
    },
    merchantList: {
      marginBottom: scaleSize(12),
      marginTop: scaleSize(12),
      flex: 0,
    },
    containerWrapper: {
      flexDirection: 'row',
      gap: scaleSize(12),
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
  });

export default merchantStyles;
