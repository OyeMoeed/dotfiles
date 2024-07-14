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
    dropDownView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: moderateScale(20, 0.3),
      width: '100%',
      height: verticalScale(54),
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
    },
    headingText: {
      marginBottom: verticalScale(2),
      color: colors.primary.primary500,
    },
  });

export default nearestAtmTabCompStyles;
