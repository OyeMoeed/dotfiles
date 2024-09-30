import { moderateScale } from 'react-native-size-matters';

import createStyleSheet from '@app/styles/scaled-sheet.styles';

const musanedUserDetailsStyles = () =>
  createStyleSheet({
    container: {
      marginBottom: moderateScale(22),
    },
  });

export default musanedUserDetailsStyles;
