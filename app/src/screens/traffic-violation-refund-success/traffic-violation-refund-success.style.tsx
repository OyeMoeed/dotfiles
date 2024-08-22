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
      paddingVertical: verticalScale(24),
    },
    boldStyles: { fontWeight: 'bold' },
    minFlex: {
      flex: 0,
    },
    chipStyles: { alignSelf: 'center', margin: verticalScale(8) },

    bottomView: {
      paddingVertical: verticalScale(8),
    },
    rowStyles: {
      flexDirection: 'row',
      paddingBottom: verticalScale(4),
    },
    conatinerStyles: { backgroundColor: colors.natural.natural0 },
    optionsStyle: { backgroundColor: colors.primary.primary10 },
    marginStyles: { marginBottom: verticalScale(16) },
  });

export default trafficViolationSuccessStyles;