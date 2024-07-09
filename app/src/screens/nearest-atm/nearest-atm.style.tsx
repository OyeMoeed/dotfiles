import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const nearestAtmStyles = (colors: any) =>
  createStyleSheet({
    container: {
      // flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
    },
    tabsView: {
      width: '100%',
      backgroundColor: 'transparent',
      marginTop: verticalScale(4),
      marginBottom: verticalScale(12),
    },
    filtersTabView: {
      height: moderateScale(150),
      position: 'absolute',
      top: verticalScale(140),
      zIndex: 9999,
      overflow: 'hidden',
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(24),
      marginHorizontal: moderateScale(24, 0.3),
    },
    fitlersTabListView: {
      height: moderateScale(150),
      overflow: 'hidden',
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(24),
      marginHorizontal: moderateScale(24, 0.3),
    },
    tabChildView: {
      flex: 1,
    },
  });

export default nearestAtmStyles;
