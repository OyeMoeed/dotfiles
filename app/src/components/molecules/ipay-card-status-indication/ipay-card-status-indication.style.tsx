import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { verticalScale } from 'react-native-size-matters';

const cardStatusIndicationStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    cardContainer: {
      backgroundColor: themeColors.critical.critical25,
      borderRadius: scaleFont(16),
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
    },
    cardSubTitle: {
      color: themeColors.critical.critical800,
      width: scaleSize(167),
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
    },
  });

export default cardStatusIndicationStyles;
