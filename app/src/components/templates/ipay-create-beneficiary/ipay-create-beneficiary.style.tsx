import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const createBeneficiaryStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      paddingHorizontal: scaleFont(24),
      paddingTop: verticalScale(32),
      paddingBottom: verticalScale(16),
      gap: verticalScale(32),
      flex: 1,
    },
    innerContainer: {
      padding: scaleFont(24),
      gap: verticalScale(16),
      borderRadius: scaleFont(28),
      backgroundColor: colors.natural.natural0,
    },
    inputContainerStyle: {
      width: '100%',
      paddingHorizontal: scaleFont(20),
      backgroundColor: themeColors.natural.natural0,
      borderColor: themeColors.primary.primary100,
      height: verticalScale(54),
    },
    listContainerStyle: {
      backgroundColor: colors.primary.primary10,
    },
    rightTextStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: verticalScale(8),
    },
    imgStyle: {
      height: verticalScale(18),
      width: scaleSize(18),
    },
    btnStyle: {
      height: verticalScale(50),
      justifyContent: 'center',
      marginTop: verticalScale(32),
    },
    beneficiaryContainer: {
      padding: scaleFont(16),
      borderRadius: scaleFont(28),
      backgroundColor: colors.backgrounds.successBackground,
      justifyContent: 'space-between',
      height: '100%',
    },
  });

export default createBeneficiaryStyles;
