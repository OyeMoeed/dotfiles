import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { verticalScale } from 'react-native-size-matters';

const cardBalanceSectionStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    accountBalanceContainer: {
      alignItems: 'center',
      backgroundColor: themeColors.natural.natural0,
      borderRadius: scaleFont(16),
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: scaleFont(24),
      paddingVertical: scaleFont(8),
    },
    accountBalanceInnerContainer: {
      gap: scaleFont(4),
    },
    accountBalanceText: {
      color: themeColors.primary.primary900,
    },
    addedAppleWalletWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: scaleFont(8),
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
      padding: scaleFont(6),
    },
    appleWalletImg: {
      height: verticalScale(35),
      resizeMode: 'contain',
      width: scaleSize(110),
    },
    appleWalletTextWrapper: {
      gap: scaleFont(2),
    },
    carOptionsContainer: {
      backgroundColor: themeColors.natural.natural0,
      borderRadius: scaleFont(28),
      gap: scaleFont(16),
      marginTop: verticalScale(12),
      paddingHorizontal: scaleFont(12),
      paddingVertical: scaleFont(16),
    },
    cardExpiryContainer: {
      backgroundColor: themeColors.critical.critical25,
      borderRadius: scaleFont(16),
      marginBottom: verticalScale(12),
      paddingHorizontal: scaleFont(16),
      paddingVertical: scaleFont(16),
    },
    cardOption: {
      alignItems: 'center',
      backgroundColor: themeColors.backgrounds.greyOverlay,
      borderRadius: scaleFont(14),
      flexDirection: 'row',
      height: verticalScale(48),
      justifyContent: 'center',
      padding: scaleFont(10),
      width: scaleSize(48),
    },
    cardOptionWrapper: {
      alignItems: 'center',
      gap: scaleFont(4),
      justifyContent: 'center',
      width: scaleFont(107),
    },
    cashbackContainer: {
      backgroundColor: themeColors.secondary.secondary100,
      borderRadius: scaleFont(16),
      marginTop: verticalScale(12),
      minHeight: verticalScale(44),
      paddingHorizontal: scaleFont(24),
      paddingVertical: verticalScale(8),
    },
    commonContainerStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: verticalScale(4),
    },
    expiredBg: {
      backgroundColor: themeColors.error.error25,
    },
    expiredTextColor: {
      color: themeColors.error.error800,
    },
    expiryLeftContainer: {
      alignSelf: 'flex-start',
      marginTop: verticalScale(6),
    },
    expirySubTitle: {
      color: themeColors.critical.critical800,
    },
    expiryTitle: {
      color: themeColors.critical.critical800,
      fontWeight: FONT_WEIGHT_BOLD,
    },
    flatlist: {
      flex: 0,
    },
    flatlistContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
    },
    footnoteTextStyle: {
      color: themeColors.natural.natural500,
    },
    headingsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: verticalScale(12),
      width: '100%',
    },
    listText: {
      color: themeColors.natural.natural900,
    },
    mainContainer: {
      padding: scaleFont(24),
      paddingBottom: scaleFont(190),
      paddingTop: verticalScale(8),
      width: '100%',
    },
    optionText: {
      color: themeColors.primary.primary900,
      marginTop: verticalScale(8),
    },
    subheadingTextStyle: {
      color: themeColors.primary.primary600,
      marginRight: scaleFont(8),
    },
    toast: {
      bottom: scaleSize(88),
      left: scaleFont(24),
      position: 'absolute',
      width: '90%',
    },
    leftIconStyles: {
      marginRight: scaleFont(8),
    },
    actionSheetStyle: {
      bottom: verticalScale(50),
    },
  });

export default cardBalanceSectionStyles;
