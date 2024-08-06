import { scaleSize, WINDOW_HEIGHT } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { FONT_SIZE_12, FONT_SIZE_16 } from '@app/styles/typography.styles';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';

const shopDetailStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    contentContainer: { marginHorizontal: scaleSize(24), marginVertical: verticalScale(24), flex: 1 },
    discountCard: {
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(16),
      paddingHorizontal: scaleSize(18),
      paddingVertical: verticalScale(12),
      gap: 12,
    },
    termsContainer: {
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18),
      paddingVertical: moderateVerticalScale(12),
      marginBottom: moderateScale(16),
    },
    termsChildContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      width: '100%',
    },
    termText: {
      flex: 1,
      marginEnd: moderateScale(10),
      color: colors.natural.natural900,
    },
    image: { width: '100%', height: '60%' },
    carouselContainer: {
      height: WINDOW_HEIGHT / moderateScale(2.2),
      alignSelf: 'center',
      borderRadius: scaleSize(12),
    },
    paginationStyle: {
      width: moderateScale(20),
      height: moderateScale(4),
      bottom: 0,
    },
    carouselStyle: { flex: 1, marginBottom: scaleSize(16), borderRadius: scaleSize(12) },
    pointsCard: {
      backgroundColor: colors.natural.natural0,
      paddingHorizontal: scaleSize(18),
      paddingVertical: verticalScale(12),
      borderRadius: scaleSize(16),
      marginVertical: verticalScale(12),
    },
    title: {
      marginBottom: moderateScale(8),
      fontSize: FONT_SIZE_16,
      color: colors.natural.natural900,
    },
    bulletContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: moderateScale(8), // Space between bullet points
    },
    bulletSymbol: {
      marginRight: moderateScale(8),
      alignSelf: 'flex-start',
      color: colors.natural.natural500,
    },
    bulletPoint: {
      flex: 1,
      fontSize: FONT_SIZE_12,
      color: colors.natural.natural500,
    },
    bottomContainer: {
      marginBottom: moderateScale(40),
      marginHorizontal: moderateScale(24),
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 40,
      alignItems: 'center',
    },
    amountText: { color: colors.primary.primary800 },
    payButton: { flex: 1 },
    viewDetailToggle: {
      textAlign: 'center',
      marginTop: moderateScale(10),
    },
  });

export default shopDetailStyles;
