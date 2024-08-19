import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const transferSummaryStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    iconLabel: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    listContainer: {
      backgroundColor: themeColors.natural.natural0,
      width: '100%',
      borderRadius: moderateScale(16),
      marginBottom: moderateScale(8),
    },
    walletBackground: {
      marginBottom: moderateScale(12),
      backgroundColor: themeColors.backgrounds.successBackground,
      padding: moderateScale(16),
      borderRadius: moderateScale(22),
    },
    walletListBackground: {
      backgroundColor: themeColors.natural.natural0,
      borderRadius: moderateScale(22),
      paddingVertical: scaleSize(12),
      paddingHorizontal: scaleSize(18),
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    detailesFlex: {
      flex: 0,
    },
    leftIcon: {
      marginRight: moderateScale(12),
    },
    appleIcon: {
      marginRight: moderateScale(16),
    },
    listDetails: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    container: {
      marginTop: moderateScale(12),
      marginHorizontal: moderateScale(24, 0.3),
      flex: 1,
      justifyContent: 'space-between',
      marginBottom: moderateScale(26),
    },
    label: {
      color: themeColors.natural.natural900,
    },
    detailsText: { color: themeColors.primary.primary800 },
    alinmaLogo: {
      height: moderateScale(24),
      width: moderateScale(24),
    },
    chipContainer: {
      marginBottom: moderateScale(8),
    },
    chipColors: {
      alignSelf: 'stretch',
      backgroundColor: themeColors.secondary.secondary100,
      color: themeColors.secondary.secondary500,
    },
    faqItemContainer: {
      backgroundColor: themeColors.natural.natural0,
      borderRadius: scaleSize(16),
      overflow: 'hidden',
    },
    listView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    faqItemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: scaleSize(12),
      paddingHorizontal: scaleSize(16),
    },

    faqItemText: {
      color: themeColors.primary.primary800,
    },
    faqItemIcon: {
      color: themeColors.primary.primary800,
    },
    faqItemAnswer: {
      paddingVertical: scaleSize(12),
      paddingHorizontal: scaleSize(16),
      color: themeColors.natural.natural700,
    },

    reasonContainer: {
      marginTop: moderateScale(24),
      gap: moderateScale(8),
      marginHorizontal: moderateScale(24, 0.3),
    },
    confirmButton: {
      height: verticalScale(50),
      justifyContent: 'center',
    },
    buttonContainer: {
      padding: moderateScale(16),
      gap: moderateScale(16),
      marginTop: moderateScale(24),
      backgroundColor: themeColors.natural.natural3,
      borderRadius: moderateScale(28),
    },
  });

export default transferSummaryStyles;
