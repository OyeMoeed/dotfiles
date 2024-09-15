import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const mobileAndIqamaStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingHorizontal: moderateScale(24),
      paddingVertical: moderateScale(12),
    },
    languageBtnView: {
      alignSelf: 'flex-end',
    },
    loginIconView: {
      marginTop: moderateScale(40),
      marginBottom: moderateScale(8),
      alignSelf: 'center',
    },
    headingView: {
      alignItem: 'center',
      marginHorizontal: moderateScale(24, 0.3),
    },
    inputFieldsContainer: {
      marginTop: moderateScale(50),
      marginBottom: moderateScale(32),
    },
    inputTextView: {
      marginTop: moderateScale(12),
    },
    termsAndConditionsParentView: {
      width: '100%',
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18),
      paddingVertical: moderateScale(12),
      marginBottom: moderateScale(16),
    },
    termsAndConditionsView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    termAndConditionsText: {
      flex: 1,
      marginStart: moderateScale(16),
      marginEnd: moderateScale(10),
      color: colors.natural.natural900,
    },
    needHelpBtn: {
      position: 'absolute',
      bottom: verticalScale(20),
      alignSelf: 'center',
    },
    termsAndConditions: {
      paddingVertical: moderateScale(24), // Fixed typo (madding to padding)
      marginHorizontal: moderateScale(33, 0.3),
    },
    termsAndConditionsHeading: {
      marginBottom: moderateScale(18),
    },
    termsAndConditionsText: {
      marginBottom: moderateScale(200),
    },
    toast: {
      marginHorizontal: moderateScale(24, 0.3),
      width: '100%',
      left: 0,
      bottom: verticalScale(-30),
      zIndex: 10,
    },
    toastContainer: {
      bottom: verticalScale(32),
    },
  });

export default mobileAndIqamaStyles;
