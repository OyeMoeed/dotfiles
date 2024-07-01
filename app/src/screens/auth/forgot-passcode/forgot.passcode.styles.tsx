import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isAndroidOS } from '@app/utilities/constants';
import { moderateScale, scale } from 'react-native-size-matters';

const ForgotPasscodeStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingVertical: moderateScale(12),
    },
    identityContainer: {
      flex: 1,
      marginHorizontal: moderateScale(40, 0.3),
      paddingVertical: moderateScale(12),
    },

    headingStyle: {
      marginHorizontal: moderateScale(24, 0.3),
      alignItems: 'center',
    },
    languageBtnView: {
      alignSelf: 'flex-end',
    },
    loginIconView: {
      marginTop: moderateScale(32),
      marginBottom: moderateScale(16),
      alignSelf: 'center',
    },
    toast: {
      alignSelf: 'center',
      bottom: scaleSize(20),
      left: scaleSize(15),
      right: scaleSize(20),
      zIndex: 1000,
    },
    headingView: {
      //width: scale(297),
    },
    inputFieldsContainer: {
      marginVertical: moderateScale(32),
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
    },
    needHelpBtn: {
      marginTop: moderateScale(48),
    },
    termsAndConditions: {
      marginVertical: moderateScale(24),
      marginHorizontal: moderateScale(33, 0.3),
    },
    termsAndConditionsHeading: {
      marginBottom: moderateScale(18),
    },
    termsAndConditionsText: {
      marginBottom: moderateScale(200),
    },
    toastStyle: {
      width: '100%',
      left: moderateScale(-2),
      right: 0,
      marignLeft: 0,
      marginRight: 0,
      bottom: isAndroidOS ? scale(20) : scale(120),
      zIndex: 1000,
      alignSelf: 'center',
    },
  });

export default ForgotPasscodeStyles;
