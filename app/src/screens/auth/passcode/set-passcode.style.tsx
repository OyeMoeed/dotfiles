import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';
import { moderateScale } from 'react-native-size-matters';

const passcodeStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24),
      marginTop: moderateScale(12),
    },
    lockIconView: {
      marginTop: moderateScale(20),
      marginBottom: moderateScale(8),
      alignSelf: 'center',
    },
    headingView: {
      width: spacing.CUSTOME_SCALE(297),
      paddingHorizontal: moderateScale(60, 0.3),
      marginBottom: moderateScale(60),
    },
    flex1: { flex: 1 },
  });

export default passcodeStyles;
