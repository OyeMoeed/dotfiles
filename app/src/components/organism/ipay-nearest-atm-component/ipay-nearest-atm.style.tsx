import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const nearestAtmComponentSytles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      borderRadius: moderateScale(28),
      padding: moderateScale(24, 0.3),
    },
    locationIconView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    nearestAtmTextView: {
      marginStart: moderateScale(12, 0.3),
    },
    btnStyles: {
      marginTop: moderateScale(16),
      height: 'auto',
      paddingVertical: moderateScale(14),
      paddingHorizontal: moderateScale(20),
    },
    atmGuideView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.natural.natural0,
      paddingVertical: moderateScale(12),
      paddingHorizontal: moderateScale(18, 0.4),
      borderRadius: moderateScale(16),
      marginTop: verticalScale(20),
    },
    atmGuideTextView: {},
  });

export default nearestAtmComponentSytles;
