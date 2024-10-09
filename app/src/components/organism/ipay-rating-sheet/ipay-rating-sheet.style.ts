import type { Colors } from '@app/styles/colors.const';
import { BottomBarPadding } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const styles = (colors: Colors) =>
  createStyleSheet({
    sheetTitle: {
      marginBottom: verticalScale(14),
      textAlign: 'center',
    },
    gradientContainer: {
      flex: 0,
      borderRadius: scale(24),
      paddingVertical: verticalScale(20),
      paddingHorizontal: scale(20),
    },
    gradientBoxTitle: {
      marginTop: verticalScale(16),
      marginBottom: verticalScale(32),
      textAlign: 'center',
    },
    sheetHeadercontainerStyle: {
      height: verticalScale(20),
    },
    rateButtonStyle: {
      backgroundColor: colors.primary.primary500,
    },
    iconContainer: {
      alignSelf: 'center',
    },
    overrideContainerStyle: {
      flex: undefined,
      alignItems: undefined,
      minHeight: 10,
    },
    mainViewStyle: {
      paddingBottom: BottomBarPadding,
      paddingHorizontal: scale(24),
    },
    button: {
      flex: 1,
      borderRadius: moderateScale(16),
      backgroundColor: colors.natural.natural0,
      padding: moderateScale(16),
      gap: moderateScale(28),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: moderateScale(12),
    },
    buttonTitle: {
      fontSize: moderateScale(14),
      marginTop: verticalScale(8),
    },
  });

export default styles;
