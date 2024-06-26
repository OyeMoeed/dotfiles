import { typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_13, spacing } from '@app/styles/spacing.const';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const nafathVerificationStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: scaleSize(24),
      marginTop: spacing.SCALE_12,
      gap: spacing.SCALE_10,
    },
    logoWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    nafathLogo: {
      width: spacing.SCALE_104,
      height: spacing.SCALE_100,
    },
    disclaimer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: spacing.SCALE_10,
      backgroundColor: colors.natural.natural0,
      paddingVertical: spacing.SCALE_12,
      paddingHorizontal: spacing.SCALE_18,
      borderRadius: spacing.SCALE_16,
      gap: spacing.SCALE_10,
    },
    downloadSection: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: spacing.SCALE_20,
      backgroundColor: colors.natural.natural0,
      paddingVertical: spacing.SCALE_32,
      paddingHorizontal: spacing.SCALE_16,
      borderRadius: spacing.CUSTOME_SCALE(25),
      marginBottom: spacing.SCALE_100,
    },
    stepper: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: colors.natural.natural0,
      padding: spacing.SCALE_16,
      borderRadius: spacing.SCALE_28,
      width: '100%',
    },
    flexRow: {
      flexDirection: 'row',
    },
    stepTwo: {
      backgroundColor: colors.natural.natural0,
      width: spacing.SCALE_300,
      height: spacing.CUSTOME_SCALE(250),
      padding: spacing.SCALE_24,
      borderRadius: spacing.CUSTOME_SCALE(25),
      gap: spacing.SCALE_10,
    },
    downloadText: {
      flex: 1,
      marginEnd: spacing.SCALE_10,
      fontWeight: typography.BOLD_TEXT_STYLES.fontWeight,
      fontSize: SCALE_13,
      color: colors.primary.primary800,
    },
    sectionText: {
      fontSize: SCALE_13,
      fontWeight: typography.BOLD_TEXT_STYLES.fontWeight,
      color: colors.primary.primary800,
    },
    stepIndicator: {
      backgroundColor: colors.backgrounds.greyOverlay,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: spacing.CUSTOME_SCALE(11),
      width: spacing.SCALE_32,
      height: spacing.SCALE_32,
      marginRight: spacing.CUSTOME_SCALE(13),
    },
    stepNoText: {
      fontSize: SCALE_13,
      fontWeight: typography.BOLD_TEXT_STYLES.fontWeight,
    },
    verifiedCodeContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: spacing.SCALE_110,
      borderRadius: spacing.CUSTOME_SCALE(25),
    },
    codeWrapper: {
      width: '100%',
    },
    expireSection: {
      alignItems: 'center',
      gap: spacing.SCALE_10,
    },
    linearGradientText: {
      fontSize: spacing.SCALE_50,
      fontFamily: typography.BOLD_TEXT_STYLES.fontWeight,
    },
    gradientTextSvg: {
      width: '100%',
      paddingHorizontal: spacing.SCALE_26,
    },
    resendButton: {
      width: spacing.CUSTOME_SCALE(186),
      height: verticalScale(48),
      borderRadius: moderateScale(50),
    },
    backSection: {
      flex: 1,
    },
    expireText: {
      fontSize: scaleFont(12),
    },
    expireTextColor: {
      color: colors.error.error500,
    },
  });

export default nafathVerificationStyles;
