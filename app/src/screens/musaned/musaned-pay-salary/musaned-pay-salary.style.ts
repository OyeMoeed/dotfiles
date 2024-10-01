import { moderateScale } from 'react-native-size-matters';

import createStyleSheet from '@app/styles/scaled-sheet.styles';

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
      paddingTop: moderateScale(32),
    },
    transferContainer: {
      marginTop: moderateScale(4),
    },
    inputFieldStyle: {
      borderRadius: moderateScale(16),
    },
  });

export default musanedPaySalary;
