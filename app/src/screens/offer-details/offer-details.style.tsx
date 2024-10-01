import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const offerDetailsStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    alertBottom: { bottom: verticalScale(20) },
    backgroundColor: { backgroundColor: colors.backgrounds.lightGradient },
    availabilityContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    bottomButtonContainer: {
      flexDirection: 'row',
      gap: moderateScale(8),
      marginBottom: moderateScale(20),
      marginTop: moderateScale(13),
      alignSelf: 'center',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      marginBottom: moderateScale(12),
    },
    detailsContainer: {
      gap: verticalScale(8),
    },
    detailsSectionCommon: {
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(16),
      marginTop: verticalScale(8),
      paddingHorizontal: moderateScale(18),
      paddingVertical: verticalScale(12),
    },
    expiryTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    fill: {
      flex: 1,
    },
    flexStyle: {
      flex: 1,
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(14),
    },
    lineImageStyle: {
      height: '85%',
    },
    off: {
      fontWeight: '400',
    },
    offerContainerStyle: {
      height: verticalScale(150),
      marginTop: moderateScale(20),
      width: '100%',
    },
    offerExpiryContainer: {
      gap: scaleSize(16),
      marginTop: verticalScale(16),
      paddingBottom: verticalScale(20),
    },
    offerImageStyle: {
      height: verticalScale(70),
      width: scaleSize(70),
    },
    termsContainer: {
      gap: scaleSize(8),
    },
    alertBottom: { bottom: moderateScale(20) },
  });

export default offerDetailsStyles;
