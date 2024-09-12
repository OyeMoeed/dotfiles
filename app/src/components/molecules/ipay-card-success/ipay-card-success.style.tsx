import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const topUpSuccessStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingVertical: moderateScale(16),
      alignItems: 'center',
    },
    logoStyles: {
      width: verticalScale(84),
      height: verticalScale(28),
    },
    linearGradientView: {
      alignSelf: 'center',
      borderRadius: moderateScale(48),
      overflow: 'hidden',
      width: '90%',
      height: '90%',
      marginVertical: moderateScale(16),
    },
    viewStyles: { marginBottom: moderateScale(34, 0.3) },
    innerLinearGradientView: {
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: moderateScale(20, 0.3),
      paddingVertical: moderateScale(24, 0.3),
    },

    btnStyle: {
      width: '100%',
      height: verticalScale(50),
      marginTop: moderateScale(40),
    },

    aniamtionStyles: { width: moderateScale(80), height: moderateScale(80) },

    successText: {
      textAlign: 'center',
    },
    subTittleStyle: {
      textAlign: 'center',
      marginVertical: verticalScale(12),
      marginHorizontal: moderateScale(16),
    },
    lowerButtons: {
      flexDirection: 'row',
      gap: moderateScale(12),
      justifyContent: 'space-between',
      width: '90%',
      alignSelf: 'center',
    },
    flexStyle: {
      flex: 1,
      alignItems: 'center',
    },
    alignEnd: {
      justifyContent: 'flex-end',
      gap: verticalScale(24),
    },
    upperView: {
      justifyContent: 'center',
    },
  });
export default topUpSuccessStyles;
