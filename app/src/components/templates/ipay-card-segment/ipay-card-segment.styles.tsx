import themeColors from '@app/styles/theming/theme-colors';
import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const cardSegmentStyles = (colors: typeof themeColors) =>
  StyleSheet.create({
    flatlist: {
      marginTop: moderateScale(8),
      flex: 0,
    },
    textColor: { color: colors.primary.primary900 },
    detailTextColor: { color: colors.primary.primary800 },
  });

export default cardSegmentStyles;
