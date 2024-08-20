import { scaleSize } from '@app/styles/mixins';
import themeColors from '@app/styles/theming/theme-colors';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const physicalCardMainNoCardStyle = (color: typeof themeColors) =>
  StyleSheet.create({
    btnStyle: {
      marginTop: verticalScale(24),
    },
    childContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: moderateScale(8),
      marginTop: verticalScale(40),
    },
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    descriptionText: {
      marginTop: verticalScale(12),
    },
    stepBox: {
      alignItems: 'center',
      backgroundColor: color.natural.natural40,
      borderRadius: 24,
      height: scaleSize(112.38),
      justifyContent: 'center',
      paddingHorizontal: moderateScale(16),
      width: scaleSize(120.17),
    },
    stepBoxText: {
      marginTop: verticalScale(12),
      textAlign: 'center',
    },
  });

export default physicalCardMainNoCardStyle;
