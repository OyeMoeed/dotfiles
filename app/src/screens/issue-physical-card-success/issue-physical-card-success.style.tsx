import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const issuePhysicalCardSuccessStyles = (colors: typeof themeColors) =>
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
    successTextContainer: {
      flex: 0,
    },
    appleButtonContainer: {
      alignSelf: 'center',
      marginTop: verticalScale(2),
    },
    descriptionBoxContainer: {
      flexDirection: 'row',
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(20),
      gap: moderateScale(12),
      paddingVertical: verticalScale(20),
      paddingHorizontal: scaleSize(16),
      alignItems: 'center',
      marginVertical: verticalScale(44),
    },
    captionTextContainer: {
      flex: 1,
    },
    btnStyle: {
      marginTop: verticalScale(-12),
    },
    descriptionStyle: {
      marginTop: verticalScale(8),
    },
    addedAppleWalletWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: scaleSize(8),
      height: verticalScale(29.5),
    },
    appleWalletTextWrapper: {
      gap: scaleSize(2),
    },
    addedText: {
      alignSelf: 'flex-end',
    },
    applePay: {
      alignItems: 'center',
      borderColor: themeColors.natural.natural900,
      borderRadius: 4,
      borderWidth: 2,
      flexDirection: 'row',
      height: verticalScale(24),
      justifyContent: 'center',
      padding: scaleSize(6),
    },
  });

export default issuePhysicalCardSuccessStyles;
