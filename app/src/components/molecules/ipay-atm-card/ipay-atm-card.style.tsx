import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize, SCREEN_WIDTH } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_11, FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { verticalScale } from 'react-native-size-matters';

const cardStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    gradientView: {
      maxHeight: verticalScale(350),
      borderRadius: scaleFont(28),
      width: scaleSize(220),
      marginRight: 0,
      position: 'relative',
    },
    cardContainer: {
      flex: 1,
      width: SCREEN_WIDTH,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
      flex: 1,
      borderRadius: scaleFont(28),
      overflow: 'hidden',
      maxHeight: verticalScale(350),
      width: scaleSize(220),
    },
    innerContainer: {
      justifyContent: 'space-between',
      padding: scaleFont(24),
      height: '100%',
    },
    logoImage: {
      resizeMode: 'contain',
      width: scaleSize(70),
      height: verticalScale(22),
    },
    textContainer: {
      gap: scaleFont(30),
    },
    details: {
      gap: scaleFont(6),
    },
    cardName: {
      color: themeColors.primary.primary900,
    },
    lightCardName: {
      color: themeColors.primary.primary50,
    },
    cardNumber: {
      color: themeColors.primary.primary900,
    },
    lightCardNumber: {
      color: themeColors.primary.primary50,
    },
    bottomImagesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
    },
    bottomImage: {
      width: scaleSize(48),
      height: verticalScale(16),
      resizeMode: 'contain',
    },
    cardHeaderText: {
      textAlign: 'center',
      marginBottom: verticalScale(12),
      width: scaleSize(220),
      color: themeColors.natural.natural500,
    },
    cashbackText: {
      letterSpacing: scaleFont(3),
      marginTop: scaleFont(4),
    },
    expiredOverlay: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: themeColors.backgrounds.errorOverlay,
      top: 0,
      left: 0,
      borderRadius: scaleFont(28),
      zIndex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scaleFont(32),
    },
    expiredBackground: {
      backgroundColor: themeColors.backgrounds.errorOverlay,
    },
    frozenBackground: {
      backgroundColor: themeColors.backgrounds.frozenOverlay,
    },
    btnStyle: {
      width: '100%',
      height: verticalScale(44),
      justifyContent: 'center',
    },
    btnTextStyle: {
      fontWeight: FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_11,
    },
  });

export default cardStyles;
