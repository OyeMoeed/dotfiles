import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const offersListStyles = (themeColors: typeof colors) =>
  StyleSheet.create({
    backgroundColor: { backgroundColor: colors.backgrounds.lightGradient },
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
    },
    contentContainerStyle: {
      // gap: moderateScale(20),
      marginTop: moderateScale(16),
    },
    inputContainer: {
      borderColor: colors.primary.primary100,
      borderRadius: moderateScale(22),
      marginTop: moderateScale(8),
    },
    lastItem: {
      height: moderateScale(50),
    },
    lineImageStyle: {
      height: '90%',
    },
    off: { fontWeight: '400' },
    offerContainerStyle: {
      height: verticalScale(150),
      width: '100%',
    },
    offerImageStyle: {
      height: verticalScale(70),
      width: scaleSize(70),
    },
    smallDOT: {
      backgroundColor: themeColors.secondary.secondary500,
      borderRadius: moderateScale(2),
      height: verticalScale(4),
      width: scaleSize(4),
    },
    topTextContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: moderateScale(8),
      marginTop: moderateScale(24),
    },
  });

export default offersListStyles;
