import { scaleSize } from '@app/styles/mixins';
import { SCALE_12, SCALE_16, SCALE_4, spacing } from '@app/styles/spacing.const';
import themeColors from '@app/styles/theming/theme-colors';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const latestOfferCardStyle = (colors: typeof themeColors) =>
  StyleSheet.create({
    captionTextStyle: {
      color: colors.primary.primary800,
      fontSize: SCALE_12,
      fontWeight: '700',
      marginLeft: SCALE_4,
    },
    captionsTextStyle: {
      marginTop: verticalScale(10),
    },
    childContainer: {
      flexDirection: 'row',
      flex: 1,
      paddingHorizontal: moderateScale(36),
      paddingVertical: moderateScale(28),
    },
    container: {
      height: scaleSize(124),
      width: scaleSize(243),
    },
    detailsContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    headingTextStyle: {
      color: colors.primary.primary800,
      fontSize: SCALE_16,
      fontWeight: '700',
    },
    imageBackgroundContainer: {
      height: '100%',
      width: '100%',
    },
    imageStyle: {
      alignSelf: 'center',
      borderRadius: moderateScale(8),
      height: verticalScale(36),
      resizeMode: 'contain',
      width: scaleSize(36),
    },
    lastOffer: {
      marginRight: moderateScale(24),
    },
    lineImageStyle: {
      alignSelf: 'center',
      height: '100%',
      marginHorizontal: scaleSize(16),
      resizeMode: 'contain',
      width: spacing.CUSTOME_SCALE(3),
    },
    percentageTextStyle: {
      color: colors.primary.primary800,
      fontSize: SCALE_12,
      fontWeight: '700',
    },
    specialOfferContainer: {
      alignSelf: 'flex-start',
      backgroundColor: colors.secondary.secondary100,
      borderRadius: scaleSize(30),
      marginTop: verticalScale(8),
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(2),
    },
    textContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: verticalScale(4),
    },
  });

export default latestOfferCardStyle;
