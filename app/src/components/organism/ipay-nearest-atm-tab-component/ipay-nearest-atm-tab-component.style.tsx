import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const nearestAtmTabCompStyles = (colors: any) =>
  createStyleSheet({
    container: {
      justifyContent: 'canter',
      alignItems: 'center',
      padding: moderateScale(24, 0.3),
      borderRadius: moderateScale(24),
    },
    tabsView: {
      width: '100%',
      backgroundColor: 'transparent',
      marginTop: verticalScale(4),
      marginBottom: verticalScale(16),
    },
  });

export default nearestAtmTabCompStyles;
