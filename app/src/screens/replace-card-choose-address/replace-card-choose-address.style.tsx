import { scaleSize } from '@app/styles/mixins';
import { spacing } from '@app/styles/spacing.const';
import themeColors from '@app/styles/theming/theme-colors';
import { FONT_SIZE_12, FONT_SIZE_15 } from '@app/styles/typography.styles';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const replaceCardStyles = (colors: typeof themeColors) =>
  StyleSheet.create({
    bottomContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    chooseAddressText: {
      color: colors.natural.natural500,
      marginTop: moderateScale(20),
    },
    cityDistrict: {
      borderColor: colors.primary.primary100,
      borderWidth: 1.5,
      marginTop: verticalScale(8),
    },
    citySearchStyle: {
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(12),
      height: spacing.CUSTOME_SCALE(36),
      marginBottom: spacing.CUSTOME_SCALE(24),
      paddingHorizontal: moderateScale(12),
    },
    citySheetContainer: {
      alignItems: 'center',
      flex: 1,
      marginHorizontal: spacing.SCALE_24,
      marginTop: spacing.SCALE_12,
    },
    citySheetContainerChild: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    contentContainer: {
      backgroundColor: colors.natural.natural50,
      borderRadius: 28,
      flex: 1,
      marginHorizontal: moderateScale(20, 0.3),
      marginVertical: moderateScale(32),
      padding: moderateScale(16),
    },
    countryButtonStyle: {
      backgroundColor: colors.natural.natural200,
    },
    inputStyle: {
      marginVertical: -12,
    },
    listStyle: {
      marginBottom: spacing.CUSTOME_SCALE(4),
    },
    subTextStyle: {
      color: colors.natural.natural900,
      fontSize: FONT_SIZE_15,
    },
    termText: {
      color: colors.natural.natural900,
      flex: 1,
      marginEnd: moderateScale(10),
      marginStart: moderateScale(16),
    },
    termsChildContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    termsContainer: {
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
      marginBottom: moderateScale(16),
      paddingHorizontal: moderateScale(18),
      paddingVertical: moderateScale(12),
      width: '100%',
    },
    textGray: {
      color: colors.natural.natural500,
    },
    titleStyle: {
      color: colors.primary.primary600,
      fontSize: FONT_SIZE_12,
    },
    zeroMargin: {
      marginTop: 0,
    },
  });

export default replaceCardStyles;
