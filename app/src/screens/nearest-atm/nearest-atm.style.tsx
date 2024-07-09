import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const nearestAtmStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
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
    },
  });

export default nearestAtmStyles;
