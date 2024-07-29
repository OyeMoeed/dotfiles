import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const trafficViolationSuccessStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    childContainer: {
      flex: 1,
      borderRadius: scaleSize(48),
      backgroundColor: colors.natural.natural50,
      marginVertical: verticalScale(16),
      paddingHorizontal: moderateScale(15),
      paddingVertical: moderateScale(24),
    },
    boldStyles: { fontWeight: 'bold' },
    minFlex: {
      flex: 0,
    },
    bottomView: {
      paddingVertical: moderateScale(8),
    },
  });

export default trafficViolationSuccessStyles;
