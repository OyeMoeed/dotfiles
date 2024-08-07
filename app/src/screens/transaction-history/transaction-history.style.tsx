import { constants } from '@app/components/atoms/ipay-text/constants.text';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_12, SCALE_34 } from '@app/styles/spacing.const';
import { FONT_SIZE_13 } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const transactionsStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    listContainer: {
      marginHorizontal: moderateScale(24, 0.3),
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: moderateScale(25),
    },
    cardContainerStyleParent: {
      marginHorizontal: moderateScale(24, 0.3),
    },
    cardContainerStyle: {
      marginTop: verticalScale(12),
      marginBottom: verticalScale(6),
    },
    historyContStyle: {
      width: '100%',
      paddingHorizontal: moderateScale(16),
      paddingVertical: moderateScale(18),
      borderRadius: moderateScale(28),
      backgroundColor: colors.natural.natural0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: moderateScale(8),
    },
    commonContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconStyle: {
      width: SCALE_34,
      height: SCALE_34,
      borderRadius: SCALE_12,
      backgroundColor: colors.natural.natural100,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: moderateScale(8),
    },
    footnoteBoldTextStyle: {
      fontWeight: constants.FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_13,
      color: colors.natural.natural900,
      lineHeight: moderateScale(18),
    },
    footnoteRedTextStyle: {
      color: colors.error.error500,
    },
    footnoteGreenTextStyle: {
      color: colors.tertiary.tertiary500,
    },
    currencyStyle: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    dateStyle: {
      color: colors.natural.natural500,
      lineHeight: moderateScale(20),
    },
    filterWrapper: {
      height: verticalScale(27),
      marginTop: moderateScale(24),
    },
    chipContainer: {
      marginLeft: moderateScale(10),
      backgroundColor: colors.secondary.secondary100,
    },
    chipHeading: {
      gap: moderateScale(10),
      color: colors.secondary.secondary500,
    },
    atmCardView: {
      height: moderateScale(75, 0.4),
      marginHorizontal: moderateScale(24, 0.3),
      marginVertical: moderateScale(16, 0.3),
    },
    atmCardImg: {
      height: moderateScale(75, 0.4),
      width: '100%',
      alignItems: 'centers',
    },
    cartInfoView: {
      flexDirection: 'row',
      alignItems: 'cneter',
      justifyContent: 'space-between',
      paddingHorizontal: moderateScale(24, 0.3),
      paddingVertical: verticalScale(16),
    },
    tabs: {
      marginHorizontal: moderateScale(24),
      gap: moderateScale(8),
      marginBottom: moderateScale(24),
      marginTop: moderateScale(14),
    },
    unselectedTab: { backgroundColor: colors.natural.natural0, borderRadius: moderateScale(10) },
  });

export default transactionsStyles;
