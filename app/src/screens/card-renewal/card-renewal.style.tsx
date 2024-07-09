import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const cardRenewalStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    childContainer: {
      marginHorizontal: moderateScale(24, 0.3),
      flex: 1,
      marginTop: verticalScale(24),
      marginBottom: verticalScale(32),
      gap: verticalScale(24),
    },
    contentContainer: {
      backgroundColor: '#f6f9fc80',
      flex: 1,
      borderRadius: 28,
      padding: moderateScale(16),
    },
    zeroMargin: {
      marginTop: 0,
    },
    termsContainer: {
      width: '100%',
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18),
      paddingVertical: moderateScale(12),
      marginBottom: moderateScale(16),
    },
    bottomContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    termsChildContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    termText: {
      flex: 1,
      marginStart: moderateScale(16),
      marginEnd: moderateScale(10),
      color: colors.natural.natural900,
    },
  });

export default cardRenewalStyles;
