import themeColors from '@app/styles/theming/theme-colors';

import { scaleSize } from '@app/styles/mixins';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const offersListStyles = (colors: typeof themeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
    },
    contentContainerStyle: {
      gap: verticalScale(20),
      marginTop: verticalScale(12),
    },
    lineImageStyle: {
      height: '85%',
    },
    off: { fontWeight: '400' },
    offerContainerStyle: {
      height: scaleSize(150),
      width: '100%',
    },
    offerImageStyle: {
      height: scaleSize(70),
      width: scaleSize(70),
    },
    smallDOT: {
      backgroundColor: colors.secondary.secondary500,
      borderRadius: scaleSize(2),
      height: scaleSize(4),
      width: scaleSize(4),
    },
    topTextContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: scaleSize(8),
      marginTop: verticalScale(24),
    },
    inputContainer: { borderColor: colors.primary.primary100, borderRadius: moderateScale(26) },
    backgroundColor: { backgroundColor: colors.backgrounds.lightGradient },
  });

export default offersListStyles;
