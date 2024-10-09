import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const activateBeneficiaryStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
      width: '100%',
      gap: verticalScale(8),
    },
    descriptionStyles: {
      color: colors.primary.primary900,
      marginVertical: verticalScale(8),
    },
    callIcon: {
      width: moderateScale(20),
      height: moderateScale(20),
    },
  });

export default activateBeneficiaryStyles;
