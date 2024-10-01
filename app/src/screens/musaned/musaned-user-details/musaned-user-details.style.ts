import { moderateScale } from 'react-native-size-matters';

import createStyleSheet from '@app/styles/scaled-sheet.styles';

const musanedUserDetailsStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    contentContainer: {
      marginTop: moderateScale(20),
      marginHorizontal: moderateScale(16),
    },
  });

export default musanedUserDetailsStyles;
