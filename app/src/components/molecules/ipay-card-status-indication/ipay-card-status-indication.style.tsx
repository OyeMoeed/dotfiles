import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { verticalScale } from 'react-native-size-matters';

const cardStatusIndicationStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    cardContainer: {
      backgroundColor: themeColors.critical.critical25,
      borderRadius: scaleSize(22),
      marginBottom: verticalScale(12),
      paddingHorizontal: scaleFont(16),
      paddingVertical: scaleFont(16),
    },
    alertBg: {
      backgroundColor: themeColors.error.error25,
    },
    alertTextColor: {
      color: themeColors.error.error800,
    },
    cardLeftContainer: {
      alignSelf: 'flex-start',
      marginRight: scaleFont(8),
    },
    cardSubTitle: {
      color: themeColors.critical.critical800,
      width: scaleSize(167),
      paddingRight: scaleFont(12),
      top: verticalScale(2),
    },
    fee: {
      color: themeColors.critical.critical800,
    },
    cardTitle: {
      color: themeColors.critical.critical800,
      fontWeight: FONT_WEIGHT_BOLD,
    },
    expiryLeftContainer: {
      marginTop: verticalScale(4),
    },
    topUpBtn: {
      height: verticalScale(28),
      width: scaleSize(83),
      justifyContent: 'center',
    },
    renewBtn: {
      height: verticalScale(36),
      justifyContent: 'center',
    },
    statusIconContainer: {
      bottom: verticalScale(1),
    },
  });

export default cardStatusIndicationStyles;
