import { moderateScale } from 'react-native-size-matters';

import createStyleSheet from '@app/styles/scaled-sheet.styles';

const musanedPaySalary = () =>
  createStyleSheet({
    container: {
      marginBottom: moderateScale(22),
    },
  });

export default musanedPaySalary;
