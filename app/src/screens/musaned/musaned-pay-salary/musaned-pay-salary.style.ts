import { moderateScale } from 'react-native-size-matters';

import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';

const musanedPaySalary = (colors) =>
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
      backgroundColor: colors.critical.critical25,
      justifyContent: 'flex-start',
    },
    buttonContainer: {
      marginBottom: 30,
      marginTop: 18,
      marginHorizontal: 24,
    },
    transferContainer: {
      marginTop: moderateScale(4),
    },
    inputFieldStyle: {
      borderRadius: moderateScale(16),
    },
    inputDateFieldStyle: {
      borderWidth: 1,
      borderColor: colors.primary.primary950,
    },
    progressBarBg: {
      backgroundColor: themeColors.success.success25,
    },
    redProgressBarBg: {
      backgroundColor: themeColors.error.error25,
    },
  });

export default musanedPaySalary;
