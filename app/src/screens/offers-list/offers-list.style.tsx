import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const offersListStyles = (themeColors: typeof colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
    },
    contentContainerStyle: {
      gap: moderateScale(20),
      marginTop: moderateScale(12),
    },
    lineImageStyle: {
      height: '85%',
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
    inputContainer: { borderColor: colors.primary.primary100, borderRadius: moderateScale(26) },
    backgroundColor: { backgroundColor: colors.backgrounds.lightGradient },
  });

export default offersListStyles;
