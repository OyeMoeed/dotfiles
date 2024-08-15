import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_12, SCALE_13 } from '@app/styles/spacing.const';
import { typography } from '@app/styles/typography.styles';
import { moderateScale } from 'react-native-size-matters';

const pointRedemptionCard = (themeColors: typeof colors) =>
  createStyleSheet({
    gradientBackground: {
      marginTop: moderateScale(20),
      borderRadius: moderateScale(28),
      backgroundColor: 'transparent',
      overflow: 'hidden',
      flex: 0,
      height: moderateScale(150),
      width: '100%',
    },
    pointRedemptionBackground: {
      alignSelf: 'flex-end',
      position: 'absolute',
    },
    container: {
      marginVertical: moderateScale(32),
      marginHorizontal: moderateScale(20),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(8),
      marginBottom: moderateScale(28),
    },
    headerText: {
      fontSize: SCALE_12,
      color: themeColors.primary.primary900,
    },
    pointsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    yourPointsContainer: {
      flex: 1,
    },
    yourPointsText: {
      fontSize: SCALE_12,
      color: themeColors.primary.primary900,
    },
    gradientText: {
      paddingHorizontal: moderateScale(24, 0.3), // Ensure the SVG has proper padding
    },
    pointsValueContainer: {
      marginTop: moderateScale(8)
    },
    pointsValueText: {
      fontSize: SCALE_12,
      color: themeColors.primary.primary900,
    },
    pointsValueAmount: {
      fontSize: SCALE_13,
      fontWeight: typography.FONT_WEIGHT_BOLD,
      alignSelf: 'auto',
      color: themeColors.natural.natural700,
    },
  });

export default pointRedemptionCard;
