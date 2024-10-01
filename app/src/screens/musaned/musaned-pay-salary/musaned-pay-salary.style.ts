import { moderateScale } from 'react-native-size-matters';

import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';

const musanedPaySalary = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      marginTop: moderateScale(24, 0.3),
    },
    bankDetailsView: {
      flex: 1,
    },
    nextBtn: {
      marginBottom: moderateScale(46),
      borderRadius: moderateScale(16),
      marginHorizontal: moderateScale(24, 0.3),
    },
    buttonContainer: {
      marginBottom: 30,
      marginHorizontal: 24,
    },
    transferContainer: {
      marginTop: moderateScale(4),
    },
    inputFieldStyle: {
      borderRadius: moderateScale(16),
    },
    progressBarBg: {
      backgroundColor: themeColors.success.success25,
    },
    redProgressBarBg: {
      backgroundColor: themeColors.error.error25,
    },
  });

export default musanedPaySalary;
