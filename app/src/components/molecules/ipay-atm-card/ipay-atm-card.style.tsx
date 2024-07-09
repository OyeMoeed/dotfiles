import { scaleFont, scaleSize, SCREEN_WIDTH } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_11, FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { verticalScale } from 'react-native-size-matters';

const cardStyles = (colors: any) =>
  createStyleSheet({
    gradientView: {
      maxHeight: verticalScale(350),
      borderRadius: 28,
      width: scaleSize(220),
      marginRight: 0,
    },
    cardContainer: {
      flex: 1,
      width: SCREEN_WIDTH,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
      flex: 1,
      borderRadius: 28,
      overflow: 'hidden',
      height: verticalScale(350),
      width: scaleSize(220),
    },
    innerContainer: {
      justifyContent: 'space-between',
      height: '100%',
      padding: scaleFont(24),
      overflow: 'hidden',
    },
    logoImage: {
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
      color: colors.primary.primary900,
      marginBottom: scaleFont(6),
    },
    lightCardName: {
      color: colors.primary.primary50,
      marginBottom: scaleFont(6),
    },
    cardNumber: {
      color: colors.primary.primary900,
    },
    lightCardNumber: {
      color: colors.primary.primary50,
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
      color: colors.natural.natural500,
    },
    cashbackText: {
      letterSpacing: scaleFont(3),
      marginTop: scaleFont(4),
    },
  });

export default cardStyles;
