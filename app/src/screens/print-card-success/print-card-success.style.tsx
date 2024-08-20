import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const printCardSuccessStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    childContainer: {
      flex: 1,
      borderRadius: scaleSize(48),
      backgroundColor: colors.natural.natural50,
      marginTop: verticalScale(16),
      paddingHorizontal: moderateScale(20),
      marginBottom: verticalScale(20),
      justifyContent: 'flex-end',
    },
    bottomButtonContainer: {
      gap: verticalScale(12),
      marginBottom: verticalScale(24),
    },
    headingStyle: {
      marginHorizontal: moderateScale(40),
    },
    successTextContainer: {
      flex: 0,
    },
    descriptionBoxContainer: {
      flexDirection: 'row',
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(20),
      marginTop: verticalScale(60),
      gap: moderateScale(12),
      paddingVertical: verticalScale(22),
      paddingHorizontal: scaleSize(16),
      alignItems: 'center',
    },
    captionTextContainer: {
      flex: 1,
    },
    btnStyle: {
      marginTop: verticalScale(44),
    },
  });

export default printCardSuccessStyles;
